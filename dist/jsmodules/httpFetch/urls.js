const user = JSON.parse(localStorage.getItem('user'));
const admin = JSON.parse(localStorage.getItem('admin'));
const packag = JSON.parse(localStorage.getItem('package'));
let email, userid, token, username, id;
if (packag !== null) {
  id = parseInt(packag.parcel_id);
}
if (user !== null) {
  email = user._email;
  username = user._username;
  userid = user.users_id;
  token = user.auth_token;
} else if (admin !== null) {
  email = admin._email;
  userid = admin.users_id;
  token = admin.admin_token;
}
const loginUrl = 'https://akera-logistics.herokuapp.com/api/v1/users/login';
const postAdmUrl = 'https://akera-logistics.herokuapp.com/api/v1/users/admins';
const postUsrUrl = 'https://akera-logistics.herokuapp.com/api/v1/users';
const adminLoginUrl =
  'https://akera-logistics.herokuapp.com/api/v1/users/admins/login';
const postPackageUrl = `https://akera-logistics.herokuapp.com/api/v1/users/${username}/${email}/${token}/packages`;
export { loginUrl, postAdmUrl, postUsrUrl, postPackageUrl, adminLoginUrl };
