const authenticateRoute = (pathName) => {
  console.log(pathName);
  const authData =
    JSON.parse(localStorage.getItem('user')) ||
    JSON.parse(localStorage.getItem('admin'));
  const packag = localStorage.getItem('package');
  console.log(authData);
  switch (pathName) {
    case '/':
      if (authData !== null) {
        if (authData.user && authData.user.auth_token) {
          window.location.replace('https://akera-logistics.netlify.app/user');
        } else if (authData.admin && authData.admin.admin_token) {
          window.location.replace('https://akera-logistics.netlify.app/admin');
        } else {
          window.location.replace('https://akera-logistics.netlify.app/');
        }
      } else {
        window.location.replace('https://akera-logistics.netlify.app/');
      }
      break;
    case '/login':
      if (authData !== null) {
        if (authData.user && authData.user.auth_token) {
          window.location.replace('https://akera-logistics.netlify.app/user');
        } else if (authData.admin && authData.admin.admin_token) {
          window.location.replace('https://akera-logistics.netlify.app/admin');
        } else {
          window.location.replace('https://akera-logistics.netlify.app/login');
        }
      } else {
        window.location.replace('https://akera-logistics.netlify.app/login');
      }

      break;
    case '/user':
      if (authData !== null && authData.user) {
        window.location.replace('https://akera-logistics.netlify.app/user');
      } else {
        window.location.replace('https://akera-logistics.netlify.app/login');
      }
      break;
    case '/admin':
      if (authData !== null && authData.admin) {
        window.location.replace('https://akera-logistics.netlify.app/admin');
      } else {
        window.location.replace('https://akera-logistics.netlify.app/login');
      }
      break;
    case '/package':
      if (packag !== null) {
        window.location.replace('https://akera-logistics.netlify.app/package');
      } else {
        window.location.replace('https://akera-logistics.netlify.app/login');
      }
      break;
    default:
      break;
  }
};

export { authenticateRoute };
