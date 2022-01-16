import { postData } from '../httpFetch/postData.js';
import { postPackageUrl } from '../httpFetch/urls.js';
import { authenticateRoute } from '../routAuth.js';
import { formValidation } from '../validateForm.js';
let pathName = location.pathname;
const pathNames = [localStorage.getItem('path')];
localStorage.setItem('path', pathName);
pathNames.push(pathName);
if (pathNames[0] !== pathNames[1]) {
  authenticateRoute(pathName);
}
window.toggleMenu = () => {
  const navLink = document.querySelector('.nav-link');
  navLink.classList.toggle('open');
};
const input = document.getElementById('location');
const input2 = document.getElementById('destination');
new google.maps.places.Autocomplete(input);
new google.maps.places.Autocomplete(input2);
const user = JSON.parse(localStorage.getItem('user'));
window.submitPackage = async () => {
  const input = document
    .getElementById('inputContainer')
    .querySelectorAll('input');
  const { data, emptyInput } = formValidation(input);
  if (!emptyInput) {
    data['username'] = user._username;
    const postedData = await postData(postPackageUrl, data);
    console.log(postedData);
    localStorage.removeItem('package');
    localStorage.removeItem('packages');
    localStorage.setItem('package', JSON.stringify(postedData.package));
    localStorage.setItem('packages', JSON.stringify(postedData.packages));
    window.location.href = '/package';
  }
};
window.clearErr = (e) => {
  e.style.border = '1px solid lightgreen';
  const small = e.parentElement.querySelector('small');
  small.style.visibility = 'hidden';
};
