const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    butInstall.style.visibility - "visible";
    // window.deferredPrompt = event
});

// TODO: Implement a click event handler on the `butInstall` element 
butInstall.addEventListener('click', async () => {
    butInstall.addEventListener("click", () =>
        console.log("clicked"));
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log("🙌", "Jate Installed", event)
});
