import { packageDisplay } from '../packages/displayPackage.js';
import { authenticateRoute } from '../routAuth.js';
let pathName = location.pathname;
const pathNames = [localStorage.getItem('path')];
localStorage.setItem('path', pathName);
pathNames.push(pathName);
if (pathNames[0] !== pathNames[1]) {
  if (pathNames[0] !== '/admin') {
    authenticateRoute(pathName);
  }
}
const { _name, _username, _email, _status, admin_token } = JSON.parse(
  localStorage.getItem('admin')
);
const users = JSON.parse(localStorage.getItem('users'));
const packages = JSON.parse(localStorage.getItem('packages'));
let userul = '';
const containerdiv = document.getElementById('usersContainer');
const container = containerdiv.querySelector('ul');
const newPackages = document.getElementById('newPackages');
const adminFetchPackages = (cond) => {
  const packages = JSON.parse(localStorage.getItem('packages'));
  if (!admin_token) {
    window.location.href = '/login';
  } else {
    const packag = packages.filter((packag) => packag._status === cond);
    const displayPackage = packageDisplay(packag);
    newPackages.innerHTML = displayPackage;
    newPackages.classList.toggle('open');
  }
};
window.displayAdmin = () => {
  const profile = document.getElementById('userProfile');
  const adminProfile = ` <img
          src="/images/Lagos4.jpg"
          alt="profile picture"
          class="profile-img"
        />
        <div class="profile-content">
          <h1>${_name}</h1>
          <ul>
            <li id="adminname">${_username}</li>
            <li>${_email}</li>
            <li>${_status}</li>
          </ul>
        </div>`;
  profile.innerHTML = adminProfile;
};
window.fetchUsers = () => {
  userul = '';
  users.forEach((user) => {
    userul += `<li>
        <div>
        <div class="userDetails">
          <h2>${user._name}</h2>
          <p>${user._username}</p>
          <p>${user._email}</p>
          <button onclick="adminFetchUserPackage(this)" value= "${user._username}" id="${user.users_id}">packages</button>
          <button onclick="adminDeleteUser(this)" value= "${user._username}" id="${user.users_id}">delete user</button>
          <div style="font-weight:800;text-align:center;color:red;"class="userCont" id="userConts${user.users_id}"></div>
        </div>
        <div class="userCont" id="userCont${user.users_id}"></div>
        </div>
      </li>`;
  });
  container.innerHTML = userul;
  containerdiv.classList.toggle('open');
};
window.adminFetchUserPackage = (e) => {
  const packages = JSON.parse(localStorage.getItem('packages'));
  const username = e.value;
  const id = e.id;
  const userCont = `userCont${id}`;
  const newPackages = document.getElementById(userCont);
  const packag = packages.filter((packag) => packag._username === username);
  newPackages.innerHTML = packageDisplay(packag);
  newPackages.classList.toggle('open');
};
window.adminDeleteUser = (e) => {
  const username = e.value;
  const id = parseInt(e.id);
  const userCont = `userConts${id}`;
  const newPackages = document.getElementById(userCont);
  console.log(newPackages.innerHTML);
  if (newPackages.innerHTML === 'User deleted') {
    newPackages.classList.toggle('open');
  } else {
    fetch(
      `https://akera-logistics.herokuapp.com/api/v1/users/${_email}/${admin_token}/${username}/${id}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        newPackages.innerHTML = 'User deleted';
        newPackages.classList.toggle('open');
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
window.adminDeletePackage = (e) => {
  const sibling = e.parentElement.parentElement.previousElementSibling;
  const button = sibling.querySelector('button');
  console.log(button);
  const stat = e.parentElement.querySelector('div');
  const status = stat.querySelectorAll('p')[3].innerHTML;
  const username = e.value;
  const id = parseInt(e.id);
  fetch(
    `https://akera-logistics.herokuapp.com/api/v1/users/${_email}/${admin_token}/${username}/packages/${id}/${'At the location'}`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.removeItem('packages');
      localStorage.setItem('packages', JSON.stringify(data));
      if (button !== null) {
        button.click();
        button.click();
      } else {
        adminFetchPackages(status);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
window.getPackage = (e) => {
  localStorage.removeItem('package');
  const parcelId = parseInt(e.id);
  const packag1 = packages.filter((packag) => packag.parcel_id === parcelId);
  localStorage.setItem('package', JSON.stringify(packag1[0]));
  window.location.href = '/package';
};
window.logOut = () => {
  localStorage.clear();
  window.location.href = '/';
};
window.toggleMenu = () => {
  const navLink = document.querySelector('.nav-link');
  navLink.classList.toggle('open');
};
window.showPackages = () => {
  const packages = document.querySelector('.packageContainer');
  packages.classList.toggle('open');
};
window.fetchNewPackages = () => {
  adminFetchPackages('Ready for pickup');
};

window.fetchPackagesInTransit = () => {
  adminFetchPackages('In transit');
};

window.fetchDeliveredPackages = () => {
  adminFetchPackages('Delivered');
};
