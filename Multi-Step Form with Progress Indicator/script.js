const form = document.getElementById('multiStepForm');
const steps = Array.from(document.querySelectorAll('.step'));
const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');
const progress = document.getElementById('progress');
const summary = document.getElementById('summary');

let currentStep = 0;

// Load saved form data from localStorage
const savedData = JSON.parse(localStorage.getItem('formData')) || {};
populateForm(savedData);

// Show current step
showStep(currentStep);

nextBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (validateStep(currentStep)) {
      saveStepData(currentStep);
      currentStep++;
      showStep(currentStep);
    }
  });
});

prevBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentStep--;
    showStep(currentStep);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Form submitted successfully!');
  localStorage.removeItem('formData'); // Clear autosave on submit
  form.reset();
  currentStep = 0;
  showStep(currentStep);
});

// Show step and update progress bar
function showStep(n) {
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === n);
  });
  updateProgress(n);
  if (n === steps.length - 1) {
    displaySummary();
  }
}

// Validate required fields of the current step
function validateStep(n) {
  const inputs = steps[n].querySelectorAll('input[required]');
  for (let input of inputs) {
    if (!input.value.trim()) {
      alert(`Please fill out the "${input.previousElementSibling.innerText}" field.`);
      input.focus();
      return false;
    }
    if (input.type === 'email' && !validateEmail(input.value)) {
      alert('Please enter a valid email address.');
      input.focus();
      return false;
    }
  }
  return true;
}

// Update progress bar
function updateProgress(n) {
  const percent = ((n) / (steps.length - 1)) * 100;
  progress.style.width = percent + '%';
}

// Save current step data to localStorage
function saveStepData(n) {
  const inputs = steps[n].querySelectorAll('input');
  let data = JSON.parse(localStorage.getItem('formData')) || {};
  inputs.forEach(input => {
    data[input.name] = input.value;
  });
  localStorage.setItem('formData', JSON.stringify(data));
}

// Populate form from saved data
function populateForm(data) {
  for (let key in data) {
    const input = form.elements[key];
    if (input) {
      input.value = data[key];
    }
  }
}

// Display summary on last step
function displaySummary() {
  const data = JSON.parse(localStorage.getItem('formData')) || {};
  summary.innerHTML = `
    <h3>Review Your Information</h3>
    <p><strong>Name:</strong> ${data.name || ''}</p>
    <p><strong>Email:</strong> ${data.email || ''}</p>
    <p><strong>Address:</strong> ${data.address || ''}</p>
    <p><strong>City:</strong> ${data.city || ''}</p>
  `;
}

// Simple email validation
function validateEmail(email) {
  const re = /^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@(([^<>()[\\]\\\\.,;:\\s@"]+\\.)+[^<>()[\\]\\\\.,;:\\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}
