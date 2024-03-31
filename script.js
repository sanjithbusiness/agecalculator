function calculateAge() {
    const birthDateTimeInput = document.getElementById('birthDateTime').value;
    const birthDateTime = new Date(birthDateTimeInput);
    const now = new Date();

    let years = now.getFullYear() - birthDateTime.getFullYear();
    let months = now.getMonth() - birthDateTime.getMonth();
    let days = now.getDate() - birthDateTime.getDate();
    let hours = now.getHours() - birthDateTime.getHours();
    let minutes = now.getMinutes() - birthDateTime.getMinutes();
    let seconds = now.getSeconds() - birthDateTime.getSeconds();

    // Adjust for cases where the current date is earlier in the year than the birth date
    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        // Get the last day of the previous month
        const lastDayOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += lastDayOfPrevMonth - birthDateTime.getDate() + 1;
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    // Calculate the next birthday
    let nextBirthday = new Date(now.getFullYear(), birthDateTime.getMonth(), birthDateTime.getDate());
    if (nextBirthday < now) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    let daysUntilNextBirthday = Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24));

    // Generate the HTML string for the age display
    const ageDisplayHTML = `
    <h2>Your Age:</h2>
    <ul>
        <li>${years} years</li>
        <li>${months} months</li>
        <li>${days} days</li>
        <li>${hours} hours</li>
        <li>${minutes} minutes</li>
        <li>${seconds} seconds</li>
    </ul>
    <h2>Days Until Next Birthday:</h2>
    <p>${daysUntilNextBirthday} days</p>`;

    // Set the age display HTML
    document.getElementById('ageDisplay').innerHTML = ageDisplayHTML;

    // Display today's date
    const formattedToday = now.toLocaleDateString();
    document.getElementById('todayDate').textContent = formattedToday;
}
