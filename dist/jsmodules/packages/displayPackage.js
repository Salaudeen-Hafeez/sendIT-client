const packageDisplay = (packages) => {
  let packagesDiv = '';
  if (Array.isArray(packages)) {
    packages.forEach((packag) => {
      packagesDiv += `<li>
        <div class="userDetails" style="background: #DDDDB9;">
          <h2>${packag._name}</h2>
          <p>${packag._location}</p>
          <p>${packag._destination}</p>
          <p>${packag._reciever}</p>
          <button onclick="getPackage(this)" value= "${packag.parcel_id}" id="parcel-id">${packag._status}</button>
          <button onclick="adminDeletePackage(this)" value= "${packag._username}" id="${packag.parcel_id}">delete</button>
        </div>
      </li>
    `;
    });
  } else {
    packagesDiv = `<li>
    <h3 style="padding-top: 5px; color: red;">${Object.values(
      packages
    )}</h3></li>`;
  }
  console.log(packagesDiv);
  return packagesDiv;
};

export { packageDisplay };
