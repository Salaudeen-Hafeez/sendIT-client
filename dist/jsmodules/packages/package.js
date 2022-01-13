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
  //   const distanceMetrix = JSON.parse(localStorage.getItem('distanceMetrix'));
  //   const packageData = createPackage(distanceMetrix.rows[0].elements[0]);
  //   packages.innerHTML = packageData;
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

window.initMap = function () {
  const { _location, _destination } = JSON.parse(
    localStorage.getItem('package')
  );
  console.log(_destination);
  //   const bounds = new google.maps.LatLngBounds();
  //   const map = new google.maps.Map(document.getElementById('map'), {
  //     center: { lat: 6.5095, lng: 3.3711 },
  //     zoom: 8,
  //   });
  //   // initialize services
  //   const geocoder = new google.maps.Geocoder();
  //   const service = new google.maps.DistanceMatrixService();
  //   const addresses = [_destination, _location];

  //   const add = [];
  //   const parameters = { geocoder, map, add, service };
  //   addresses.forEach((address) => {
  //     geocodeAddress(parameters, address);
  //   });
  //   var input3 = document.getElementById('newDestination');
  //   var autocomplete3 = new google.maps.places.Autocomplete(input3);
};

window.autoCompleteAddress = function () {
  var input = document.getElementById('location');
  var autocomplete = new google.maps.places.Autocomplete(input);
  var input2 = document.getElementById('destination');
  var autocomplete2 = new google.maps.places.Autocomplete(input2);
  // autocomplete.addListener('place_changed', function () {
  //   var place = autocomplete.getPlace();
  //   document.getElementById('address').value = JSON.stringify(
  //     place.address_components
  //   );
  // });
};
