import { createUserPackage } from '../packages/createPackages.js';

// Get the stored user data and create the user profile display
window.createProfile = () => {
  const user =
    JSON.parse(localStorage.getItem('user')) ||
    JSON.parse(localStorage.getItem('admin'));
  let profileData;
  if (user !== null) {
    if (user.user) {
      profileData = user.user;
    } else {
      profileData = user.admin;
    }
  }
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
};
window.toggleMenu = () => {
  const navLink = document.querySelector('.nav-link');
  navLink.classList.toggle('open');
};
window.logOut = async () => {
  localStorage.clear();
  if (!user) {
    window.location.href = '/';
  }
};
window.displayUserPackages = () => {
  const { user, packages } = JSON.parse(localStorage.getItem('user'));
  if (!user.auth_token) {
    window.location.href = '/login';
  } else {
    createUserPackage(packages);
  }
};

window.displayPendingPackage = () => {
  const { user, packages } = JSON.parse(localStorage.getItem('user'));
  if (!user.auth_token) {
    window.location.href = '/login';
  } else {
    const packageInTrans = packages.filter(
      (packag) => packag._status === 'In transit'
    );
    if (packageInTrans.length === 0) {
      const packag = { errMessage: 'You do not have package in transit' };
      createUserPackage(packag);
    } else {
      createUserPackage(packageInTrans);
    }
  }
};
window.getPackage = (td) => {
  const parcelId = parseInt(td.value);
  const { packages } = JSON.parse(localStorage.getItem('user'));
  const packag = packages.filter(
    (packageData) => packageData.parcel_id === parcelId
  );
  localStorage.setItem('package', JSON.stringify(packag[0]));
  window.location.href = '/package';
};
