const packageDisplay = (packages) => {
  let packagesDiv = '';
  let addres;
  let color;
  if (Array.isArray(packages) && packages.length !== 0) {
    packages.forEach((packag) => {
      switch (packag._status) {
        case 'In transit':
          color = '#095F06';
          break;
        case 'Delivered':
          color = '#0000FF';
          break;
        default:
          color = 'red';
          break;
      }
      packagesDiv += `<li>
        <div style="margin-bottom:8px;text-align:center;cursor:pointer" onclick="getPackage(this)" id="${packag.parcel_id}">
          <p style="font-weight:800;color:#056973">${packag._name}</p>
          <p><h3>Pickup location:<h3> ${packag._location}</p>
          <p><h3>Going to:</h3> ${packag._destination}</p>
          <p style="font-weight:800;color:${color}">${packag._status}</p>
          <button style="width:90%;font-weight:500;background-color:#056973;color:white" onclick="adminDeletePackage(this)" value= "${packag._username}" id="${packag.parcel_id}">delete</button>
        </div>
      </li>
    `;
    });
  } else {
    packagesDiv = `<li>
    <p style="padding-top:5px;font-weight:800;text-align:center;color:red;">No packages</p></li>`;
  }
  return packagesDiv;
};

export { packageDisplay };
