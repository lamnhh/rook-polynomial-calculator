const compute = require("./calculator");

const mask = [[0, 1, 1, 1, 1], [1, 1, 0, 1, 1], [1, 0, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]];

console.log(compute(mask));
