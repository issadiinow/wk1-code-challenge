function SpeedDetector() {
    let speed = parseInt(prompt("Enter the speed of the car (in km/h):"));
    
    // Validate the input
    if (isNaN(speed) || speed < 0) {
        console.log("Invalid input! Please enter a positive number for speed.");
        return;
    }

    const speedLimit = 70;
    let points = 0;

    // Check if speed is above the speed limit
    if (speed > speedLimit) {
        // Calculate the points based on every 5 km/h over the speed limit
        points = Math.floor((speed - speedLimit) / 5);

        // If the points are more than 12, the license gets suspended
        if (points > 12) {
            console.log("License suspended");
        } else {
            console.log(`Points: ${points}`);
        }
    } else {
        // If speed is below or equal to the speed limit
        console.log("Ok");
    }
}

// Call the function
speedDetector();
