const packag = JSON.parse(localStorage.getItem('package'));
const { _username, _email, users_id, auth_token } = JSON.parse(
  localStorage.getItem('user')
);
let id;
if (packag !== null) {
  id = parseInt(packag.parcel_id);
}

const loginUrl = 'https://akera-logistics.herokuapp.com/api/v1/users/login';
const postAdmUrl = 'https://akera-logistics.herokuapp.com/api/v1/users/admins';
const postUsrUrl = 'https://akera-logistics.herokuapp.com/api/v1/users';
const adminLoginUrl =
  'https://akera-logistics.herokuapp.com/api/v1/users/admins/login';
const userUpdateUrl = `https://akera-logistics.herokuapp.com/api/v1/users/${_email}/${users_id}/${auth_token}/packages/${id}`;
const postPackageUrl = `https://akera-logistics.herokuapp.com/api/v1/users/${_username}/${_email}/${auth_token}/packages`;
export {
  loginUrl,
  postAdmUrl,
  postUsrUrl,
  postPackageUrl,
  adminLoginUrl,
  userUpdateUrl,
};
