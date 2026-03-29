//your code here
const container = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("para");

const images = ["img1", "img2", "img3", "img4", "img5"];

let selected = [];

// Shuffle function
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Initialize images
function loadImages() {
  container.innerHTML = "";
  selected = [];
  message.textContent = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";

  // Pick random duplicate
  const duplicate = images[Math.floor(Math.random() * images.length)];

  let allImages = [...images, duplicate];
  allImages = shuffle(allImages);

  allImages.forEach((cls, index) => {
    const img = document.createElement("img");
    img.classList.add(cls);
    img.dataset.id = cls;

    img.addEventListener("click", () => handleClick(img));

    container.appendChild(img);
  });
}

// Handle click
function handleClick(img) {
  if (selected.includes(img)) return; // prevent double click same image
  if (selected.length === 2) return;

  img.classList.add("selected");
  selected.push(img);

  // Show reset after first click
  resetBtn.style.display = "inline-block";

  // Show verify after 2 clicks
  if (selected.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

// Reset
resetBtn.addEventListener("click", loadImages);

// Verify
verifyBtn.addEventListener("click", () => {
  const [first, second] = selected;

  if (first.dataset.id === second.dataset.id) {
    message.textContent = "You are a human. Congratulations!";
  } else {
    message.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyBtn.style.display = "none";
});

// Initial load
loadImages();