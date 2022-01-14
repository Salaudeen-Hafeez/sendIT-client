import { packageDisplay } from '../packages/displayPackage.js';

const { admin, users, packages } = JSON.parse(localStorage.getItem('admin'));
let userul = '';
const containerdiv = document.getElementById('usersContainer');
const container = containerdiv.querySelector('ul');
window.displayAdmin = () => {
  const profile = document.getElementById('userProfile');
  const adminProfile = ` <img
          src="/images/Lagos4.jpg"
          alt="profile picture"
          class="profile-img"
        />
        <div class="profile-content">
          <h1>${admin._name}</h1>
          <ul>
            <li id="adminname">${admin._username}</li>
            <li>${admin._email}</li>
            <li>${admin._status}</li>
          </ul>
        </div>`;
  profile.innerHTML = adminProfile;
};
window.fetchUsers = () => {
  console.log(users);
  users.forEach((user) => {
    userul += `<li>
        <div>
        <div class="userDetails">
          <h2>${user._name}</h2>
          <p>${user._username}</p>
          <p>${user._email}</p>
          <button onclick="adminFetchUserPackage(this)" value= "${user._username}" id="${user.users_id}">packages</button>
          <button onclick="adminDeleteUser(this)" value= "${user._username}" id="${user.users_id}">delete user</button>
        </div>
        <div class="userCont" id="userCont${user.users_id}"></div>
        </div>
      </li>`;
  });
  container.innerHTML = userul;
  containerdiv.classList.toggle('open');
};
window.adminFetchUserPackage = (e) => {
  const username = e.value;
  const id = e.id;
  const userCont = `userCont${id}`;
  const newPackages = document.getElementById(userCont);
  const packag = packages.filter((packag) => packag._username === username);
  newPackages.innerHTML = packageDisplay(packag);
  newPackages.classList.toggle('open');
};
window.getPackage = (e) => {
  localStorage.removeItem('package');
  console.log(e);
  const parcelId = e.id;
  console.log(parcelId);
  const packag1 = packages.filter((packag) => packag.parcel_id === parcelId);
  localStorage.setItem('package', JSON.stringify(packag1));
  //window.location.href = '/package';
};
window.logOut = () => {
  localStorage.clear();
  window.location.href = '/';
};
