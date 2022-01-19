import { formValidation } from './validateForm.js';
import { postData } from './httpFetch/postData.js';
import { adminLoginUrl, loginUrl } from './httpFetch/urls.js';
import { authenticateRoute } from './routAuth.js';
let pathName = location.pathname;
const pathNames = [localStorage.getItem('path')];
localStorage.setItem('path', pathName);
pathNames.push(pathName);
if (pathNames[0] !== pathNames[1]) {
  authenticateRoute(pathName);
}
const displayErr = (data) => {
  console.log(data);
  const erro = document.getElementById('errMessage');
  erro.innerHTML = '';
  erro.innerHTML = Object.values(data);
};
window.login = async () => {
  const erro = document.getElementById('errMessage');
  erro.innerHTML = 'Loading...';
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
        localStorage.setItem('user', JSON.stringify(user.user));
        localStorage.setItem('packages', JSON.stringify(user.packages));
        window.location.href = '/user';
      }
    } else {
      const admin = await postData(adminLoginUrl, data);
      if (admin.errMessage) {
        displayErr(admin);
      } else {
        localStorage.setItem('admin', JSON.stringify(admin.admin));
        localStorage.setItem('users', JSON.stringify(admin.users));
        localStorage.setItem('packages', JSON.stringify(admin.packages));
        window.location.href = '/admin';
      }
    }
  }
};

window.clearErr = (e) => {
  e.style.border = '1px solid lightgreen';
  const small = e.parentElement.querySelector('small');
  small.style.visibility = 'hidden';
};
