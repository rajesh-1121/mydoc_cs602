class ContainerAnimation {
    constructor(container, background) {
        this.container = container;
        this.background = background;
    }

    createBubbles(numberOfBubbles) {
        for (let i = 0; i < numberOfBubbles; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            bubble.classList.add(['bubble-small', 'bubble-medium', 'bubble-large'][Math.floor(Math.random() * 3)]); // Random size
            bubble.style.left = `${Math.random() * 100}%`;
            bubble.style.bottom = `${Math.random() * 100}%`; // Random vertical position
            this.background.appendChild(bubble);
        }
    }
    applyPopEffect() {
        this.container.style.transform = 'scale(1.05)';
        this.container.style.transition = 'transform 0.3s ease';
    }

    revertPopEffect() {
        this.container.style.transform = 'scale(1)';
    }
}

const container = document.querySelector('.container');
const backgroundAnimation = document.querySelector('.background-animation');

const animation = new ContainerAnimation(container, backgroundAnimation);

container.addEventListener('mouseover', () => animation.applyPopEffect());
container.addEventListener('mouseout', () => animation.revertPopEffect());

animation.createBubbles(50);
