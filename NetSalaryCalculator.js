const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calculateNetSalary(basicSalary, benefits) {
    if (typeof basicSalary !== 'number' || typeof benefits !== 'number' ||
        basicSalary < 0 || benefits < 0) {
        return "Invalid input! Provide non-negative numbers for salary and benefits.";
    }

    const taxBands = [
        { upperLimit: 24000, rate: 0.1 },
        { upperLimit: 40000, rate: 0.15 },
        { upperLimit: 60000, rate: 0.2 },
        { upperLimit: 100000, rate: 0.25 },
        { upperLimit: Infinity, rate: 0.3 }
    ];

    let taxableIncome = basicSalary + benefits;
    let tax = 0;

    for (let i = 0; i < taxBands.length; i++) {
        const { upperLimit, rate } = taxBands[i];
        if (taxableIncome <= upperLimit) {
            tax += (taxableIncome - (taxBands[i - 1]?.upperLimit || 0)) * rate;
            break;
        } else {
            tax += (upperLimit - (taxBands[i - 1]?.upperLimit || 0)) * rate;
        }
    }

    const nhifBands = [
        { max: 5999, deduction: 150 },
        { max: 7999, deduction: 300 },
        { max: 11999, deduction: 400 },
        { max: 14999, deduction: 500 },
        { max: 19999, deduction: 600 },
        { max: 24999, deduction: 750 },
        { max: 29999, deduction: 850 },
        { max: Infinity, deduction: 1600 }
    ];

    const nhifDeduction = nhifBands.find(band => basicSalary <= band.max).deduction;
    const nssfDeduction = Math.min(basicSalary * 0.06, 1080);

    const netSalary = taxableIncome - tax - nhifDeduction - nssfDeduction;

    return {
        grossSalary: taxableIncome,
        tax,
        nhifDeduction,
        nssfDeduction,
        netSalary
    };
}

rl.question("Enter your basic salary: ", (basicInput) => {
    const basicSalary = parseFloat(basicInput);
    rl.question("Enter your benefits: ", (benefitsInput) => {
        const benefits = parseFloat(benefitsInput);
        console.log(calculateNetSalary(basicSalary, benefits));
        rl.close();
    });
});
