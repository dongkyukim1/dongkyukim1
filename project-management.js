
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}`;
}

function closeAllWindows() {
    const windows = document.querySelectorAll('.window');
    windows.forEach(window => {
        window.style.display = 'none';
    });
}

function openWindow(id) {
    closeAllWindows();
    const windowElement = document.getElementById(id);
    if (windowElement) {
        windowElement.style.display = 'block';
    } else {
        console.error(`Element with id "${id}" not found`);
    }
}

function closeWindow(id) {
    const windowElement = document.getElementById(id);
    if (windowElement) {
        windowElement.style.display = 'none';
    } else {
        console.error(`Element with id "${id}" not found`);
    }
}

function handleIconClick(icon, windowId) {
    document.querySelectorAll('#Desktop .icon').forEach(el => el.classList.remove('clicked'));
    icon.classList.add('clicked');
    setTimeout(() => {
        openWindow(windowId);
        icon.classList.remove('clicked');
    }, 300);
}

function createNewProject() {
    const projectName = document.getElementById('projectName').value;
    const projectDescription = document.getElementById('projectDescription').value;
    
    if (projectName) {
        const desktop = document.getElementById('Desktop');
        const newProjectIcon = document.createElement('div');
        newProjectIcon.className = 'icon';
        newProjectIcon.innerHTML = `
            <img src="https://cdn-icons-png.flaticon.com/512/716/716784.png" alt="${projectName}">
            <span class="title">${projectName}</span>
        `;
        newProjectIcon.onclick = function() {
            alert(`프로젝트 이름: ${projectName}\n설명: ${projectDescription}`);
        };
        desktop.appendChild(newProjectIcon);

        const projectList = document.getElementById('projectList');
        const listItem = document.createElement('li');
        listItem.textContent = projectName;
        projectList.appendChild(listItem);

        closeWindow('createProject');
        document.getElementById('projectName').value = '';
        document.getElementById('projectDescription').value = '';
    } else {
        alert('프로젝트 이름을 입력해주세요.');
    }
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    if (message) {
        addMessage(message, 'sent');
        messageInput.value = '';
        
        // 자동 응답 시뮬레이션 (실제 서버 통신 대신)
        setTimeout(() => {
            const responses = [
                "좋은 생각이네요!",
                "프로젝트에 대해 더 자세히 설명해주실 수 있나요?",
                "팀원들과 언제 회의를 하면 좋을까요?",
                "필요한 자원이 있다면 알려주세요.",
                "일정 계획은 어떻게 되나요?"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'received');
        }, 1000);
    }
}

function addMessage(text, type) {
    const messageContainer = document.getElementById('messageContainer');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    messageElement.textContent = text;
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// 초기 설정
document.addEventListener('DOMContentLoaded', (event) => {
    setInterval(updateClock, 1000);
    updateClock();

    // 데스크톱 아이콘에 클릭 이벤트 리스너 추가
    document.querySelectorAll('#Desktop .icon').forEach(icon => {
        const windowId = icon.getAttribute('data-title').replace(' ', '');
        icon.onclick = () => handleIconClick(icon, windowId);
    });

    // 메시지 입력 필드에 엔터 키 이벤트 리스너 추가
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    } else {
        console.error('Message input element not found');
    }
});