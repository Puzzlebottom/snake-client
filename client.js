const net = require("net");
const { setupInput } = require("./input");

const connect = function() {
  const conn = net.createConnection({
    host: "165.227.47.243",
    port: "50541",
  });

  // interpret incoming data as text
  conn.setEncoding("utf8");

  conn.on('data', (data) => {
    console.log(data);
  });

  conn.on("connect", () => {

    const snake = {
      name: "DMC",
      facing: "up"
    };

    logToClient("Hissss! Connection created.");
    logToServer(conn, `Name: ${snake.name}`);
    setInterval(() => moveSnake(conn, snake.facing), 50);
    setupInput(snake);
  });

  conn.on("end", () => {
    logToClient("Connection ended. Hissss!");
    process.exit();
  });


  return conn;
};

const logToClient = (message) => {
  process.stdout.write(message + "\n");
};

const logToServer = (connection, message) => {
  connection.write(message);
};

const moveSnake = (connection, direction) => {
  logToServer(connection, `Move: ${direction}`);
};

module.exports = { connect };