import { packageDisplay } from '../packages/displayPackage.js';

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
const admin = JSON.parse(localStorage.getItem('admin'));
window.createProfile = () => {
  let profileData;
  if (user !== null || admin !== null) {
    profileData = user || admin;
    const profile = document.getElementById('userProfile');
    const packagBtn = document.getElementById('packagesBtn');
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
          </ul>
        </div>`;
    const button = `<button class="shwPackages" onclick="displayUserPackages()">My Packages</button
          ><button class="shwPackages"onclick="displayPendingPackage()">Pending Packages</button>
          <ul id="packagesUl" class="packageUl"></ul>`;
    profile.innerHTML = userProfile;
    packagBtn.innerHTML = button;
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
  const packages = JSON.parse(localStorage.getItem('packages'));
  const packagesDiv = document.getElementById('packagesUl');
  if (user !== null && !user.auth_token) {
    window.location.href = '/login';
  } else {
    if (packages.length === 0) {
      const packag = { errMessage: 'You do not have packages' };
      packagesDiv.innerHTML = packageDisplay(packag);
    } else {
      packagesDiv.innerHTML = packageDisplay(packages, 'Cancele');
    }
  }
};

window.displayPendingPackage = () => {
  const packages = JSON.parse(localStorage.getItem('packages'));
  const packagesDiv = document.getElementById('packagesUl');
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
      packagesDiv.innerHTML = packageDisplay(packageInTrans, 'Cancele');
    }
  }
};
window.getPackage = (e) => {
  const packages = JSON.parse(localStorage.getItem('packages'));
  localStorage.removeItem('package');
  const parcelId = parseInt(e.id);
  const packag1 = packages.filter((packag) => packag.parcel_id === parcelId);
  localStorage.setItem('package', JSON.stringify(packag1[0]));
  window.location.href = '/package';
};
window.adminDeletePackage = (e) => {
  window.getPackage(e);
};
