const { connect } = require("./client");
const { setupInput } = require("./input");

console.log("Connecting ...");

const game = connect();
setupInput(game);

