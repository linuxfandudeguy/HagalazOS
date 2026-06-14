const gamesApp = {
    id: "games",
    icon: "bi-controller",
    taskbar: false, // show on taskbar

    title: "Games",
    htmlPath: `./apps/games.html`,
    gridX: 0,
    gridY: 2
};

// Push to Apps array for dynamic loader
window.Apps = window.Apps || [];
window.Apps.push(gamesApp);
