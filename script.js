// Function to evaluate the strength of the entered password
function evaluatePassword (password) {
  let score = 0;
  let feedback = [];

  if (password.length >= 8) score++;
  else feedback.push ('Password should be at least 8 characters long.');

  if (/[a-z]/.test (password)) score++;
  else feedback.push ('Add lowercase letters.');

  if (/[A-Z]/.test (password)) score++;
  else feedback.push ('Add uppercase letters.');

  if (/[0-9]/.test (password)) score++;
  else feedback.push ('Include at least one number.');

  if (/[^a-zA-Z0-9]/.test (password)) score++;
  else feedback.push ('Include special characters (e.g., @, #, $).');

  return {score, feedback};
}

// Function to update the strength bar and feedback based on password strength
function updateStrengthBar (password) {
  const {score, feedback} = evaluatePassword (password);
  const strengthBar = document.getElementById ('strengthLevel');
  const feedbackElement = document.getElementById ('feedback');

  // Color range based on score (strength)
  const colors = ['#ff4d4d', '#ffa64d', '#ffd11a', '#b3ff66', '#66ff66'];
  strengthBar.style.width = score * 20 + '%';
  strengthBar.style.backgroundColor = colors[score - 1] || '#ccc';

  feedbackElement.innerHTML = feedback.length > 0
    ? feedback.join ('<br>')
    : 'Password is strong!';
}

// Function to generate a password based on input length
function generatePassword () {
  const lowerCharset = 'abcdefghijklmnopqrstuvwxyz';
  const upperCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberCharset = '0123456789';
  const specialCharset = '@#$%^&*';
  const allCharset =
    lowerCharset + upperCharset + numberCharset + specialCharset;

  let password = '';
  password += lowerCharset.charAt (
    Math.floor (Math.random () * lowerCharset.length)
  );
  password += upperCharset.charAt (
    Math.floor (Math.random () * upperCharset.length)
  );
  password += numberCharset.charAt (
    Math.floor (Math.random () * numberCharset.length)
  );
  password += specialCharset.charAt (
    Math.floor (Math.random () * specialCharset.length)
  );

  for (let i = 4; i < 12; i++) {
    password += allCharset.charAt (
      Math.floor (Math.random () * allCharset.length)
    );
  }

  password = password.split ('').sort (() => 0.5 - Math.random ()).join ('');
  return password;
}

// Event listener to handle user input and password generation
window.addEventListener ('DOMContentLoaded', () => {
  const passwordInput = document.getElementById ('password');
  const generateBtn = document.getElementById ('generateBtn');
  const generatedPasswordInput = document.getElementById ('generatedPassword');
  const eyeIcon = document.getElementById ('eye-icon');

  // Update password strength on input change
  passwordInput.addEventListener ('input', e =>
    updateStrengthBar (e.target.value)
  );

  // Generate a new password when the button is clicked
  generateBtn.addEventListener ('click', () => {
    const strongPassword = generatePassword ();
    generatedPasswordInput.value = strongPassword;
    updateStrengthBar (strongPassword);
  });

  // Show/hide password when the eye icon is clicked
  eyeIcon.addEventListener ('click', () => {
    const type = passwordInput.getAttribute ('type') === 'password'
      ? 'text'
      : 'password';
    passwordInput.setAttribute ('type', type);
    eyeIcon.classList.toggle ('fa-eye');
    eyeIcon.classList.toggle ('fa-eye-slash');
  });
});
