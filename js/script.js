/* =========================================
   LICENSE MODAL PROTECTION
   ========================================= */
function openLicenseModal() {
    const modal = document.getElementById('licenseModal');
    if (!modal) return;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    addProtectionListeners();
    setTimeout(addDynamicWatermark, 100);
}

function closeLicenseModal() {
    const modal = document.getElementById('licenseModal');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    removeProtectionListeners();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('licenseModal');
    if (event.target == modal) {
        closeLicenseModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLicenseModal();
    }
});

function addProtectionListeners() {
    const viewer = document.getElementById('licenseViewer');
    const img = document.getElementById('licenseImage');
    if (!viewer || !img) return;
    
    viewer.addEventListener('contextmenu', e => e.preventDefault());
    img.addEventListener('dragstart', e => e.preventDefault());
    viewer.addEventListener('selectstart', e => e.preventDefault());
    document.addEventListener('keydown', disableSaveShortcuts);
    img.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
}

function removeProtectionListeners() {
    document.removeEventListener('keydown', disableSaveShortcuts);
}

function disableSaveShortcuts(e) {
    if ((e.ctrlKey && ['s', 'S', 'p', 'P', 'u', 'U'].includes(e.key)) || e.key === 'F12') {
        e.preventDefault();
        return false;
    }
}

function addDynamicWatermark() {
    const viewer = document.getElementById('licenseViewer');
    if (!viewer) return;
    viewer.querySelectorAll('.dynamic-watermark').forEach(w => w.remove());
    
    for (let i = 0; i < 5; i++) {
        const watermark = document.createElement('div');
        watermark.className = 'dynamic-watermark';
        watermark.textContent = 'HAQ SECURITY - VERIFICATION ONLY';
        watermark.style.cssText = `
            position: absolute; top: ${Math.random() * 100}%; left: ${Math.random() * 100}%;
            transform: rotate(${Math.random() * 360}deg); font-size: ${1 + Math.random()}rem;
            color: rgba(255, 0, 0, ${0.05 + Math.random() * 0.05}); pointer-events: none;
            z-index: 3; white-space: nowrap; user-select: none;
        `;
        viewer.appendChild(watermark);
    }
}

/* =========================================
   FORM HANDLERS
   ========================================= */
function handleServiceChange() {
    const serviceType = document.getElementById('serviceType')?.value;
    const messageField = document.getElementById('message');
    if (!serviceType || !messageField) return;
    
    const placeholders = {
        'security': 'Tell us about your security needs (e.g., manned guarding, CCTV monitoring)...',
        'cleaning': 'Tell us about your cleaning needs (e.g., frequency, type of cleaning)...',
        'both': 'Tell us about both your security and cleaning requirements...'
    };
    if (placeholders[serviceType]) messageField.placeholder = placeholders[serviceType];
}

function handleSubmit(event) {
    event.preventDefault();
    alert('Thank you for your inquiry! We will contact you within 24 hours.');
    event.target.reset();
}

function handleApplicationSubmit(event) {
    event.preventDefault();
    alert('Thank you for your application! We will review your submission and contact you.');
    event.target.reset();
    const fileNameEl = document.getElementById('fileName');
    if (fileNameEl) fileNameEl.textContent = 'No file selected';
}

function updateFileName(input) {
    const fileNameEl = document.getElementById('fileName');
    if (fileNameEl) fileNameEl.textContent = input.files[0]?.name || 'No file selected';
}

/* =========================================
   INITIALIZATION
   ========================================= */
document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date to today for contact form
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
    }
});