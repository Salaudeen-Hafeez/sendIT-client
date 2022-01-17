const createPackage = ({ distance, duration, fare }) => {
  const { parcel_id, _name, _location, _destination, _status, _username } =
    JSON.parse(localStorage.getItem('package'));
  const tableBody = `
        <div class="packg">
        <p class="packName">${_name}</p>
        <p class="packinfo">
          <span>Pickup location:</span>${_location}
        </p>
        <p class="packinfo"><span>Going to:</span>${_destination}</p>
        <p style="font-weight: 800; color: blue">${_status}</p>
        </div>
        `;
  const tableBody1 = `
        <div style="margin-bottom:10px">
        <p class="packinfo"><span>Distance:</span> ${distance}</p>
        <p class="packinfo"><span>Duration:</span>${duration}</p>
        </div>
      <div class="confirmOrd">
        <button
          style="border-radius: 10px 0px 0px 10px"
          onclick="adminDeletePackage(this)"
        >
          Cancel
        </button>
        <p>${fare}</p>
        <button
          style="border-radius: 0px 10px 10px 0px"
          onclick="adminDeletePackage(this)"
        >
          Okay
        </button>
      </div>
      `;
  return { tableBody, tableBody1 };
};
export { createPackage };
