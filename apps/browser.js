// apps/browser.js
const browserApp = {
    id: "browser",
    icon: "bi-browser-chrome",
    taskbar: true, // show on taskbar
    title: "Browser",
    htmlPath: `/apps/clsandstone.html`,
    gridX: 1,
    gridY: 1
};

// Push to Apps array for dynamic loader
window.Apps = window.Apps || [];
window.Apps.push(browserApp);
