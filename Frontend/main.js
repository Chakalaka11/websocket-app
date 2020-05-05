let websocketUrl = "ws://localhost:6061/ws"
let webSocketConnection = undefined;

function connectWebsocket() {
    webSocketConnection = new WebSocket(websocketUrl);
    webSocketConnection.onopen = (event) => {
        connectionStatus.innerText = "Connection established!";
    };
    webSocketConnection.onerror = (event) => {
        console.log(event)
        connectionStatus.innerText = "Connection failed!";
    };
    webSocketConnection.onmessage = (event) => {
        let timeSpan = document.createElement("span");
        let messageDate = new Date(event.timeStamp);
        let messageDateFormatted = pad(messageDate.getUTCHours()) + ":" + pad(messageDate.getUTCMinutes()) + ":" + pad(messageDate.getUTCSeconds());
        timeSpan.append(messageDateFormatted);
        let block = document.createElement("p");
        block.append(timeSpan);
        block.append(event.data);
        messageContainer.append(block);
    };
    connectButton.disabled = true;
}

function formSubmitted(e) {
    e.preventDefault();
    if (webSocketConnection) {
        webSocketConnection.send(messageField.value);
    }
}

function pad(n){
    return n >= 10 ? n.toString() : "0" + n;
}