import { postData } from '../httpFetch/postData.js';
import { postPackageUrl } from '../httpFetch/urls.js';
import { formValidation } from '../validateForm.js';

window.submitPackage = async () => {
  const input = document
    .getElementById('inputContainer')
    .querySelectorAll('input');
  const { data, emptyInput } = formValidation(input);
  if (!emptyInput) {
    const postedData = await postData(postPackageUrl, data);
    localStorage.removeItem('package');
    localStorage.setItem('package', JSON.stringify(postedData));
    console.log(postedData);
    window.location.href = '/package';
  }
};
window.clearErr = (e) => {
  e.style.border = '1px solid lightgreen';
  const small = e.parentElement.querySelector('small');
  small.style.visibility = 'hidden';
};
