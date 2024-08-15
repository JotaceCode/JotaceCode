import WebSocket from "ws";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv))
  .command("connect", "Connect to the broadcast server")
  .option("port", {
    alias: "p",
    description: "Port to connect to the server",
    type: "number",
    default: 6800,
  })
  .option("host", {
    alias: "h",
    description: "Host to connect to",
    type: "string",
    default: "127.0.0.1",
  })
  .help()
  .alias("help", "h").argv;

if (argv._[0] === "connect") {
  const ws = new WebSocket(`ws://localhost:${argv.port}`);

  ws.on("open", () => {
    console.log("Se conectó al server");
    process.stdin.on("data", (data) => {
      ws.send(data.toString().trim());
    });
  });

  ws.on("message", (message) => {
    console.log(`Message from server: ${message}`);
  });

  ws.on("close", () => {
    console.log("Se desconectó del server");
    process.exit(0);
  });

  ws.on("error", (error) => {
    console.error(`Connection error: ${error.message}`);
  });
}
