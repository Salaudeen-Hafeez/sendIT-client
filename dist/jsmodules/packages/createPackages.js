const createPackage = ({ distance, duration, fare }) => {
  const { parcel_id, _name, _location, _destination, _status, _username } =
    JSON.parse(localStorage.getItem('package'));
  let color;
  switch (_status) {
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
  const tableBody = `
        <div class="packg">
        <p class="packName">${_name}</p>
        <p class="packinfo">
          <span>Pickup location:</span>${_location}
        </p>
        <p class="packinfo"><span>Going to:</span>${_destination}</p>
        <p class="packinfo" style="font-weight: 700;color:${color}"><span>Status:</span>${_status}</p>
        </div>
        `;
  const tableBody1 = `
        <div style="padding:15px 10px;">
        <p class="packinfo"><span>Distance:</span> ${distance}</p>
        <p class="packinfo"><span>Duration:</span>${duration}</p>
        </div>
      <div class="confirmOrd">
        <button
          style="border-radius: 10px 0px 0px 10px"
          onclick="canceleOrder(this)"
        >
          Cancel
        </button>
        <p>${fare}</p>
        <button
          style="border-radius: 0px 10px 10px 0px"
          onclick="okay(this)"
        >
          Okay
        </button>
      </div>
      `;
  return { tableBody, tableBody1 };
};
export { createPackage };
