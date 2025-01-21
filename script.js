
// Function to handle booking form submission
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('booking-form').addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form values
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;
        const date = document.getElementById('date').value;
        const passengers = document.getElementById('passengers').value;

        if (!from || !to || !date || !passengers) {
            showToast('Please fill all the fields!', 'error');
            return;
        }

        // Store booking details in session storage
        sessionStorage.setItem('from', from);
        sessionStorage.setItem('to', to);
        sessionStorage.setItem('date', date);
        sessionStorage.setItem('passengers', passengers);

        showToast('Booking successful! Redirecting...', 'success');

        // Redirect to confirmation page after a short delay
        setTimeout(() => {
            window.location.href = 'confirmation.html';
        }, 2000);
    });
});

// Function to show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    document.body.appendChild(toast);

    // Display toast with animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}


// Function to load booking details on confirmation page
function loadBookingDetails() {
    const from = sessionStorage.getItem('from');
    const to = sessionStorage.getItem('to');
    const date = sessionStorage.getItem('date');
    const passengers = sessionStorage.getItem('passengers');
    const seat = sessionStorage.getItem('seat');

    if (!from || !to || !date || !passengers || !seat) {
        showToast('No booking details found!', 'error');
        setTimeout(() => {
            window.location.href = 'booking.html';
        }, 2000);
        return;
    }

    document.getElementById('confirm-from').innerText = from || 'N/A';
    document.getElementById('confirm-to').innerText = to || 'N/A';
    document.getElementById('confirm-date').innerText = date || 'N/A';
    document.getElementById('confirm-passengers').innerText = passengers || 'N/A';
    document.getElementById('confirm-seat').innerText = seat || 'N/A';

    showToast('Booking details loaded successfully!', 'success');
}

// Function to download the ticket as a text file
function downloadTicket() {
    const ticketDetails = `
        Bus Ticket Confirmation
        ------------------------
        From: ${sessionStorage.getItem('from')}
        To: ${sessionStorage.getItem('to')}
        Date: ${sessionStorage.getItem('date')}
        Passengers: ${sessionStorage.getItem('passengers')}
        Seat Type: ${sessionStorage.getItem('seat')}
    `;

    const blob = new Blob([ticketDetails], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'E-Bus-Ticket.txt';
    link.click();

    showToast('Your ticket has been downloaded!', 'info');
}

// Load booking details on confirmation page
if (window.location.pathname.includes('confirmation.html')) {
    loadBookingDetails();
}
