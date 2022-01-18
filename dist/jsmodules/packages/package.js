import { putPackage } from '../httpFetch/putData.js';
import { userUpdateUrl } from '../httpFetch/urls.js';
import { authenticateRoute } from '../routAuth.js';
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
const toNaira = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'NGN',
});
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
      multiplier = 190;
      break;
    case 50000 <= dist <= 100000:
      multiplier = 120;
      break;
    case 100000 <= dist <= 200000:
      multiplier = 60;
      break;
    default:
      multiplier = 30;
      break;
  }
  const totalcost = ((dist + dur) / 1000) * multiplier;
  const naira = toNaira.format(Math.round(totalcost));
  console.log(naira);
  return naira;
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
window.loadPackage = async () => {
  const packages = document.getElementById('packagePage1');
  const packages2 = document.getElementById('packagePage2');
  const distMetrix = await getDistance(service, add);
  const { distance, duration } = distMetrix.rows[0].elements[0];
  const tripFare = cost(distance.value, duration.value);
  const metrixData = {
    distance: distance.text,
    duration: duration.text,
    fare: tripFare,
  };
  const { tableBody, tableBody1 } = createPackage(metrixData);
  packages.innerHTML = tableBody;
  packages2.innerHTML = tableBody1;
};
window.okay = () => {
  if (admin !== null) {
    window.location.href = '/admin';
  } else {
    window.location.href = '/user';
  }
};
window.canceleOrder = async () => {
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
