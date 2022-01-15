import { postData } from '../httpFetch/postData.js';
import { postPackageUrl } from '../httpFetch/urls.js';
import { authenticateRoute, pathNames } from '../routAuth.js';
import { formValidation } from '../validateForm.js';
const pathName = pathNames();
if (pathName[0] !== pathName[1]) {
  console.log(pathName);
  authenticateRoute(pathName[1]);
}
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
    data['username'] = user.user._username;
    const postedData = await postData(postPackageUrl, data);
    console.log(postedData);
    localStorage.removeItem('package');
    localStorage.setItem('package', JSON.stringify(postedData));
    window.location.href = '/package';
  }
};
window.clearErr = (e) => {
  e.style.border = '1px solid lightgreen';
  const small = e.parentElement.querySelector('small');
  small.style.visibility = 'hidden';
};
