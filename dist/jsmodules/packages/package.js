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
