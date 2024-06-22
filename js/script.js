const overview = document.querySelector(".overview");
const username = "mariateresepettersson";
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoDataSection = document.querySelector(".repo-data");
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

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
  filterInput.classList.remove("hide");
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
  displayRepoInfo(repoInfo, languages);
};

//Function to display repo info
const displayRepoInfo = function (repoInfo, languages) {
  backButton.classList.remove("hide");
  repoDataSection.innerHTML = "";
  repoDataSection.classList.remove("hide");
  repoSection.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
  <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${
      repoInfo.html_url
    }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
  repoDataSection.append(div);
};

//Event listener for back button
backButton.addEventListener("click", function (e) {
  repoSection.classList.remove("hide");
  repoDataSection.classList.add("hide");
  backButton.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
  const inputValue = e.target.value;
  //console.log(inputValue);
  const repos = document.querySelectorAll(".repo");
  const lowerInputValue = inputValue.toLowerCase();

  for (const repo of repos) {
    const repoLowerInputValue = repo.innerText.toLowerCase();
    if (repoLowerInputValue.includes(lowerInputValue)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});
