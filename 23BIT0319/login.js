// Captcha Generation Script
const captchaCanvas = document.getElementById("captchaCanvas");
const ctx = captchaCanvas.getContext("2d");
const refreshCaptchaButton = document.getElementById("refreshCaptcha");

captchaCanvas.width = 150;
captchaCanvas.height = 40;

// Function to generate a random string
function generateCaptchaText() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captchaText = "";
    for (let i = 0; i < 6; i++) {
        captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captchaText;
}

// Function to draw the captcha on the canvas
function drawCaptcha() {
    const captchaText = generateCaptchaText();
    ctx.clearRect(0, 0, captchaCanvas.width, captchaCanvas.height);
    ctx.fillStyle = "#f4f4f4";
    ctx.fillRect(0, 0, captchaCanvas.width, captchaCanvas.height);
    ctx.font = "20px Arial";
    ctx.fillStyle = "#333";
    ctx.fillText(captchaText, 20, 30);
    captchaCanvas.dataset.captcha = captchaText;
}

// Initial captcha draw
drawCaptcha();

// Refresh captcha on button click
refreshCaptchaButton.addEventListener("click", drawCaptcha);