import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const radioButtons = form.querySelectorAll('input[name="state"]');
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(delayInput.value);
  const state = document.querySelector('input[name="state"]:checked');

  if (isNaN(delay) || delay < 0) {
    iziToast.warning({
      title: 'Warning',
      message: '⏳ Please enter a valid delay (positive number).',
    });
    return;
  }

  if (!state) {
    iziToast.warning({
      title: 'Warning',
      message: '⚠️ Please select a promise state!',
    });
    return;
  }

  submitButton.disabled = true;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state.value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(resolvedDelay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${resolvedDelay}ms`,
      });
    })
    .catch(rejectedDelay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${rejectedDelay}ms`,
      });
    })
    .finally(() => {
      submitButton.disabled = false;
      form.reset();
    });
});
