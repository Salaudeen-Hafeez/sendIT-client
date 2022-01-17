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
export { createPackage };
