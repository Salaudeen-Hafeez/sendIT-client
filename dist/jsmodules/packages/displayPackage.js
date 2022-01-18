const packageDisplay = (packages, labels) => {
  const admin = JSON.parse(localStorage.getItem('admin'));
  let packagesDiv = '';
  let visible = 'hidden';
  let color;
  if (admin) {
    visible = 'visible';
  }
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
      packagesDiv += `<li style="margin:8px;">
        <div style="cursor:pointer" id="${packag.parcel_id}" onclick="getPackage(this)">
          <p style="font-weight:800;color:#056973">${packag._name}</p>
          <p><span style="font-weight:800">Pickup location:</span> ${packag._location}</p>
          <p><span style="font-weight:800">Going to:</span> ${packag._destination}</p>
          <p style="font-weight:800;color:${color}">${packag._status}</p>
        </div class="deleteDiv">
        <div><button class="delete" style="visibility:${visible}" onclick="adminDeletePackage(this)" value= "${packag._username}" id="${packag.parcel_id}">delete</button>
        <button class="delete" onclick="updatePackage(this)" value= "${packag._username}" id="${packag.parcel_id}">${labels}</button></div>
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
