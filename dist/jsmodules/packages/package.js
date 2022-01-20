import { putPackage } from '../httpFetch/putData.js';
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
const user = JSON.parse(localStorage.getItem('user'));
const admin = JSON.parse(localStorage.getItem('admin'));
const packag = JSON.parse(localStorage.getItem('package'));
const map = new google.maps.Map(document.getElementById('map'), {
  center: { lat: 6.5095, lng: 3.3711 },
  zoom: 8,
});
// initialize services
const geocoder = new google.maps.Geocoder();
const service = new google.maps.DistanceMatrixService();
const add = [];
let addresses;
if (packag) {
  addresses = [packag._destination, packag._location];
  addresses.forEach(async (address) => {
    const { add1, add2 } = await geocodeAddress(geocoder, address);
    add.push(add1);
    map.setCenter(add2);
    new google.maps.Marker({
      map,
      position: add2,
    });
  });
}
window.toggleMenu = () => {
  const navLink = document.querySelector('.nav-link');
  navLink.classList.toggle('open');
};
window.loadPackage = async () => {
  const packages = document.getElementById('packagePage1');
  const packages2 = document.getElementById('packagePage2');
  const distMetrix = await getDistance(service, add);
  const { distance, duration } = distMetrix.rows[0].elements[0];
  const metrixData = {
    distance: distance.text,
    duration: duration.text,
    fare: packag._cost,
  };
  const { tableBody, tableBody1 } = createPackage(metrixData);
  packages.innerHTML = tableBody;
  packages2.innerHTML = tableBody1;
};
window.okay = async () => {
  const locatn = document.getElementById('location');
  const status = document.getElementById('status');
  const location1 = locatn.value;
  let data = {};
  let key = '_destination';
  let email, userId, token;
  const { _status, _location, parcel_id: id } = packag;
  if (!user) {
    data['_status'] = status.options[status.selectedIndex].value;
    key = '_location';
    email = admin._email;
    userId = admin.users_id;
    token = admin.admin_token;
  } else {
    email = user._email;
    userId = user.users_id;
    token = user.auth_token;
  }
  console.log(location1);
  const userUpdateUrl = `https://akera-logistics.herokuapp.com/api/v1/users/${email}/${userId}/${token}/packages/${id}`;
  if (_status === 'Order Canceled') {
    alert('Order has been canceled');
  } else {
    const { add1: add2 } = await geocodeAddress(geocoder, location1);
    const add = [_location, add2];
    const distMetrix = await getDistance(service, add);
    if (distMetrix.rows[0].elements[0].status === 'OK') {
      const newDest = { ...data, [key]: add2 };
      console.log(newDest);
      const packag = await putPackage(userUpdateUrl, newDest);
      localStorage.setItem('packages', JSON.stringify(packag.packages));
      window.location.reload();
    } else {
      alert('Destination address entered not found');
    }
  }

  // if (!user) {
  //   window.location.href = '/admin';
  // } else {
  //   window.location.href = '/user';
  // }
};
window.canceleOrder = async () => {
  if (user) {
    const userUpdateUrl = `https://akera-logistics.herokuapp.com/api/v1/users/${user._email}/${user.users_id}/${user.auth_token}/packages/${packag.parcel_id}`;
    if (packag._status === 'Order Canceled') {
      alert('Order has been canceled');
    } else {
      const data = { _status: 'Order Canceled' };
      const deletedPackage = await putPackage(userUpdateUrl, data);
      localStorage.setItem('package', JSON.stringify(deletedPackage.package));
      localStorage.setItem('packages', JSON.stringify(deletedPackage.packages));
      window.location.reload();
    }
  }
};
