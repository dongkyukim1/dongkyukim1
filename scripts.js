var modals = {
    branchModal: document.getElementById("branchModal"),
    commitModal: document.getElementById("commitModal"),
    prModal: document.getElementById("prModal"),
    mergeModal: document.getElementById("mergeModal"),
    messageModal: document.getElementById("messageModal"),
    helpModal: document.getElementById("helpModal") 
};

var buttons = {
    branchButton: document.getElementById("branchButton"),
    commitButton: document.getElementById("commitButton"),
    prButton: document.getElementById("prButton"),
    mergeButton: document.getElementById("mergeButton"),
    messageButton: document.querySelector('.sidebar-icon[title="Messages"]'),
    helpButton: document.querySelector('.menu a:last-child')  
};

var spans = document.getElementsByClassName("close");

for (let key in buttons) {
    buttons[key].onclick = function() {
        modals[key.replace("Button", "Modal")].style.display = "block";
    }
}

for (let i = 0; i < spans.length; i++) {
    spans[i].onclick = function() {
        this.parentElement.parentElement.style.display = "none";
    }
}

window.onclick = function(event) {
    for (let key in modals) {
        if (event.target == modals[key]) {
            modals[key].style.display = "none";
        }
    }
}

var aiReviewBtn = document.getElementById("aiReviewButton");
var codeDiffBtn = document.getElementById("codeDiffButton");
var resultContainer = document.getElementById("resultContainer");

aiReviewBtn.onclick = function() {
    resultContainer.innerHTML = "<h3>AI 코드 리뷰 결과</h3><p>코드가 간단하고 명확합니다. 다만, 더 복잡한 로직을 위해 함수를 분리하는 것을 고려해보세요.</p>";
}

codeDiffBtn.onclick = function() {
    resultContainer.innerHTML = "<h3>코드 차이</h3><pre>- print(\"Hello, World!\")\n+ print(\"Hello, VS Code!\")</pre>";
}

var messageTabs = document.querySelectorAll('.message-tab');
var messageContents = document.querySelectorAll('.message-content');
var messageForm = document.querySelector('.message-form');
var notification = document.getElementById('messageNotification');

messageTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        messageTabs.forEach(t => t.classList.remove('active'));
        messageContents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('쪽지를 보냈습니다.');
    messageForm.reset();
});

// 새 쪽지 알림 시뮬레이션 (5초마다 50% 확률로 알림)
setInterval(() => {
    if (Math.random() < 0.5) {
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
}, 5000);

// 메시지 아이콘 클릭 시 알림 숨기기
buttons.messageButton.addEventListener('click', () => {
    notification.style.display = 'none';
});

// helpButton 클릭 시 도움말 모달 열기
buttons.helpButton.addEventListener('click', () => {
    modals.helpModal.style.display = 'block';
});
