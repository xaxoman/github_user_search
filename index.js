const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/github/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) {
            throw new Error('User not found');
        }

        const data = await response.json();
        
        // Format the data
        const userData = {
            name: data.name || data.login,
            login: data.login,
            bio: data.bio || 'This profile has no bio',
            avatar_url: data.avatar_url,
            public_repos: data.public_repos,
            followers: data.followers,
            following: data.following,
            location: data.location ? data.location : 'Not Available',
            twitter_username: data.twitter_username ? '@' + data.twitter_username : 'Not Available',
            blog: data.blog || 'Not Available',
            company: data.company || 'Not Available',
            created_at: new Date(data.created_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })
        };

        res.json(userData);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
