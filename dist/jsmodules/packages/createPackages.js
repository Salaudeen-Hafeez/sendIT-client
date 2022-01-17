const createPackage = (metrix) => {
  const { parcel_id, _name, _location, _destination, _status, _username } =
    JSON.parse(localStorage.getItem('package'));
  const tableBody = `
          <li style="margin:8px;">
        <div style="cursor:pointer" id="${parcel_id}" onclick="getPackage(this)">
          <p style="font-weight:800;color:#056973">${_name}</p>
          <p><span style="font-weight:800">Pickup location:</span> ${_location}</p>
          <p><span style="font-weight:800">Going to:</span> ${_destination}</p>
          <p><span style="font-weight:800">Going to:</span> ${metrix.distance.tex}</p>
          <p><span style="font-weight:800">Going to:</span> ${metrix.duration.text}</p>
          <p style="font-weight:800;color:${color}">${_status}</p>
        </div>
        <button class="delete" onclick="adminDeletePackage(this)" value= "${_username}" id="${parcel_id}">${labels}</button>
      </li>
    `;
  return tableBody;
};
export { createPackage };
