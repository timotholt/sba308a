
export function setStatusMessage(s) {
    let div = document.getElementById("formStatusMessage");
    div.innerHTML = s;
}

export function getLastStatusMessage() {
    let div = document.getElementById("formStatusMessage");
    return div.innerHTML;
}
