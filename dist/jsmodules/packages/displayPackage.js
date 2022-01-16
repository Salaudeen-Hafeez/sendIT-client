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
      packagesDiv += `<li style="margin-bottom:8px;">
        <div style="cursor:pointer" onclick="getPackage(this)" value="${packag._status}">
          <p style="font-weight:800;color:#056973">${packag._name}</p>
          <p><span style="font-weight:800">Pickup location:</span> ${packag._location}</p>
          <p><span style="font-weight:800">Going to:</span> ${packag._destination}</p>
          <p style="font-weight:800;color:${color}">${packag._status}</p>
        </div>
        <button style="width:90%;border-radius:10px;font-weight:500;background-color:#056973;color:white" onclick="adminDeletePackage(this)" value= "${packag._username}" id="${packag.parcel_id}">delete</button>
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
