// apps/calculator.js
const cameraApp = {
    id: "camera",
    icon: "bi-camera-fill",
    taskbar: true, // show on taskbar

    title: "Camera",
    htmlPath: `/apps/camera.html`
};

// Push to Apps array for dynamic loader
window.Apps = window.Apps || [];
window.Apps.push(cameraApp);
