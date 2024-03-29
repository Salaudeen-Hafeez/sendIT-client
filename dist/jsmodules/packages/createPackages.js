const createPackage = ({ distance, duration, fare }) => {
  let admin = JSON.parse(localStorage.getItem('admin'));
  const { _name, _location, _destination, _status, _reciever } = JSON.parse(
    localStorage.getItem('package')
  );
  let color;
  let select = '';
  let visibility = 'hidden';
  let label = 'destination';
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
  if (admin) {
    visibility = 'visible';
    label = 'location';
    select = `<label for="status" class="col-4">status</label>
        <select name="status" class="col-8" id="status" form="updateForm">
          <option value="In transit">In transit</option>
          <option value="Delivered">Delivered</option>
        </select>`;
  }
  const tableBody = `
        <div class="packg" id="packg">
        <p class="packName">${_name}</p>
        <p class="packinfo">
          <span>location:</span>${_location}
        </p>
        <p class="packinfo"><span>Going to:</span>${_destination}</p>
        <p class="packinfo"><span>Reciever mobile:</span>${_reciever}</p>
        <p class="packinfo" style="font-weight: 700;color:${color}"><span>Status:</span>${_status}</p>
        </div>
        `;
  const tableBody1 = `
        <div style="padding:15px 10px;">
        <p class="packinfo"><span>Distance:</span> ${distance}</p>
        <p class="packinfo"><span>Duration:</span>${duration}</p>
        </div>
        <form onsubmit="return false" class="updateForm" id="updateForm">
        <div class="input-field">
              <label for="pName" class="col-4">Enter new ${label}</label>
              <input
                type="text"
                class="col-8"
                id="location"
                name=${label}
                oninput="clearErr(this)"
              />
              <small></small>
            </div>
        <div class="select1" style="visibility:${visibility}">
        ${select}
        </div>
        <input
            type="submit"
            class="btn"
            id="submitUpdate"
            value="Update"
            onclick="updateStatus(this)"
          />
      </form>
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
