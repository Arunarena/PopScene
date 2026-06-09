const scenes = [
  {
    title: "Neon Afterparty",
    genre: "Sci-fi",
    mood: "Pulse",
    meta: "Electric sci-fi mystery | 98 min | 4.8 pulse",
    blurb: "A midnight crew follows a signal through a city where every screen answers back.",
    live: true,
    energy: 87,
    colors: ["#27e1c1", "#ff4f72", "#20243a"]
  },
  {
    title: "Sidewalk Legends",
    genre: "Comedy",
    mood: "Laugh",
    meta: "Fast comedy | 84 min | 4.6 pulse",
    blurb: "Street performers turn one tiny misunderstanding into a citywide headline.",
    live: true,
    energy: 78,
    colors: ["#ffd166", "#ff8754", "#263238"]
  },
  {
    title: "The Glass Planet",
    genre: "Adventure",
    mood: "Wonder",
    meta: "Dream adventure | 112 min | 4.9 pulse",
    blurb: "Explorers cross a crystal world that changes shape when people tell the truth.",
    live: false,
    energy: 94,
    colors: ["#8f7cff", "#27e1c1", "#151a2f"]
  },
  {
    title: "Static Hearts",
    genre: "Thriller",
    mood: "Edge",
    meta: "Sharp thriller | 101 min | 4.7 pulse",
    blurb: "A podcaster gets a live call from tomorrow and every listener becomes a clue.",
    live: true,
    energy: 83,
    colors: ["#ff4f72", "#d8f3dc", "#191921"]
  },
  {
    title: "Golden Hour Heist",
    genre: "Action",
    mood: "Pulse",
    meta: "Sunlit action | 106 min | 4.5 pulse",
    blurb: "A retired stunt team steals back a priceless reel before the credits roll.",
    live: false,
    energy: 73,
    colors: ["#ffd166", "#a3e635", "#2c2230"]
  },
  {
    title: "Tiny Big Night",
    genre: "Family",
    mood: "Laugh",
    meta: "Warm comedy | 76 min | 4.4 pulse",
    blurb: "One apartment building throws a talent show that accidentally becomes legendary.",
    live: true,
    energy: 69,
    colors: ["#a3e635", "#ffd166", "#13251f"]
  },
  {
    title: "Ocean Arcade",
    genre: "Fantasy",
    mood: "Wonder",
    meta: "Aquatic fantasy | 91 min | 4.8 pulse",
    blurb: "A hidden boardwalk game opens a portal under the pier after the final token drops.",
    live: true,
    energy: 89,
    colors: ["#27e1c1", "#8f7cff", "#0d1f2d"]
  },
  {
    title: "Redline Room",
    genre: "Drama",
    mood: "Edge",
    meta: "Tense drama | 118 min | 4.6 pulse",
    blurb: "A jury room livestream turns into a moral maze when viewers can unlock evidence.",
    live: false,
    energy: 81,
    colors: ["#ff4f72", "#ffd166", "#251b1f"]
  },
  {
    title: "Spider-Man: No Way Home",
    genre: "Superhero",
    mood: "Spider",
    meta: "Official trailer | Sony Pictures | Multiverse event",
    blurb: "Peter Parker's world cracks open when a spell pulls familiar villains into his city.",
    live: true,
    energy: 96,
    trailerId: "JfVOs4VSpmA",
    colors: ["#ff4f72", "#27e1c1", "#111827"]
  },
  {
    title: "Spider-Man: Into the Spider-Verse",
    genre: "Animation",
    mood: "Spider",
    meta: "Official trailer | Sony Pictures Animation | Miles Morales",
    blurb: "Miles Morales swings into a comic-book multiverse with impossible style and heart.",
    live: true,
    energy: 98,
    trailerId: "g4Hbz2jLxvQ",
    colors: ["#8f7cff", "#ffd166", "#101827"]
  },
  {
    title: "Spider-Man: Across the Spider-Verse",
    genre: "Animation",
    mood: "Spider",
    meta: "Official trailer | Sony Pictures Animation | Spider Society",
    blurb: "Miles Morales races across the Multiverse and has to decide what wearing the mask really means.",
    live: true,
    energy: 99,
    trailerId: "shW9i6k8cB0",
    colors: ["#ffd166", "#8f7cff", "#161225"]
  },
  {
    title: "Spider-Man 2",
    genre: "Superhero",
    mood: "Spider",
    meta: "Trailer preview | Columbia Pictures | Doc Ock",
    blurb: "Peter Parker balances ordinary pressure with one of his most iconic battles.",
    live: false,
    energy: 91,
    trailerId: "1s9Yln0YwCw",
    colors: ["#ff4f72", "#d8f3dc", "#172033"]
  },
  {
    title: "The Amazing Spider-Man",
    genre: "Superhero",
    mood: "Spider",
    meta: "Official trailer | Sony Pictures | New origin",
    blurb: "A new Peter Parker follows clues about his past and meets a dangerous experiment.",
    live: false,
    energy: 88,
    trailerId: "upwf8RsyNqQ",
    colors: ["#27e1c1", "#ff8754", "#111827"]
  }
];

const grid = document.querySelector("#posterGrid");
const resultCount = document.querySelector("#resultCount");
const searchInput = document.querySelector("#searchInput");
const liveOnly = document.querySelector("#liveOnly");
const moodTabs = document.querySelector("#moodTabs");
const queueTrack = document.querySelector("#queueTrack");
const queueCount = document.querySelector("#queueCount");
const clearQueue = document.querySelector("#clearQueue");
const toast = document.querySelector("#toast");
const startParty = document.querySelector("#startParty");
const shufflePick = document.querySelector("#shufflePick");

const currentTitle = document.querySelector("#currentTitle");
const currentGenre = document.querySelector("#currentGenre");
const currentMeta = document.querySelector("#currentMeta");
const meterBar = document.querySelector("#meterBar");
const pulseScore = document.querySelector("#pulseScore");
const roomCount = document.querySelector("#roomCount");
const trailerPlayer = document.querySelector("#trailerPlayer");
const playerTitle = document.querySelector("#playerTitle");
const playerMeta = document.querySelector("#playerMeta");
const moviePlayer = document.querySelector("#moviePlayer");
const movieStatus = document.querySelector("#movieStatus");
const movieShell = document.querySelector(".movie-player-shell");
const cinemaGate = document.querySelector("#cinemaGate");
const cinemaEffectButtons = document.querySelectorAll("[data-cinema-effect]");
const localMovieSource = "media/michael-2026/master.m3u8";

let activeMood = "All";
let queuedScenes = [];
let toastTimer;

function filteredScenes() {
  const query = searchInput.value.trim().toLowerCase();
  return scenes.filter((scene) => {
    const matchesMood = activeMood === "All" || scene.mood === activeMood;
    const matchesLive = !liveOnly.checked || scene.live;
    const searchable = `${scene.title} ${scene.genre} ${scene.mood} ${scene.blurb}`.toLowerCase();
    return matchesMood && matchesLive && searchable.includes(query);
  });
}

function renderScenes() {
  const list = filteredScenes();
  resultCount.textContent = `${list.length} scene${list.length === 1 ? "" : "s"}`;
  grid.innerHTML = "";

  list.forEach((scene, index) => {
    const card = document.createElement("article");
    card.className = "poster-card";
    card.style.setProperty("--a", scene.colors[0]);
    card.style.setProperty("--b", scene.colors[1]);
    card.style.setProperty("--c", scene.colors[2]);
    card.innerHTML = `
      <div class="poster-art" aria-hidden="true"></div>
      <div class="poster-info">
        <h3>${scene.title}</h3>
        <p>${scene.blurb}</p>
        <div class="poster-meta">
          <span>${scene.genre}</span>
          <span>${scene.live ? "Live" : "On demand"}</span>
        </div>
        <div class="poster-buttons">
          <button type="button" data-preview="${index}">${scene.trailerId ? "Watch Trailer" : "Preview"}</button>
          <button type="button" data-queue="${index}" aria-label="Add ${scene.title} to queue">+</button>
        </div>
      </div>
    `;
    card.querySelector("[data-preview]").addEventListener("click", () => previewScene(scene));
    card.querySelector("[data-queue]").addEventListener("click", () => addToQueue(scene));
    card.addEventListener("mouseenter", () => previewScene(scene, false));
    grid.append(card);
  });
}

function previewScene(scene, announce = true) {
  currentTitle.textContent = scene.title;
  currentGenre.textContent = scene.genre;
  currentMeta.textContent = scene.meta;
  meterBar.style.width = `${scene.energy}%`;
  pulseScore.textContent = scene.energy;
  if (scene.trailerId) loadTrailer(scene);
  if (announce) showToast(`${scene.title} is loaded in the preview panel.`);
}

function loadTrailer(scene) {
  trailerPlayer.src = `https://www.youtube.com/embed/${scene.trailerId}`;
  playerTitle.textContent = scene.title;
  playerMeta.textContent = scene.meta;
}

function initLocalMoviePlayer() {
  if (!moviePlayer) return;

  if (moviePlayer.canPlayType("application/vnd.apple.mpegurl")) {
    moviePlayer.src = localMovieSource;
    movieStatus.textContent = "Local HLS loaded with native browser support.";
    return;
  }

  if (window.Hls && window.Hls.isSupported()) {
    const hls = new window.Hls({
      maxBufferLength: 40,
      backBufferLength: 60
    });
    hls.loadSource(localMovieSource);
    hls.attachMedia(moviePlayer);
    hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
      movieStatus.textContent = "Michael.2026 is ready. Press play to start.";
    });
    hls.on(window.Hls.Events.ERROR, (event, data) => {
      if (data.fatal) {
        movieStatus.textContent = "Local movie chunks are not included in the public deploy. Add licensed HLS media locally or use a private CDN.";
      }
    });
    return;
  }

  movieStatus.textContent = "This browser needs HLS support to play the local chunked stream.";
}

function enterMovie() {
  if (!movieShell) return;
  movieShell.classList.add("has-entered", "is-focus");
  movieStatus.textContent = "Theater mode active. Press play when you are ready.";
  window.setTimeout(() => {
    movieShell.classList.remove("is-focus");
  }, 2200);
  moviePlayer.focus();
}

function setCinemaEffect(effect) {
  if (!movieShell) return;
  movieShell.classList.remove("is-focus", "is-pulse", "is-midnight");
  cinemaEffectButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.cinemaEffect === effect);
  });

  if (effect) {
    movieShell.classList.add(`is-${effect}`);
    movieStatus.textContent = `${effect[0].toUpperCase()}${effect.slice(1)} effect applied.`;
  }
}

function addToQueue(scene) {
  if (!queuedScenes.some((item) => item.title === scene.title)) {
    queuedScenes.push(scene);
  }
  renderQueue();
  showToast(`${scene.title} added to your party mix.`);
}

function renderQueue() {
  queueCount.textContent = queuedScenes.length;
  queueTrack.innerHTML = "";

  if (!queuedScenes.length) {
    queueTrack.innerHTML = `<p class="empty-copy">Add scenes to build tonight's PopScene queue.</p>`;
    return;
  }

  queuedScenes.forEach((scene, index) => {
    const item = document.createElement("div");
    item.className = "queue-item";
    item.innerHTML = `
      <div>
        <strong>${index + 1}. ${scene.title}</strong>
        <span>${scene.mood} | ${scene.genre}</span>
      </div>
      <span>${scene.energy}</span>
    `;
    queueTrack.append(item);
  });
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2300);
}

moodTabs.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-mood]");
  if (!tab) return;
  activeMood = tab.dataset.mood;
  document.querySelectorAll(".tab").forEach((button) => button.classList.toggle("is-active", button === tab));
  renderScenes();
});

searchInput.addEventListener("input", renderScenes);
liveOnly.addEventListener("change", renderScenes);

clearQueue.addEventListener("click", () => {
  queuedScenes = [];
  renderQueue();
  showToast("Your party mix is clear.");
});

shufflePick.addEventListener("click", () => {
  const list = filteredScenes();
  const randomScene = list[Math.floor(Math.random() * list.length)] || scenes[0];
  previewScene(randomScene);
});

startParty.addEventListener("click", () => {
  const roomNumber = Math.floor(42000 + Math.random() * 900);
  roomCount.textContent = `${Math.round(roomNumber / 1000)}K`;
  showToast(queuedScenes.length ? "Watch party launched with your queue." : "Watch party launched with the current preview.");
});

document.querySelectorAll("[data-reaction]").forEach((button) => {
  button.addEventListener("click", () => {
    const bump = button.dataset.reaction === "Chaos" ? 9 : button.dataset.reaction === "Hype" ? 6 : 3;
    const nextScore = Math.min(99, Number(pulseScore.textContent) + bump);
    pulseScore.textContent = nextScore;
    meterBar.style.width = `${nextScore}%`;
    showToast(`${button.dataset.reaction} reaction sent to the room.`);
  });
});

if (cinemaGate) {
  cinemaGate.addEventListener("click", enterMovie);
}

cinemaEffectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const effect = button.dataset.cinemaEffect;
    const isActive = button.classList.contains("is-active");
    setCinemaEffect(isActive ? "" : effect);
  });
});

if (moviePlayer) {
  moviePlayer.addEventListener("play", () => {
    movieShell.classList.add("has-entered", "is-midnight");
    movieStatus.textContent = "Now playing in PopScene theater mode.";
  });
  moviePlayer.addEventListener("pause", () => {
    movieShell.classList.remove("is-midnight");
    movieStatus.textContent = "Paused. Use the effect buttons to change the room.";
  });
}

renderScenes();
renderQueue();
initLocalMoviePlayer();
