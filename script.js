import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', function() {
    function addEventListeners(element, eventNames, listener) {
        eventNames.forEach(eventName => {
            element.addEventListener(eventName, listener);
        });
    }
  
  // 미니게임 버튼
    const playGameBtn = document.getElementById('play-game-btn');
    if (playGameBtn) {
        addEventListeners(playGameBtn, ['click', 'touchstart'], function(e) {
            e.preventDefault();
            console.log('Mini-game button clicked');
            safeWindowOpen('https://logowar.netlify.app/');
        });
    }

    function safeWindowOpen(url) {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        addEventListeners(anchor, ['click', 'touchstart'], function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Checklist button
    const checklistBtn = document.getElementById('checklist-btn');
    if (checklistBtn) {
        addEventListeners(checklistBtn, ['click', 'touchstart'], function(e) {
            e.preventDefault();
            console.log('Checklist button clicked');
            safeWindowOpen('https://forms.gle/rjcKEEvt6rpyDcLT7');
        });
    }

    // Newsletter subscription button
    const newsletterBtn = document.getElementById('newsletter-btn');
    if (newsletterBtn) {
        addEventListeners(newsletterBtn, ['click', 'touchstart'], function(e) {
            e.preventDefault();
            console.log('Newsletter button clicked');
            safeWindowOpen('https://maily.so/lsb.0214');
        });
    }

    // 회원가입 폼 제출 처리
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (typeof window.firebaseAuth === 'undefined') {
                console.error("Firebase Auth is not initialized");
                showMessage("시스템 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
                return;
            }

            createUserWithEmailAndPassword(window.firebaseAuth, email, password)
                .then((userCredential) => {
                    console.log("User registered:", userCredential.user);
                    showMessage("회원가입이 완료되었습니다!");
                })
                .catch((error) => {
                    console.error("Error:", error.code, error.message);
                    showMessage("회원가입 중 오류가 발생했습니다: " + error.message);
                });
        });
    }
});

function showMessage(message) {
    // 커스텀 알림 메시지 표시
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.position = 'fixed';
    messageElement.style.top = '20px';
    messageElement.style.left = '50%';
    messageElement.style.transform = 'translateX(-50%)';
    messageElement.style.backgroundColor = 'rgba(0,0,0,0.8)';
    messageElement.style.color = 'white';
    messageElement.style.padding = '10px 20px';
    messageElement.style.borderRadius = '5px';
    messageElement.style.zIndex = '1000';
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
        document.body.removeChild(messageElement);
    }, 3000);
}