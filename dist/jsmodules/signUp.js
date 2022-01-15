import { displayErr } from './errMessages.js';
import { postData } from './httpFetch/postData.js';
import { postAdmUrl, postUsrUrl } from './httpFetch/urls.js';
import { formValidation } from './validateForm.js';
window.signUp = async () => {
  localStorage.clear();
  const input = document
    .getElementById('inputContainer')
    .querySelectorAll('input');
  const { data, emptyInput } = formValidation(input);
  localStorage.setItem('newUser', JSON.stringify(data));
  if (!emptyInput) {
    if (data.email.includes('@sendit.com')) {
      const adminData = await postData(postAdmUrl, data);
      if (adminData.errMessage) {
        displayErr(data);
      } else {
        localStorage.setItem('admin', JSON.stringify(adminData));
        window.location.href = '/admin';
      }
    } else {
      const userData = await postData(postUsrUrl, data);
      if (userData.errMessage) {
        displayErr(data);
      } else {
        localStorage.setItem('user', JSON.stringify(userData));
        window.location.href = '/user';
      }
    }
  }
};
window.clearErr = (e) => {
  e.style.border = '1px solid lightgreen';
  const small = e.parentElement.querySelector('small');
  small.style.visibility = 'hidden';
};
