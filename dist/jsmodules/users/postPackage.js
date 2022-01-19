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
const input = document.getElementById('location');
const input2 = document.getElementById('destination');
new google.maps.places.Autocomplete(input);
new google.maps.places.Autocomplete(input2);
const service = new google.maps.DistanceMatrixService();
const user = JSON.parse(localStorage.getItem('user'));
const getDistance = async (service, add) => {
  const request = {
    origins: [add[0]],
    destinations: [add[1]],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false,
  };
  // get distance matrix response
  let distance = await service.getDistanceMatrix(request).then((response) => {
    return response;
  });
  return distance;
};
const toNaira = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'NGN',
});
const cost = (dist, dur) => {
  let multiplier;
  switch (dist) {
    case dist <= 10000:
      multiplier = 400;
      break;
    case 10000 <= dist <= 30000:
      multiplier = 250;
      break;
    case 30000 <= dist <= 70000:
      multiplier = 190;
      break;
    case 70000 <= dist <= 1200000:
      multiplier = 120;
      break;
    case 1200000 <= dist <= 250000:
      multiplier = 60;
      break;
    default:
      multiplier = 40;
      break;
  }
  const totalcost = ((dist + dur) / 1000) * multiplier;
  const naira = toNaira.format(Math.round(totalcost));
  return naira;
};
window.toggleMenu = () => {
  const navLink = document.querySelector('.nav-link');
  navLink.classList.toggle('open');
};

window.submitPackage = async () => {
  const input = document
    .getElementById('inputContainer')
    .querySelectorAll('input');
  const { data, emptyInput } = formValidation(input);
  if (!emptyInput) {
    const add = [data.location, data.destination];
    const distMetrix = await getDistance(service, add);
    console.log(distMetrix);
    const { distance, duration, status } = distMetrix.rows[0].elements[0];
    if (status === 'OK') {
      const tripFare = cost(distance.value, duration.value);
      data['username'] = user._username;
      data['cost'] = tripFare;
      const postedData = await postData(postPackageUrl, data);
      console(postedData);
      // localStorage.removeItem('package');
      // localStorage.removeItem('packages');
      // localStorage.setItem('package', JSON.stringify(postedData.package));
      // localStorage.setItem('packages', JSON.stringify(postedData.packages));
      // window.location.href = '/package';
    } else {
      alert('The address entered not found');
    }
  }
};
window.clearErr = (e) => {
  e.style.border = '1px solid lightgreen';
  const small = e.parentElement.querySelector('small');
  small.style.visibility = 'hidden';
};
