document.addEventListener('DOMContentLoaded', () => {
    const popupOverlay = document.getElementById('hoyo-popup-overlay');
    const popupOkBtn = document.getElementById('popup-ok-btn');
    const popupMessageElement = document.getElementById('popup-message');

    const copyCardBtn = document.getElementById('copy-card-btn');
    const cardNumberElement = document.getElementById('card-number');
    const cardNumber = cardNumberElement ? cardNumberElement.getAttribute('data-card') : null;
    
    const allLinkButtons = document.querySelectorAll('#link-section .hoyo-button');

    const particlesContainer = document.getElementById('aether-particles');
    const particleCount = 40;
    const colors = ['var(--celestial-gold)', 'var(--aether-dust)'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 5px ${particle.style.background}`;
        particle.style.borderRadius = '50%';
        
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.position = 'fixed';
        
        particle.style.animation = `float ${Math.random() * 20 + 15}s infinite alternate linear, pulse ${Math.random() * 3 + 2}s infinite alternate`;
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        particlesContainer.appendChild(particle);
    }

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes float {
            0% { transform: translate(0, 0); }
            50% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px); }
            100% { transform: translate(0, 0); }
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            100% { transform: scale(1.2); }
        }
    `;
    document.head.appendChild(style);

    const logo = document.getElementById('valhalla-logo');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        logo.style.transform = `translateY(${scrollPosition * 0.15}px)`;
        const mist = document.getElementById('aether-mist');
        mist.style.transform = `translateY(${-scrollPosition * 0.05}px)`;
    });

    function showHoyoPopup(message, callback) {
        popupMessageElement.innerHTML = message;
        popupOkBtn.onclick = null; 
        popupOkBtn.onclick = () => {
            popupOverlay.classList.remove('show');
            if (callback) {
                callback();
            }
        };
        popupOverlay.classList.add('show');
    }

    allLinkButtons.forEach(button => {
        if (button.id !== 'copy-card-btn') {
            button.addEventListener('click', (e) => {
                e.preventDefault();
    
                const targetUrl = button.href;
                const buttonText = button.querySelector('.button-text').textContent;
                
                const message = `Нажмите ОК чтобы автоматически перенаправиться на <strong>${buttonText}</strong>.`;
                
                showHoyoPopup(message, () => {
                    window.location.href = targetUrl;
                });
            });
        }
    });

    if (copyCardBtn && cardNumber) {
        copyCardBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            navigator.clipboard.writeText(cardNumber.replace(/\s/g, ''))
                .then(() => {
                    const message = 'Номер карты успешно скопирован. Вы можете вставить его для поддержки сообщества.';
                    showHoyoPopup(message, null); 
                })
                .catch(err => {
                    console.error('Не удалось скопировать номер карты:', err);
                    alert(`Ошибка копирования. Номер карты: ${cardNumber}.`);
                });
        });
    }

    const buttons = document.querySelectorAll('.hoyo-button');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.classList.add('active-glow');
        });
        button.addEventListener('touchend', function() {
            setTimeout(() => this.classList.remove('active-glow'), 300);
        });
    });
});
