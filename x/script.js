const otpForm = document.getElementById('otp-form');
const otpInput = document.getElementById('otp-input');
const statusMessage = document.getElementById('status-message');
const iframeContainer = document.getElementById('discord-iframe-container');

// Your Discord webhook URL
const webhookURL = 'YOUR_DISCORD_WEBHOOK_URL';

// Generate OTP
function generateOTP(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += chars[Math.floor(Math.random() * chars.length)];
    }
    return otp;
}

// Send OTP to Discord webhook
function sendOTPToDiscord(otp) {
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: `Your OTP is: ${otp}`
        }),
    })
    .then(response => console.log('OTP sent to Discord channel'))
    .catch(error => console.error('Error sending OTP:', error));
}

// Handle form submission
otpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const userInputOTP = otpInput.value;
    const storedOTP = localStorage.getItem('otp');

    if (userInputOTP === storedOTP) {
        statusMessage.style.color = 'green';
        statusMessage.textContent = 'OTP verified successfully!';
        
        // Show the iframe container
        iframeContainer.classList.remove('hidden');
        iframeContainer.classList.add('visible');
    } else {
        statusMessage.textContent = 'Invalid OTP. Please try again.';
    }
});

// On page load, generate and send OTP to Discord
window.onload = () => {
    const otp = generateOTP();
    localStorage.setItem('otp', otp);
    sendOTPToDiscord(otp);
};
