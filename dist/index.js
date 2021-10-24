// const apiKey = 'AIzaSyD9LtzkCH903RTWTMDehYnSmOVitAhBtwA';

// const sendEmail = (email, message) => {
//   Email.send({
//     Host: 'smtp.gmail.com',
//     Username: email,
//     Password: 'ozcmcdwqqojagogr',
//     To: 'amplifiedsalaudeenak21@gmail.com',
//     From: email,
//     Subject: 'Sendit Logistic',
//     Body: message,
//   }).then((message) => alert(message));
// };

const setErrorFor = (
  inp,
  message = `${inp.getAttribute('name')} can not be blank`
) => {
  inp.style.border = '1px solid red';
  const inputFeild = inp.parentElement;
  const small = inputFeild.querySelector('small');
  small.style.visibility = 'visible';
  small.style.color = 'red';
  small.innerHTML = message;
};

const formValidation = (input) => {
  const data = {};
  let emptyInput = '';
  input.forEach((inp) => {
    if (inp.value.trim() === '') {
      emptyInput = 'true';
      setErrorFor(inp);
    } else if (inp.getAttribute('name') === 'frajile') {
      if (inp.checked) {
        data[inp.getAttribute('name')] = 'the package is frajile';
      } else {
        data[inp.getAttribute('name')] = 'not frajile';
      }
    } else if (inp.getAttribute('name') === 'email') {
      data[inp.getAttribute('name')] = inp.value.trim().toLowerCase();
    } else if (inp.getAttribute('name') === 'password1') {
      if (data.password !== inp.value.trim()) {
        emptyInput = 'true';
        setErrorFor(inp, 'The password does not match');
      }
    } else {
      data[inp.getAttribute('name')] = inp.value.trim();
    }
  });
  return { emptyInput, data };
};

const clearErr = (e) => {
  e.style.border = '1px solid lightgreen';
  const small = e.parentElement.querySelector('small');
  small.style.visibility = 'hidden';
};
const usersData = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
};

const adminsData = () => {
  const admin = JSON.parse(localStorage.getItem('admin'));
  return admin;
};

const logOut = () => {
  localStorage.clear();
  window.location.href = '/';
};
const toggleMenu = () => {
  const navLink = document.querySelector('.nav-link');
  navLink.classList.toggle('open');
};

const openPackage = () => {
  window.location.href = 'package.html';
};
// Get the stored user data and create the user profile display
const createUser = () => {
  const user = usersData();
  const profile = document.getElementById('userProfile');
  const userProfile = ` <img
          src="/images/Lagos4.jpg"
          alt="profile picture"
          class="profile-img"
        />
        <div class="profile-content">
          <h1>${user._name}</h1>
          <ul>
            <li id="username">${user._username}</li>
            <li>${user._email}</li>
            <li>${user._status}</li>
            <li><a onclick="displayUserPackages()">My packages</a></li>
            <li><a onclick="displayPendingPackage()">Pending packages</a></li>
          </ul>
        </div>`;
  profile.innerHTML = userProfile;
};

const createAdmin = () => {
  const admin = adminsData();
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

const openUser = () => {
  const user = usersData();
  if (!(user.passwordErr || user.emailErr || user.joiErr)) {
    window.location.href = 'user.html';
  } else if (user.passwordErr) {
    const input = document.getElementById('password');
    setErrorFor(input, user.passwordErr);
  } else if (user.emailErr) {
    const input = document.getElementById('email');
    setErrorFor(input, user.emailErr);
  } else if (user.joiErr) {
    const input = document.getElementById('email');
    setErrorFor(input, user.joiErr);
  }
};

const openAdmin = () => {
  const admin = adminsData();
  if (!(admin.passwordErr || admin.emailErr || admin.joiErr)) {
    window.location.href = 'admin.html';
  } else if (admin.passwordErr) {
    const input = document.getElementById('password');
    setErrorFor(input, admin.passwordErr);
  } else if (admin.emailErr) {
    const input = document.getElementById('email');
    setErrorFor(input, admin.emailErr);
  } else if (admin.joiErr) {
    const input = document.getElementById('email');
    setErrorFor(input, admin.joiErr);
  }
};
// Login the user and store the return user's data in localStorage
const fetchUserData = (data) => {
  fetch('https://sendit-logistic-2021.herokuapp.com/api/v1/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.clear();
      localStorage.setItem('user', JSON.stringify(data));
      setTimeout(openUser, 1200);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Login the user and store the return admin's data in localStorage
const fetchAdminData = (data) => {
  fetch(
    'https://sendit-logistic-2021.herokuapp.com/api/v1/users/admins/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.clear();
      localStorage.setItem('admin', JSON.stringify(data));
      setTimeout(openAdmin, 1200);
    })
    .catch((err) => {
      console.log(err);
    });
};

const login = () => {
  const input = document
    .getElementById('inputContainer')
    .querySelectorAll('input');
  const email = input[0].value.trim().toLowerCase();
  const validatedLogin = formValidation(input);
  if (!validatedLogin.emptyInput) {
    if (!email.includes('@sendit.com')) {
      fetchUserData(validatedLogin.data);
    } else {
      fetchAdminData(validatedLogin.data);
    }
  }
};

const loginNewUser = () => {
  const newUser = JSON.parse(localStorage.getItem('newUser'));
  const data = { email: newUser.email, password: newUser.password };
  fetchUserData(data);
  setTimeout(openUser, 1200);
};

const displayUserProfile = () => {
  setTimeout(createUser, 1000);
};

const displayAdmin = () => {
  setTimeout(createAdmin, 1000);
};
// Use the username from the stored user to get the user packages

const fetchPackages = () => {
  const user = usersData();
  const { _email, auth_token, users_id, _username } = user;
  fetch(
    `https://sendit-logistic-2021.herokuapp.com/api/v1/users/${_username}/${users_id}/${_email}/${auth_token}/packages`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.removeItem('packages');
      localStorage.setItem('packages', JSON.stringify(data));
    })
    .catch((err) => {
      console.log(err);
    });
};

const fetchPendingPackages = () => {
  const user = usersData();
  const { _email, _username, auth_token } = user;
  const condition = 'In transit';
  fetch(
    `https://sendit-logistic-2021.herokuapp.com/api/v1/users/${_email}/${_username}/${auth_token}/packages/${condition}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.removeItem('packages');
      localStorage.setItem('packages', JSON.stringify(data));
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get the stored uaerPackages data and create the display packages
const createUserPackage = () => {
  const packagesDiv = document.getElementById('packages');
  let displayPackage = '';
  const packages1 = JSON.parse(localStorage.getItem('packages'));
  if (packages1.length > 0 && !packages1.packages) {
    displayPackage += '<h1 style="text-align:center;">My Packages</h1>';
    packages1.forEach((newPackage) => {
      const tableBody = `
      <div class="package" id="userPackage">
      <img
            src="/images/Lagos4.jpg"
            alt="profile picture"
            class="profile-img"
          />
          <div class="profile-content">
            <table>
              <thead>
                <tr class="thead">
                  <th colspan="2">${newPackage._name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>location</td>
                  <td>${newPackage._location}</td>
                </tr>
                <tr>
                  <td>Destination</td>
                  <td>${newPackage._destination}</td>
                </tr>
                <tr>
                  <td>Reciever</td>
                  <td>${newPackage._reciever}</td>
                </tr>
                <tr>
                  <td colspan="2" class="td-status">
                    <button onclick="getPackage(this)" value= "${newPackage.parcel_id}" id="parcel-id">${newPackage._status}</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>`;
      displayPackage += tableBody;
    });
  } else if (packages1.packages) {
    displayPackage += `<h3>${packages1.packages}</h3>`;
  } else if (packages1.length === 0) {
    displayPackage += `<h3>No pending packages</h3>`;
  } else {
    displayPackage += `<h3>${packages1.ErrorMessage}</h3>`;
  }
  packagesDiv.innerHTML = displayPackage;
};
const displayUserPackages = () => {
  const user = usersData();
  if (!user.auth_token) {
    localStorage.removeItem('packages');
    const packag =
      '<p>Kindly <a onclick ="loginNewUser()">Click here</a> to login<p>';
    localStorage.setItem('packages', JSON.stringify({ ErrorMessage: packag }));
    setTimeout(createUserPackage, 1500);
  } else {
    fetchPackages();
    setTimeout(createUserPackage, 1500);
  }
};

const displayPendingPackage = () => {
  const user = usersData();
  const packages1 = JSON.parse(localStorage.getItem('packages'));
  if (!user.auth_token) {
    localStorage.removeItem('packages');
    const packag =
      '<p>Kindly <a onclick ="loginNewUser()">Click here</a> to login</p>';
    localStorage.setItem('packages', JSON.stringify({ ErrorMessage: packag }));
    setTimeout(createUserPackage, 1500);
  } else if (
    !packages1 ||
    packages1.length === 0 ||
    Object.keys(packages1).length !== 0
  ) {
    fetchPendingPackages();
    setTimeout(createUserPackage, 1500);
  } else {
    const packageInTrans = packages1.filter(
      (packag) => packag._status === 'In transit'
    );
    if (packageInTrans.length === 0) {
      localStorage.removeItem('packages');
      const packag = '<h3>No pending packages</h3>';
      localStorage.setItem(
        'packages',
        JSON.stringify({ ErrorMessage: packag })
      );
      setTimeout(createUserPackage, 1500);
    } else {
      localStorage.removeItem('packages');
      localStorage.setItem('packages', JSON.stringify(packageInTrans));
      setTimeout(createUserPackage, 1500);
    }
  }
};
const createPackage = (metrix) => {
  const newPackage = JSON.parse(localStorage.getItem('package'));
  const tableBody = `
          <img 
            src="/images/Lagos4.jpg"
            alt="profile picture"
            class="package-img"
          />
          <div class="profile-content">
            <table>
              <thead>
                <tr class="thead">
                  <th colspan="2">${newPackage._name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Present location</td>
                  <td>${newPackage._location}</td>
                </tr>
                <tr>
                  <td>Destination</td>
                  <td>${newPackage._destination}</td>
                </tr>
                <tr>
                  <td>Reciever mobile number</td>
                  <td>${newPackage._reciever}</td>
                </tr>
                <tr>
                  <td>Distance</td>
                  <td>${metrix.distance.text}</td>
                </tr>
                <tr>
                  <td>Duration</td>
                  <td>${metrix.duration.text}</td>
                </tr>
                <tr>
                  <td colspan="2" class="td-status">
                    <a href="">${newPackage._status}</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>`;
  return tableBody;
};

const loadPackage = () => {
  const packages = document.getElementById('userProfile');
  const distanceMetrix = JSON.parse(localStorage.getItem('distanceMetrix'));
  const packageData = createPackage(distanceMetrix.rows[0].elements[0]);
  packages.innerHTML = packageData;
};

const postUser = (data) => {
  fetch('https://sendit-logistic-2021.herokuapp.com/api/v1/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.setItem('user', JSON.stringify(data));
      setTimeout(openUser(), 1500);
    })
    .catch((err) => {
      console.log(err);
    });
  const message = `
        <h2>Dear Mr/Mrs ${data._name}</h2>, <br>
        <p>Thank you for choosing sendIT Logistics.</p> <br>
        <p>Below are the details of your new order</p><br>
        <p>As always, we shall do our best to get your package 
        to your desire destination as early as possible and safely.</p>
      `;
  // sendEmail(data._email, message);
};

const postAdmin = (data) => {
  fetch('https://sendit-logistic-2021.herokuapp.com/api/v1/users/admins', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.setItem('admin', JSON.stringify(data));
      setTimeout(openAdmin(), 1500);
    })
    .catch((err) => {
      console.log(err);
    });
  const message = `
        <h2>Dear Mr/Mrs ${data._name}</h2>, <br>
        <p>Thank you for choosing sendIT Logistics.</p> <br>
        <p>Below are the details of your new order</p><br>
        <p>As always, we shall do our best to get your package 
        to your desire destination as early as possible and safely.</p>
      `;
  // sendEmail(data._email, message);
};

const signUp = () => {
  localStorage.clear();
  const input = document
    .getElementById('inputContainer')
    .querySelectorAll('input');
  const validatedUser = formValidation(input);
  localStorage.setItem('newUser', JSON.stringify(validatedUser.data));
  if (!validatedUser.emptyInput) {
    if (validatedUser.data.email.includes('@sendit.com')) {
      postAdmin(validatedUser.data);
    } else {
      postUser(validatedUser.data);
    }
  }
};

const newPackage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user.auth_token) {
    window.location.href = 'newpackage.html';
  } else {
    displayUserPackages();
  }
};
const postPackage = (data) => {
  const user = usersData();
  const { _username, _email, auth_token } = user;
  fetch(
    `https://sendit-logistic-2021.herokuapp.com/api/v1/users/${_username}/${_email}/${auth_token}/packages`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.removeItem('package');
      localStorage.setItem('package', JSON.stringify(data));
    })
    .catch((err) => {
      console.log(err);
    });
  const message = `
        <h2>Dear Mr/Mrs ${data._name}</h2>, <br>
        <p>Thank you for choosing sendIT Logistics.</p> <br>
        <p>Below are the details of your new order</p>
        <ul>
          <li>${data._name}</li>
          </li>From:        ${data._location}</li>
          <li>To:           ${data._destination}</li>
          <li>Status        ${data._status}</li>
          <li>Tracking ID:  ${data._id}</li>
        </ul>
        <br>
        <p>As always, we shall do our best to get your package 
        to your desire destination as early as possible and safely.</p>
      `;
  // sendEmail(data._email, message);
  fetchPackages();
  setTimeout(openPackage, 1500);
};

const submitPackage = () => {
  const input = document
    .getElementById('inputContainer')
    .querySelectorAll('input');
  const validatedInput = formValidation(input);
  if (!validatedInput.emptyInput) {
    postPackage(validatedInput.data);
  }
};

const putPackage = (data, selectedPackage) => {
  let user;
  let email;
  let userid;
  let token;
  if (!usersData()) {
    user = adminsData();
    email = user._email;
    userid = user.users_id;
    token = user.admin_token;
  } else {
    user = usersData();
    email = user._email;
    userid = user.users_id;
    token = user.auth_token;
  }
  fetch(
    `https://sendit-logistic-2021.herokuapp.com/api/v1/users/${email}/${userid}/${token}/packages/${selectedPackage.parcel_id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.removeItem('package');
      localStorage.setItem('package', JSON.stringify(data));
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateDestination = () => {
  const selectedPackage = JSON.parse(localStorage.getItem('package'));
  const input = [document.getElementById('newDestination')];
  const newDestination = formValidation(input);
  if (selectedPackage._status === 'Order Canceled') {
    alert('Order has been canceled');
  } else if (!newDestination.emptyInput) {
    const data = { _destination: newDestination.data.destination };
    putPackage(data, selectedPackage);
    setTimeout(openPackage, 1500);
  }
};

const cancelOrder = () => {
  const selectedPackage = JSON.parse(localStorage.getItem('package'));
  if (selectedPackage._status === 'Order Canceled') {
    alert('Order has been canceled');
  } else {
    const data = { _status: 'Order Canceled' };
    putPackage(data, selectedPackage);
    setTimeout(openPackage, 1500);
  }
};
const getPackage = (td) => {
  localStorage.removeItem('package');
  const parcelId = td.value;
  const userPackage = JSON.parse(localStorage.getItem('packages'));
  userPackage.forEach((packageData) => {
    if (packageData.parcel_id === parseInt(parcelId)) {
      localStorage.setItem('package', JSON.stringify(packageData));
    }
  });
  setTimeout(openPackage, 1500);
};

const completeOrder = () => {
  window.history.go(-1);
};

// Delete data from database

const adminDeleteUser = (e) => {
  const admin = adminsData();
  const { _email, admin_token } = admin;
  console.log(e);
  const username = e.value;
  const id = parseInt(e.id);
  console.log(username, id);
  fetch(
    `https://sendit-logistic-2021.herokuapp.com/api/v1/users/${username}/${id}/${_email}/${admin_token}`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(data));
    })
    .catch((err) => {
      console.log(err);
    });
};

const fetchUsers = () => {
  const admin = adminsData();
  const { _email, admin_token } = admin;
  let users = '';
  const containerdiv = document.getElementById('usersContainer');
  const container = containerdiv.querySelector('ul');
  fetch(
    `https://sendit-logistic-2021.herokuapp.com/api/v1/users/${_email}/${admin_token}`,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((user) => {
        users += `<li>
        <div class="userDetails">
          <h2>${user._name}</h2>
          <p>${user._username}</p>
          <p>${user._email}</p>
          <button onclick="adminFetchUserPackage(this)" value= "${user._username}" id="${user.users_id}">packages</button>
          <button onclick="adminDeleteUser(this)" value= "${user._username}" id="${user.users_id}">delete user</button>
          <div class="userCont" id="userCont${user.users_id}"></div>
        </div>
      </li>`;
      });
      container.innerHTML = users;
      containerdiv.classList.toggle('open');
    })
    .catch((err) => {
      console.log(err);
    });
};
const packageDisplay = (packages) => {
  let packagesDiv = '';
  if (Array.isArray(packages)) {
    packages.forEach((packag) => {
      packagesDiv += `<li>
        <div class="userDetails" style="background: #DDDDB9;">
          <h2>${packag._name}</h2>
          <p>${packag._location}</p>
          <p>${packag._destination}</p>
          <p>${packag._reciever}</p>
          <button onclick="getPackage(this)" value= "${packag.parcel_id}" id="parcel-id">${packag._status}</button>
        </div>
      </li>
    `;
    });
  } else {
    packagesDiv = packages.packages;
  }
  return packagesDiv;
};
const adminDisplayUserPackages = (id) => {
  const userCont = `userCont${id}`;
  console.log(userCont);
  const packages = JSON.parse(localStorage.getItem('packages'));
  const newPackages = document.getElementById(userCont);
  console.log(newPackages);
  newPackages.innerHTML = packageDisplay(packages);
  newPackages.classList.toggle('open');
};

const adminFetchUserPackage = (e) => {
  const admin = adminsData();
  const { admin_token, _email } = admin;
  const username = e.value;
  const id = e.id;
  console.log(id);
  fetch(
    `https://sendit-logistic-2021.herokuapp.com/api/v1/users/${username}/${id}/${_email}/${admin_token}/packages`,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.removeItem('packages');
      localStorage.setItem('packages', JSON.stringify(data));
      adminDisplayUserPackages(id);
    })
    .catch((err) => {
      console.log(err);
    });
};

const showPackages = () => {
  const packages = document.querySelector('.packageContainer');
  packages.classList.toggle('open');
};

const storePackage = (e) => {
  const packageElement = e.parentElement.parentElement.querySelector('li');
  const trackId = parseInt(packageElement.innerHTML);
  const packages = JSON.parse(localStorage.getItem('packages'));
  const selectedPackage = packages.find(
    (packag) => packag.parcel_id === trackId
  );
  localStorage.setItem('package', JSON.stringify(selectedPackage));
};

const displayPackages = () => {
  const packages = JSON.parse(localStorage.getItem('packages'));
  const newPackages = document.getElementById('newPackages');
  newPackages.classList.toggle('open');
  newPackages.innerHTML = packageDisplay(packages);
};

const fetchNewPackages = () => {
  const admin = adminsData();
  const { _email } = admin;
  const condition = 'At the location';
  const token = admin.admin_token;
  fetch(
    `https://sendit-logistic-2021.herokuapp.com/api/v1/users/${_email}/${token}/packages/${condition}`,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.removeItem('packages');
      localStorage.setItem('packages', JSON.stringify(data));
      displayPackages();
    })
    .catch((err) => {
      console.log(err);
    });
};

const fetchPackagesInTransit = () => {
  const admin = adminsData();
  const { _email } = admin;
  const condition = 'In transit';
  const token = admin.admin_token;
  fetch(
    `https://sendit-logistic-2021.herokuapp.com/api/v1/users/${_email}/${token}/packages/${condition}`,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.removeItem('packages');
      localStorage.setItem('packages', JSON.stringify(data));
      displayPackages();
    })
    .catch((err) => {
      console.log(err);
    });
};

const fetchDeliveredPackages = () => {
  const admin = adminsData();
  const { _email } = admin;
  const condition = 'Delivered';
  const token = admin.admin_token;
  fetch(
    `https://sendit-logistic-2021.herokuapp.com/api/v1/users/${_email}/${token}/packages/${condition}`,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.removeItem('packages');
      localStorage.setItem('packages', JSON.stringify(data));
      displayPackages();
    })
    .catch((err) => {
      console.log(err);
    });
};

const updatePackage = () => {
  const selectedPackage = JSON.parse(localStorage.getItem('package'));
  const input = document
    .getElementById('inputContainer')
    .querySelectorAll('input');
  const newInput = formValidation(input);
  if (selectedPackage._status === 'Order Canceled') {
    alert('Order has been canceled');
  } else if (!newInput.emptyInput) {
    const data = {
      _location: newInput.data.location,
      _status: newInput.data.status,
    };
    putPackage(data, selectedPackage);
    const updatedPackage = JSON.parse(localStorage.getItem('package'));
  }
};

// Google map API call and services
function geocodeAddress(parameters, address) {
  const { geocoder, map, add, service } = parameters;
  geocoder
    .geocode({ address })
    .then(({ results }) => {
      add.push(results[0].formatted_address);
      if (add.length >> 1) {
        const request = {
          origins: [add[0]],
          destinations: [add[1]],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false,
        };
        // get distance matrix response
        service.getDistanceMatrix(request).then((response) => {
          console.log(response);
          localStorage.setItem('distanceMetrix', JSON.stringify(response));
        });
      }
      map.setCenter(results[0].geometry.location);
      new google.maps.Marker({
        map,
        position: results[0].geometry.location,
      });
    })
    .catch((e) =>
      alert(`Geocode was not successful for the following reason: ${e}`)
    );
}

function initMap() {
  const { _location, _destination } = JSON.parse(
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
  const parameters = { geocoder, map, add, service };
  addresses.forEach((address) => {
    geocodeAddress(parameters, address);
  });
}
