(function () {
    const desktop = document.getElementById("desktop");
    if (!desktop) {
        console.error("No #desktop element found. Drag-drop JS module cannot initialize.");
        return;
    }

    /* ================================
       DRAG & DROP HANDLER
    ================================= */
    desktop.addEventListener("dragover", (e) => e.preventDefault());

    desktop.addEventListener("drop", (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;

        for (const file of files) {
            if (file.type === "application/javascript" || file.name.endsWith(".js")) {
                runJSFile(file);
            } else {
                console.warn(`Skipped "${file.name}": Not a JavaScript file.`);
            }
        }
    });

    /* ================================
       RUN JS FILE IMMEDIATELY
    ================================= */
    function runJSFile(file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            try {
                eval(event.target.result);
                console.log(`Executed ${file.name}`);
            } catch (err) {
                console.error(`Error running ${file.name}:`, err);
            }
        };
        reader.readAsText(file);
    }
})();
