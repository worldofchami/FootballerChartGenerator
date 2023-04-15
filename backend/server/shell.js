const shell = require("shelljs");

function createChart(name) {
    shell.exec(`python3 ./server/generate.py ${name}`);
};

module.exports = {
    createChart,
}