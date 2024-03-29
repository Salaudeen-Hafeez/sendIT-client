import { putPackage } from '../httpFetch/putData.js';
import { formValidation } from '../validateForm.js';
import { createPackage } from './createPackages.js';

const geocodeAddress = async (geocoder, address) => {
  let geocodeResult = await geocoder
    .geocode({ address })
    .then(({ results }) => {
      return {
        add1: results[0].formatted_address,
        add2: results[0].geometry.location,
      };
    })
    .catch((e) =>
      alert(`Geocode was not successful for the following reason: ${e}`)
    );
  return geocodeResult;
};

const getDistance = async (service, add) => {
  const request = {
    origins: [add[0]],
    destinations: [add[1]],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false,
  };

  // get distance matrix response
  let distance = await service.getDistanceMatrix(request).then((response) => {
    return response;
  });
  return distance;
};

const user = JSON.parse(localStorage.getItem('user'));
const admin = JSON.parse(localStorage.getItem('admin'));
const packag = JSON.parse(localStorage.getItem('package'));
const map = new google.maps.Map(document.getElementById('map'), {
  center: { lat: 6.5095, lng: 3.3711 },
  zoom: 8,
});

// initialize services
const geocoder = new google.maps.Geocoder();
const service = new google.maps.DistanceMatrixService();
const add = [];
let addresses;
if (packag) {
  addresses = [packag._destination, packag._location];
  addresses.forEach(async (address) => {
    const { add1, add2 } = await geocodeAddress(geocoder, address);
    add.push(add1);
    map.setCenter(add2);
    new google.maps.Marker({
      map,
      position: add2,
    });
  });
}

window.toggleMenu = () => {
  const navLink = document.querySelector('.nav-link');
  navLink.classList.toggle('open');
};

window.loadPackage = async () => {
  const packages = document.getElementById('packagePage1');
  const packages2 = document.getElementById('packagePage2');
  const distMetrix = await getDistance(service, add);
  const { distance, duration } = distMetrix.rows[0].elements[0];
  const metrixData = {
    distance: distance.text,
    duration: duration.text,
    fare: packag._cost,
  };
  const { tableBody, tableBody1 } = createPackage(metrixData);
  packages.innerHTML = tableBody;
  packages2.innerHTML = tableBody1;
  const input = document.getElementById('location');
  new google.maps.places.Autocomplete(input);
};

window.updateStatus = async () => {
  const locatn = document.getElementById('location');
  const status = document.getElementById('status');
  const location1 = locatn.value;
  let data = {};
  let key = '_destination';
  const { _status, _location, parcel_id: id } = packag;
  let userUpdateUrl = `https://akera-backend.herokuapp.com/api/v1/parcels/${id}/destination`;
  if (!user) {
    userUpdateUrl = `https://akera-backend.herokuapp.com/api/v1/parcels/${id}/status`;
    data['_status'] = status.options[status.selectedIndex].value;
    key = '_location';
  }
  if (_status === 'Order Canceled' || _status === 'Delivered') {
    alert(`Order already canceled`);
  } else {
    const { data: data0, emptyInput } = formValidation([locatn]);
    if (!emptyInput) {
      const { add1: add2 } = await geocodeAddress(
        geocoder,
        Object.values(data0)[0]
      );
      const add = [_location, add2];
      const distMetrix = await getDistance(service, add);
      if (distMetrix.rows[0].elements[0].status === 'OK') {
        const newDest = { ...data, [key]: location1 };
        const packag = await putPackage(userUpdateUrl, newDest);
        console.log(packag)
        localStorage.setItem('package', JSON.stringify(packag.package));
        localStorage.setItem('packages', JSON.stringify(packag.packages));
        window.location.reload();
      } else {
        alert('Destination address entered not found');
      }
    }
  }

  locatn.value = '';
};

window.okay = () => {
  if (!user) {
    window.location.href = '/admin';
  } else {
    window.location.href = '/user';
  }
};

window.canceleOrder = async () => {
  if (user) {
    const userUpdateUrl = `https://akera-backend.herokuapp.com/api/v1/parcels/${packag.parcel_id}/destination`;
    if (packag._status === 'Order Canceled') {
      alert('Order already canceled');
    } else {
      const confrm = confirm('Are you sure to cancel this order?');
      if (confrm) {
        const data = { _status: 'Order Canceled' };
        const updatedPackage = await putPackage(userUpdateUrl, data);
        localStorage.setItem('package', JSON.stringify(updatedPackage.package));
        localStorage.setItem(
          'packages',
          JSON.stringify(updatedPackage.packages)
        );
        window.location.reload();
      }
    }
  }
};

window.clearErr = (e) => {
  e.style.border = '1px solid lightgreen';
  const small = e.parentElement.querySelector('small');
  small.style.visibility = 'hidden';
};
