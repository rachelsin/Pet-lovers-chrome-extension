
function handleInstall() {
    console.log('Extension installed');
}

function handlePing() {
    console.log('Ping');
}

function handleUnInstall() {
    console.log('Extension uninstalled');
}

chrome.runtime.onInstalled.addListener(handleInstall);

setInterval(handlePing, 3 * 60 * 60 * 1000);

chrome.runtime.onSuspend.addListener(handleUnInstall);