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
        <div style="margin-bottom:8px; cursor: pointer" onclick="getPackage(this)" id="${packag.parcel_id}">
          <p style="font-weight:800;color:#056973">${packag._name}</p>
          <p>To: ${packag._destination}</p>
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
