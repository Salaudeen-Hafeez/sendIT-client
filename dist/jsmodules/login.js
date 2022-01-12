import { formValidation } from './validateForm';
import { postData } from './httpFetch/postData';
import { displayErr } from './errMessages';
import { createProfile, openAdmin, openUser } from './createProfile';
// Login the user and store the return user's data in localStorage

const loginUrl = 'https://akera-logistics.herokuapp.com/api/v1/users/login';
const adminLoginUrl =
  'https://akera-logistics.herokuapp.com/api/v1/users/admins/login';
const fetchUserData = (data) => {
  clearDisplayErr();
  fetch('https://akera-logistics.herokuapp.com/api/v1/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.clear();
      if (data.errMessage) {
        displayErr(data);
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        openUser();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Login the user and store the return admin's data in localStorage
const fetchAdminData = (data) => {
  fetch('https://akera-logistics.herokuapp.com/api/v1/users/admins/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.clear();
      if (data.errMessage) {
        displayErr(data);
      } else {
        localStorage.setItem('admin', JSON.stringify(data));
        openAdmin();
      }
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
  const { data, emptyInput } = formValidation(input);
  if (!emptyInput) {
    if (!email.includes('@sendit.com')) {
      const user = postData(loginUrl, data);
      if (user.errMessage) {
        displayErr(user);
      } else {
        localStorage.setItem('user', JSON.stringify(user));
        openUser();
      }
    } else {
      const admin = postData(adminLoginUrl, data);
      if (admin.errMessage) {
        displayErr(admin);
      } else {
        localStorage.setItem('admin', JSON.stringify(admin));
        openAdmin();
      }
    }
  }
};

const displayUserProfile = () => {
  createProfile();
};

const displayAdmin = () => {
  createProfile();
};

export { login, displayUserProfile, displayAdmin };
