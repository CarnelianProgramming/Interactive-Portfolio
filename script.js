function sortThemes() {
    const sortedThemes = Object.keys(themes).sort();
    const sortedThemesObj = {};
    sortedThemes.forEach(theme => {
        sortedThemesObj[theme] = themes[theme];
    });
    return sortedThemesObj;
}

function saveThemeToBank(themeName) {
    const themeData = {
        name: themeName,
        colors: themes[themeName],
        css: generateCSS(themeName),
        html: generateHTML(themeName)
    };
    localStorage.setItem(themeName, JSON.stringify(themeData));
}

function generateCSS(themeName) {
    const colors = themes[themeName];
    return `
        body { background-color: ${colors[0]}; color: ${colors[9]}; transition: background-color 1s, color 1s; }
        header { background-color: ${colors[5]}; transition: background-color 1s; }
        h1 { color: ${colors[9]}; transition: color 1s; }
        main { background-color: ${colors[1]}; transition: background-color 1s; }
        section { background-color: ${colors[2]}; transition: background-color 1s; }
        h2 { color: ${colors[3]}; transition: color 1s; }
        p { color: ${colors[4]}; transition: color 1s; }
        #canvas-container { background-color: ${colors[2]}; border-color: ${colors[8]}; transition: background-color 1s, border-color 1s; }
        #randomize-button { background-color: ${colors[5]}; transition: background-color 1s; }
        footer { background-color: ${colors[5]}; transition: background-color 1s; }
    `;
}

function generateHTML(themeName) {
    return `
        <div class="theme-preview" style="background-color: ${themes[themeName][0]}; color: ${themes[themeName][9]};">
            <h2>${themeName}</h2>
            <p>Preview of the theme colors and styles.</p>
        </div>
    `;
}

function applyNextThemeInQueue() {
    const themeNames = Object.keys(themes);
    if (themeNames.length === 0) return;
    const nextTheme = themeNames[0];
    applyTheme(nextTheme);
    generateFractalAnimation();
    delete themes[nextTheme];
    maintainThemeBank();
}

elements.button.addEventListener('click', () => {
    applyNextThemeInQueue();
});

document.addEventListener('DOMContentLoaded', () => {
    maintainThemeBank();
    const initialTheme = Object.keys(themes)[0];
    applyTheme(initialTheme);
    generateFractalAnimation();
    window.addEventListener('resize', () => {
        generateFractalAnimation();
    });
});
