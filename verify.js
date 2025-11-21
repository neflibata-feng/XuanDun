// 配置常量
const GUARD_PREFIX = 'xd_guard_';
const KEY_USAGE = GUARD_PREFIX + 'usage_count';
const KEY_LAST_USAGE = GUARD_PREFIX + 'last_usage_at';

// 挑战状态
let currentExpression = '';
let currentResult = 0;

// 工具函数
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成算术表达式（仅 + 或 -，降低 OCR 准确性 via 噪声）
function generateExpression() {
    const a = rand(10, 99);
    const b = rand(1, 19);
    const op = rand(0, 1) === 0 ? '+' : '-';
    currentExpression = `${a} ${op} ${b}`;
    currentResult = op === '+' ? a + b : a - b;
}

// 绘制挑战到 canvas，加入噪声与随机旋转
function drawChallenge() {
    const canvas = document.getElementById('captcha');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 背景渐变
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#f1f5f9');
    grad.addColorStop(1, '#e0f2fe');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 噪声线
    for (let i = 0; i < 8; i++) {
        ctx.strokeStyle = `rgba(37,99,235,${Math.random() * 0.4})`;
        ctx.beginPath();
        ctx.moveTo(rand(0, canvas.width), rand(0, canvas.height));
        ctx.lineTo(rand(0, canvas.width), rand(0, canvas.height));
        ctx.stroke();
    }

    // 噪声点
    for (let i = 0; i < 80; i++) {
        ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.25})`;
        ctx.fillRect(rand(0, canvas.width), rand(0, canvas.height), 1, 1);
    }

    // 表达式文字分字绘制
    const chars = currentExpression.split(' ');
    let x = 30;
    const y = 50;
    chars.forEach((ch) => {
        ctx.save();
        const angle = Math.random() * 0.5 - 0.25;
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.font = `bold ${rand(26, 34)}px Segoe UI`;
        ctx.fillStyle = '#0f172a';
        ctx.shadowColor = 'rgba(0,0,0,0.15)';
        ctx.shadowBlur = 2;
        ctx.fillText(ch, 0, 0);
        ctx.restore();
        x += ctx.measureText(ch).width + rand(18, 30);
    });
}

function refreshChallenge() {
    generateExpression();
    drawChallenge();
    document.getElementById('answer').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('successMsg').classList.add('hidden');
}

function markVerified() {
    localStorage.setItem(KEY_USAGE, '0');
    localStorage.removeItem(KEY_LAST_USAGE);
}

// 事件绑定
document.getElementById('submitBtn').addEventListener('click', () => {
    const val = document.getElementById('answer').value.trim();
    if (val === '') {
        document.getElementById('feedback').textContent = '请输入结果';
        return;
    }

    if (parseInt(val, 10) === currentResult) {
        markVerified();
        document.getElementById('feedback').textContent = '';
        const success = document.getElementById('successMsg');
        success.classList.remove('hidden');

        // 跳转回来源
        const params = new URLSearchParams(location.search);
        const redirect = params.get('redirect') || 'index.html';
        setTimeout(() => {
            location.replace(redirect);
        }, 800);
    } else {
        document.getElementById('feedback').textContent = '结果不正确，请重试或刷新';
    }
});

document.getElementById('refreshBtn').addEventListener('click', refreshChallenge);
document.getElementById('backBtn').addEventListener('click', () => {
    location.replace('index.html');
});

// 初始加载
refreshChallenge();