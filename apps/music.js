const musicApp = {
    id: "music",
    icon: "bi-music-note",
    taskbar: true, // show on taskbar
    title: "Music",
    htmlPath: `/apps/espotify.html`
};

// Export for dynamic loader
window.Apps = window.Apps || [];
window.Apps.push(musicApp);
