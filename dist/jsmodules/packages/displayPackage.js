const packageDisplay = (packages) => {
  let packagesDiv = '';
  let color;
  if (Array.isArray(packages) && packages.length !== 0) {
    packages.forEach((packag) => {
      switch (packag._status) {
        case 'In transit':
          color = '#095F06';
          break;
        case 'Delivered':
          color = '#07199D';
          break;
        default:
          color = 'red';
          break;
      }
      packagesDiv += `<li>
        <div style="margin-bottom:8px; cursor: pointer" onclick="getPackage(this)" value= "${packag.parcel_id}" id="parcel-id">
          <h4 style="font-weight:800;color:#8D9824">${packag._name}</h4>
          <p>${packag._destination}</p>
          <p style="font-weight:800;color:${color}">${packag._status}</p>
        </div>
      </li>
    `;
    });
  } else {
    packagesDiv = `<li>
    <h4 style="padding-top: 5px; color: red;">No packages</h4></li>`;
  }
  return packagesDiv;
};

export { packageDisplay };
