import { putPackage } from '../httpFetch/putData.js';
import { packageDisplay } from '../packages/displayPackage.js';
import { authenticateRoute } from '../routAuth.js';

// Get the stored user data and create the user profile display
let pathName = location.pathname;
const pathNames = [localStorage.getItem('path')];
localStorage.setItem('path', pathName);
pathNames.push(pathName);
console.log(pathNames);
if (pathNames[0] !== pathNames[1]) {
  authenticateRoute(pathName);
}

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
const geocoder = new google.maps.Geocoder();
const service = new google.maps.DistanceMatrixService();
const user = JSON.parse(localStorage.getItem('user'));
const packages = JSON.parse(localStorage.getItem('packages'));
const admin = JSON.parse(localStorage.getItem('admin'));
const packagesDiv = document.getElementById('packages');
const { users_id, _email, auth_token } = user;
window.createProfile = () => {
  let profileData;
  if (user !== null || admin !== null) {
    profileData = user || admin;
    const profile = document.getElementById('userProfile');
    const userProfile = ` <img
          src="/images/Lagos4.jpg"
          alt="profile picture"
          class="profile-img"
        />
        <div class="profile-content">
          <h1>${profileData._name}</h1>
          <ul>
            <li id="username">${profileData._username}</li>
            <li>${profileData._email}</li>
            <li>${profileData._status}</li>
            <li><a onclick="displayUserPackages()">My packages</a></li>
            <li><a onclick="displayPendingPackage()">Pending packages</a></li>
          </ul>
        </div>`;
    profile.innerHTML = userProfile;
  }
};
window.toggleMenu = () => {
  const navLink = document.querySelector('.nav-link');
  navLink.classList.toggle('open');
};
window.logOut = async () => {
  localStorage.clear();
  window.location.href = '/';
};
window.displayUserPackages = () => {
  if (user !== null && !user.auth_token) {
    window.location.href = '/login';
  } else {
    if (packages.length === 0) {
      const packag = { errMessage: 'You do not have packages' };
      packagesDiv.innerHTML = packageDisplay(packag);
    } else {
      packagesDiv.innerHTML = packageDisplay(packages, 'change destination');
    }
  }
};

window.displayPendingPackage = () => {
  if (user !== null && !user.auth_token) {
    window.location.href = '/login';
  } else {
    const packageInTrans = packages.filter(
      (packag) => packag._status === 'In transit'
    );
    if (packageInTrans.length === 0) {
      const packag = { errMessage: 'You do not have package in transit' };
      packagesDiv.innerHTML = packageDisplay(packag);
    } else {
      packagesDiv.innerHTML = packageDisplay(
        packageInTrans,
        'change destination'
      );
    }
  }
};
window.getPackage = (e) => {
  localStorage.removeItem('package');
  const parcelId = parseInt(e.id);
  const packag1 = packages.filter((packag) => packag.parcel_id === parcelId);
  localStorage.setItem('package', JSON.stringify(packag1[0]));
  window.location.href = '/package';
};
window.changeLocation = async (e) => {
  const id = parseInt(e.id);
  const userUpdateUrl = `https://akera-logistics.herokuapp.com/api/v1/users/${_email}/${users_id}/${auth_token}/packages/${id}`;
  const input = prompt('Enter new destination');
  if (input !== null) {
    const packag = packages.filter((pack) => pack.parcel_id === id);
    const { _status, _location } = packag[0];
    if (_status === 'Order Cancelled') {
      alert('Order has been cancelled');
    } else {
      const data = { _destination: input };
      const { add1: add2 } = await geocodeAddress(geocoder, input);
      const add = [_location, add2];
      const distMetrix = await getDistance(service, add);
      if (distMetrix.rows[0].elements[0].status === 'OK') {
        const updPack = await putPackage(userUpdateUrl, data);
        localStorage.setItem('packages', JSON.stringify(updPack.packages));
      } else {
        alert('Destination address entered not found');
      }
    }
  }
};
