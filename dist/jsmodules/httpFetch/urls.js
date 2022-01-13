const user =
  JSON.parse(localStorage.getItem('user')) ||
  JSON.parse(localStorage.getItem('user'));
const { parcel_id } = JSON.parse(localStorage.getItem('package'));
let userUpdateUrl = '';
if (user !== null) {
  if (user.user) {
    const { _email, users_id, auth_token } = user.user;
    userUpdateUrl = `https://akera-logistics.herokuapp.com/api/v1/users/${_email}/${users_id}/${auth_token}/packages/${parseInt(
      parcel_id
    )}`;
  } else {
    const { _email: email, users_id: userId, admin_token } = user.admin;
    userUpdateUrl = `https://akera-logistics.herokuapp.com/api/v1/users/${email}/${userId}/${admin_token}/packages/${parseInt(
      parcel_id
    )}`;
  }
}

export { userUpdateUrl };
