const postPackage = (data) => {
  const user = usersData();
  const { _username, _email, auth_token } = user.user;
  data['username'] = _username;
  fetch(
    `https://akera-logistics.herokuapp.com/api/v1/users/${_username}/${_email}/${auth_token}/packages`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.removeItem('package');
      localStorage.setItem('package', JSON.stringify(data));
      openUser();
    })
    .catch((err) => {
      console.log(err);
    });
  // const message = `
  //       <h2>Dear Mr/Mrs ${data._name}</h2>, <br>
  //       <p>Thank you for choosing sendIT Logistics.</p> <br>
  //       <p>Below are the details of your new order</p>
  //       <ul>
  //         <li>${data._name}</li>
  //         </li>From:        ${data._location}</li>
  //         <li>To:           ${data._destination}</li>
  //         <li>Status        ${data._status}</li>
  //         <li>Tracking ID:  ${data._id}</li>
  //       </ul>
  //       <br>
  //       <p>As always, we shall do our best to get your package
  //       to your desire destination as early as possible and safely.</p>
  //     `;
  // sendEmail(data._email, message);
  fetchPackages();
};

const putPackage = (data, selectedPackage) => {
  let user;
  let email;
  let userid;
  let token;
  if (adminsData()) {
    user = adminsData();
    email = user.admin._email;
    userid = user.admin.users_id;
    token = user.admin.admin_token;
  } else {
    user = usersData();
    email = user.user._email;
    userid = user.user.users_id;
    token = user.user.auth_token;
  }
  fetch(
    `https://akera-logistics.herokuapp.com/api/v1/users/${email}/${userid}/${token}/packages/${parseInt(
      selectedPackage.parcel_id
    )}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.removeItem('package');
      localStorage.setItem('package', JSON.stringify(data));
      openPackage();
    })
    .catch((err) => {
      console.log(err);
    });
};
