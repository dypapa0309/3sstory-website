import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', function() {
    function addEventListeners(element, eventNames, listener) {
        eventNames.forEach(eventName => {
            element.addEventListener(eventName, listener, { passive: false });
        });
    }

    function safeWindowOpen(url) {
        setTimeout(() => {
            window.open(url, '_blank');
        }, 100);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        addEventListeners(anchor, ['click', 'touchend'], function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Checklist button
    const checklistBtn = document.getElementById('checklist-btn');
    if (checklistBtn) {
        addEventListeners(checklistBtn, ['click', 'touchend'], function(e) {
            e.preventDefault();
            console.log('Checklist button clicked');
            safeWindowOpen('https://forms.gle/rjcKEEvt6rpyDcLT7');
        });
    }

    // Newsletter subscription button
    const newsletterBtn = document.getElementById('newsletter-btn');
    if (newsletterBtn) {
        addEventListeners(newsletterBtn, ['click', 'touchend'], function(e) {
            e.preventDefault();
            console.log('Newsletter button clicked');
            safeWindowOpen('https://maily.so/lsb.0214');
        });
    }

    // E-book download button
    const ebookBtn = document.getElementById('ebook-btn');
    if (ebookBtn) {
        ebookBtn.textContent = '3S system 전자책 무료 신청';
        addEventListeners(ebookBtn, ['click', 'touchend'], function(e) {
            e.preventDefault();
            console.log('E-book button clicked');
            safeWindowOpen('https://docs.google.com/forms/d/e/1FAIpQLSeksMTZXiVeaHdLR0GZATDS-ZhbBbvg4dYoHJU3n9vga8tK6w/viewform');
        });
    }

    // 회원가입 폼 제출 처리
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            createUserWithEmailAndPassword(window.firebaseAuth, email, password)
                .then((userCredential) => {
                    // 회원가입 성공
                    const user = userCredential.user;
                    console.log("User registered:", user);
                    alert("회원가입이 완료되었습니다!");
                    // 여기에 회원가입 성공 후 추가 동작을 넣을 수 있습니다.
                    // 예: 홈페이지로 리다이렉트 또는 로그인 상태 업데이트
                })
                .catch((error) => {
                    // 에러 처리
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Error:", errorCode, errorMessage);
                    alert("회원가입 중 오류가 발생했습니다: " + errorMessage);
                });
        });
    }

    // 회원가입 링크 클릭 시 회원가입 섹션으로 스크롤
    const signupLink = document.querySelector('a[href="#signup"]');
    if (signupLink) {
        addEventListeners(signupLink, ['click', 'touchend'], function(e) {
            e.preventDefault();
            const signupSection = document.getElementById('signup');
            if (signupSection) {
                signupSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});