const fetchUsers = () => {
  const admin = adminsData();
  const { admin_token } = admin.admin;
  if (!admin_token) {
    window.location.href = '/login';
  } else {
    let users = '';
    const containerdiv = document.getElementById('usersContainer');
    const container = containerdiv.querySelector('ul');

    fetch(`https://akera-backend.herokuapp.com/api/v1`, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((resp) => resp.json())
      .then((data) => {
        data.forEach((user) => {
          users += `<li>
        <div class="userDetails">
          <h2>${user._name}</h2>
          <p>${user._username}</p>
          <p>${user._email}</p>
          <button onclick="adminFetchUserPackage(this)" value= "${user._username}" id="${user.users_id}">packages</button>
          <button onclick="adminDeleteUser(this)" value= "${user._username}" id="${user.users_id}">delete user</button>
          <div class="userCont" id="userCont${user.users_id}"></div>
        </div>
      </li>`;
        });
        container.innerHTML = users;
        containerdiv.classList.toggle('open');
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
