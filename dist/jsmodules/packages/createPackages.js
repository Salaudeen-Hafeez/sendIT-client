const createPackage = ({ distance, duration, fare }) => {
  const { parcel_id, _name, _location, _destination, _status, _username } =
    JSON.parse(localStorage.getItem('package'));
  const tableBody = `
          <li style="margin:8px;">
        <div style="cursor:pointer" id="${parcel_id}" onclick="getPackage(this)">
          <p style="font-weight:800;color:#056973">${_name}</p>
          <p><span style="font-weight:800">Pickup location:</span> ${_location}</p>
          <p><span style="font-weight:800">Going to:</span> ${_destination}</p>
          <p><span style="font-weight:800">Distance:</span> ${distance}</p>
          <p><span style="font-weight:800">Duration:</span> ${duration}</p>
          <p><span style="font-weight:800">Total cost:</span> ${fare}</p>
          <p style="font-weight:800;color:blue">${_status}</p>
        </div>
        <button class="delete" onclick="adminDeletePackage(this)" value= "${_username}" id="${parcel_id}">${labels}</button>
      </li>
    `;
  return tableBody;
};
export { createPackage };
