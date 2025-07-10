document.addEventListener('DOMContentLoaded', function() {
    // Show loading states
    const githubReposDiv = document.getElementById('github-repos');
    const blogFeedDiv = document.getElementById('blog-feed');
    
    githubReposDiv.innerHTML = '<p class="loading-text"><i class="fas fa-spinner fa-spin"></i> Loading...</p>';
    blogFeedDiv.innerHTML = '<p class="loading-text"><i class="fas fa-spinner fa-spin"></i> Loading...</p>';
    
    // Fetch GitHub Repositories with timeout
    const fetchWithTimeout = (url, timeout = 5000) => {
        return Promise.race([
            fetch(url),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Timeout')), timeout)
            )
        ]);
    };
    
    fetchWithTimeout('https://api.github.com/users/maxrenke/repos?sort=updated&per_page=5')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.length > 0) {
                const ul = document.createElement('ul');
                ul.className = 'list-unstyled';
                data.forEach(repo => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a> - ${repo.description || 'No description'}`;
                    ul.appendChild(li);
                });
                githubReposDiv.innerHTML = '';
                githubReposDiv.appendChild(ul);
            } else {
                githubReposDiv.innerHTML = '<p>No public repositories found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching GitHub repos:', error);
            githubReposDiv.innerHTML = '<p>Unable to load GitHub activity at this time.</p>';
        });

    // Fetch Blog Posts (using RSS2JSON for CORS) with timeout
    const blogRssUrl = 'https://blog.maxrenke.com/feed.xml';
    const rssToJsonApi = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(blogRssUrl)}`;

    fetchWithTimeout(rssToJsonApi)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.items && data.items.length > 0) {
                const ul = document.createElement('ul');
                ul.className = 'list-unstyled';
                data.items.slice(0, 5).forEach(post => { // Limit to 5 posts
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="${post.link}" target="_blank" rel="noopener">${post.title}</a> - ${new Date(post.pubDate).toLocaleDateString()}`;
                    ul.appendChild(li);
                });
                blogFeedDiv.innerHTML = '';
                blogFeedDiv.appendChild(ul);
            } else {
                blogFeedDiv.innerHTML = '<p>No blog posts found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching blog posts:', error);
            blogFeedDiv.innerHTML = '<p>Unable to load blog posts at this time.</p>';
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