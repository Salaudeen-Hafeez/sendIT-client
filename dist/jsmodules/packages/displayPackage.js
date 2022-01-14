const packageDisplay = (packages) => {
  let packagesDiv = '';
  if (Array.isArray(packages) && packages.length !== 0) {
    packages.forEach((packag) => {
      packagesDiv += `<li>
        <div class="userDetails" onclick="getPackage(this)" value= "${packag.parcel_id}" id="parcel-id">
          <p>${packag._name}</p>
          <p>${packag._destination}</p>
          <p>${packag._status}</p>
        </div>
      </li>
    `;
    });
  } else {
    packagesDiv = `<li>
    <h2 style="padding-top: 5px; color: red;">No packages</h></li>`;
  }
  return packagesDiv;
};

export { packageDisplay };
