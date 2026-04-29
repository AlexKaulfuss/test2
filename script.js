// 1. Classes and Subclasses
class Service {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

class SpecialtyService extends Service {
    constructor(name, price, extraTime) {
        super(name, price);
        this.extraTime = extraTime; // Additional DLC requirement logic
    }
}

// 2. Data Array
const menu = [
    new Service("Classic Manicure", 30),
    new Service("Gel Polish", 45),
    new SpecialtyService("Full Acrylic Set", 65, "30 mins extra"),
    new SpecialtyService("Nail Art Design", 20, "15 mins extra")
];

// 3. DOM Element Creation & Loops
const serviceList = document.getElementById('service-list');

function renderMenu() {
    menu.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
            <button onclick="selectService('${item.name}')">Select</button>
        `;
        serviceList.appendChild(card);
    });
}

// 4. Event Listeners & Local Storage
function selectService(name) {
    document.getElementById('service-select').value = name;
}

// Pre-fill from LocalStorage (DLC Requirement)
window.onload = () => {
    renderMenu();
    const savedName = localStorage.getItem('clientName');
    if (savedName) {
        document.getElementById('client-name').value = savedName;
    }
};

// Locate this section at the bottom of your script.js
const bookingForm = document.getElementById('booking-form');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    
    const clientName = document.getElementById('client-name').value;
    
    // 1. Save name to LocalStorage (DLC Requirement)
    localStorage.setItem('clientName', clientName);

    // 2. Prepare the data object to send
    const formData = {
        name: clientName,
        email: document.getElementById('client-email').value,
        service: document.getElementById('service-select').value,
        date: document.getElementById('appt-date').value
    };

    // 3. THE FETCH CHUNK GOES HERE
    // Replace 'YOUR_WEB_APP_URL_HERE' with the link from Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbxwhPyhSem9qCa0QZOQaZs148C1w8A56D1Q_3dVN3M16dT9WdRpjuMlBXcxPlOZ8Wum1A/exec', {
        method: 'POST',
        mode: 'no-cors', // Helps avoid "CORS" errors with Google Scripts
        body: JSON.stringify(formData)
    })
    .then(() => {
        // 4. Show success message to the user
        document.getElementById('confirmation-msg').innerText = "Booking successfully sent to the technician!";
        bookingForm.reset(); // Clear the form after success
    })
    .catch(err => {
        console.error("Error!", err);
        document.getElementById('confirmation-msg').innerText = "Something went wrong. Please try again.";
    });
});