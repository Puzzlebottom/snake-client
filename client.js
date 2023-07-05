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

    logToClient("Hissss! You're connected.");
    logToServer(conn, "Name", "DMC");
  });

  return conn;
};

const logToClient = (message) => {
  process.stdout.write(message + "\n");
};

const logToServer = (connection, header, body) => {
  return connection.write(`${header}: ${body}`);
};

module.exports = { connect };