import { formValidation } from './validateForm.js';
import { postData } from './httpFetch/postData.js';
import { displayErr } from './errMessages.js';
import { adminLoginUrl, loginUrl } from './httpFetch/urls.js';
import { authenticateRoute } from './routAuth.js';
let pathName = location.pathname;
const pathNames = [localStorage.getItem('path')];
localStorage.setItem('path', pathName);
pathNames.push(pathName);
console.log(pathName);
if (pathNames[0] !== pathNames[1] && pathNames[1] === '/login') {
  authenticateRoute(pathName);
}
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
        localStorage.setItem('user', JSON.stringify(user.user));
        localStorage.setItem('packages', JSON.stringify(user.packages));
        localStorage.setItem('token', JSON.stringify(user.user.auth_token));
        window.location.href = '/user';
      }
    } else {
      const admin = await postData(adminLoginUrl, data);
      if (admin.errMessage) {
        displayErr(admin);
      } else {
        localStorage.setItem('admin', JSON.stringify(admin));
        localStorage.setItem('users', JSON.stringify(user.user));
        localStorage.setItem('packages', JSON.stringify(packages));
        localStorage.setItem('admtoken', JSON.stringify(user.user.admin_token));
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
