const packag = JSON.parse(localStorage.getItem('package'));
let id;
if (packag !== null) {
  id = parseInt(packag.parcel_id);
}

const loginUrl = 'https://akera-backend.herokuapp.com/api/v1/login';
const postUsrUrl = 'https://akera-backend.herokuapp.com/api/v1/signup';
const updateParcelUrl = `https://akera-backend.herokuapp.com/api/v1/parcels/${id}`;
const fetchParcelUrl = `https://akera-backend.herokuapp.com/api/v1/parcels`;
const postParcelUrl = `https://akera-backend.herokuapp.com/api/v1/parcels`;
export { loginUrl, postUsrUrl, updateParcelUrl, fetchParcelUrl, postParcelUrl };
