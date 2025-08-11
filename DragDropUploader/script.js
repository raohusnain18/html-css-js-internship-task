const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');
const errorMsg = document.getElementById('errorMsg');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');

// Load saved images from localStorage
const savedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];
if (savedImages.length > 0) {
  savedImages.forEach(src => addImagePreview(src));
}

// Click to select files
dropZone.addEventListener('click', () => fileInput.click());

// Drag over
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});

// Drag leave
dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});

// Drop files
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  handleFiles(e.dataTransfer.files);
});

// File input change
fileInput.addEventListener('change', () => {
  handleFiles(fileInput.files);
});

// Handle multiple files
function handleFiles(files) {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  errorMsg.textContent = '';

  Array.from(files).forEach(file => {
    if (!validTypes.includes(file.type)) {
      errorMsg.textContent = '❌ Only JPG, PNG, and GIF files are allowed.';
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      addImagePreview(e.target.result);
      savedImages.push(e.target.result);
      localStorage.setItem('uploadedImages', JSON.stringify(savedImages));
      simulateUpload();
    };
    reader.readAsDataURL(file);
  });
}

// Add image preview to DOM
function addImagePreview(src) {
  const img = document.createElement('img');
  img.src = src;
  previewContainer.appendChild(img);
}

// Simulate upload progress
function simulateUpload() {
  progressContainer.style.display = 'block';
  progressBar.style.width = '0';
  let progress = 0;

  const interval = setInterval(() => {
    progress += 5;
    progressBar.style.width = progress + '%';
    if (progress >= 100) {
      clearInterval(interval);
    }
  }, 50);
}
