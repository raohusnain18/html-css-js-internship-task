const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Form Validation and Submission
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const formSuccess = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();
  formSuccess.textContent = '';

  let isValid = true;

  // Validate name
  if (!nameInput.value.trim()) {
    nameError.textContent = 'Name is required.';
    isValid = false;
  }

  // Validate email
  if (!emailInput.value.trim()) {
    emailError.textContent = 'Email is required.';
    isValid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    emailError.textContent = 'Please enter a valid email address.';
    isValid = false;
  }

  // Validate message
  if (!messageInput.value.trim()) {
    messageError.textContent = 'Message cannot be empty.';
    isValid = false;
  }

  if (isValid) {
    formSuccess.textContent = 'Thank you for your message!';
    form.reset();
  }
});

function clearErrors() {
  nameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';
}

function validateEmail(email) {
  // Simple email regex validation
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}
