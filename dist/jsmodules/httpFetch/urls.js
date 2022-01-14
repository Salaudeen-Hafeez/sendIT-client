const user =
  JSON.parse(localStorage.getItem('user')) ||
  JSON.parse(localStorage.getItem('admin'));
const packag = JSON.parse(localStorage.getItem('package'));
let email, userid, token, username, id;
if (packag !== null) {
  id = parseInt(packag.parcel_id);
}
if (user !== null) {
  if (user.user) {
    email = user.user._email;
    username = user.user._username;
    userid = user.user.users_id;
    token = user.user.auth_token;
  } else {
    email = user.admin._email;
    userid = user.admin.users_id;
    token = user.admin.admin_token;
  }
}
const loginUrl = 'https://akera-logistics.herokuapp.com/api/v1/users/login';
const adminLoginUrl =
  'https://akera-logistics.herokuapp.com/api/v1/users/admins/login';
const userUpdateUrl = `https://akera-logistics.herokuapp.com/api/v1/users/${email}/${userid}/${token}/packages/${id}`;
const adminUpdateUrl = `https://akera-logistics.herokuapp.com/api/v1/users/${email}/${userid}/${token}/packages/${id}`;
const postPackageUrl = `https://akera-logistics.herokuapp.com/api/v1/users/${username}/${email}/${token}/packages`;
export {
  loginUrl,
  userUpdateUrl,
  adminUpdateUrl,
  postPackageUrl,
  adminLoginUrl,
};
