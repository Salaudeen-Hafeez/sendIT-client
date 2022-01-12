// Get the stored user data and create the user profile display

const user = usersData() || adminsData();
const createProfile = () => {
  let profileData;
  if (user !== null) {
    if (user.user) {
      profileData = user.user;
    } else {
      profileData = user.admin;
    }
  }

  const profile = document.getElementById('userProfile');
  const userProfile = ` <img
          src="/images/Lagos4.jpg"
          alt="profile picture"
          class="profile-img"
        />
        <div class="profile-content">
          <h1>${profileData._name}</h1>
          <ul>
            <li id="username">${profileData._username}</li>
            <li>${profileData._email}</li>
            <li>${profileData._status}</li>
            <li><a onclick="displayUserPackages()">My packages</a></li>
            <li><a onclick="displayPendingPackage()">Pending packages</a></li>
          </ul>
        </div>`;
  profile.innerHTML = userProfile;
};

const openUser = () => {
  if (user.user.users_id) {
    window.location.href = '/user';
  }
};

const openAdmin = () => {
  if (user.admin.users_id) {
    window.location.href = '/admin';
  }
};

export { createProfile, openUser, openAdmin };
