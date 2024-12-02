function calculateNetSalary(basicSalary, benefits) {
    // Defining the PAYE tax bands
    const taxBands = [
        { upperLimit: 24000, rate: 0.1 },
        { upperLimit: 40000, rate: 0.15 },
        { upperLimit: 60000, rate: 0.2 },
        { upperLimit: 100000, rate: 0.25 },
        { upperLimit: Infinity, rate: 0.3 }
    ];

    // Calculating PAYE
    let tax = 0;
    let taxableIncome = basicSalary + benefits;
    let previousBandLimit = 0;

    for (let band of taxBands) {
        if (taxableIncome > previousBandLimit) {
            let bandIncome = Math.min(taxableIncome - previousBandLimit, band.upperLimit - previousBandLimit);
            tax += bandIncome * band.rate;
            previousBandLimit = band.upperLimit;
        } else {
            break;
        }
    }

    // NHIF Deduction
    let nhifDeduction = 0;
    if (basicSalary <= 5999) nhifDeduction = 150;
    else if (basicSalary <= 7999) nhifDeduction = 300;
    else if (basicSalary <= 11999) nhifDeduction = 400;
    else if (basicSalary <= 14999) nhifDeduction = 500;
    else if (basicSalary <= 19999) nhifDeduction = 600;
    else if (basicSalary <= 24999) nhifDeduction = 750;
    else if (basicSalary <= 29999) nhifDeduction = 850;
    else nhifDeduction = 900;

    // NSSF Deduction
    const nssfDeduction = basicSalary * 0.06;

    // Gross salary
    const grossSalary = basicSalary + benefits;

    // Net salary calculation
    const netSalary = grossSalary - tax - nhifDeduction - nssfDeduction;

    return {
        grossSalary: grossSalary,
        tax: tax,
        nhifDeduction: nhifDeduction,
        nssfDeduction: nssfDeduction,
        netSalary: netSalary
    };
}

function netSalaryCalculator() {
    let basicSalary = parseFloat(prompt("Enter your basic salary:"));
    let benefits = parseFloat(prompt("Enter your benefits:"));

    // Validate the inputs
    if (isNaN(basicSalary) || isNaN(benefits) || basicSalary < 0 || benefits < 0) {
        console.log("Invalid input! Please enter valid positive numbers.");
        return;
    }

    // Calling the calculateNetSalary function
    const result = calculateNetSalary(basicSalary, benefits);

    // Output the results
    console.log(`Gross Salary: Ksh ${result.grossSalary}`);
    console.log(`Tax: Ksh ${result.tax}`);
    console.log(`NHIF Deduction: Ksh ${result.nhifDeduction}`);
    console.log(`NSSF Deduction: Ksh ${result.nssfDeduction}`);
    console.log(`Net Salary: Ksh ${result.netSalary}`);
}

// Calling the function
netSalaryCalculator();
