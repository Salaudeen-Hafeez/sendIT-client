const packag = JSON.parse(localStorage.getItem('package'));
const user = JSON.parse(localStorage.getItem('user'));
let id, username, email, userId, token;
if (user) {
  email = user._email;
  username = user._username;
  userId = user.users_id;
  token = user.auth_token;
}
if (packag !== null) {
  id = parseInt(packag.parcel_id);
}

const loginUrl = 'https://akera-logistics.herokuapp.com/api/v1/login';
const postAdmUrl = 'https://akera-logistics.herokuapp.com/api/v1/admins';
const postUsrUrl = 'https://akera-logistics.herokuapp.com/api/v1';
const adminLoginUrl =
  'https://akera-logistics.herokuapp.com/api/v1/admins/login';
const userUpdateUrl = `https://akera-logistics.herokuapp.com/api/v1/${email}/packages/${id}/${token}`;
const postPackageUrl = `https://akera-logistics.herokuapp.com/api/v1/packages/${token}`;
export {
  loginUrl,
  postAdmUrl,
  postUsrUrl,
  postPackageUrl,
  adminLoginUrl,
  userUpdateUrl,
};
