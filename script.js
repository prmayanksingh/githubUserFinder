let form = document.querySelector(".form");
let input = document.querySelector(".input");
let card = document.querySelector(".card");

function getProfileData(username) {
  return fetch(`https://api.github.com/users/${username}`).then((raw) => {
    if (!raw.ok) {
      alert('Not a valid username');
      throw new Error("data not found")
    };
    return raw.json();
  });
}

function getRepos(username) {
  return fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`
  ).then((raw) => {
    if (!raw.ok) throw new Error("data is not fetched...");
    return raw.json();
  });
}

function addcard(details) {
  let fulldate = details.created_at;
  let date = fulldate.split('T')[0];
  let user = `<div class="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-600">
        <img src="${details.avatar_url}" alt="User Avatar" class="w-full h-full object-cover"/>
      </div>
      <!-- Info -->
      <div class="flex-1">
        <h2 class="text-2xl font-semibold">${details.name}</h2>
        <p id="name" class="text-gray-400 text-sm mt-1 hover:text-blue:500 cursor-pointer hover:text-blue-500">${details.login}</p>
        <p class="text-gray-300 text-sm mt-3">${details.bio? details.bio : ""}</p>

        <div class="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
          <span>💻 Repositories: <span class="text-white font-medium">${details.public_repos}</span></span>
          <span>👥 Followers: <span class="text-white font-medium">${details.followers}</span></span>
          <span>👣 Following: <span class="text-white font-medium">${details.following}</span></span>
        </div>

        <div class="mt-3 text-sm text-gray-400">
          🌍 Location: <span class="text-white">${details.location? details.location : ""}</span><br/>
          🔗 Company: <a href="https://github.blog" target="_blank" class="text-blue-400 hover:underline">${details.company? details.company : ""}</a><br/>
          🗓️ Joined: <span class="text-white">${date}</span>
        </div>
      </div>`;
  
  card.innerHTML = user;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = input.value.trim();
  getProfileData(username).then((data) => {
    addcard(data)
  });
  input.value = "";
});


card.addEventListener("click",(e)=>{
  if(e.target.id === "name"){
    // window.open(`https://github.com/${e.target.textContent}`, "_blank");
    location.href= `https://github.com/${e.target.textContent}`
  }
})
