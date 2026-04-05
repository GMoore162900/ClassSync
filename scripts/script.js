// Sample data
const communities = [
    {
        id: 1,
        name: 'CS Study Group',
        members: 1247,
        icon: '💻',
        description: 'A community for computer science students to discuss algorithms, data structures, and coding challenges.'
    },
    {
        id: 2,
        name: 'Campus Photographers',
        members: 856,
        icon: '📸',
        description: 'Share your photography and connect with fellow campus photographers.'
    },
    {
        id: 3,
        name: 'Startup Club',
        members: 643,
        icon: '🚀',
        description: 'For aspiring entrepreneurs and innovators looking to build the next big thing.'
    },
    {
        id: 4,
        name: 'Gaming League',
        members: 1521,
        icon: '🎮',
        description: 'Join our gaming community and compete in tournaments and casual matches.'
    },
    {
        id: 5,
        name: 'Book Club',
        members: 432,
        icon: '📚',
        description: 'Discuss books, share recommendations, and connect with readers.'
    },
    {
        id: 6,
        name: 'Art & Design',
        members: 589,
        icon: '🎨',
        description: 'Showcase your creative work and get feedback from fellow artists.'
    }
];

const samplePosts = [
    {
        id: 1,
        author: 'Sarah Chen',
        handle: '@sarah',
        avatar: '👩',
        time: '30m',
        community: 'CS Study Group',
        content: 'Just finished the data structures midterm! Who else found that binary tree question challenging? Would love to discuss approaches.',
        likes: 24,
        comments: 8,
        shares: 2
    },
    {
        id: 2,
        author: 'Mike Rodriguez',
        handle: '@miker',
        avatar: '👨',
        time: '2h',
        community: 'Gaming League',
        content: 'Tournament registration is now open! Sign up now for our quarterly gaming championship. Prize pool: $500!',
        likes: 56,
        comments: 12,
        shares: 18
    }
];

const trendingTopics = [
    { tag: '#MidtermSeason', count: '12.5K posts' },
    { tag: '#CampusLife', count: '8.3K posts' },
    { tag: '#StudyTips', count: '5.7K posts' },
    { tag: '#StartupIdeas', count: '4.2K posts' }
];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    renderCommunities();
    renderPosts();
    renderTrendingTopics();
    setupEventListeners();
});

// Render communities
function renderCommunities() {
    const list = document.getElementById('communitiesList');
    list.innerHTML = communities.slice(0, 4).map(community => `
        <div class="community-card">
            <div class="community-icon" style="font-size: 1.5rem; display: flex; align-items: center; justify-content: center;">
                ${community.icon}
            </div>
            <div class="community-info">
                <div class="community-name">${community.name}</div>
                <div class="community-members">${community.members.toLocaleString()} members</div>
            </div>
        </div>
    `).join('');
}

// Render posts
function renderPosts() {
    const feed = document.getElementById('postsFeed');
    feed.innerHTML = samplePosts.map(post => `
        <div class="post">
            <div class="post-header">
                <div class="post-avatar" style="font-size: 1.5rem; display: flex; align-items: center; justify-content: center;">
                    ${post.avatar}
                </div>
                <div style="flex: 1;">
                    <div class="post-user-name">
                        ${post.author}
                        <span class="post-user-handle">${post.handle}</span>
                        <span class="post-time">· ${post.time}</span>
                    </div>
                    <a href="#" class="post-community">${post.community}</a>
                </div>
            </div>
            <div class="post-content">${post.content}</div>
            <div class="post-actions">
                <button class="post-action">❤️ ${post.likes}</button>
                <button class="post-action">💬 ${post.comments}</button>
                <button class="post-action">↗️ ${post.shares}</button>
            </div>
        </div>
    `).join('');
}

// Render trending topics
function renderTrendingTopics() {
    const list = document.getElementById('trendingList');
    list.innerHTML = trendingTopics.map(topic => `
        <div class="trending-item">
            <div class="trending-tag">${topic.tag}</div>
            <div class="trending-count">${topic.count}</div>
        </div>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Post button
    document.getElementById('postBtn').addEventListener('click', handlePostSubmit);
    
    // Tab buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Discover search
    const discoverSearch = document.getElementById('discoverSearch');
    if (discoverSearch) {
        discoverSearch.addEventListener('input', handleDiscoverSearch);
    }
}

// Handle post submission
function handlePostSubmit() {
    const postInput = document.getElementById('postInput');
    const content = postInput.value.trim();
    
    if (content === '') {
        alert('Please write something to post!');
        return;
    }

    // Create new post
    const newPost = {
        id: samplePosts.length + 1,
        author: 'You',
        handle: '@yourhandle',
        avatar: '👤',
        time: 'now',
        community: 'General',
        content: content,
        likes: 0,
        comments: 0,
        shares: 0
    };

    samplePosts.unshift(newPost);
    renderPosts();
    postInput.value = '';
    
    console.log('Post created:', newPost);
}

// Handle discover search
function handleDiscoverSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const content = document.getElementById('discoverContent');
    
    let filteredCommunities = communities;
    
    if (searchTerm) {
        filteredCommunities = communities.filter(c => 
            c.name.toLowerCase().includes(searchTerm) || 
            c.description.toLowerCase().includes(searchTerm)
        );
    }

    if (filteredCommunities.length === 0) {
        content.innerHTML = '<div style="padding: 2rem; text-align: center; color: #999;">No communities found</div>';
        return;
    }

    renderDiscoverContent(filteredCommunities);
}

// Render discover page content
function renderDiscoverContent(items) {
    const content = document.getElementById('discoverContent');
    content.innerHTML = items.map(community => `
        <div class="community-card-large">
            <div class="community-image" style="font-size: 3rem; display: flex; align-items: center; justify-content: center;">
                ${community.icon}
            </div>
            <div class="community-details">
                <h3>${community.name}</h3>
                <p>${community.description}</p>
                <p style="margin-top: 0.75rem; color: #0066ff; font-weight: 600;">
                    ${community.members.toLocaleString()} members
                </p>
            </div>
        </div>
    `).join('');
}

// Initialize discover page
window.addEventListener('load', function() {
    renderDiscoverContent(communities);
});