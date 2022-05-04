const adminDeleteUser = (e) => {
  const admin = adminsData();
  const { _email, admin_token } = admin.admin;
  const username = e.value;
  const id = parseInt(e.id);
  fetch(
    `https://akera-logistics.herokuapp.com/api/v1/${username}/${admin_token}`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      // localStorage.removeItem('user');
      // localStorage.setItem('user', JSON.stringify(data));
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};

const adminDeletePackage = (e) => {
  const status = e.parentElement.querySelector('button').innerHTML;
  const admin = adminsData();
  const parentEl = e.parentElement.parentElement.parentElement.parentElement;
  let button = parentEl.querySelector('button');
  const { _email, admin_token } = admin.admin;
  const username = e.value;

  const id = parseInt(e.id);
  fetch(
    `https://akera-logistics.herokuapp.com/api/v1/${username}/packages/${id}/${admin_token}`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.removeItem('package');
      localStorage.setItem('package', JSON.stringify(data));
      button.click();
      button.click();
    })
    .catch((err) => {
      console.log(err);
    });
};
