const postData = async (url, data) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const admin = JSON.parse(localStorage.getItem('admin'));
  let token;
  let email;
  if (user || admin) {
    token = user.auth_token || admin.admin_token;
    email = user._email || admin._email;
  }

  const myHeaders = new Headers();

  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', token);
  myHeaders.append('email', email);

  let returnData = await fetch(url, {
    method: 'POST',
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
export { postData };
