// apps/calculator.js
const calculatorApp = {
    id: "calculator",
    icon: "bi-calculator-fill",
    taskbar: true, // show on taskbar

    title: "Calculator",
    htmlPath: `/apps/calculator.html`
};

// Push to Apps array for dynamic loader
window.Apps = window.Apps || [];
window.Apps.push(calculatorApp);
