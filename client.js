const net = require("net");

const connect = function() {
  const conn = net.createConnection({
    host: "165.227.47.243",
    port: "50541",
  });

  const end = () => {
    conn.end();
  };

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

    const stdin = setupInput();
    stdin.on('data', (data) => handleInput(snake, data, stdin, end));
  });

  conn.on("end", () => {
    logToClient("Connection ended. Hissss!");
  });


  return conn;
};

const setupInput = () => {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();
  return stdin;
};

const handleInput = (snake, keyPress, stdin, endConnection) => {
  const left = "\x1b[D";
  const up = "\x1b[A";
  const right = "\x1b[C";
  const down = "\x1b[B";
  const ctrlC = "\u0003";

  const isNotfacing = (direction) => snake.facing !== direction;
  const face = (direction) => snake.facing = direction;

  if (keyPress === up && isNotfacing("down")) face("up");
  if (keyPress === down && isNotfacing("up")) face("down");
  if (keyPress === left && isNotfacing("right")) face("left");
  if (keyPress === right && isNotfacing("left")) face("right");
  if (keyPress === ctrlC) {
    logToClient("I'm full!");
    endConnection();
    process.exit();
  }
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