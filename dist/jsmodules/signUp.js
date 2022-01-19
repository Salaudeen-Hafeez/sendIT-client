import { postData } from './httpFetch/postData.js';
import { postAdmUrl, postUsrUrl } from './httpFetch/urls.js';
import { formValidation } from './validateForm.js';
window.signUp = async () => {
  const erro = document.getElementById('errMessage');
  erro.innerHTML = '';
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
        erro.innerHTML = adminData.errMessage;
      } else {
        localStorage.setItem('admin', JSON.stringify(adminData));
        window.location.href = '/admin';
      }
    } else {
      const userData = await postData(postUsrUrl, data);
      if (!userData.errMessage) {
        localStorage.setItem('user', JSON.stringify(userData));
        window.location.href = '/user';
      } else {
        erro.innerHTML = userData.errMessage;
      }
    }
  }
};
window.toggleMenu = () => {
  const navLink = document.querySelector('.nav-link');
  navLink.classList.toggle('open');
};
window.clearErr = (e) => {
  e.style.border = '1px solid lightgreen';
  const small = e.parentElement.querySelector('small');
  small.style.visibility = 'hidden';
};
