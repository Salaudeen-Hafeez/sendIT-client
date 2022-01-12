const usersData = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
};

const adminsData = () => {
  const admin = JSON.parse(localStorage.getItem('admin'));
  return admin;
};

const packageData = () => {
  const parcel = JSON.parse(localStorage.getItem('package'));
  return parcel;
};

const packagesData = () => {
  const parcels = JSON.parse(localStorage.getItem('packages'));
  return parcels;
};

export { usersData, adminsData, packageData, packagesData };
