import { signUpUser } from './httpFetch/postData.js';
import { postUsrUrl } from './httpFetch/urls.js';
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
    if (!data.email.includes('@sendit.com')) {
      delete data.password2;
      console.log(data);
      console.log(postUsrUrl);
      const userData = await signUpUser(postUsrUrl, data);
      if (!userData.errMessage) {
        localStorage.setItem('user', JSON.stringify(userData));
        //window.location.href = '/user';
      } else {
        erro.innerHTML = userData.errMessage;
      }
    } else {
      delete data.password2;
      const adminData = await signUpUser(postUsrUrl, data);
      if (!adminData.errMessage) {
        localStorage.setItem('admin', JSON.stringify(adminData));
        //window.location.href = '/admin';
      } else {
        erro.innerHTML = adminData.errMessage;
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
