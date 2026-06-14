// apps/map.js
const mapApp = {
    id: "map",
    icon: "bi-map-fill",
    taskbar: true, // show on taskbar

    title: "Map",
    htmlPath: `/apps/map.html`,
    gridX: 0,
    gridY: 1
};

// Push to Apps array for dynamic loader
window.Apps = window.Apps || [];
window.Apps.push(mapApp);
