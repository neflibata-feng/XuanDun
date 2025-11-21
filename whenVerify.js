// 人机验证与对话次数拦截脚本
        const GUARD_PREFIX = 'xd_guard_';
        const KEY_USAGE = GUARD_PREFIX + 'usage_count';
        const KEY_LAST_USAGE = GUARD_PREFIX + 'last_usage_at';
        const THRESHOLD = 10; // 对话次数阈值
        const BREAK_RESET_MS = 3 * 60 * 1000; // 超过该间隔视为中断，计数归零

        function guardRedirect() {
            const currentPath = window.location.pathname + window.location.search;
            const target = 'verify.html?redirect=' + encodeURIComponent(currentPath);
            window.location.replace(target);
        }

        function getUsage() {
            const raw = localStorage.getItem(KEY_USAGE);
            const value = parseInt(raw || '0', 10);
            if (Number.isNaN(value) || value < 0) {
                return 0;
            }
            return value;
        }

        function setUsage(value) {
            localStorage.setItem(KEY_USAGE, String(Math.max(0, value)));
        }

        function getLastUsage() {
            const raw = localStorage.getItem(KEY_LAST_USAGE);
            const value = parseInt(raw || '0', 10);
            if (Number.isNaN(value) || value <= 0) {
                return 0;
            }
            return value;
        }

        function setLastUsage(value) {
            if (typeof value === 'number' && value > 0) {
                localStorage.setItem(KEY_LAST_USAGE, String(value));
            } else {
                localStorage.removeItem(KEY_LAST_USAGE);
            }
        }

        (function initializeGuard() {
            if (localStorage.getItem(KEY_USAGE) === null) {
                setUsage(0);
            } else {
                setUsage(getUsage());
            }
            const lastRaw = localStorage.getItem(KEY_LAST_USAGE);
            if (lastRaw !== null) {
                const parsed = parseInt(lastRaw, 10);
                if (Number.isNaN(parsed) || parsed <= 0) {
                    localStorage.removeItem(KEY_LAST_USAGE);
                }
            }
        })();

        window.guardTrackUsage = function () {
            const now = Date.now();
            let usage = getUsage();
            const lastUsage = getLastUsage();

            if (lastUsage && now - lastUsage > BREAK_RESET_MS) {
                usage = 0;
            }

            if (usage >= THRESHOLD) {
                alert('已达到 ' + THRESHOLD + ' 次对话限制，请先完成人机验证');
                guardRedirect();
                return false;
            }

            const nextUsage = usage + 1;
            setUsage(nextUsage);
            setLastUsage(now);

            if (nextUsage >= THRESHOLD) {
                alert('已达到 ' + THRESHOLD + ' 次对话限制，请先完成人机验证');
                guardRedirect();
            }

            return true;
        };

        // 兼容旧逻辑的调用封装
        window.invokeModel = function (message) {
            if (!window.guardTrackUsage()) {
                return;
            }
            console.log('模型调用: ', message);
        };