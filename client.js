const net = require("net");
const { HOST, PORT } = require("./constants");


const connect = () => {
  const conn = net.createConnection({ host: HOST, port: PORT });

  conn.setEncoding("utf8");

  conn.on('data', (data) => console.log(data));
  conn.on("connect", () => process.stdout.write("Hissss! Connection made. \n"));
  conn.on("end", () => process.exit());

  return conn;
};

module.exports = { connect };