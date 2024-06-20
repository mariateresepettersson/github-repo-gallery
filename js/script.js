const overview = document.querySelector(".overview");
const user = "mariateresepettersson";

//Declare a function to fetch user data from git
const getUserData = async function () {
  const res = await fetch(`https://api.github.com/users/${user}`);
  const data = await res.json();
  console.log(data);
};
getUserData();
