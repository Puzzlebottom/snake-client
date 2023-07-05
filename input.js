const setupInput = (snake) => {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.on('data', (data) => handleInput(snake, data));
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
    process.exit();
  }
};

module.exports = { setupInput };