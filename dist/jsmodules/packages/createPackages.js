const createPackage = (metrix) => {
  const newPackage = JSON.parse(localStorage.getItem('package'));
  const tableBody = `
          <img 
            src="/images/Lagos4.jpg"
            alt="profile picture"
            class="package-img"
          />
          <div class="profile-content">
            <table>
              <thead>
                <tr class="thead">
                  <th colspan="2">${newPackage._name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Present location</td>
                  <td>${newPackage._location}</td>
                </tr>
                <tr>
                  <td>Destination</td>
                  <td>${newPackage._destination}</td>
                </tr>
                <tr>
                  <td>Reciever mobile number</td>
                  <td>${newPackage._reciever}</td>
                </tr>
                <tr>
                  <td>Distance</td>
                  <td>${metrix.distance.text}</td>
                </tr>
                <tr>
                  <td>Duration</td>
                  <td>${metrix.duration.text}</td>
                </tr>
                <tr>
                  <td colspan="2" class="td-status">
                    <a href="">${newPackage._status}</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>`;
  return tableBody;
};

// Get the stored uaerPackages data and create the display packages
const createUserPackage = () => {
  const packagesDiv = document.getElementById('packages');
  let displayPackage = '';
  const packages1 = JSON.parse(localStorage.getItem('packages'));
  if (packages1.length > 0 && !packages1.packages) {
    displayPackage += '<h1 style="text-align:center;">My Packages</h1>';
    packages1.forEach((newPackage) => {
      const tableBody = `
      <div class="package" id="userPackage">
      <img
            src="/images/Lagos4.jpg"
            alt="profile picture"
            class="profile-img"
          />
          <div class="profile-content">
            <table>
              <thead>
                <tr class="thead">
                  <th colspan="2">${newPackage._name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>location</td>
                  <td>${newPackage._location}</td>
                </tr>
                <tr>
                  <td>Destination</td>
                  <td>${newPackage._destination}</td>
                </tr>
                <tr>
                  <td>Reciever</td>
                  <td>${newPackage._reciever}</td>
                </tr>
                <tr>
                  <td colspan="2" class="td-status">
                    <button onclick="getPackage(this)" value= "${newPackage.parcel_id}" id="parcel-id">${newPackage._status}</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>`;
      displayPackage += tableBody;
    });
  } else {
    displayPackage += `<h3 style="text-align: center; color: red">${Object.values(
      packages1
    )}</h3>`;
  }
  packagesDiv.innerHTML = displayPackage;
};
export { createUserPackage, createPackage };
