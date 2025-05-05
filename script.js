let form = document.querySelector(".form");
let card = document.querySelector(".card");
let input = document.querySelector(".input");

function getProfileData(username) {
  return fetch(`https://api.github.com/users/${username}`).then((raw) => {
    if (!raw.ok) throw new Error("data not found");
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

function addcard(username) {
  console.log(username);
  let data = `<div class="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-600">
        <img src="" alt="User Avatar" class="w-full h-full object-cover"/>
      </div>

      <!-- Info -->
      <div class="flex-1">
        <h2 class="text-2xl font-semibold">The Octocat</h2>
        <p class="text-gray-400 text-sm mt-1">@octocat</p>
        <p class="text-gray-300 text-sm mt-3">A mysterious feline creature and the mascot of GitHub.</p>

        <div class="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
          <span>💻 Repositories: <span class="text-white font-medium">8</span></span>
          <span>👥 Followers: <span class="text-white font-medium">3948</span></span>
          <span>👣 Following: <span class="text-white font-medium">9</span></span>
        </div>

        <div class="mt-3 text-sm text-gray-400">
          🌍 Location: <span class="text-white">San Francisco</span><br/>
          🔗 Website: <a href="https://github.blog" target="_blank" class="text-blue-400 hover:underline">github.blog</a><br/>
          🗓️ Joined: <span class="text-white">January 25, 2011</span>
        </div>
      </div>`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let user = input.value;
  getProfileData(user).then((data) => {
    console.log(data);
  });
  input.value = "";
});
