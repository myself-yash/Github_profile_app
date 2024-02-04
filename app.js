const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const searchBox = document.querySelector("#search");
const search = document.querySelector(".search");

const getRepos = async (username) => {
  const repos = document.querySelector("#repos");
  const response = await fetch(APIURL + username + "/repos");
  const data = await response.json();

  data.forEach((item) => {

    const elem = document.createElement("a");
    elem.classList.add("repo");
    elem.href = item.html_url;
    elem.innerText = item.name;
    elem.target = "_blank";
    repos.appendChild(elem);
  });
};

const getUser = async (username) => {
  const response = await fetch(APIURL + username);
  const data = await response.json();

  if (response.status === 404) {
    // User does not exist
    main.innerHTML = '<p class="error-message">User does not exist.</p>';
    return;
  }

  const card = `
    <div class="card">
    <div>
        <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
    </div>
    <div class="user-info">
        <h2>${data.name}</h2>
        <p>${data.Bio}</p>

        <ul class="info">
            <li>${data.followers}<strong>Followers</strong></li>
            <li>${data.following}<strong>Following</strong></li>
            <li>${data.public_repos}<strong>Repos</strong></li>
        </ul>

        <div id="repos">
            
        </div>
    </div>
    </div>
`;

  main.innerHTML = card;
  getRepos(username);
};

const formSubmit = () => {
  const searchBox = document.querySelector("#search");
  if (searchBox.value != "") {
    getUser(searchBox.value);
    searchBox.value = "";
  }
  return false; // page will not refresh upon submitting
};

searchBox.addEventListener("focusout", function () {
  formSubmit();
});
