const net = require("net");
const { parsePacketByteBuf } = require("./packets/handler");
const config = require("config.json");

const targetIp = config.target.ip;
const targetPort = config.target.port;

const server = net.createServer();
server.on("connection", (socket) => {
  const target = net.connect(targetPort, targetIp);

  // Outgoing data
  socket.on("data", (data) => {
    console.log(parsePacketByteBuf(data));
    target.write(data);
  });

  // Incoming data
  target.on("data", (data) => {
    socket.write(data);
  });

  socket.on("end", () => target.end());
  target.on("end", () => socket.end());
});

server.listen(config.proxy_port, "localhost");
