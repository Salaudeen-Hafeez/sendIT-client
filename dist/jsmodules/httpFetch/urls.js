const user =
  JSON.parse(localStorage.getItem('user')) ||
  JSON.parse(localStorage.getItem('user'));
const { parcel_id } = JSON.parse(localStorage.getItem('package'));
let email,userid,token,username
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
console.log(email)
const userUpdateUrl = `https://akera-logistics.herokuapp.com/api/v1/users/${_email}/${userid}/${token}/packages/${parseInt(
    parcel_id
  )}`;
const adminUpdateUrl = `https://akera-logistics.herokuapp.com/api/v1/users/${email}/${userid}/${token}/packages/${parseInt(
    parcel_id
  )}`;
const postPackageUrl =  `https://akera-logistics.herokuapp.com/api/v1/users/${username}/${email}/${token}/packages`,

export { userUpdateUrl, adminUpdateUrl, postPackageUrl };
