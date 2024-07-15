document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to a server
        // For this example, we'll just log it to the console
        const formData = new FormData(form);
        console.log('Form submitted with data:');
        for (let [key, value] of formData.entries()) {
            console.log(key + ': ' + value);
        }

        // Clear the form
        form.reset();
        alert('감사합니다. 곧 연락 드리겠습니다.');
    });

    // Checklist button
    document.getElementById('checklist-btn').addEventListener('click', function() {
        window.open('https://forms.gle/rjcKEEvt6rpyDcLT7', '_blank');
    });

    // Newsletter subscription button
    document.getElementById('newsletter-btn').addEventListener('click', function() {
        window.open('https://maily.so/lsb.0214', '_blank');
    });

    // E-book download button
    const ebookBtn = document.getElementById('ebook-btn');
    ebookBtn.textContent = '3S system 전자책 무료 신청';
    ebookBtn.addEventListener('click', function() {
        const email = prompt('전자책을 받으실 이메일 주소를 입력해주세요:');
        if (email) {
            // Here you would typically send this email to your server
            console.log('E-book requested for:', email);
            alert('전자책 신청이 완료되었습니다. 입력하신 이메일로 전자책을 보내드리겠습니다.');
        }
    });
});