import { postData } from '../httpFetch/postData.js';
import { postParcelUrl } from '../httpFetch/urls.js';
import { formValidation } from '../validateForm.js';

const input = document.getElementById('location');
const input2 = document.getElementById('destination');
const amountdiv = document.getElementById('amountCont');
new google.maps.places.Autocomplete(input);
new google.maps.places.Autocomplete(input2);
const service = new google.maps.DistanceMatrixService();
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
const cost = (dist, weight) => {
  let multiplier;
  switch (dist) {
    case dist <= 10000:
      multiplier = 100;
      break;
    case 10000 <= dist <= 30000:
      multiplier = dist/300;
      break;
    case 30000 <= dist <= 70000:
      multiplier = dist/700;
      break;
    case 70000 <= dist <= 1200000:
      multiplier = dist/1200;
      break;
    case 1200000 <= dist <= 250000:
      multiplier = dist/2500;
      break;
    default:
      multiplier = dist/4000;
      break;
  }

  const totalcost = weight * 5 * multiplier;
  const naira = toNaira.format(Math.round(totalcost));
  return naira;
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

window.showAmount = async (e) => {
  e.style.border = '1px solid lightgreen';
  const small = e.parentElement.querySelector('small');
  small.style.visibility = 'hidden';
  const input = document
    .getElementById('inputContainer')
    .querySelectorAll('input');
  const { data, emptyInput, frajileMultiplier } = formValidation(input);
  if (!emptyInput) {
    const add = [data.location, data.destination];
    const distMetrix = await getDistance(service, add);
    const { distance, status } = distMetrix.rows[0].elements[0];
    if (status === 'OK') {
      const weight = parseInt(data.weight) * frajileMultiplier
      const tripFare = cost(distance.value, weight);
      input[7].value = tripFare
      amountdiv.style.visibility = 'visible';
      amountdiv.style.height = 'auto';  
    }else {
      alert('The address entered not found');
    }
  }
};

window.submitPackage = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const erro = document.getElementById('errMessage');
  erro.innerHTML = '';
  const input = document
    .getElementById('inputContainer')
    .querySelectorAll('input');
  const { data, emptyInput } = formValidation(input);
  if (!emptyInput) {
    console.log(data)
    data['username'] = user._username;
    const postedData = await postData(postParcelUrl, data);
    if (!postedData.errMessage) {
      localStorage.removeItem('package');
      localStorage.removeItem('packages');
      localStorage.setItem('package', JSON.stringify(postedData.package));
      localStorage.setItem('packages', JSON.stringify(postedData.packages));
      //window.location.href = '/package';
    } else {
      erro.innerHTML = postedData.errMessage;
    }
  }
    
  }
  
  window.disableClick = () => {
  }
