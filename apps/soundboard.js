// apps/soundboard.js
const soundboardApp = {
    id: "soundboard",
    icon: "bi-speaker-fill",
    taskbar: false, // show on taskbar
    title: "Soundboard",
    htmlPath: `/apps/soundboard.html`,
    gridX: 2,
    gridY: 1
};

// Push to Apps array for dynamic loader
window.Apps = window.Apps || [];
window.Apps.push(soundboardApp);
