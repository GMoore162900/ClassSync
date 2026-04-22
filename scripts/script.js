const starterPosts = [
    {
        author: "Maya Patel",
        handle: "@maya_oncampus",
        time: "12m",
        content: "If anyone is taking Calc II next semester, I made a shared formula sheet. Drop a reply and I will send it to you."
    },
    {
        author: "Jordan Lee",
        handle: "@jordanreads",
        time: "45m",
        content: "Open mic tonight at the student union starts at 7:30. First-year students are welcome."
    },
    {
        author: "Ari Gomez",
        handle: "@ari_builds",
        time: "1h",
        content: "Looking for two teammates for the sustainability hackathon this weekend. UI and data skills preferred."
    }
];

const exploreTopics = [
    "#DormLife",
    "#MidtermMemes",
    "#CampusJobs",
    "#ClubRush",
    "#DesignCritique",
    "#StudyWithMe"
];

const pulseItems = [
    "The Explore page nav is ready for future community and profile search.",
    "Your profile customization flow can be connected from the nav right away.",
    "Login can be added without changing this homepage structure."
];

const maxChars = 280;
let feedPosts = [...starterPosts];

document.addEventListener("DOMContentLoaded", () => {
    renderFeed();
    renderExploreTopics();
    renderPulse();
    setupComposer();
});

function setupComposer() {
    const postInput = document.getElementById("postInput");
    const postBtn = document.getElementById("postBtn");
    const charCounter = document.getElementById("charCounter");

    postInput.addEventListener("input", () => {
        const remaining = maxChars - postInput.value.length;
        charCounter.textContent = remaining.toString();
        postBtn.disabled = remaining < 0 || postInput.value.trim().length === 0;
    });

    postBtn.addEventListener("click", () => {
        const content = postInput.value.trim();

        if (!content || content.length > maxChars) {
            return;
        }

        feedPosts.unshift({
            author: "You",
            handle: "@you",
            time: "now",
            content
        });

        renderFeed();
        postInput.value = "";
        charCounter.textContent = String(maxChars);
        postBtn.disabled = true;
    });

    postBtn.disabled = true;
}

function renderFeed() {
    const feed = document.getElementById("postsFeed");

    feed.innerHTML = feedPosts
        .map(
            (post) => `
            <article class="post">
                <div class="post-meta">
                    <p>
                        <span class="post-author">${post.author}</span>
                        <span class="post-handle"> ${post.handle}</span>
                    </p>
                    <span class="post-time">${post.time}</span>
                </div>
                <p class="post-content">${post.content}</p>
                <div class="post-actions">
                    <span>Reply</span>
                    <span>Repost</span>
                    <span>Like</span>
                    <span>Share</span>
                </div>
            </article>
        `
        )
        .join("");
}

function renderExploreTopics() {
    const topicsList = document.getElementById("topicsList");

    topicsList.innerHTML = exploreTopics
        .map((topic) => `<span class="chip">${topic}</span>`)
        .join("");
}

function renderPulse() {
    const pulseList = document.getElementById("pulseList");

    pulseList.innerHTML = pulseItems.map((item) => `<li>${item}</li>`).join("");
}