const overview = document.querySelector(".overview");
const user = "mariateresepettersson";

//Declare a function to fetch user data from git
const getUserData = async function () {
  const res = await fetch(`https://api.github.com/users/${user}`);
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
};
