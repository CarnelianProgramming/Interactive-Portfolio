document.addEventListener('DOMContentLoaded', () => {
    const adjectives = ['Gentle', 'Autumn', 'Spring', 'Summer', 'Mystic', 'Radiant', 'Silent', 'Vibrant', 'Whispering', 'Golden'];
    const nouns = ['Winter', 'Blaze', 'Meadow', 'Sunset', 'Forest', 'Ocean', 'Sky', 'Dawn', 'Twilight', 'Eclipse'];

    const themes = {};
    const usedThemes = new Set();

    function generateRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }

    function generateTheme() {
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        const themeName = `${adjective} ${noun}`;
        if (usedThemes.has(themeName)) return generateTheme();
        usedThemes.add(themeName);
        const colors = Array.from({ length: 10 }, generateRandomColor);
        themes[themeName] = colors;
        return themeName;
    }

    function maintainThemeBank() {
        while (Object.keys(themes).length < 15) {
            generateTheme();
        }
    }

    const elements = {
        body: document.body,
        header: document.querySelector('header'),
        h1: document.querySelector('h1'),
        main: document.querySelector('main'),
        sections: document.querySelectorAll('section'),
        h2: document.querySelectorAll('h2'),
        p: document.querySelectorAll('p'),
        canvasContainer: document.getElementById('canvas-container'),
        button: document.getElementById('randomize-button'),
        footer: document.querySelector('footer')
    };

    function applyTheme(theme) {
        const colors = themes[theme];
        elements.body.style.transition = 'background-color 1s, color 1s';
        elements.header.style.transition = 'background-color 1s';
        elements.h1.style.transition = 'color 1s';
        elements.main.style.transition = 'background-color 1s';
        elements.sections.forEach(section => section.style.transition = 'background-color 1s');
        elements.h2.forEach(h2 => h2.style.transition = 'color 1s');
        elements.p.forEach(p => p.style.transition = 'color 1s');
        elements.canvasContainer.style.transition = 'background-color 1s, border-color 1s';
        elements.button.style.transition = 'background-color 1s';
        elements.footer.style.transition = 'background-color 1s';

        elements.body.style.backgroundColor = colors[0];
        elements.body.style.color = colors[9];
        elements.header.style.backgroundColor = colors[5];
        elements.h1.style.color = colors[9];
        elements.main.style.backgroundColor = colors[1];
        elements.sections.forEach((section, index) => {
            section.style.backgroundColor = colors[(index + 2) % colors.length];
        });
        elements.h2.forEach((h2, index) => {
            h2.style.color = colors[(index + 3) % colors.length];
        });
        elements.p.forEach((p, index) => {
            p.style.color = colors[(index + 4) % colors.length];
        });
        elements.canvasContainer.style.backgroundColor = colors[2];
        elements.canvasContainer.style.borderColor = colors[8];
        elements.button.style.backgroundColor = colors[5];
        elements.footer.style.backgroundColor = colors[5];
    }

    function generateFractalAnimation() {
        const canvas = document.createElement('canvas');
        canvas.width = elements.canvasContainer.clientWidth;
        canvas.height = elements.canvasContainer.clientHeight;
        elements.canvasContainer.innerHTML = ''; // Clear previous canvas
        elements.canvasContainer.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        function drawFractal(x, y, size, depth) {
            if (depth === 0) return;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.stroke();
            const newSize = size * 0.5;
            drawFractal(x + newSize, y, newSize, depth - 1);
            drawFractal(x - newSize, y, newSize, depth - 1);
            drawFractal(x, y + newSize, newSize, depth - 1);
            drawFractal(x, y - newSize, newSize, depth - 1);
            drawFractal(x + newSize, y + newSize, newSize, depth - 1);
            drawFractal(x - newSize, y - newSize, newSize, depth - 1);
            drawFractal(x + newSize, y - newSize, newSize, depth - 1);
            drawFractal(x - newSize, y + newSize, newSize, depth - 1);
        }

        ctx.strokeStyle = '#000';
        drawFractal(canvas.width / 2, canvas.height / 2, 100, 5);
    }

    elements.button.addEventListener('click', () => {
        const themeNames = Object.keys(themes);
        const randomTheme = themeNames[Math.floor(Math.random() * themeNames.length)];
        applyTheme(randomTheme);
        generateFractalAnimation();
        delete themes[randomTheme];
        maintainThemeBank();
    });

    // Initial theme application
    maintainThemeBank();
    const initialTheme = Object.keys(themes)[0];
    applyTheme(initialTheme);
    generateFractalAnimation();

    // Ensure responsiveness
    window.addEventListener('resize', () => {
        generateFractalAnimation();
    });
});