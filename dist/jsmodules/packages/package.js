import { putPackage } from '../httpFetch/putData.js';
import { adminUpdateUrl, userUpdateUrl } from '../httpFetch/urls.js';
import { authenticateRoute } from '../routAuth.js';
import { formValidation } from '../validateForm.js';
import { createPackage } from './createPackages.js';
let pathName = location.pathname;
const pathNames = [localStorage.getItem('path')];
localStorage.setItem('path', pathName);
pathNames.push(pathName);
if (pathNames[0] !== pathNames[1]) {
  authenticateRoute(pathName);
}
// Google map API call and services
const geocodeAddress = async (geocoder, address) => {
  let geocodeResult = await geocoder
    .geocode({ address })
    .then(({ results }) => {
      return {
        add1: results[0].formatted_address,
        add2: results[0].geometry.location,
      };
    })
    .catch((e) =>
      alert(`Geocode was not successful for the following reason: ${e}`)
    );
  return geocodeResult;
};
const cost = (dist, dur) => {
  let multiplier;
  switch (dist) {
    case dist <= 5000:
      multiplier = 300;
      break;
    case 5000 <= dist <= 10000:
      multiplier = 250;
      break;
    case 10000 <= dist <= 50000:
      multiplier = 200;
      break;
    case 50000 <= dist <= 100000:
      multiplier = 190;
      break;
    case 100000 <= dist <= 200000:
      multiplier = 150;
      break;
    default:
      multiplier = 100;
      break;
  }
  const totalcost = ((dist + dur) / 1000) * multiplier;
  console.log(totalcost);
  return totalcost;
};
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
const admin = JSON.parse(localStorage.getItem('admin'));

const { _location, _destination, _status } = JSON.parse(
  localStorage.getItem('package')
);
const bounds = new google.maps.LatLngBounds();
const map = new google.maps.Map(document.getElementById('map'), {
  center: { lat: 6.5095, lng: 3.3711 },
  zoom: 8,
});
// initialize services
const geocoder = new google.maps.Geocoder();
const service = new google.maps.DistanceMatrixService();
const addresses = [_destination, _location];
const add = [];
addresses.forEach(async (address) => {
  const { add1, add2 } = await geocodeAddress(geocoder, address);
  add.push(add1);
  map.setCenter(add2);
  new google.maps.Marker({
    map,
    position: add2,
  });
});
window.clearErr = (e) => {
  e.style.border = '1px solid lightgreen';
  const small = e.parentElement.querySelector('small');
  small.style.visibility = 'hidden';
};
window.loadPackage = async () => {
  const packages = document.getElementById('userProfile');
  const status = document.getElementById('updateStatus');
  const location = document.getElementById('location');
  const heading = document.getElementById('heading');
  if (admin !== null) {
    status.classList.toggle('open');
    location.innerHTML = 'New location';
    heading.innerHTML = 'Fill the form below to update the package status';
  }
  const distMetrix = await getDistance(service, add);
  // const dist = distMetrix.rows[0].elements[0].distance.text.replace(/\D/g, '');
  // const durat = distMetrix.rows[0].elements[0].duration.text.replace(/\D/g, '');

  const { distance, duration } = distMetrix.rows[0].elements[0];
  const tripFare = cost(distance.value, duration.value);
  console.log(tripFare);
  const metrixData = {
    distance: distance.text,
    duration: duration.text,
    fare: tripFare,
  };
  const packageData = createPackage(metrixData);
  packages.innerHTML = packageData;
};
window.okay = () => {
  if (admin !== null) {
    window.location.href = '/admin';
  } else {
    window.location.href = '/user';
  }
};
window.cancelOrder = async () => {
  if (_status === 'Order Cancelled') {
    alert('Order has been cancelled');
  } else {
    const data = { _status: 'Order Cancelled' };
    const deletedPackage = await putPackage(userUpdateUrl, data);
    localStorage.setItem('package', JSON.stringify(deletedPackage.package));
    localStorage.setItem('packages', JSON.stringify(deletedPackage.packages));
    window.location.reload();
  }
};
window.updateDestination = async () => {
  const input = document.getElementById('newDestination');
  const select1 = document.getElementById('newStatus');
  const { data: data1, emptyInput } = formValidation([input, select1]);
  if (!emptyInput) {
    if (_status === 'Order Cancelled') {
      alert('Order has been cancelled');
    } else if (admin !== null) {
      const data = {
        _location: data1.destination,
        _status: data1.status,
      };
      const updatedPackage = await putPackage(adminUpdateUrl, data);
      localStorage.setItem('package', JSON.stringify(updatedPackage.package));
      localStorage.setItem('packages', JSON.stringify(updatedPackage.packages));
      window.location.reload();
    } else {
      const data = { _destination: data1.destination };
      const { add1: add2 } = await geocodeAddress(geocoder, data1.destination);
      const add = [_location, add2];
      const distMetrix = await getDistance(service, add);
      if (distMetrix.rows[0].elements[0].status === 'OK') {
        const updPack = await putPackage(userUpdateUrl, data);
        console.log(updPack);
        localStorage.setItem('package', JSON.stringify(updPack.package));
        localStorage.setItem('packages', JSON.stringify(updPack.packages));
        window.location.reload();
      } else {
        const errMessage = document.getElementById('errMessage');
        errMessage.innerHTML = 'Destination address entered not found';
      }
    }
  }
};

const input3 = document.getElementById('newDestination');
new google.maps.places.Autocomplete(input3);

window.autoCompleteAddress = function () {
  const input = document.getElementById('location');
  const input2 = document.getElementById('destination');
  new google.maps.places.Autocomplete(input);
  new google.maps.places.Autocomplete(input2);
};
