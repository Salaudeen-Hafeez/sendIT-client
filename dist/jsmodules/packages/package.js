import { putPackage } from '../httpFetch/putData.js';
import { userUpdateUrl } from '../httpFetch/urls.js';
import { formValidation } from '../validateForm.js';
import { createPackage } from './createPackages.js';

window.loadPackage = () => {
  const admin = JSON.parse(localStorage.getItem('admin'));
  const packages = document.getElementById('userProfile');
  const status = document.getElementById('updateStatus');
  const location = document.getElementById('location');
  const heading = document.getElementById('heading');
  if (admin) {
    status.classList.toggle('open');
    location.innerHTML = 'New location';
    heading.innerHTML = 'Fill the form below to update the package status';
  }
  const distanceMetrix = JSON.parse(localStorage.getItem('distanceMetrix'));
  const packageData = createPackage(distanceMetrix.rows[0].elements[0]);
  packages.innerHTML = packageData;
};

window.completeOrder = () => {
  window.history.go(-1);
};

window.cancelOrder = async () => {
  const { _status } = JSON.parse(localStorage.getItem('package'));
  if (_status === 'Order Cancelled') {
    alert('Order has been cancelled');
  } else {
    const data = { _status: 'Order Cancelled' };
    const deletedPackage = await putPackage(userUpdateUrl, data);
    localStorage.setItem('package', JSON.stringify(deletedPackage));
    window.location.reload();
  }
};
window.updateDestination = async () => {
  const admin = JSON.parse(localStorage.getItem('admin'));
  const input = document.getElementById('newDestination');
  const select1 = document.getElementById('newStatus');
  const { data: data1, emptyInput } = formValidation([input, select1]);
  if (!emptyInput) {
    const { _status } = JSON.parse(localStorage.getItem('package'));
    if (_status === 'Order Cancelled') {
      alert('Order has been cancelled');
    } else if (admin) {
      const data = {
        _location: data1.destination,
        _status: data1.status,
      };
      const updatedPackage = await putPackage(userUpdateUrl, data);
      localStorage.setItem('package', JSON.stringify(updatedPackage));
      window.location.reload();
    } else {
      //   const add = data1.destination;
      //   console.log(add);
      //   const geocoder = new google.maps.Geocoder();
      //   geocoder.geocode({ address: add }).then(({ results, status }) => {
      //     console.log(results);
      //     console.log(status);
      //   });
      const data = { _destination: data1.destination };
      const updatedPackage = await putPackage(userUpdateUrl, data);
      console.log(updatedPackage);
      localStorage.setItem('package', JSON.stringify(updatedPackage));
      window.location.reload();
    }
  }
};
window.clearErr = (e) => {
  e.style.border = '1px solid lightgreen';
  const small = e.parentElement.querySelector('small');
  small.style.visibility = 'hidden';
};

// Google map API call and services
function geocodeAddress(parameters, address) {
  const { geocoder, map, add, service } = parameters;
  geocoder
    .geocode({ address })
    .then(({ results }) => {
      add.push(results[0].formatted_address);
      if (add.length >> 1) {
        const request = {
          origins: [add[0]],
          destinations: [add[1]],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false,
        };
        // get distance matrix response
        service.getDistanceMatrix(request).then((response) => {
          console.log(response);
          localStorage.setItem('distanceMetrix', JSON.stringify(response));
        });
      }
      map.setCenter(results[0].geometry.location);
      new google.maps.Marker({
        map,
        position: results[0].geometry.location,
      });
    })
    .catch((e) =>
      alert(`Geocode was not successful for the following reason: ${e}`)
    );
}

const { _location, _destination } = JSON.parse(localStorage.getItem('package'));
const bounds = new google.maps.LatLngBounds();
const map = new google.maps.Map(document.getElementById('map'), {
  center: { lat: 6.5095, lng: 3.3711 },
  zoom: 8,
});
// initialize services
const geocoder = new google.maps.Geocoder();
const service = new google.maps.DistanceMatrixService();
const addresses = [_destination, _location];

const add = [];
const parameters = { geocoder, map, add, service };

addresses.forEach((address) => {
  geocodeAddress(parameters, address);
});
var input3 = document.getElementById('newDestination');
var autocomplete3 = new google.maps.places.Autocomplete(input3);

window.autoCompleteAddress = function () {
  var input = document.getElementById('location');
  var autocomplete = new google.maps.places.Autocomplete(input);
  var input2 = document.getElementById('destination');
  var autocomplete2 = new google.maps.places.Autocomplete(input2);
};
