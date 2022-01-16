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
const user = JSON.parse(localStorage.getItem('user'));
const packages = JSON.parse(localStorage.getItem('packages'));
const admin = JSON.parse(localStorage.getItem('admin'));
const packagesDiv = document.getElementById('packages');

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
    packagesDiv.innerHTML = packageDisplay(packages);
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
      packagesDiv.innerHTML = packageDisplay(packageInTrans);
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
// window.getPackage = (td) => {
//   const parcelId = parseInt(td.value);
//   console.log(td);
//   console.log(parcelId);
//   const packag = packages.filter(
//     (packageData) => packageData.parcel_id === parcelId
//   );
//   localStorage.removeItem('package');
//   localStorage.setItem('package', JSON.stringify(packag[0]));
//   //window.location.href = '/package';
// };
