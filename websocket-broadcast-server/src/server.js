import { WebSocketServer } from "ws";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// Configuración de yargs para manejar los argumentos de la CLI
const argv = yargs(hideBin(process.argv))
  .command("start", "Start the broadcast server")
  .option("port", {
    alias: "p",
    description: "Port to run the server on",
    type: "number",
    default: 6800,
  })
  .help()
  .alias("help", "h")
  .argv;

console.log("Command: " + argv._[0] + "\n", "Port: " + argv.port, "Host: " + argv.host);

if (argv._[0] === "start") {
  // Crear el servidor WebSocket
  const wss = new WebSocketServer({ port: argv.port });

  const clients = [];

  wss.on("connection", (ws) => {
    clients.push(ws);
    console.log("Client connected");

    ws.on("message", (message) => {
      console.log(`Received: ${message}`);
      clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {          
          client.send(message);
        }
      });
    });

    ws.on("close", () => {
      console.log("Client disconnected");
      clients.splice(clients.indexOf(ws), 1);
    });
  });

  console.log(`Broadcast server escuchando en ${argv.host}:${argv.port}`);
}
