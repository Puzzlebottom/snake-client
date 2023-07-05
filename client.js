const net = require("net");

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
    process.stdin.setRawMode(true);
    process.stdin.setEncoding('utf8');

    let facing = "up";

    process.stdin.on('data', (key) => {
      const left = "\x1b[D";
      const up = "\x1b[A";
      const right = "\x1b[C";
      const down = "\x1b[B";

      if (key === up && facing !== "down") facing = "up";
      if (key === down && facing !== "up") facing = "down";
      if (key === left && facing !== "right") facing = "left";
      if (key === right && facing !== "left") facing = "right";
    });

    logToClient("Hissss! You're connected.");
    logToServer(conn, "Name: DMC");
    setInterval(() => moveSnake(conn, facing), 50);
  });

  conn.on("end", () => {
    logToClient("Hissss! Connection ended.");
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