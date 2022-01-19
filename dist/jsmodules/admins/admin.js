import { putPackage } from '../httpFetch/putData.js';
import { packageDisplay } from '../packages/displayPackage.js';
import { authenticateRoute } from '../routAuth.js';
let pathName = location.pathname;
const pathNames = [localStorage.getItem('path')];
localStorage.setItem('path', pathName);
pathNames.push(pathName);
if (pathNames[0] !== pathNames[1]) {
  authenticateRoute(pathName);
}
const geocodeAddress = async (geocoder, address) => {
  let geocodeResult = await geocoder
    .geocode({ address })
    .then(({ results }) => {
      console.log(results);
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
const admin = JSON.parse(localStorage.getItem('admin'));
const geocoder = new google.maps.Geocoder();
const service = new google.maps.DistanceMatrixService();
const packages = JSON.parse(localStorage.getItem('packages'));
let userul = '';
const containerdiv = document.getElementById('usersContainer');
const container = containerdiv.querySelector('ul');
const newPackages = document.getElementById('newPackages');
const adminFetchPackages = (cond) => {
  const packages = JSON.parse(localStorage.getItem('packages'));
  if (admin !== null && !admin.admin_token) {
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
  const users = JSON.parse(localStorage.getItem('users'));
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
  fetch(
    `https://akera-logistics.herokuapp.com/api/v1/users/${admin._email}/${admin.admin_token}/${username}/${id}`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.setItem('users', JSON.stringify(data));
      window.fetchUsers();
      window.fetchUsers();
    })
    .catch((err) => {
      console.log(err);
    });
};

window.adminDeletePackage = (e) => {
  const sibling =
    e.parentElement.parentElement.parentElement.previousElementSibling;
  const button = sibling.querySelector('button');
  const stat = e.parentElement.parentElement.querySelector('div');
  const status = stat.querySelectorAll('p')[3].innerHTML;
  const username = e.value;
  const id = parseInt(e.id);
  fetch(
    `https://akera-logistics.herokuapp.com/api/v1/users/${admin._email}/${
      admin.admin_token
    }/${username}/packages/${id}/${'At the location'}`,
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
window.fetchCanceledPackages = () => {
  adminFetchPackages('Order Canceled');
};
window.updatePackage = async (e) => {
  const id = parseInt(e.id);
  const locatP = e.parentElement.parentElement.querySelectorAll('p');
  const userUpdateUrl = `https://akera-logistics.herokuapp.com/api/v1/users/${admin._email}/${admin.users_id}/${admin.admin_token}/packages/${id}`;
  const input = prompt(
    'update the package location and status',
    'new location - In transit/Delivered'
  );
  const updData = input.split('-');
  if (input !== null && updData.length === 2) {
    const packag = packages.filter((pack) => pack.parcel_id === id);
    const { _status, _destination } = packag[0];
    if (_status === 'Order Canceled') {
      alert('Order has been canceled');
    } else {
      const { add1: add2 } = await geocodeAddress(geocoder, updData[0]);
      const add = [_destination, add2];
      const distMetrix = await getDistance(service, add);
      if (distMetrix.rows[0].elements[0].status === 'OK') {
        const data = { _location: add2, _status: updData[1].trim() };
        console.log(data);
        const updPack = await putPackage(userUpdateUrl, data);
        console.log(updPack.package);
        localStorage.setItem('packages', JSON.stringify(updPack.packages));
        locatP[1].innerHTML = `<span style="font-weight:800">Location:</span> ${updPack.package._location}`;
        locatP[3].innerHTML = `<span style="font-weight:800; color:#165516">${updPack.package._status}`;
      } else {
        alert('address entered not found');
      }
    }
  } else {
    alert('Please enter correct data, exp: Adewusi street, lagos - In transit');
  }
};
