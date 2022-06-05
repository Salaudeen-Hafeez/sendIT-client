const fetchData = async (url) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const admin = JSON.parse(localStorage.getItem('admin'));
  let token;
  if (user || admin) {
    token = user.auth_token || admin.admin_token;
  }

  const myHeaders = new Headers();

  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', token);

  let returnData = await fetch(url, {
    headers: myHeaders,
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
export { fetchData };
