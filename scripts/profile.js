function updateProfile() {
  let name = document.getElementById("nameInput").value.trim();
  let bio = document.getElementById("bioInput").value.trim();
  let color = document.getElementById("colorInput").value;

  // Validation
  if (name === "" || bio === "") {
    alert("Please fill all fields!");
    return;
  }

  if (name.length < 3) {
    alert("Name should be at least 3 characters.");
    return;
  }

  if (bio.length > 150) {
    alert("Bio should not exceed 150 characters.");
    return;
  }

  // Update profile preview
  document.getElementById("previewName").innerText = name;
  document.getElementById("previewBio").innerText = bio;
  document.getElementById("colorBox").style.background = color;

  // Confirmation message
  alert("Profile updated successfully!");
}
function searchItems() {
        let input = document.getElementById("searchInput").value.toLowerCase();
        let items = document.getElementById("taskList").getElementsByTagName("li");

        for (let i = 0; i < items.length; i++) {
            let text = items[i].innerText.toLowerCase();

            if (text.includes(input)) {
                items[i].style.display = "";
            } else {
                items[i].style.display = "none";
            }
        }
    }