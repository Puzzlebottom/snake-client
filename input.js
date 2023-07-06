let connection;

const setupInput = (conn) => {
  const snake = { name: "DMC", facing: "up", speed: 50, phrase: "Badger!" };

  connection = conn;
  connection.write(`Name: ${snake.name}`);
  setInterval(() => connection.write(`Move: ${snake.facing}`), snake.speed);

  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.on('data', (key) => handleInput(snake, key));
  stdin.resume();

  return stdin;
};

const handleInput = (snake, key) => {

  const left = "\x1b[D";
  const up = "\x1b[A";
  const right = "\x1b[C";
  const down = "\x1b[B";
  const ctrlC = "\u0003";
  const space = " ";

  const isNotfacing = (direction) => snake.facing !== direction;
  const face = (direction) => snake.facing = direction;

  if (key === up && isNotfacing("down")) face("up");
  if (key === down && isNotfacing("up")) face("down");
  if (key === left && isNotfacing("right")) face("left");
  if (key === right && isNotfacing("left")) face("right");
  if (key === space) connection.write(`Say: ${snake.phrase}`);
  if (key === ctrlC) process.exit();
};

module.exports = { setupInput };