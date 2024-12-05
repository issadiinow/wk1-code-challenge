const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function generateGrade(marks) {
    if (typeof marks !== 'number' || marks < 0 || marks > 100) {
        return "Invalid input! Marks should be a number between 0 and 100.";
    }

    if (marks >= 80) {
        return "Grade: A";
    } else if (marks >= 60) {
        return "Grade: B";
    } else if (marks >= 50) {
        return "Grade: C";
    } else if (marks >= 40) {
        return "Grade: D";
    } else {
        return "Grade: E";
    }
}

rl.question("Enter your marks (0-100): ", (input) => {
    const marks = parseFloat(input);
    console.log(generateGrade(marks));
    rl.close();
});
