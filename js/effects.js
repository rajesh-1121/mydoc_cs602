
document.addEventListener('DOMContentLoaded', () => {
    
    const menuButtons = document.querySelectorAll('.menu-button');
    menuButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.backgroundColor = '#f0f0f0'; 
            button.style.transform = 'scale(1.05)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.backgroundColor = ''; 
            button.style.transform = 'scale(1)';
        });
    });

    
    const leftSection = document.querySelector('.left-section');
    const rightSection = document.querySelector('.right-section');

    const applyFloatingEffect = (section) => {
        section.style.transition = 'box-shadow 0.3s, transform 0.3s';
        section.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        section.style.transform = 'translateY(-5px)';
    };

    const removeFloatingEffect = (section) => {
        section.style.boxShadow = '';
        section.style.transform = '';
    };

    [leftSection, rightSection].forEach(section => {
        section.addEventListener('mouseenter', () => applyFloatingEffect(section));
        section.addEventListener('mouseleave', () => removeFloatingEffect(section));
    });

    
});
