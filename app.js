const textBoxElement = document.querySelector("#text");
const wordCountElement = document.querySelector("#word-count");
const characterCountElement = document.querySelector("#character-count");
const sentenceCountElement = document.querySelector("#sentence-count");
const lettersDensityElement = document.querySelector("#letters-density");
const lettersDensityContainer = document.querySelector(
  ".letters-density-container"
);
const excludeSpacesCheckbox = document.querySelector("#exclude-spaces");
const resetButton = document.querySelector("#reset");
const themeToggleButton = document.getElementById("theme-toggle");

textBoxElement.addEventListener("input", () => {
  const text = textBoxElement.value;
  wordCountElement.textContent = text.split(" ").filter((word) => word).length;
  characterCountElement.textContent = text.length;

  let characterCount = text.length;
  if (excludeSpacesCheckbox.checked) {
    characterCount = text.replace(/\s/g, "").length;
  } else {
    characterCount = text.length;
  }
  characterCountElement.textContent = characterCount;

  sentenceCountElement.textContent = text
    .split(".")
    .filter((sentence) => sentence).length;

  // Zliczanie liter
  const letterDensity = {};
  for (let i = 0; i < text.length; i++) {
    const char = text[i].toLowerCase();
    if (char.match(/[a-ząćęłńóśżź]+/i)) {
      // Liczymy tylko litery
      if (letterDensity[char]) {
        letterDensity[char]++;
      } else {
        letterDensity[char] = 1;
      }
    }
  }

  // Liczba wszystkich liter
  const totalLetters = Object.values(letterDensity).reduce(
    (sum, count) => sum + count,
    0
  );

  // Sortowanie według częstotliwości
  const sortedLetterDensity = Object.entries(letterDensity).sort(
    (a, b) => b[1] - a[1]
  );

  // Wyświetlanie gęstości liter
  lettersDensityElement.innerHTML = "";
  sortedLetterDensity.forEach(([letter, count]) => {
    const letterItem = document.createElement("div");
    letterItem.classList.add("letter-item");
    if (count > 0) {
      lettersDensityContainer.style.display = "block";
    } else {
      lettersDensityContainer.style.display = "none";
    }
    // Obliczanie procentu
    const letterPercentage = ((count / totalLetters) * 100).toFixed(2);

    // Tworzenie paska z gęstością
    const densityBar = document.createElement("div");
    densityBar.classList.add("density-bar");

    const filledBar = document.createElement("div");
    filledBar.classList.add("filled");
    filledBar.style.width = `${letterPercentage}%`;

    // Tworzenie tekstu z liczbą i procentem
    const letterText = document.createElement("p");
    letterText.classList.add("letter-text");
    letterText.textContent = `${letter.toUpperCase()} - ${count} (${letterPercentage}%)`;

    // Dodanie do elementu
    densityBar.appendChild(filledBar);
    letterItem.appendChild(letterText);
    letterItem.appendChild(densityBar);

    lettersDensityElement.appendChild(letterItem);
  });
});

resetButton.addEventListener("click", () => {
  textBoxElement.value = "";
  wordCountElement.textContent = 0;
  characterCountElement.textContent = 0;
  sentenceCountElement.textContent = 0;
  lettersDensityElement.innerHTML = "";
  excludeSpacesCheckbox.checked = false;
});

themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("light");

  const currentTheme = document.body.classList.contains("light")
    ? "light"
    : "dark";
  localStorage.setItem("theme", currentTheme);

  themeToggleButton.textContent =
    currentTheme === "light" ? "Dark mode" : "Light mode";
});

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.body.classList.add(savedTheme);
    themeToggleButton.textContent =
      savedTheme === "light" ? "Dark mode" : "Light mode";
  }
});
