const packag = JSON.parse(localStorage.getItem('package'));
let id;
if (packag !== null) {
  id = parseInt(packag.parcel_id);
}

const loginUrl = 'https://akera-logistics.herokuapp.com/api/v1/login';
const postUsrUrl = 'https://akera-logistics.herokuapp.com/api/v1/signup';
const updatePackageUrl = `https://akera-logistics.herokuapp.com/api/v1/parcels/${id}`;
const postPackageUrl = `https://sendit-logistics.herokuapp.com/api/v1/parcels`;
export { loginUrl, postUsrUrl, postPackageUrl, updatePackageUrl };
