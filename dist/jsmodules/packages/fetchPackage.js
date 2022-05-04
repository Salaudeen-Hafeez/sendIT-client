const fetchPackages = () => {
  const user = usersData();
  const { auth_token } = user.user;
  fetch(`https://akera-logistics.herokuapp.com/api/v1/packages/${auth_token}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.removeItem('packages');
      localStorage.setItem('packages', JSON.stringify(data));
    })
    .catch((err) => {
      console.log(err);
    });
};

const fetchPendingPackages = () => {
  const user = usersData();
  const { _email, _username, auth_token } = user.user;
  const condition = 'In transit';
  fetch(
    `https://akera-logistics.herokuapp.com/api/v1/users/${_email}/${_username}/${auth_token}/packages/${condition}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.removeItem('packages');
      localStorage.setItem('packages', JSON.stringify(data));
    })
    .catch((err) => {
      console.log(err);
    });
};

const adminFetchPackages = (cond) => {
  const admin = adminsData();
  const { _email, admin_token } = admin.admin;
  if (!admin_token) {
    window.location.href = '/login';
  } else {
    fetch(
      `https://akera-logistics.herokuapp.com/api/v1/users/packages/${admin_token}/${cond}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        localStorage.removeItem('packages');
        localStorage.setItem('packages', JSON.stringify(data));
        displayPackages();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
const adminFetchUserPackage = (e) => {
  const admin = adminsData();
  const { admin_token, _email } = admin.admin;
  const username = e.value;
  const id = e.id;
  fetch(
    `https://akera-logistics.herokuapp.com/api/v1/users/${username}/${id}/${_email}/${admin_token}/packages`,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.removeItem('packages');
      localStorage.setItem('packages', JSON.stringify(data));

      adminDisplayUserPackages(id);
    })
    .catch((err) => {
      console.log(err);
    });
};
