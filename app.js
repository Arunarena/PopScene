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
const nxshaGrid = document.querySelector("#nxshaGrid");
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
const licensedPlayer = document.querySelector("#licensedPlayer");
const licensedSource = document.querySelector("#licensedSource");
const licensedStatus = document.querySelector("#licensedStatus");
const loadLicensedSource = document.querySelector("#loadLicensedSource");
const loadLocalMovie = document.querySelector("#loadLocalMovie");
const moviePlayer = document.querySelector("#moviePlayer");
const movieStatus = document.querySelector("#movieStatus");
const movieShell = document.querySelector(".movie-player-shell");
const cinemaGate = document.querySelector("#cinemaGate");
const cinemaEffectButtons = document.querySelectorAll("[data-cinema-effect]");
const localMovieSource = "media/michael-2026/master.m3u8";
const nxshaEndpoint = "https://web.nxsha.app/browse/movies?_rsc=tXyZJ52UQVBCVsD3";
const nxshaFallback = [
  { rating: "7.9", title: "Obsession", date: "May 13, 2026" },
  { rating: "6.2", title: "Peddi", date: "Jun 3, 2026" },
  { rating: "5.5", title: "Hai Jawani Toh Ishq Hona Hai", date: "Jun 4, 2026" },
  { rating: "6.8", title: "The Mandalorian and Grogu", date: "May 20, 2026" },
  { rating: "7.4", title: "Masters of the Universe", date: "Jun 3, 2026" },
  { rating: "8.1", title: "Lee Cronin's The Mummy", date: "Apr 15, 2026" },
  { rating: "8.2", title: "The Super Mario Galaxy Movie", date: "Apr 1, 2026" },
  { rating: "8.4", title: "Michael", date: "Apr 22, 2026" }
];

let activeMood = "All";
let queuedScenes = [];
let toastTimer;
let licensedHls;

function filteredScenes() {
  const query = searchInput.value.trim().toLowerCase();
  return scenes.filter((scene) => {
    const matchesMood = activeMood === "All" || scene.mood === activeMood;
    const matchesLive = !liveOnly.checked || scene.live;
    const searchable = `${scene.title} ${scene.genre} ${scene.mood} ${scene.blurb}`.toLowerCase();
    return matchesMood && matchesLive && searchable.includes(query);
  });
}

function parseNxshaMovies(sourceText) {
  const clean = sourceText.replace(/\s+/g, " ");
  const matches = [...clean.matchAll(/\b(\d\.\d)\s+(.+?)\s+([A-Z][a-z]{2}\s+\d{1,2},\s+202\d)/g)];
  return matches
    .map((match) => ({
      rating: match[1],
      title: match[2].trim().replace(/^Load more\s+/, ""),
      date: match[3]
    }))
    .filter((item) => item.title.length > 1)
    .slice(0, 8);
}

function renderNxshaFeed(items, sourceLabel = "fallback") {
  if (!nxshaGrid) return;
  nxshaGrid.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("article");
    const rating = document.createElement("span");
    const title = document.createElement("strong");
    const date = document.createElement("span");

    card.className = "nxsha-card";
    rating.className = "nxsha-rating";
    rating.textContent = item.rating;
    title.textContent = item.title;
    date.textContent = item.date;

    card.append(rating, title, date);
    nxshaGrid.append(card);
  });

  if (sourceLabel === "live") {
    showToast("Nxsha trend metadata refreshed.");
  }
}

async function loadNxshaFeed() {
  renderNxshaFeed(nxshaFallback);

  try {
    const response = await fetch(nxshaEndpoint, {
      headers: {
        "Accept": "text/html, text/plain"
      }
    });
    if (!response.ok) throw new Error(`Nxsha responded ${response.status}`);
    const text = await response.text();
    const parsed = parseNxshaMovies(text);
    if (parsed.length) {
      renderNxshaFeed(parsed, "live");
    }
  } catch (error) {
    if (nxshaGrid) {
      nxshaGrid.dataset.source = "snapshot";
    }
  }
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

function getSourceType(url) {
  const cleanUrl = url.split("?")[0].toLowerCase();
  if (cleanUrl.endsWith(".m3u8")) return "hls";
  if (cleanUrl.endsWith(".mp4")) return "mp4";
  if (cleanUrl.endsWith(".webm")) return "webm";
  if (cleanUrl.endsWith(".ogg") || cleanUrl.endsWith(".ogv")) return "ogg";
  return "unknown";
}

function setLicensedStatus(message) {
  if (licensedStatus) licensedStatus.textContent = message;
}

function clearLicensedHls() {
  if (licensedHls) {
    licensedHls.destroy();
    licensedHls = null;
  }
}

function loadLicensedPlayer(sourceUrl, label = "licensed source") {
  if (!licensedPlayer || !sourceUrl) return;

  const trimmedUrl = sourceUrl.trim();
  const type = getSourceType(trimmedUrl);
  clearLicensedHls();
  licensedPlayer.pause();
  licensedPlayer.removeAttribute("src");
  licensedPlayer.load();

  if (type === "hls") {
    if (licensedPlayer.canPlayType("application/vnd.apple.mpegurl")) {
      licensedPlayer.src = trimmedUrl;
      setLicensedStatus(`Loaded ${label} with native HLS support.`);
      showToast("Licensed HLS source loaded.");
      return;
    }

    if (window.Hls && window.Hls.isSupported()) {
      licensedHls = new window.Hls({
        maxBufferLength: 50,
        backBufferLength: 75
      });
      licensedHls.loadSource(trimmedUrl);
      licensedHls.attachMedia(licensedPlayer);
      licensedHls.on(window.Hls.Events.MANIFEST_PARSED, () => {
        setLicensedStatus(`Loaded ${label}. Press play to start.`);
        showToast("Licensed HLS source loaded.");
      });
      licensedHls.on(window.Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          setLicensedStatus("The HLS source could not be loaded. Check the URL, CORS, and playlist permissions.");
        }
      });
      return;
    }

    setLicensedStatus("This browser does not support HLS playback.");
    return;
  }

  if (["mp4", "webm", "ogg"].includes(type)) {
    licensedPlayer.src = trimmedUrl;
    licensedPlayer.load();
    setLicensedStatus(`Loaded ${label}. Press play to start.`);
    showToast("Licensed video source loaded.");
    return;
  }

  setLicensedStatus("Use a direct .m3u8, .mp4, .webm, or .ogg video file URL.");
}

function loadSourceFromQuery() {
  if (!licensedSource) return;
  const params = new URLSearchParams(window.location.search);
  const source = params.get("source");
  if (!source) return;
  licensedSource.value = source;
  loadLicensedPlayer(source, "URL source");
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

if (loadLicensedSource && licensedSource) {
  loadLicensedSource.addEventListener("click", () => {
    loadLicensedPlayer(licensedSource.value, "typed source");
  });

  licensedSource.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      loadLicensedPlayer(licensedSource.value, "typed source");
    }
  });
}

if (loadLocalMovie && licensedSource) {
  loadLocalMovie.addEventListener("click", () => {
    licensedSource.value = localMovieSource;
    loadLicensedPlayer(localMovieSource, "local Michael.2026");
  });
}

document.querySelectorAll("[data-source-preset]").forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.dataset.sourcePreset;
    const examples = {
      hls: "https://your-cdn.example/movie/master.m3u8",
      mp4: "https://your-cdn.example/movie/movie.mp4",
      webm: "https://your-cdn.example/movie/movie.webm"
    };
    licensedSource.value = examples[type] || "";
    licensedSource.focus();
    setLicensedStatus(`Example ${type.toUpperCase()} shape added. Replace it with your licensed file URL.`);
  });
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
loadSourceFromQuery();
loadNxshaFeed();
