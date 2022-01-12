import { fetchData } from '../httpFetch/fetchData.js';
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
window.logOut = () => {
  localStorage.clear();
  window.location.href = '/';
};
window.displayUserPackages = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user.user.auth_token) {
    window.location.href = '/login';
  } else {
    createUserPackage();
  }
};
