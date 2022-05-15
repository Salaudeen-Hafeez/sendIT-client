const putPackage = async (url, data) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const admin = JSON.parse(localStorage.getItem('admin'));
  let token;
  if (user) {
    token = user.auth_token;
  } else if (admin) {
    token = admin.admin_token;
  }

  const myHeaders = new Headers();

  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', token);

  const returnData = await fetch(url, {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
  return returnData;
};

export { putPackage };
