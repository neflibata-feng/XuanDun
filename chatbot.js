const chatWindow = document.getElementById('chatWindow');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

let responses = {};  // 存储语料库
// 加载语料库
async function loadResponses() {
    try {
        const response = await fetch('responses.json');
        if (!response.ok) {
            throw new Error('语料库加载失败');
        }
        responses = await response.json();
    } catch (err) {
        console.error('加载语料库失败：', err);
    }
}
// 添加消息到聊天窗口
function addMessage(content, type) {
    const msg = document.createElement('div');
    msg.className = 'chat-message ' + (type === 'user' ? 'user-message' : 'bot-message');
    msg.textContent = content;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
// 根据用户输入的内容返回预定义的自动回复
function getAutoReply(userText) {
    const text = userText.toLowerCase();
    for (const key in responses) {
        const { pattern, response } = responses[key];
        const regex = new RegExp(pattern, 'i'); // 'i' 忽略大小写
        if (regex.test(text)) {
            return response;  
        }
    }
    return responses['default'].response; // 没匹配时返回默认回复
}
// 发送消息和处理自动回复
function handleUserMessage() {
    const text = userInput.value.trim();
    if (!text) return;
    if (typeof window.guardTrackUsage === 'function') {
        const allowed = window.guardTrackUsage();
        if (!allowed) {
            return;
        }
    }
    // 显示用户消息
    addMessage(text, 'user');
    userInput.value = ''; // 清空输入框
    // 显示“正在思考中...”提示
    const thinkingMsg = document.createElement('div');
    thinkingMsg.className = 'chat-message bot-message';
    thinkingMsg.textContent = '玄小盾：正在思考中...';
    chatWindow.appendChild(thinkingMsg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    // 获取自动回复
    const reply = getAutoReply(text);
    // 更新显示的自动回复
    thinkingMsg.textContent = reply;
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
// 监听点击发送按钮
sendBtn.addEventListener('click', handleUserMessage);
// 回车发送消息
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleUserMessage();
    }
});
// 初始化聊天机器人，加载语料库
loadResponses();
