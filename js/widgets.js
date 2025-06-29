document.addEventListener('DOMContentLoaded', function() {
    // Fetch GitHub Repositories
    fetch('https://api.github.com/users/maxrenke/repos?sort=updated&per_page=5')
        .then(response => response.json())
        .then(data => {
            const githubReposDiv = document.getElementById('github-repos');
            if (data && data.length > 0) {
                const ul = document.createElement('ul');
                ul.className = 'list-unstyled';
                data.forEach(repo => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a> - ${repo.description || 'No description'}`;
                    ul.appendChild(li);
                });
                githubReposDiv.appendChild(ul);
            } else {
                githubReposDiv.innerHTML = '<p>No public repositories found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching GitHub repos:', error);
            document.getElementById('github-repos').innerHTML = '<p>Failed to load GitHub activity.</p>';
        });

    // Fetch Blog Posts (using RSS2JSON for CORS)
    const blogRssUrl = 'https://blog.maxrenke.com/feed.xml';
    const rssToJsonApi = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(blogRssUrl)}`;

    fetch(rssToJsonApi)
        .then(response => response.json())
        .then(data => {
            const blogFeedDiv = document.getElementById('blog-feed');
            if (data && data.items && data.items.length > 0) {
                const ul = document.createElement('ul');
                ul.className = 'list-unstyled';
                data.items.slice(0, 5).forEach(post => { // Limit to 5 posts
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="${post.link}" target="_blank">${post.title}</a> - ${new Date(post.pubDate).toLocaleDateString()}`;
                    ul.appendChild(li);
                });
                blogFeedDiv.appendChild(ul);
            } else {
                blogFeedDiv.innerHTML = '<p>No blog posts found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching blog posts:', error);
            document.getElementById('blog-feed').innerHTML = '<p>Failed to load blog posts.</p>';
        });
});

function BattleNetClipBoard() {
	var text = "StupidGeek#1555";
    Copied = text.createTextRange();
    Copied.execCommand("copy", false, null);
}

function GuildWarsClipBoard() {
	var text = "Maxwell Renke.6240";
    Copied = text.createTextRange();
    Copied.execCommand("copy", false, null);
}