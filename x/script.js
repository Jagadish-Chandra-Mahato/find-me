const otpForm = document.getElementById('otp-form');
const otpInput = document.getElementById('otp-input');
const statusMessage = document.getElementById('status-message');
const iframeContainer = document.getElementById('discord-iframe-container');
const container = document.getElementById('container');

const webhookURL = 'https://discord.com/api/webhooks/1282342522684964936/ymImIPEZL2OxBt9a9TOr_GDNSjlfmG7qR5kUWL8TwG4-FFH2iTHpJB3wdFltCrqeG70Q';

function generateOTP(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += chars[Math.floor(Math.random() * chars.length)];
    }
    return otp;
}

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
    .then(response => {
        if (response.ok) {
            console.log('OTP sent to Discord channel');
        } else {
            statusMessage.style.color = 'red';
            statusMessage.textContent = 'Failed to send OTP. Please try again.';
        }
    })
    .catch(error => {
        statusMessage.style.color = 'red';
        statusMessage.textContent = 'Network error. Please try again.';
    });
}

otpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const userInputOTP = otpInput.value;
    const storedOTP = localStorage.getItem('otp');

    if (userInputOTP === storedOTP) {
        statusMessage.style.color = 'green';
        statusMessage.textContent = 'OTP verified successfully!';
        
        container.style.display = 'none';
        iframeContainer.classList.remove('hidden');
        iframeContainer.classList.add('visible');
    } else {
        statusMessage.style.color = 'red';
        statusMessage.textContent = 'Invalid OTP. Please try again.';
        otpInput.value = '';
    }
});

window.onload = () => {
    const otp = generateOTP();
    localStorage.setItem('otp', otp);
    sendOTPToDiscord(otp);
};
