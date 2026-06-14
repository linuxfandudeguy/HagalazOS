let zIndexCounter = 1;
let minimizedWindows = {};

// =========================
// GRID DESKTOP SYSTEM
// =========================
const GRID_SIZE = 80;
const GRID_COLS = 10;
const occupiedCells = new Set();

function cellKey(x, y) {
    return `${x},${y}`;
}

function findNextFreeCell() {
    for (let y = 0; y < 50; y++) {
        for (let x = 0; x < GRID_COLS; x++) {
            const key = cellKey(x, y);
            if (!occupiedCells.has(key)) {
                occupiedCells.add(key);
                return { x, y };
            }
        }
    }
    return { x: 0, y: 0 };
}

// =========================
// OPEN WINDOW (PATH BASED)
// =========================
async function openWindow(id, htmlPath, title, fallbackUrl = null) {
    let win = document.getElementById(id);

    // restore minimized
    if (win) {
        if (win.style.display === "none") {
            win.style.display = "block";
            delete minimizedWindows[id];
        }
        win.style.zIndex = zIndexCounter++;
        return;
    }

    win = document.createElement("div");
    win.className = "window-wrapper";
    win.id = id;

    win.style.position = "absolute";
    win.style.width = "800px";
    win.style.height = "600px";
    win.style.top = "50px";
    win.style.left = "50px";
    win.style.zIndex = zIndexCounter++;

    win.innerHTML = `
        <div class="window active" style="width:100%;height:100%;">
            <div class="title-bar">
                <div class="title-bar-text">${title}</div>
                <div class="title-bar-controls">
                    <button aria-label="Minimize" onclick="minimizeWindow('${id}')"></button>
                    <button aria-label="Maximize" onclick="maximizeWindow(this)"></button>
                    <button aria-label="Close" onclick="closeWindow(this)"></button>
                </div>
            </div>

            <div class="window-body" style="padding:0;height:calc(100% - 32px);display:flex;">
                <div style="margin:auto;">Loading...</div>
            </div>
        </div>
    `;

    document.getElementById("windows").appendChild(win);
    makeDraggable(win);

    await loadAppIntoWindow(win, htmlPath, fallbackUrl);
}

// =========================
// LOAD APP
// =========================
async function loadAppIntoWindow(win, htmlPath, fallbackUrl) {
    const body = win.querySelector(".window-body");

    try {
        let res = await fetch(htmlPath);
        if (!res.ok) throw new Error("Primary failed");

        let html = await res.text();
        renderBlobIframe(body, html);

    } catch (err) {
        console.warn(err);

        if (fallbackUrl) {
            try {
                let res = await fetch(fallbackUrl);
                if (!res.ok) throw new Error("Fallback failed");

                let html = await res.text();
                renderBlobIframe(body, html);
                return;
            } catch (e) {
                console.error(e);
            }
        }

        body.innerHTML = `<div style="color:red;padding:10px;">Failed to load app</div>`;
    }
}

// =========================
// BLOB IFRAME RENDER
// =========================
function renderBlobIframe(container, htmlText) {
    const blob = new Blob([htmlText], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";

    container.innerHTML = "";
    container.appendChild(iframe);

    iframe.onload = () => {
        setTimeout(() => URL.revokeObjectURL(url), 60000);
    };
}

// =========================
// DRAG WINDOWS
// =========================
function makeDraggable(wrapper) {
    const bar = wrapper.querySelector(".title-bar");

    bar.onmousedown = (e) => {
        const rect = wrapper.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        function move(ev) {
            wrapper.style.left = ev.clientX - offsetX + "px";
            wrapper.style.top = ev.clientY - offsetY + "px";
        }

        document.addEventListener("mousemove", move);

        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", move);
        }, { once: true });
    };
}

// =========================
// WINDOW CONTROLS
// =========================
function minimizeWindow(id) {
    const win = document.getElementById(id);
    if (!win) return;

    win.style.display = "none";
    minimizedWindows[id] = win;
}

function maximizeWindow(btn) {
    const win = btn.closest(".window-wrapper");

    if (win.classList.contains("max")) {
        win.style.width = "800px";
        win.style.height = "600px";
        win.style.top = "50px";
        win.style.left = "50px";
        win.classList.remove("max");
    } else {
        win.style.top = "0";
        win.style.left = "0";
        win.style.width = "100%";
        win.style.height = "calc(100% - 48px)";
        win.classList.add("max");
    }
}

function closeWindow(btn) {
    const win = btn.closest(".window-wrapper");
    win.remove();
    delete minimizedWindows[win.id];
}

// =========================
// BOOT SYSTEM (GRID DESKTOP)
// =========================
window.onload = () => {
    const desktop = document.getElementById("desktop");
    const taskbar = document.getElementById("taskbar");

    if (!window.Apps) return;

    window.Apps.forEach(app => {

        let x, y;

        if (typeof app.gridX === "number" && typeof app.gridY === "number") {
            x = app.gridX;
            y = app.gridY;
            occupiedCells.add(cellKey(x, y));
        } else {
            ({ x, y } = findNextFreeCell());
        }

        const icon = document.createElement("div");
        icon.className = "desktop-icon";
        icon.id = `desktop-icon-${app.id}`;

        icon.style.position = "absolute";
        icon.style.left = (x * GRID_SIZE) + "px";
        icon.style.top = (y * GRID_SIZE) + "px";
        icon.style.width = GRID_SIZE + "px";
        icon.style.height = GRID_SIZE + "px";

        icon.innerHTML = app.icon?.includes("bi-")
            ? `<i class="bi ${app.icon}"></i><span>${app.title}</span>`
            : `<span>${app.title}</span>`;

        icon.onclick = () =>
            openWindow(app.id, app.htmlPath, app.title, app.fallbackUrl);

        desktop.appendChild(icon);

        // taskbar
        if (app.taskbar) {
            const btn = document.createElement("button");

            btn.innerHTML = app.icon?.includes("bi-")
                ? `<i class="bi ${app.icon}"></i>`
                : app.icon;

            btn.title = app.title;

            btn.onclick = () =>
                openWindow(app.id, app.htmlPath, app.title, app.fallbackUrl);

            taskbar.appendChild(btn);
        }
    });
};