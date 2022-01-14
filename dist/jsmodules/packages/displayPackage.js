const packageDisplay = (packages) => {
  let packagesDiv = '';
  if (Array.isArray(packages) && packages.length !== 0) {
    packages.forEach((packag) => {
      packagesDiv += `<li>
        <div class="" onclick="getPackage(this)" value= "${packag.parcel_id}" id="parcel-id">
          <h4>${packag._name}</h4>
          <p>${packag._destination}</p>
          <p>${packag._status}</p>
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
