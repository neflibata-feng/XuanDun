type GridPoint = {
  restX: number;
  restY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const FRAME_INTERVAL = 1000 / 30;
const SETTLED_SPEED = 0.01;

class FutureParticles extends HTMLElement {
  private canvas: HTMLCanvasElement | null = null;
  private context: CanvasRenderingContext2D | null = null;
  private points: GridPoint[] = [];
  private columns = 0;
  private rows = 0;
  private width = 0;
  private height = 0;
  private pixelRatio = 1;
  private animationFrame = 0;
  private resizeFrame = 0;
  private lastFrame = 0;
  private initialized = false;
  private inView = true;
  private pageVisible = !document.hidden;
  private swapping = false;
  private reducedMotion = false;
  private compact = false;
  private pointer = { x: Number.NaN, y: Number.NaN, active: false };
  private abortController: AbortController | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private motionQuery: MediaQueryList | null = null;
  private compactQuery: MediaQueryList | null = null;

  connectedCallback() {
    if (this.initialized) return;

    this.canvas = this.querySelector('canvas');
    this.context = this.canvas?.getContext('2d') ?? null;
    if (!this.canvas || !this.context) return;

    this.initialized = true;
    this.abortController = new AbortController();
    const { signal } = this.abortController;

    this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.compactQuery = window.matchMedia('(max-width: 767px)');
    this.reducedMotion = this.motionQuery.matches;
    this.compact = this.compactQuery.matches;

    this.motionQuery.addEventListener('change', this.handleMotionPreference, { signal });
    this.compactQuery.addEventListener('change', this.handleCompactPreference, { signal });
    window.addEventListener('mousemove', this.handlePointerMove, { passive: true, signal });
    window.addEventListener('blur', this.handlePointerLeave, { signal });
    document.addEventListener('pointerleave', this.handlePointerLeave, { signal });
    document.addEventListener('visibilitychange', this.handleVisibilityChange, { signal });
    document.addEventListener('astro:before-swap', this.handleBeforeSwap, { signal });
    document.addEventListener('astro:page-load', this.handlePageLoad, { signal });

    this.resizeObserver = new ResizeObserver(this.queueResize);
    this.resizeObserver.observe(this);

    this.intersectionObserver = new IntersectionObserver(this.handleIntersection, {
      rootMargin: '80px 0px',
      threshold: 0.01,
    });
    this.intersectionObserver.observe(this);

    this.resizeCanvas();
  }

  disconnectedCallback() {
    this.destroy();
  }

  private readonly handleMotionPreference = (event: MediaQueryListEvent) => {
    this.reducedMotion = event.matches;
    this.pointer.active = false;
    delete this.dataset.pointer;
    this.resetPoints();
    this.drawGrid();
    this.syncAnimation();
  };

  private readonly handleCompactPreference = (event: MediaQueryListEvent) => {
    this.compact = event.matches;
    this.pointer.active = false;
    delete this.dataset.pointer;
    this.resizeCanvas(true);
  };

  private readonly handlePointerMove = (event: MouseEvent) => {
    if (this.reducedMotion) return;

    const bounds = this.getBoundingClientRect();
    const inside =
      event.clientX >= bounds.left &&
      event.clientX <= bounds.right &&
      event.clientY >= bounds.top &&
      event.clientY <= bounds.bottom;

    if (!inside) {
      this.handlePointerLeave();
      return;
    }

    this.pointer.x = event.clientX - bounds.left;
    this.pointer.y = event.clientY - bounds.top;
    this.pointer.active = true;
    this.dataset.pointer = 'active';
    this.style.setProperty('--pointer-x', `${this.pointer.x}px`);
    this.style.setProperty('--pointer-y', `${this.pointer.y}px`);
    this.syncAnimation();
  };

  private readonly handlePointerLeave = () => {
    if (!this.pointer.active) return;
    this.pointer.active = false;
    delete this.dataset.pointer;
    this.syncAnimation();
  };

  private readonly handleVisibilityChange = () => {
    this.pageVisible = !document.hidden;
    this.syncAnimation();
  };

  private readonly handleBeforeSwap = () => {
    this.swapping = true;
    this.stopAnimation();
  };

  private readonly handlePageLoad = () => {
    if (!this.isConnected) return;
    this.swapping = false;
    this.resizeCanvas();
    this.drawGrid();
  };

  private readonly handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const entry = entries.at(-1);
    if (!entry) return;
    this.inView = entry.isIntersecting;
    this.syncAnimation();
  };

  private readonly queueResize = () => {
    if (this.resizeFrame) return;
    this.resizeFrame = window.requestAnimationFrame(() => {
      this.resizeFrame = 0;
      this.resizeCanvas();
    });
  };

  private resizeCanvas(force = false) {
    if (!this.canvas || !this.context) return;

    const bounds = this.getBoundingClientRect();
    const nextWidth = Math.round(bounds.width);
    const nextHeight = Math.round(bounds.height);
    if (nextWidth < 2 || nextHeight < 2) return;

    const nextCompact = Boolean(this.compactQuery?.matches || nextWidth < 640);
    const nextRatio = Math.min(window.devicePixelRatio || 1, nextCompact ? 1.25 : 1.8);
    const changed =
      force ||
      nextWidth !== this.width ||
      nextHeight !== this.height ||
      Math.abs(nextRatio - this.pixelRatio) > 0.01 ||
      nextCompact !== this.compact;

    if (!changed) return;

    this.width = nextWidth;
    this.height = nextHeight;
    this.compact = nextCompact;
    this.pixelRatio = nextRatio;
    this.canvas.width = Math.round(this.width * this.pixelRatio);
    this.canvas.height = Math.round(this.height * this.pixelRatio);
    this.context.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
    this.createGrid();
    this.drawGrid();
  }

  private createGrid() {
    const spacing = this.compact ? 60 : 78;
    this.columns = Math.ceil(this.width / spacing) + 1;
    this.rows = Math.ceil(this.height / spacing) + 1;
    const offsetX = (this.width - (this.columns - 1) * spacing) / 2;
    const offsetY = (this.height - (this.rows - 1) * spacing) / 2;

    this.points = [];
    for (let row = 0; row < this.rows; row += 1) {
      for (let column = 0; column < this.columns; column += 1) {
        const x = offsetX + column * spacing;
        const y = offsetY + row * spacing;
        this.points.push({ restX: x, restY: y, x, y, vx: 0, vy: 0 });
      }
    }
  }

  private readonly renderFrame = (timestamp: number) => {
    this.animationFrame = 0;
    if (!this.canRender()) return;

    if (timestamp - this.lastFrame < FRAME_INTERVAL) {
      this.animationFrame = window.requestAnimationFrame(this.renderFrame);
      return;
    }
    this.lastFrame = timestamp - ((timestamp - this.lastFrame) % FRAME_INTERVAL);

    const moving = this.updatePoints();
    this.drawGrid();

    if (this.pointer.active || moving) {
      this.animationFrame = window.requestAnimationFrame(this.renderFrame);
    }
  };

  private updatePoints() {
    const radius = Math.min(210, this.width * 0.28);
    let maximumSpeed = 0;

    for (const point of this.points) {
      if (this.pointer.active) {
        const dx = point.x - this.pointer.x;
        const dy = point.y - this.pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < radius && distance > 0.1) {
          const force = (1 - distance / radius) * 8;
          point.vx += (dx / distance) * force;
          point.vy += (dy / distance) * force;
        }
      }

      point.vx += (point.restX - point.x) * 0.04;
      point.vy += (point.restY - point.y) * 0.04;
      point.vx *= 0.88;
      point.vy *= 0.88;
      point.x += point.vx;
      point.y += point.vy;
      maximumSpeed = Math.max(maximumSpeed, Math.abs(point.vx) + Math.abs(point.vy));
    }

    return maximumSpeed >= SETTLED_SPEED;
  }

  private drawGrid() {
    const context = this.context;
    if (!context || !this.width || !this.height) return;

    context.clearRect(0, 0, this.width, this.height);
    context.save();
    context.lineWidth = 0.65;

    for (let row = 0; row < this.rows; row += 1) {
      for (let column = 0; column < this.columns - 1; column += 1) {
        this.drawConnection(
          context,
          this.points[row * this.columns + column],
          this.points[row * this.columns + column + 1]
        );
      }
    }

    for (let column = 0; column < this.columns; column += 1) {
      for (let row = 0; row < this.rows - 1; row += 1) {
        this.drawConnection(
          context,
          this.points[row * this.columns + column],
          this.points[(row + 1) * this.columns + column]
        );
      }
    }

    for (const point of this.points) {
      const proximity = this.pointer.active
        ? 1 - Math.min(1, Math.hypot(point.x - this.pointer.x, point.y - this.pointer.y) / 210)
        : 0;
      const halfSize = 2 + proximity * 3.5;
      context.fillStyle = `rgba(${proximity > 0.14 ? '242, 218, 165' : '221, 232, 248'}, ${0.34 + proximity * 0.6})`;
      context.shadowColor = `rgba(112, 178, 246, ${proximity * 0.7})`;
      context.shadowBlur = proximity * 16;
      context.fillRect(point.x - halfSize, point.y - halfSize, halfSize * 2, halfSize * 2);
    }

    context.restore();
  }

  private drawConnection(context: CanvasRenderingContext2D, from: GridPoint, to: GridPoint) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.hypot(dx, dy);
    if (distance < 20) return;

    const inset = 9;
    const unitX = dx / distance;
    const unitY = dy / distance;
    const midpointX = (from.x + to.x) / 2;
    const midpointY = (from.y + to.y) / 2;
    const proximity = this.pointer.active
      ? 1 - Math.min(1, Math.hypot(midpointX - this.pointer.x, midpointY - this.pointer.y) / 220)
      : 0;
    context.strokeStyle = `rgba(${proximity > 0.12 ? '164, 204, 247' : '218, 230, 248'}, ${0.12 + proximity * 0.4})`;
    context.lineWidth = 0.65 + proximity * 0.75;
    context.beginPath();
    context.moveTo(from.x + unitX * inset, from.y + unitY * inset);
    context.lineTo(to.x - unitX * inset, to.y - unitY * inset);
    context.stroke();
  }

  private resetPoints() {
    for (const point of this.points) {
      point.x = point.restX;
      point.y = point.restY;
      point.vx = 0;
      point.vy = 0;
    }
  }

  private canRender() {
    return this.initialized && !this.reducedMotion && this.inView && this.pageVisible && !this.swapping;
  }

  private syncAnimation() {
    if (!this.canRender()) {
      this.stopAnimation();
      return;
    }
    if (!this.animationFrame) {
      this.lastFrame = performance.now() - FRAME_INTERVAL;
      this.animationFrame = window.requestAnimationFrame(this.renderFrame);
    }
  }

  private stopAnimation() {
    if (this.animationFrame) window.cancelAnimationFrame(this.animationFrame);
    this.animationFrame = 0;
    this.lastFrame = 0;
  }

  private destroy() {
    this.stopAnimation();
    if (this.resizeFrame) window.cancelAnimationFrame(this.resizeFrame);
    this.resizeFrame = 0;
    this.abortController?.abort();
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    this.abortController = null;
    this.resizeObserver = null;
    this.intersectionObserver = null;
    this.motionQuery = null;
    this.compactQuery = null;
    this.canvas = null;
    this.context = null;
    this.initialized = false;
  }
}

if (!customElements.get('future-particles')) {
  customElements.define('future-particles', FutureParticles);
}
