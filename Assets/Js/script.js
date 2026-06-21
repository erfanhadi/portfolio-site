/* ── Loader exit + hero reveal ─────────────────────────── */
window.addEventListener('load', function () {
    var loader = document.querySelector('.loader_container');
    if (!loader) return;

    loader.classList.add('hiding');

    // 1150ms = animation duration (1.1s) + small buffer
    setTimeout(function () {
        loader.style.display = 'none';

        // Hero items slide in after loader leaves (index.html only)
        var heroLeft  = document.querySelector('.reveal-left');
        var heroRight = document.querySelector('.reveal-right');
        if (heroLeft)  { setTimeout(function(){ heroLeft.classList.add('in');  }, 0);   }
        if (heroRight) { setTimeout(function(){ heroRight.classList.add('in'); }, 120); }
    }, 1150);
});

/* ── Scroll-based reveal (IntersectionObserver) ────────── */
document.addEventListener('DOMContentLoaded', function () {
    var revealEls = document.querySelectorAll('.reveal-up');
    if (!revealEls.length) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) { observer.observe(el); });
});

document.addEventListener('DOMContentLoaded', function() {
    initOrbitAnimations();
    initTypingEffect();
});
function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    const phrases = [
        'Web Developer',
        'Front-End', 
        'Problem Solver',
        'Code Explorer',
        'AI Explorer',
        'Innovator'
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            // Deleting characters
            typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing characters
            typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100; // Normal typing speed
        }
        
        // When word is complete
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause before deleting
        } 
        // When word is completely deleted
        else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
}

function initOrbitAnimations() {
    const planets = document.querySelectorAll('.random-orbit');
    const container = document.querySelector('.avatar-container');
    const sunCore = document.querySelector('.sun-core');
    const containerSize = container ? container.offsetWidth : 500;
    const sunRadius = sunCore ? sunCore.offsetWidth / 2 : 84;
    const minOrbitRadius = sunRadius + 35;
    const maxOrbitRadius = containerSize * 0.46;
    const orbitStep = (maxOrbitRadius - minOrbitRadius) / Math.max(planets.length - 1, 1);

    planets.forEach((planet, index) => {
        const startAngle = (index * (360 / planets.length));
        const radius = minOrbitRadius + (index * orbitStep);

        const duration = 15 + Math.random() * 15;
        const direction = Math.random() > 0.5 ? 'normal' : 'reverse';
        const delay = 0;

        planet.style.transform = `rotate(${startAngle}deg) translateX(${radius}px) rotate(-${startAngle}deg)`;

        const animationName = `orbit${index}`;
        const keyframes = `
            @keyframes ${animationName} {
                from {
                    transform: rotate(${startAngle}deg) translateX(${radius}px) rotate(-${startAngle}deg);
                }
                to {
                    transform: rotate(${startAngle + 360}deg) translateX(${radius}px) rotate(-${startAngle + 360}deg);
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);

        planet.style.animation = `${animationName} ${duration}s linear infinite ${direction}`;
        planet.style.animationDelay = `${delay}s`;

        planet.addEventListener('mouseenter', () => {
            planet.style.animationPlayState = 'paused';
        });

        planet.addEventListener('mouseleave', () => {
            planet.style.animationPlayState = 'running';
        });
    });
}