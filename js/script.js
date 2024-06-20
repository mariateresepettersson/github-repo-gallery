const overview = document.querySelector(".overview");
const username = "mariateresepettersson";
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoDataSection = document.querySelector(".repo-data");

//Declare a function to fetch user data from git
const getUserData = async function () {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();
  console.log(data);
  displayUserData(data);
};
getUserData();

//Declare a function to display the fetched user information on the page
const displayUserData = function (data) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> 
    `;
  overview.append(div);
  getRepos();
};

//Declare a function to fetch user repos
const getRepos = async function () {
  const fetchRepos = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const repoData = await fetchRepos.json();
  //console.log(repoData);
  displayRepos(repoData);
};

//Declare a function to display repos
const displayRepos = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

//Function to Get Specific Repo Info
const getRepoInfo = async function (repoName) {
  const fetchInfo = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await fetchInfo.json();
  console.log(repoInfo);
  //Get languages
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  console.log(languageData);

  // List of languages
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }
  console.log(languages);
};
