const chatWindow = document.getElementById('chatWindow');
        const userInput = document.getElementById('userInput');
        const sendBtn = document.getElementById('sendBtn');

        // 添加消息到聊天窗口
        function addMessage(content, type) {
            const msg = document.createElement('div');
            msg.className = 'chat-message ' + (type === 'user' ? 'user-message' : 'bot-message');
            msg.textContent = content;
            chatWindow.appendChild(msg);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }

        // 点击按钮发送消息
        sendBtn.addEventListener('click', async () => {
            const text = userInput.value.trim();
            if (!text) return;

            addMessage('我：' + text, 'user');
            userInput.value = '';

            // 显示“正在思考中...”提示
            const thinkingMsg = document.createElement('div');
            thinkingMsg.className = 'chat-message bot-message';
            thinkingMsg.textContent = '玄小盾：正在思考中...';
            chatWindow.appendChild(thinkingMsg);
            chatWindow.scrollTop = chatWindow.scrollHeight;

            try {
                const response = await fetch('https://router.huggingface.co/hf-inference/models/gpt2', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ inputs: text })
                });

                if (!response.ok) {
                    throw new Error('网络或模型错误');
                }

                const result = await response.json();
                const reply = result?.[0]?.generated_text || '（模型未返回结果）';
                thinkingMsg.textContent = '玄小盾：' + reply;
            } catch (err) {
                thinkingMsg.textContent = '玄小盾：模型暂时不可用，请稍后再试。';
                console.error(err);
            }

            chatWindow.scrollTop = chatWindow.scrollHeight;
        });

        // 回车发送消息
        userInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                sendBtn.click();
            }
        });