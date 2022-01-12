// const apiKey = 'AIzaSyD9LtzkCH903RTWTMDehYnSmOVitAhBtwA';

import { authenticateRoute } from './routAuth.js';

// const setErrorFor = (inp, message) => {
//   inp.style.border = '1px solid red';
//   const inputFeild = inp.parentElement;
//   const small = inputFeild.querySelector('small');
//   small.style.visibility = 'visible';
//   small.style.color = 'red';
//   small.innerHTML = message;
// };

// const displayErr = (data) => {
//   const erro = document.getElementById('errMessage');
//   erro.innerHTML = '';
//   erro.innerHTML = Object.values(data);
// };

// const clearDisplayErr = () => {
//   const erro = document.getElementById('errMessage');
//   erro.innerHTML = '';
// };

// const formValidation = (input) => {
//   const pattern =
//     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   const contactPattern =
//     /^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
//   const data = {};
//   let emptyInput = '';
//   input.forEach((inp) => {
//     if (inp.value.trim() === '') {
//       if (inp.getAttribute('name') === 'password1') {
//         emptyInput = 'true';
//         setErrorFor(inp, 'password confirmation can not be blank');
//       } else {
//         const message = `${inp.getAttribute('name')} can not be blank`;
//         emptyInput = 'true';
//         setErrorFor(inp, message);
//       }
//     } else if (inp.getAttribute('name') === 'frajile') {
//       if (inp.checked) {
//         data[inp.getAttribute('name')] = 'the package is frajile';
//       } else {
//         data[inp.getAttribute('name')] = 'not frajile';
//       }
//     } else if (inp.getAttribute('name') === 'email') {
//       if (pattern.test(inp.value.trim().toLowerCase())) {
//         data[inp.getAttribute('name')] = inp.value.trim().toLowerCase();
//       } else {
//         emptyInput = 'true';
//         setErrorFor(inp, 'Invalid email address');
//       }
//     } else if (
//       inp.getAttribute('name') === 'reciever' ||
//       inp.getAttribute('name') === 'sender'
//     ) {
//       if (contactPattern.test(inp.value.trim())) {
//         data[inp.getAttribute('name')] = inp.value.trim();
//       } else {
//         emptyInput = 'true';
//         setErrorFor(inp, 'Invalid phone number');
//       }
//     } else if (inp.getAttribute('name') === 'password') {
//       if (inp.value.trim().length < 6) {
//         emptyInput = 'true';
//         setErrorFor(inp, 'The password length must be 6 or more character');
//       } else {
//         data[inp.getAttribute('name')] = inp.value.trim();
//       }
//     } else if (inp.getAttribute('name') === 'password1') {
//       if (inp.value.trim().length < 6) {
//         emptyInput = 'true';
//         setErrorFor(inp, 'The password length must be 6 or more');
//       } else if (data.password !== inp.value.trim()) {
//         emptyInput = 'true';
//         setErrorFor(inp, 'The password does not match');
//       }
//     } else {
//       data[inp.getAttribute('name')] = inp.value.trim();
//     }
//   });
//   return { emptyInput, data };
// };

// window.clearErr = clearErr;
// const usersData = () => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   return user;
// };

// const adminsData = () => {
//   const admin = JSON.parse(localStorage.getItem('admin'));
//   return admin;
// };

// const packageData = () => {
//   const parcel = JSON.parse(localStorage.getItem('package'));
//   return parcel;
// };

// const packagesData = () => {
//   const parcels = JSON.parse(localStorage.getItem('packages'));
//   return parcels;
// };

window.logOut = () => {
  localStorage.clear();
  window.location.href = '/';
};
window.toggleMenu = () => {
  const navLink = document.querySelector('.nav-link');
  navLink.classList.toggle('open');
};

const openPackage = () => {
  window.location.href = 'package';
};
// // Get the stored user data and create the user profile display
// const createUser = () => {
//   const user = usersData();
//   const profile = document.getElementById('userProfile');
//   const userProfile = ` <img
//           src="/images/Lagos4.jpg"
//           alt="profile picture"
//           class="profile-img"
//         />
//         <div class="profile-content">
//           <h1>${user.user._name}</h1>
//           <ul>
//             <li id="username">${user.user._username}</li>
//             <li>${user.user._email}</li>
//             <li>${user._status}</li>
//             <li><a onclick="displayUserPackages()">My packages</a></li>
//             <li><a onclick="displayPendingPackage()">Pending packages</a></li>
//           </ul>
//         </div>`;
//   profile.innerHTML = userProfile;
// };

// const createAdmin = () => {
//   const admin = adminsData();
//   const profile = document.getElementById('userProfile');
//   const adminProfile = ` <img
//           src="/images/Lagos4.jpg"
//           alt="profile picture"
//           class="profile-img"
//         />
//         <div class="profile-content">
//           <h1>${admin.admin._name}</h1>
//           <ul>
//             <li id="adminname">${admin.admin._username}</li>
//             <li>${admin.admin._email}</li>
//             <li>${admin.admin._status}</li>
//           </ul>
//         </div>`;
//   profile.innerHTML = adminProfile;
// };

let pathName = location.pathname;
let pathNames = [localStorage.getItem('path')];
localStorage.setItem('path', pathName);
pathNames.push(pathName);

if (pathNames[0] !== pathNames[1]) {
  authenticateRoute(pathNames[1]);
}
// window.login = login;

// const openUser = () => {
//   const user = usersData();
//   if (user.user.users_id) {
//     window.location.href = '/user';
//   }
// };

// const openAdmin = () => {
//   const admin = adminsData();
//   if (admin.admin.users_id) {
//     window.location.href = '/admin';
//   }
// };

// // Login the user and store the return user's data in localStorage
// const fetchUserData = (data) => {
//   clearDisplayErr();
//   fetch('https://akera-logistics.herokuapp.com/api/v1/users/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   })
//     .then((resp) => resp.json())
//     .then((data) => {
//       localStorage.clear();
//       if (data.errMessage) {
//         displayErr(data);
//       } else {
//         localStorage.setItem('user', JSON.stringify(data));
//         openUser();
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// // Login the user and store the return admin's data in localStorage
// const fetchAdminData = (data) => {
//   fetch('https://akera-logistics.herokuapp.com/api/v1/users/admins/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   })
//     .then((resp) => resp.json())
//     .then((data) => {
//       localStorage.clear();
//       if (data.errMessage) {
//         displayErr(data);
//       } else {
//         localStorage.setItem('admin', JSON.stringify(data));
//         openAdmin();
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// window.login = () => {
//   const input = document
//     .getElementById('inputContainer')
//     .querySelectorAll('input');
//   const email = input[0].value.trim().toLowerCase();
//   const validatedLogin = formValidation(input);
//   if (!validatedLogin.emptyInput) {
//     if (!email.includes('@sendit.com')) {
//       fetchUserData(validatedLogin.data);
//     } else {
//       fetchAdminData(validatedLogin.data);
//     }
//   }
// };

// window.displayUserProfile = displayUserProfile;

// const displayAdmin = () => {
//   createAdmin();
// };
// Use the username from the stored user to get the user packages

// const fetchPackages = () => {
//   const user = usersData();
//   const { _email, auth_token, users_id, _username } = user.user;
//   fetch(
//     `https://akera-logistics.herokuapp.com/api/v1/users/${_username}/${users_id}/${_email}/${auth_token}/packages`,
//     {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     }
//   )
//     .then((resp) => resp.json())
//     .then((data) => {
//       localStorage.removeItem('packages');
//       localStorage.setItem('packages', JSON.stringify(data));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// const fetchPendingPackages = () => {
//   const user = usersData();
//   const { _email, _username, auth_token } = user.user;
//   const condition = 'In transit';
//   fetch(
//     `https://akera-logistics.herokuapp.com/api/v1/users/${_email}/${_username}/${auth_token}/packages/${condition}`,
//     {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     }
//   )
//     .then((resp) => resp.json())
//     .then((data) => {
//       localStorage.removeItem('packages');
//       localStorage.setItem('packages', JSON.stringify(data));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// // Get the stored uaerPackages data and create the display packages
// const createUserPackage = () => {
//   const packagesDiv = document.getElementById('packages');
//   let displayPackage = '';
//   const packages1 = JSON.parse(localStorage.getItem('packages'));
//   if (packages1.length > 0 && !packages1.packages) {
//     displayPackage += '<h1 style="text-align:center;">My Packages</h1>';
//     packages1.forEach((newPackage) => {
//       const tableBody = `
//       <div class="package" id="userPackage">
//       <img
//             src="/images/Lagos4.jpg"
//             alt="profile picture"
//             class="profile-img"
//           />
//           <div class="profile-content">
//             <table>
//               <thead>
//                 <tr class="thead">
//                   <th colspan="2">${newPackage._name}</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>location</td>
//                   <td>${newPackage._location}</td>
//                 </tr>
//                 <tr>
//                   <td>Destination</td>
//                   <td>${newPackage._destination}</td>
//                 </tr>
//                 <tr>
//                   <td>Reciever</td>
//                   <td>${newPackage._reciever}</td>
//                 </tr>
//                 <tr>
//                   <td colspan="2" class="td-status">
//                     <button onclick="getPackage(this)" value= "${newPackage.parcel_id}" id="parcel-id">${newPackage._status}</button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//         </div>`;
//       displayPackage += tableBody;
//     });
//   } else {
//     displayPackage += `<h3 style="text-align: center; color: red">${Object.values(
//       packages1
//     )}</h3>`;
//   }
//   packagesDiv.innerHTML = displayPackage;
// };

const displayUserPackages = () => {
  const user = usersData();
  if (!user.user.auth_token) {
    window.location.href = '/login';
  } else {
    fetchPackages();
    setTimeout(createUserPackage, 1200);
  }
};

const displayPendingPackage = () => {
  const user = usersData();
  const packages1 = JSON.parse(localStorage.getItem('packages'));
  if (!user.user.auth_token) {
    window.location.href = '/login';
  } else if (
    !packages1 ||
    packages1.length === 0 ||
    Object.keys(packages1).length !== 0
  ) {
    fetchPendingPackages();
    setTimeout(createUserPackage, 1200);
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
      setTimeout(createUserPackage, 1200);
    } else {
      localStorage.removeItem('packages');
      localStorage.setItem('packages', JSON.stringify(packageInTrans));
      setTimeout(createUserPackage, 1200);
    }
  }
};
// const createPackage = (metrix) => {
//   const newPackage = JSON.parse(localStorage.getItem('package'));
//   const tableBody = `
//           <img
//             src="/images/Lagos4.jpg"
//             alt="profile picture"
//             class="package-img"
//           />
//           <div class="profile-content">
//             <table>
//               <thead>
//                 <tr class="thead">
//                   <th colspan="2">${newPackage._name}</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>Present location</td>
//                   <td>${newPackage._location}</td>
//                 </tr>
//                 <tr>
//                   <td>Destination</td>
//                   <td>${newPackage._destination}</td>
//                 </tr>
//                 <tr>
//                   <td>Reciever mobile number</td>
//                   <td>${newPackage._reciever}</td>
//                 </tr>
//                 <tr>
//                   <td>Distance</td>
//                   <td>${metrix.distance.text}</td>
//                 </tr>
//                 <tr>
//                   <td>Duration</td>
//                   <td>${metrix.duration.text}</td>
//                 </tr>
//                 <tr>
//                   <td colspan="2" class="td-status">
//                     <a href="">${newPackage._status}</a>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>`;
//   return tableBody;
// };

const loadPackage = () => {
  const admin = adminsData();
  const packages = document.getElementById('userProfile');
  const status = document.getElementById('updateStatus');
  const location = document.getElementById('location');
  const heading = document.getElementById('heading');
  if (admin) {
    status.classList.toggle('open');
    location.innerHTML = 'New location';
    heading.innerHTML = 'Fill the form below to update the package status';
  }
  const distanceMetrix = JSON.parse(localStorage.getItem('distanceMetrix'));
  const packageData = createPackage(distanceMetrix.rows[0].elements[0]);
  packages.innerHTML = packageData;
};

// const postUser = (data) => {
//   clearDisplayErr();
//   fetch('https://akera-logistics.herokuapp.com/api/v1/users', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   })
//     .then((resp) => resp.json())
//     .then((data) => {
//       if (data.errMessage) {
//         displayErr(data);
//       } else {
//         localStorage.setItem('user', JSON.stringify(data));
//         openUser();
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   // const message = `
//   //       <h2>Dear Mr/Mrs ${data._name}</h2>, <br>
//   //       <p>Thank you for choosing sendIT Logistics.</p> <br>
//   //       <p>Below are the details of your new order</p><br>
//   //       <p>As always, we shall do our best to get your package
//   //       to your desire destination as early as possible and safely.</p>
//   //     `;
//   // sendEmail(data._email, message);
// };

// const postAdmin = (data) => {
//   clearDisplayErr();
//   fetch('https://akera-logistics.herokuapp.com/api/v1/users/admins', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   })
//     .then((resp) => resp.json())
//     .then((data) => {
//       if (data.errMessage) {
//         displayErr(data);
//       } else {
//         localStorage.setItem('admin', JSON.stringify(data));
//         openAdmin();
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   // const message = `
//   //       <h2>Dear Mr/Mrs ${data._name}</h2>, <br>
//   //       <p>Thank you for choosing sendIT Logistics.</p> <br>
//   //       <p>Below are the details of your new order</p><br>
//   //       <p>As always, we shall do our best to get your package
//   //       to your desire destination as early as possible and safely.</p>
//   //     `;
//   // sendEmail(data._email, message);
// };

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
  if (user.user.auth_token) {
    window.location.href = 'newpackage';
  } else {
    displayUserPackages();
  }
};

// const postPackage = (data) => {
//   const user = usersData();
//   const { _username, _email, auth_token } = user.user;
//   data['username'] = _username;
//   fetch(
//     `https://akera-logistics.herokuapp.com/api/v1/users/${_username}/${_email}/${auth_token}/packages`,
//     {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     }
//   )
//     .then((resp) => resp.json())
//     .then((data) => {
//       localStorage.removeItem('package');
//       localStorage.setItem('package', JSON.stringify(data));
//       openUser();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   // const message = `
//   //       <h2>Dear Mr/Mrs ${data._name}</h2>, <br>
//   //       <p>Thank you for choosing sendIT Logistics.</p> <br>
//   //       <p>Below are the details of your new order</p>
//   //       <ul>
//   //         <li>${data._name}</li>
//   //         </li>From:        ${data._location}</li>
//   //         <li>To:           ${data._destination}</li>
//   //         <li>Status        ${data._status}</li>
//   //         <li>Tracking ID:  ${data._id}</li>
//   //       </ul>
//   //       <br>
//   //       <p>As always, we shall do our best to get your package
//   //       to your desire destination as early as possible and safely.</p>
//   //     `;
//   // sendEmail(data._email, message);
//   fetchPackages();
// };

const submitPackage = () => {
  const input = document
    .getElementById('inputContainer')
    .querySelectorAll('input');
  const validatedInput = formValidation(input);
  if (!validatedInput.emptyInput) {
    postPackage(validatedInput.data);
  }
};

// const putPackage = (data, selectedPackage) => {
//   let user;
//   let email;
//   let userid;
//   let token;
//   if (adminsData()) {
//     user = adminsData();
//     email = user.admin._email;
//     userid = user.admin.users_id;
//     token = user.admin.admin_token;
//   } else {
//     user = usersData();
//     email = user.user._email;
//     userid = user.user.users_id;
//     token = user.user.auth_token;
//   }
//   fetch(
//     `https://akera-logistics.herokuapp.com/api/v1/users/${email}/${userid}/${token}/packages/${parseInt(
//       selectedPackage.parcel_id
//     )}`,
//     {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     }
//   )
//     .then((resp) => resp.json())
//     .then((data) => {
//       localStorage.removeItem('package');
//       localStorage.setItem('package', JSON.stringify(data));
//       openPackage();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

const updateDestination = () => {
  const admin = adminsData();
  const selectedPackage = JSON.parse(localStorage.getItem('package'));
  const input = document.getElementById('newDestination');
  const select1 = document.getElementById('newStatus');
  const newDestination = formValidation([input, select1]);
  if (!newDestination.emptyInput) {
    if (selectedPackage._status === 'Order Canceled') {
      alert('Order has been canceled');
    } else if (admin) {
      const data = {
        _location: newDestination.data.destination,
        _status: newDestination.data.status,
      };
      putPackage(data, selectedPackage);
      setTimeout(openPackage, 1200);
    } else {
      const data = { _destination: newDestination.data.destination };
      putPackage(data, selectedPackage);
      setTimeout(openPackage, 1200);
    }
  }
};

const cancelOrder = () => {
  const selectedPackage = JSON.parse(localStorage.getItem('package'));
  if (selectedPackage._status === 'Order Canceled') {
    alert('Order has been canceled');
  } else {
    const data = { _status: 'Order Canceled' };
    putPackage(data, selectedPackage);
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
  openPackage();
};

const completeOrder = () => {
  window.history.go(-1);
};

// Delete data from database

// const adminDeleteUser = (e) => {
//   const admin = adminsData();
//   const { _email, admin_token } = admin.admin;
//   const username = e.value;
//   const id = parseInt(e.id);
//   fetch(
//     `https://akera-logistics.herokuapp.com/api/v1/users/${_email}/${admin_token}/${username}/${id}`,
//     {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//     }
//   )
//     .then((resp) => resp.json())
//     .then((data) => {
//       // localStorage.removeItem('user');
//       // localStorage.setItem('user', JSON.stringify(data));
//       window.location.reload();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// const adminDeletePackage = (e) => {
//   const status = e.parentElement.querySelector('button').innerHTML;
//   const admin = adminsData();
//   const parentEl = e.parentElement.parentElement.parentElement.parentElement;
//   let button = parentEl.querySelector('button');
//   const { _email, admin_token } = admin.admin;
//   const username = e.value;

//   const id = parseInt(e.id);
//   fetch(
//     `https://akera-logistics.herokuapp.com/api/v1/users/${_email}/${admin_token}/${username}/packages/${id}/${status}`,
//     {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//     }
//   )
//     .then((resp) => resp.json())
//     .then((data) => {
//       localStorage.removeItem('package');
//       localStorage.setItem('package', JSON.stringify(data));
//       button.click();
//       button.click();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// const fetchUsers = () => {
//   const admin = adminsData();
//   const { _email, admin_token } = admin.admin;
//   if (!admin_token) {
//     window.location.href = '/login';
//   } else {
//     let users = '';
//     const containerdiv = document.getElementById('usersContainer');
//     const container = containerdiv.querySelector('ul');
//     fetch(
//       `https://akera-logistics.herokuapp.com/api/v1/users/${_email}/${admin_token}`,
//       {
//         headers: { 'Content-Type': 'application/json' },
//       }
//     )
//       .then((resp) => resp.json())
//       .then((data) => {
//         data.forEach((user) => {
//           users += `<li>
//         <div class="userDetails">
//           <h2>${user._name}</h2>
//           <p>${user._username}</p>
//           <p>${user._email}</p>
//           <button onclick="adminFetchUserPackage(this)" value= "${user._username}" id="${user.users_id}">packages</button>
//           <button onclick="adminDeleteUser(this)" value= "${user._username}" id="${user.users_id}">delete user</button>
//           <div class="userCont" id="userCont${user.users_id}"></div>
//         </div>
//       </li>`;
//         });
//         container.innerHTML = users;
//         containerdiv.classList.toggle('open');
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// };

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
          <button onclick="adminDeletePackage(this)" value= "${packag._username}" id="${packag.parcel_id}">delete</button>
        </div>
      </li>
    `;
    });
  } else {
    packagesDiv = `<li>
    <h3 style="padding-top: 5px; color: red;">${Object.values(
      packages
    )}</h3></li>`;
  }
  return packagesDiv;
};
const adminDisplayUserPackages = (id) => {
  const userCont = `userCont${id}`;
  const packages = JSON.parse(localStorage.getItem('packages'));
  const newPackages = document.getElementById(userCont);
  newPackages.innerHTML = packageDisplay(packages);
  newPackages.classList.toggle('open');
};

// const adminFetchUserPackage = (e) => {
//   const admin = adminsData();
//   const { admin_token, _email } = admin.admin;
//   const username = e.value;
//   const id = e.id;
//   fetch(
//     `https://akera-logistics.herokuapp.com/api/v1/users/${username}/${id}/${_email}/${admin_token}/packages`,
//     {
//       headers: { 'Content-Type': 'application/json' },
//     }
//   )
//     .then((resp) => resp.json())
//     .then((data) => {
//       localStorage.removeItem('packages');
//       localStorage.setItem('packages', JSON.stringify(data));

//       adminDisplayUserPackages(id);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

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

// const adminFetchPackages = (cond) => {
//   const admin = adminsData();
//   const { _email, admin_token } = admin.admin;
//   if (!admin_token) {
//     window.location.href = '/login';
//   } else {
//     fetch(
//       `https://akera-logistics.herokuapp.com/api/v1/users/${_email}/${admin_token}/packages/${cond}`,
//       {
//         headers: { 'Content-Type': 'application/json' },
//       }
//     )
//       .then((resp) => resp.json())
//       .then((data) => {
//         localStorage.removeItem('packages');
//         localStorage.setItem('packages', JSON.stringify(data));
//         displayPackages();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// };

const fetchNewPackages = () => {
  adminFetchPackages('At the location');
};

const fetchPackagesInTransit = () => {
  adminFetchPackages('In transit');
};

const fetchDeliveredPackages = () => {
  adminFetchPackages('Delivered');
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
  var input3 = document.getElementById('newDestination');
  var autocomplete3 = new google.maps.places.Autocomplete(input3);
}

function autoCompleteAddress() {
  var input = document.getElementById('location');
  var autocomplete = new google.maps.places.Autocomplete(input);
  var input2 = document.getElementById('destination');
  var autocomplete2 = new google.maps.places.Autocomplete(input2);
  // autocomplete.addListener('place_changed', function () {
  //   var place = autocomplete.getPlace();
  //   document.getElementById('address').value = JSON.stringify(
  //     place.address_components
  //   );
  // });
}