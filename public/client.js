  
       /* theme switcher  */
       const theme_switcher = document.getElementById("theme_switch");
       const theme_ico = document.getElementById("theme_ico");
       const theme_status = document.getElementById("theme_status");

       theme_switcher.addEventListener("click", () => {
           
           if (theme_status.textContent === "DARK") {
               
               theme_status.textContent = "LIGHT";
               theme_ico.classList = "fas fa-sun";
               document.documentElement.classList.add('light_theme');
           } 
           
           else {
               
               theme_status.textContent = "DARK";
               theme_ico.classList = "fas fa-moon";
               document.documentElement.classList.remove('light_theme');
           }
       });



       /* fetch dei dati tramite l'api di github usando come riferimento la route /github/:username in index.js */
       const user_search = document.getElementById("user_search");
       const user_submit = document.getElementById("user_submit");

       user_submit.addEventListener("click", (e) => {
           e.preventDefault();
           const username = user_search.value;
          
           fetch(`/github/${username}`)
           .then(res => res.json())
           .then(data => {
               // Update main profile info
               document.getElementById("github_name").textContent = data.name;
               document.getElementById("github_propic").src = data.avatar_url;
               document.getElementById("github_username").textContent = `@${data.login}`;
               document.getElementById("github_bio").textContent = data.bio;
               document.getElementById("github_joined_date").textContent = `Joined ${data.created_at}`;
               
               // Update stats
               document.getElementById("github_repo").textContent = data.public_repos;
               document.getElementById("github_followers").textContent = data.followers;
               document.getElementById("github_followed").textContent = data.following;
               
               // Update social links with proper handling of unavailable data
               const locationElem = document.getElementById("github_location");
               locationElem.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.location}`;
               locationElem.href = data.location !== 'Not Available' ? 
                   `https://www.google.com/maps/place/${data.location}` : '#';
               
               const twitterElem = document.getElementById("github_twitter");
               twitterElem.innerHTML = `<i class="fab fa-twitter"></i> ${data.twitter_username}`;
               twitterElem.href = data.twitter_username !== 'Not Available' ? 
                   `https://twitter.com/${data.twitter_username.replace('@', '')}` : '#';
               
               const blogElem = document.getElementById("github_info_site");
               blogElem.innerHTML = `<i class="fas fa-link"></i> ${data.blog}`;
               blogElem.href = data.blog !== 'Not Available' ? data.blog : '#';
               
               const companyElem = document.getElementById("github_company");
               companyElem.innerHTML = `<i class="fas fa-building"></i> ${data.company}`;
               companyElem.href = data.company !== 'Not Available' ? 
                   `https://github.com/${data.company.replace('@', '')}` : '#';

              
           })
           .catch(error => console.error('Error:', error));
       });
