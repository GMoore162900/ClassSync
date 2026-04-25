const STORAGE_KEY = "classSync_profile";

const defaults = {
    name: "Navkirandeep Kaur",
    handle: "navkirandeep",
    bio: "Hi, I'm Navkirandeep! I'm currently pursuing my degree at the University of West Georgia. I have a passion for creativity and love connecting with others who share similar interests.",
    color: "#1d9bf0"
};

document.addEventListener("DOMContentLoaded", () => {
    loadSavedProfile();
    bindLivePreviews();

    document.getElementById("profileForm").addEventListener("submit", (e) => {
        e.preventDefault();
        saveProfile();
    });
});

function loadSavedProfile() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const data = saved ? JSON.parse(saved) : defaults;

    document.getElementById("nameInput").value = data.name;
    document.getElementById("handleInput").value = data.handle;
    document.getElementById("bioInput").value = data.bio;
    document.getElementById("colorInput").value = data.color;

    updatePreview(data);
    updateBioCounter(data.bio.length);
    updateColorHint(data.color);
}

function bindLivePreviews() {
    document.getElementById("nameInput").addEventListener("input", syncPreview);
    document.getElementById("handleInput").addEventListener("input", syncPreview);
    document.getElementById("bioInput").addEventListener("input", () => {
        const len = document.getElementById("bioInput").value.length;
        updateBioCounter(len);
        syncPreview();
    });
    document.getElementById("colorInput").addEventListener("input", () => {
        updateColorHint(document.getElementById("colorInput").value);
        syncPreview();
    });
}

function syncPreview() {
    updatePreview({
        name: document.getElementById("nameInput").value.trim(),
        handle: document.getElementById("handleInput").value.trim(),
        bio: document.getElementById("bioInput").value.trim(),
        color: document.getElementById("colorInput").value
    });
}

function updatePreview(data) {
    const nameEl = document.getElementById("previewName");
    const handleEl = document.getElementById("previewHandle");
    const bioEl = document.getElementById("previewBio");
    const bannerEl = document.getElementById("previewBanner");
    const avatarEl = document.getElementById("previewAvatar");

    nameEl.textContent = data.name || defaults.name;
    handleEl.textContent = "@" + (data.handle || defaults.handle);
    bioEl.textContent = data.bio || defaults.bio;
    bannerEl.style.background = `linear-gradient(130deg, ${data.color} 0%, ${lighten(data.color)} 100%)`;
    avatarEl.style.background = `linear-gradient(140deg, ${data.color} 0%, ${darken(data.color)} 100%)`;
    avatarEl.textContent = getInitials(data.name || defaults.name);

    const colorBoxEl = document.getElementById("colorBox");
    if (colorBoxEl) colorBoxEl.style.background = data.color;
}

function saveProfile() {
    const name = document.getElementById("nameInput").value.trim();
    const handle = document.getElementById("handleInput").value.trim();
    const bio = document.getElementById("bioInput").value.trim();
    const color = document.getElementById("colorInput").value;

    if (name.length < 3) {
        alert("Name must be at least 3 characters.");
        return;
    }

    if (!name || !bio) {
        alert("Please fill in your name and bio.");
        return;
    }

    if (bio.length > 150) {
        alert("Bio must not exceed 150 characters.");
        return;
    }

    const data = { name, handle, bio, color };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    updatePreview(data);
    alert("Profile saved successfully!");
}

function updateBioCounter(length) {
    const remaining = 150 - length;
    const counter = document.getElementById("bioCounter");
    counter.textContent = `${remaining} chars left`;
    counter.style.color = remaining < 20 ? "#d9534f" : "";
}

function updateColorHint(hex) {
    document.getElementById("colorHint").textContent = hex;
}

function getInitials(name) {
    return name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();
}

// Simple hex color helpers for the live preview tint
function lighten(hex) {
    return blendHex(hex, "#ffffff", 0.4);
}

function darken(hex) {
    return blendHex(hex, "#000000", 0.25);
}

function blendHex(hex, target, ratio) {
    const from = hexToRgb(hex);
    const to = hexToRgb(target);
    if (!from || !to) return hex;
    const r = Math.round(from.r + (to.r - from.r) * ratio);
    const g = Math.round(from.g + (to.g - from.g) * ratio);
    const b = Math.round(from.b + (to.b - from.b) * ratio);
    return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
        : null;
}
