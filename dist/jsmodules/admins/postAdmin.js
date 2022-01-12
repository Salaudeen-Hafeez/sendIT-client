const postAdmin = (data) => {
  clearDisplayErr();
  fetch('https://akera-logistics.herokuapp.com/api/v1/users/admins', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.errMessage) {
        displayErr(data);
      } else {
        localStorage.setItem('admin', JSON.stringify(data));
        openAdmin();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  // const message = `
  //       <h2>Dear Mr/Mrs ${data._name}</h2>, <br>
  //       <p>Thank you for choosing sendIT Logistics.</p> <br>
  //       <p>Below are the details of your new order</p><br>
  //       <p>As always, we shall do our best to get your package
  //       to your desire destination as early as possible and safely.</p>
  //     `;
  // sendEmail(data._email, message);
};
