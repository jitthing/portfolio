let socket = null;

let connect = (cb) => {
  console.log("Attempting Connection...");

  socket = new WebSocket("ws://localhost:8080/ws");

  socket.onopen = () => {
    console.log("Successfully Connected");
  };

  socket.onmessage = (msg) => {
    console.log(msg);
    cb(msg);
  };

  socket.onclose = (event) => {
    console.log("Socket Closed Connection: ", event);
    socket = null;
  };

  socket.onerror = (error) => {
    console.log("Socket Error: ", error);
  };

  return socket;
};

let sendMsg = (msg) => {
  if (socket) {
    console.log("sending msg: ", msg);
    socket.send(msg);
  }
};

export { connect, sendMsg };
