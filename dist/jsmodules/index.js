// const apiKey = 'AIzaSyD9LtzkCH903RTWTMDehYnSmOVitAhBtwA';
// import { authenticateRoute } from './routAuth.js';
// let pathName = location.pathname;
// const pathNames = [localStorage.getItem('path')];
// localStorage.setItem('path', pathName);
// pathNames.push(pathName);
// if (pathNames[0] !== pathNames[1]) {
//   authenticateRoute(pathName);
// }
window.toggleMenu = () => {
  const navLink = document.querySelector('.nav-link');
  navLink.classList.toggle('open');
};
