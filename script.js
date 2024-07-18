import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyDUXq-xxfcFczuGetdwZhY25qQgQHLJkGA",
    authDomain: "fir-story-c0236.firebaseapp.com",
    databaseURL: "https://fir-story-c0236-default-rtdb.firebaseio.com",
    projectId: "fir-story-c0236",
    storageBucket: "fir-story-c0236.appspot.com",
    messagingSenderId: "833687841349",
    appId: "1:833687841349:web:f3b64406da1a1623c9112c",
    measurementId: "G-Q1LSHVHSWL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

document.addEventListener('DOMContentLoaded', function() {
    function addEventListeners(element, eventNames, listener) {
        eventNames.forEach(eventName => {
            element.addEventListener(eventName, listener);
        });
    }

    function safeWindowOpen(url) {
        window.open(url, '_blank', 'noopener,noreferrer');
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

    // 비밀번호 유효성 검사 함수
    function isPasswordValid(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasNonalphas = /\W/.test(password);
        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas;
    }

    // 회원가입 폼 제출 처리
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const submitButton = signupForm.querySelector('button[type="submit"]');

        // 입력 필드 변경 시 버튼 활성화 상태 업데이트
        function updateButtonState() {
            submitButton.disabled = !(emailInput.value.trim() && passwordInput.value.trim());
        }

        emailInput.addEventListener('input', updateButtonState);
        passwordInput.addEventListener('input', updateButtonState);

        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = emailInput.value;
            const password = passwordInput.value;
            
            if (!isPasswordValid(password)) {
                showMessage("비밀번호는 8자 이상이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.", "error");
                return;
            }

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log("User registered:", userCredential.user);
                showMessage("회원가입이 완료되었습니다!", "success");
                signupForm.reset();
                updateButtonState();
            } catch (error) {
                console.error("Error:", error.code, error.message);
                let errorMessage = "회원가입 중 오류가 발생했습니다: ";
                switch(error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage += "이미 사용 중인 이메일 주소입니다.";
                        break;
                    case 'auth/invalid-email':
                        errorMessage += "유효하지 않은 이메일 주소입니다.";
                        break;
                    case 'auth/weak-password':
                        errorMessage += "비밀번호가 너무 약합니다.";
                        break;
                    default:
                        errorMessage += error.message;
                }
                showMessage(errorMessage, "error");
            }
        });

        // 초기 버튼 상태 설정
        updateButtonState();
    }
});

function showMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.position = 'fixed';
    messageElement.style.top = '20px';
    messageElement.style.left = '50%';
    messageElement.style.transform = 'translateX(-50%)';
    messageElement.style.backgroundColor = type === 'error' ? 'rgba(255,0,0,0.8)' : 'rgba(0,128,0,0.8)';
    messageElement.style.color = 'white';
    messageElement.style.padding = '10px 20px';
    messageElement.style.borderRadius = '5px';
    messageElement.style.zIndex = '1000';
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
        document.body.removeChild(messageElement);
    }, 3000);
}