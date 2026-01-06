// --- CONFIGURATION ---
// In the future, these will be the URLs of your two DIFFERENT Google Scripts
const SALES_SPREADSHEET_URL = "https://script.google.com/macros/s/XXX/exec"; 
const HR_SPREADSHEET_URL    = "https://script.google.com/macros/s/YYY/exec"; 

// --- HELPER FUNCTION ---
// Since the logic is the same for both forms (collect data -> send -> show message),
// we create a reusable function. This is "DRY" (Don't Repeat Yourself).
function handleFormSubmit(event, statusElementId, destinationName) {
    event.preventDefault(); 
    const form = event.target;
    const statusMsg = document.getElementById(statusElementId);

    statusMsg.textContent = "Submitting to " + destinationName + "...";
    statusMsg.style.color = "blue";

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    console.log(`Sending to ${destinationName} System:`, data);

    // SIMULATION OF NETWORK REQUEST
    setTimeout(() => {
        statusMsg.textContent = "Received! " + destinationName + " team notified.";
        statusMsg.style.color = "green";
        form.reset();
    }, 1500);
}

// --- LOGIC FOR BOOKING PAGE (index.html) ---
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    // We check 'if (bookingForm)' exists to avoid errors on the careers page
    bookingForm.addEventListener('submit', function(e) {
        handleFormSubmit(e, 'formStatus', "Sales");
    });
}

// --- LOGIC FOR CAREERS PAGE (careers.html) ---
const careerForm = document.getElementById('careerForm');
if (careerForm) {
    // We check 'if (careerForm)' exists to avoid errors on the home page
    careerForm.addEventListener('submit', function(e) {
        handleFormSubmit(e, 'careerStatus', "HR");
    });
}

// --- SHARED LOGIC (Navigation/Consultant Selection) ---
function selectConsultant(name) {
    const select = document.getElementById('consultant');
    const contactSection = document.getElementById('contact');
    
    // Only run this if we are on the homepage where these elements exist
    if (select && contactSection) {
        select.value = name;
        contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        // If user clicks this on a different page (unlikely but possible), redirect home
        window.location.href = `index.html#contact`;
    }
}