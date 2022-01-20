const authenticateRoute = (pathName) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const admin = JSON.parse(localStorage.getItem('admin'));
  const packag = localStorage.getItem('package');
  switch (pathName) {
    case '/':
      if (user !== null && user.auth_token) {
        window.location.href = '/user';
      } else if (admin !== null && admin.admin_token) {
        window.location.href = '/admin';
      } else {
        break;
      }

      break;
    case '/login':
      if (user !== null && user.auth_token) {
        window.location.href = '/user';
      } else if (admin !== null && admin.admin_token) {
        window.location.href = '/admin';
      } else {
        break;
      }
      break;
    case '/user':
      if (user !== null && user.auth_token) {
        break;
      } else {
        window.location.href = '/login';
      }
      break;
    case '/admin':
      if (admin !== null && admin.admin_token) {
        break;
      } else {
        window.location.href = '/login';
      }
      break;
    case '/package':
      if (packag !== null) {
        break;
      } else if (user !== null) {
        window.location.href = '/user';
      } else {
        window.location.href = '/login';
      }
      break;
    case '/newpackage':
      if (user !== null && user.auth_token) {
        break;
      } else {
        window.location.href = '/login';
      }
      break;
    default:
      window.location.href = '/404';
      break;
  }
};
let pathName = location.pathname;
authenticateRoute(pathName);

export { authenticateRoute };
