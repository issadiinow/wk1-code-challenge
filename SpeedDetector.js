const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function computespeedDetector(speed) {
    const speedLimit = 70;
    const demeritPointsLimit = 12;

    if (speed <= speedLimit) {
        return "Ok";
    } else {
        const demeritPoints = Math.floor((speed - speedLimit) / 5);
        if (demeritPoints > demeritPointsLimit) {
            return "License suspended";
        } else {
            return `Points: ${demeritPoints}`;
        }
    }
}

rl.question("Enter the speed of the vehicle: ", (input) => {
    const speed = parseFloat(input);
    console.log(computespeedDetector(speed));
    rl.close();
});
