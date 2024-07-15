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
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSeksMTZXiVeaHdLR0GZATDS-ZhbBbvg4dYoHJU3n9vga8tK6w/viewform', '_blank');
    });
});