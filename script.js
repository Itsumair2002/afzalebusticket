document.addEventListener('DOMContentLoaded', function () {
    renderBookingPage();
});

function renderBookingPage() {
    document.getElementById('app').innerHTML = `
        <div class="booking-container">
            <div class="booking-box">
                <h1>Book Your Bus Ticket</h1>
                <form id="booking-form">
                    <div class="form-group">
                        <label for="from">From:</label>
                        <select id="from" required>
                            <option value="" disabled selected>Select departure city</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Bangalore">Bangalore</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="to">To:</label>
                        <select id="to" required>
                            <option value="" disabled selected>Select destination city</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Bangalore">Bangalore</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="date">Date:</label>
                        <input type="date" id="date" required>
                    </div>

                    <div class="form-group">
                        <label for="passengers">Passengers:</label>
                        <input type="number" id="passengers" placeholder="Enter number of passengers" required min="1">
                    </div>

                    <button type="submit" class="book-btn">Book Now</button>
                </form>
            </div>
        </div>
    `;

    document.getElementById('booking-form').addEventListener('submit', handleBooking);
}

function handleBooking(event) {
    event.preventDefault();

    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('date').value;
    const passengers = document.getElementById('passengers').value;

    if (!from || !to || !date || !passengers) {
        showToast('Please fill all the fields!', 'error');
        return;
    }

    sessionStorage.setItem('from', from);
    sessionStorage.setItem('to', to);
    sessionStorage.setItem('date', date);
    sessionStorage.setItem('passengers', passengers);

    showToast('Redirecting to payment...', 'success');

    setTimeout(() => {
        renderPaymentPage();
    }, 2000);
}
function renderPaymentPage() {
    document.getElementById('app').innerHTML = `
        <div class="booking-container">
            <div class="booking-box">
                <h1>Payment Details</h1>
                <p>Please enter your payment details to confirm the booking.</p>
                <form id="payment-form">
                    <div class="form-group">
                        <label for="card-number">Card Number:</label>
                        <input type="text" id="card-number" placeholder="1234 5678 9012 3456" required>
                    </div>
                    <div class="form-group">
                        <label for="expiry-date">Expiry Date:</label>
                        <input type="month" id="expiry-date" required>
                    </div>
                    <div class="form-group">
                        <label for="cvv">CVV:</label>
                        <input type="password" id="cvv" placeholder="123" required>
                    </div>
                    <button type="submit" class="book-btn">Proceed to Pay</button>
                    <button type="button" class="book-btn cancel-btn" onclick="renderBookingPage()">Cancel</button>
                </form>
            </div>
        </div>
    `;

    document.getElementById('payment-form').addEventListener('submit', handlePayment);
}
function handlePayment(event) {
    event.preventDefault();

    const cardNumber = document.getElementById('card-number').value.trim();
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value.trim();

    if (!cardNumber || !expiryDate || !cvv || cardNumber.length < 16 || cvv.length < 3) {
        showToast('Invalid payment details. Please try again.', 'error');
        return;
    }

    showToast('Processing payment...', 'info');

    setTimeout(() => {
        showToast('Payment successful!', 'success');
        renderConfirmationPage();
    }, 3000);
}


function renderConfirmationPage() {
    const from = sessionStorage.getItem('from');
    const to = sessionStorage.getItem('to');
    const date = sessionStorage.getItem('date');
    const passengers = sessionStorage.getItem('passengers');

    if (!from || !to || !date || !passengers) {
        showToast('No booking details found!', 'error');
        setTimeout(renderBookingPage, 2000);
        return;
    }

    document.getElementById('app').innerHTML = `
        <div class="booking-container">
            <div class="booking-box">
                <h1>Booking Confirmed!</h1>
                <p><strong>From:</strong> ${from}</p>
                <p><strong>To:</strong> ${to}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Passengers:</strong> ${passengers}</p>
                <button onclick="downloadTicket()" class="book-btn">Download Ticket</button>
                <button class="book-btn" onclick="renderBookingPage()">Book Another</button>
            </div>
        </div>
    `;

    showToast('Booking details loaded successfully!', 'success');
}

function downloadTicket() {
    const ticketDetails = `
        Bus Ticket Confirmation
        ------------------------
        From: ${sessionStorage.getItem('from')}
        To: ${sessionStorage.getItem('to')}
        Date: ${sessionStorage.getItem('date')}
        Passengers: ${sessionStorage.getItem('passengers')}
    `;

    const blob = new Blob([ticketDetails], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'E-Bus-Ticket.txt';
    link.click();

    showToast('Your ticket has been downloaded!', 'info');
}

// Function to show enhanced toast notification
function showToast(message, type = 'info') {
    // Create the toast container if it doesn't exist
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    // Create the toast notification
    const toast = document.createElement('div');
    toast.classList.add('toast', type);

    // Add message text
    toast.innerHTML = `
        <span class="toast-message">${message}</span>
        <div class="toast-progress"></div>
    `;

    toastContainer.appendChild(toast);

    // Trigger animation for showing toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Remove toast after timeout
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 4000);
}
document.addEventListener('DOMContentLoaded', function () {
    renderNavbar();
    renderBookingPage();
});

function renderNavbar() {
    const app = document.getElementById('app');
    const navbar = document.createElement('nav');
    navbar.className = 'navbar';

    navbar.innerHTML = `
        <div class="logo">E-Bus Booking</div>
        <ul class="nav-links">
            <li><a href="#" onclick="renderBookingPage()">Home</a></li>
            <li><a href="#" onclick="renderFareEstimationPage()">Fare Estimation</a></li>
            <li><a href="#" onclick="renderBookingPage()">Book Ticket</a></li>
        </ul>
    `;

    document.body.insertBefore(navbar, app);
}

function renderFareEstimationPage() {
    document.getElementById('app').innerHTML = `
        <div class="fare-container">
            <h1>Fare Estimation</h1>
            <div class="form-group">
                <label for="from">From:</label>
                <select id="fare-from">
                    <option value="" disabled selected>Select departure city</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                </select>
            </div>

            <div class="form-group">
                <label for="to">To:</label>
                <select id="fare-to">
                    <option value="" disabled selected>Select destination city</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                </select>
            </div>

            <div class="form-group">
                <label for="passengers">Passengers:</label>
                <input type="number" id="fare-passengers" placeholder="Enter number of passengers" min="1">
            </div>

            <button class="book-btn" onclick="calculateFare()">Estimate Fare</button>
            <p id="fare-result"></p>
        </div>
    `;
}

function calculateFare() {
    const from = document.getElementById('fare-from').value;
    const to = document.getElementById('fare-to').value;
    const passengers = parseInt(document.getElementById('fare-passengers').value);

    if (!from || !to || !passengers || passengers <= 0) {
        showToast('Please fill all the fields correctly!', 'error');
        return;
    }

    // Simple mock fare calculation logic
    const baseFare = 500;
    const distanceMultiplier = (from !== to) ? 1.5 : 1.0;
    const totalFare = baseFare * distanceMultiplier * passengers;

    document.getElementById('fare-result').innerHTML = 
        `<strong>Estimated Fare:</strong> ₹${totalFare.toFixed(2)}`;
    
    showToast('Fare calculated successfully!', 'success');
}
