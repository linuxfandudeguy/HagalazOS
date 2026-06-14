// apps/about.js

const settingsApp = {
    id: "about",
    icon: "bi bi-newspaper",
    title: "About",
    html: `
        <div style="padding:20px;font-family:Segoe UI,sans-serif;color:#111;max-width:600px;margin:auto;line-height:1.6;">
    <h2 style="margin-bottom:10px;">About ブランチ</h2>
    
    <img src="./branch.png" alt="Branch Logo" style="width:120px;height:auto;margin-bottom:15px;border-radius:10px;">

    <p>ブランチ (Branch) is a Web-based OS , influnced by <a href="https://github.com/nautilus-os/NautilusOS">NautilusOS.</a></p>
    
    <p
    <p>Developed by: <strong>linuxfandudeguy</strong></p>

    <button id="visitWebsiteBtn" class="btn btn-primary" style="margin-top:15px;">Visit Official Website</button>
</div>
    `
};

// Push to Apps array for dynamic loader
window.Apps = window.Apps || [];
window.Apps.push(settingsApp);
