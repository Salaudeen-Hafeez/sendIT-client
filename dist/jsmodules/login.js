import { formValidation } from './validateForm.js';
import { postData } from './httpFetch/postData.js';
import { displayErr, clearErr } from './errMessages.js';
window.login = async () => {
  localStorage.clear();
  const input = document
    .getElementById('inputContainer')
    .querySelectorAll('input');
  const email = input[0].value.trim().toLowerCase();
  const { data, emptyInput } = formValidation(input);
  if (!emptyInput) {
    if (!email.includes('@sendit.com')) {
      const user = await postData(loginUrl, data);
      if (user.errMessage) {
        displayErr(user);
      } else {
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/user';
      }
    } else {
      const admin = postData(adminLoginUrl, data);
      if (admin.errMessage) {
        displayErr(admin);
      } else {
        localStorage.setItem('admin', JSON.stringify(admin));
        window.location.href = '/admin';
      }
    }
  }
};

window.clearErr = clearErr(e);
