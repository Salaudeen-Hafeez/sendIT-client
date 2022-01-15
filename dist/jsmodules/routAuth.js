const authenticateRoute = (pathName) => {
  console.log(pathName);
  const user = JSON.parse(localStorage.getItem('user'));
  const admin = JSON.parse(localStorage.getItem('admin'));
  const packag = localStorage.getItem('package');
  switch (pathName) {
    case '/':
      if (user !== null && user.auth_token) {
        window.location.replace('https://akera-logistics.netlify.app/user');
      } else if (admin !== null && admin.admin_token) {
        window.location.replace('https://akera-logistics.netlify.app/admin');
      } else {
        window.location.replace('https://akera-logistics.netlify.app/');
      }

      break;
    case '/login':
      if (user !== null && user.auth_token) {
        window.location.replace('https://akera-logistics.netlify.app/user');
      } else if (admin !== null && admin.admin_token) {
        window.location.replace('https://akera-logistics.netlify.app/admin');
      } else {
        window.location.replace('https://akera-logistics.netlify.app/login');
      }
      break;
    case '/user':
      console.log('Inside user');
      if (user !== null && user.auth_token) {
        window.location.replace('https://akera-logistics.netlify.app/user');
      } else {
        window.location.replace('https://akera-logistics.netlify.app/login');
      }
      break;
    case '/admin':
      if (admin !== null && admin.admin_token) {
        window.location.replace('https://akera-logistics.netlify.app/admin');
      } else {
        window.location.replace('https://akera-logistics.netlify.app/login');
      }
      break;
    case '/package':
      if (packag !== null) {
        window.location.replace('https://akera-logistics.netlify.app/package');
      } else if (user !== null) {
        window.location.replace('https://akera-logistics.netlify.app/user');
      } else {
        window.location.replace('https://akera-logistics.netlify.app/login');
      }
      break;
    default:
      break;
  }
};

export { authenticateRoute };
