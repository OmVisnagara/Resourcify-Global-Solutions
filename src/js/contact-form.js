/**
 * contact-form.js — Contact Form Handler
 * Sends data to Google Apps Script → Google Sheets + Email
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Paste the doPost function (see implementation_plan.md)
 * 4. Deploy as Web App with "Anyone" access
 * 5. Copy the deployment URL below
 */

// TODO: Replace with your actual Google Apps Script deployment URL
const APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', handleFormSubmit);

  // Country dropdown → phone code logic
  const countrySelect = document.getElementById('country');
  const phoneCode = document.getElementById('phone-code');
  const phoneInput = document.getElementById('phone');

  if (countrySelect && phoneCode && phoneInput) {
    countrySelect.addEventListener('change', () => {
      const selected = countrySelect.selectedOptions[0];
      const code = selected.dataset.code;
      const maxDigits = parseInt(selected.dataset.digits) || 15;

      if (code) {
        phoneCode.textContent = code;
        phoneCode.classList.add('visible');
        phoneInput.value = '';
        phoneInput.setAttribute('maxlength', maxDigits);
        phoneInput.placeholder = '0'.repeat(maxDigits);
        phoneInput.focus();
      } else {
        phoneCode.textContent = '';
        phoneCode.classList.remove('visible');
        phoneInput.removeAttribute('maxlength');
        phoneInput.placeholder = 'Enter phone number';
      }
    });

    // Only allow digits in phone input
    phoneInput.addEventListener('input', () => {
      phoneInput.value = phoneInput.value.replace(/\D/g, '');
    });
  }
});

async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('.contact-submit');

  // Validate form
  if (!validateForm(form)) return;

  // Gather form data
  const phoneCodeEl = document.getElementById('phone-code');
  const phoneVal = form.querySelector('#phone').value.trim();
  const fullPhone = phoneCodeEl && phoneCodeEl.textContent ? `${phoneCodeEl.textContent} ${phoneVal}` : phoneVal;

  const formData = {
    name: form.querySelector('#name').value.trim(),
    email: form.querySelector('#email').value.trim(),
    country: form.querySelector('#country')?.selectedOptions[0]?.text?.trim() || 'Not specified',
    phone: fullPhone,
    company: form.querySelector('#company').value.trim(),
    service: form.querySelector('input[name="service"]:checked')?.value || 'Not specified',
    message: form.querySelector('#message').value.trim(),
  };

  // Set loading state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  try {
    if (APPS_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
      // Demo mode — simulate success
      await new Promise(resolve => setTimeout(resolve, 1500));
      window.showToast('Thank you! Your request has been submitted successfully.', 'success');
      form.reset();
    } else {
      // Real submission
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      window.showToast('Thank you! Your request has been submitted successfully.', 'success');
      form.reset();
    }
  } catch (error) {
    console.error('Form submission error:', error);
    window.showToast('Something went wrong. Please try again or email us directly.', 'error');
  } finally {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
}

function validateForm(form) {
  const name = form.querySelector('#name').value.trim();
  const email = form.querySelector('#email').value.trim();

  if (!name) {
    window.showToast('Please enter your name.', 'error');
    form.querySelector('#name').focus();
    return false;
  }

  if (!email) {
    window.showToast('Please enter your email address.', 'error');
    form.querySelector('#email').focus();
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    window.showToast('Please enter a valid email address.', 'error');
    form.querySelector('#email').focus();
    return false;
  }

  return true;
}
