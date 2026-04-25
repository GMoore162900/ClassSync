const profiles = [
    { name: "Maya Patel", handle: "@maya_oncampus", major: "Computer Science" },
    { name: "Jordan Lee", handle: "@jordanreads", major: "English" },
    { name: "Ari Gomez", handle: "@ari_builds", major: "Environmental Engineering" },
    { name: "Sofia Kim", handle: "@sofiasocial", major: "Marketing" },
    { name: "Evan Brooks", handle: "@evan_dev", major: "Software Engineering" }
];

const posts = [
    { author: "Maya Patel", content: "Hosting a coding interview prep session this Friday in the library.", likes: 83 },
    { author: "Jordan Lee", content: "Shared notes from Intro to Literature class for anyone who missed today.", likes: 41 },
    { author: "Ari Gomez", content: "Our sustainability club is collecting project ideas for the spring fair.", likes: 66 },
    { author: "Sofia Kim", content: "Looking for students interested in social media strategy for campus events.", likes: 54 },
    { author: "Evan Brooks", content: "Built a roommate budget tracker and need feedback from first-years.", likes: 72 }
];

const communities = [
    { name: "Mathletes", members: "2.3k members" },
    { name: "CS Study Group", members: "1.2K members" },
    { name: "Campus Creators", members: "860 members" },
    { name: "Startup Society", members: "640 members" },
    { name: "Design Lab", members: "520 members" },
    { name: "Dorm Fitness Club", members: "470 members" }
];

const hashtags = [
    { tag: "#MidtermSeason", posts: "12.5K posts" },
    { tag: "#CampusLife", posts: "8.3K posts" },
    { tag: "#StudyTips", posts: "5.7K posts" },
    { tag: "#ClubRush", posts: "4.8K posts" },
    { tag: "#InternshipHunt", posts: "3.9K posts" }
];

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("exploreSearch");

    renderRecommendations();
    renderSearchResults("");

    searchInput.addEventListener("input", (event) => {
        const term = event.target.value.trim().toLowerCase();
        renderSearchResults(term);
    });
});

function renderSearchResults(searchTerm) {
    const profileResults = filterProfiles(searchTerm);
    const postResults = filterPosts(searchTerm);
    const communityResults = filterCommunities(searchTerm);
    const hashtagResults = filterHashtags(searchTerm);

    renderProfileResults(profileResults);
    renderPostResults(postResults);
    renderCommunityResults(communityResults);
    renderHashtagResults(hashtagResults);
    updateSummary(searchTerm, profileResults, postResults, communityResults, hashtagResults);
}

function filterProfiles(searchTerm) {
    if (!searchTerm) return profiles.slice(0, 3);
    return profiles.filter((profile) =>
        `${profile.name} ${profile.handle} ${profile.major}`.toLowerCase().includes(searchTerm)
    );
}

function filterPosts(searchTerm) {
    if (!searchTerm) return posts.slice(0, 3);
    return posts.filter((post) =>
        `${post.author} ${post.content}`.toLowerCase().includes(searchTerm)
    );
}

function filterCommunities(searchTerm) {
    if (!searchTerm) return communities.slice(0, 3);
    return communities.filter((community) =>
        `${community.name}`.toLowerCase().includes(searchTerm)
    );
}

function filterHashtags(searchTerm) {
    if (!searchTerm) return hashtags.slice(0, 3);
    return hashtags.filter((hashtag) => hashtag.tag.toLowerCase().includes(searchTerm));
}

function renderRecommendations() {
    const recommendedPosts = document.getElementById("recommendedPosts");
    const recommendedCommunities = document.getElementById("recommendedCommunities");
    const recommendedHashtags = document.getElementById("recommendedHashtags");

    recommendedPosts.innerHTML = posts
        .slice(0, 3)
        .map(
            (post) => `
            <div class="result-item">
                <p class="result-title">${post.author}</p>
                <p class="result-meta">${post.content}</p>
            </div>
        `
        )
        .join("");

    recommendedCommunities.innerHTML = communities
        .slice(0, 3)
        .map(
            (community) => `
            <div class="result-item">
                <p class="result-title">${community.name}</p>
                <p class="result-meta">${community.members}</p>
            </div>
        `
        )
        .join("");

    recommendedHashtags.innerHTML = hashtags
        .slice(0, 3)
        .map(
            (hashtag) => `
            <div class="result-item">
                <p class="result-title">${hashtag.tag}</p>
                <p class="result-meta">${hashtag.posts}</p>
            </div>
        `
        )
        .join("");
}

function renderProfileResults(items) {
    const container = document.getElementById("profileResults");
    container.innerHTML = items.length
        ? items
            .map(
                (profile) => `
            <div class="result-item">
                <p class="result-title">${profile.name} <span class="result-meta">${profile.handle}</span></p>
                <p class="result-meta">${profile.major}</p>
            </div>
        `
            )
            .join("")
        : '<p class="result-empty">No profiles found.</p>';
}

function renderPostResults(items) {
    const container = document.getElementById("postResults");
    container.innerHTML = items.length
        ? items
            .map(
                (post) => `
            <div class="result-item">
                <p class="result-title">${post.author}</p>
                <p class="result-meta">${post.content}</p>
            </div>
        `
            )
            .join("")
        : '<p class="result-empty">No posts found.</p>';
}

function renderCommunityResults(items) {
    const container = document.getElementById("communityResults");
    container.innerHTML = items.length
        ? items
            .map(
                (community) => `
            <div class="result-item">
                <p class="result-title">${community.name}</p>
                <p class="result-meta">${community.members}</p>
            </div>
        `
            )
            .join("")
        : '<p class="result-empty">No communities found.</p>';
}

function renderHashtagResults(items) {
    const container = document.getElementById("hashtagResults");
    container.innerHTML = items.length
        ? items
            .map(
                (hashtag) => `
            <div class="result-item">
                <p class="result-title">${hashtag.tag}</p>
                <p class="result-meta">${hashtag.posts}</p>
            </div>
        `
            )
            .join("")
        : '<p class="result-empty">No hashtags found.</p>';
}

function updateSummary(searchTerm, profilesFound, postsFound, communitiesFound, hashtagsFound) {
    const summary = document.getElementById("searchSummary");

    if (!searchTerm) {
        summary.textContent = "Type in the search bar to find matching content.";
        return;
    }

    const total = profilesFound.length + postsFound.length + communitiesFound.length + hashtagsFound.length;
    summary.textContent = `Found ${total} results for "${searchTerm}".`;
}
