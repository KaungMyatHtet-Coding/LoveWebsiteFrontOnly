import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SECRET_PASSWORD = "iloveyou";
const ALBUM_PASSWORD = "mylove";
const RELATIONSHIP_START_DATE = "2026-04-21T00:00:00";
const ALLOWED_NAMES = ["K", "Baby"];

const constellations = [
  {
    id: 1,
    title: "First Meet",
    story: "The first day our eyes met, my whole universe changed direction.",
    image: "/1.jfif",
    points: [
      { x: 14, y: 34 },
      { x: 22, y: 23 },
      { x: 30, y: 36 },
      { x: 39, y: 27 },
    ],
  },
  {
    id: 2,
    title: "First Call",
    story: "That call felt short, but the heartbeat it gave me still lasts.",
    image: "/2.jfif",
    points: [
      { x: 58, y: 20 },
      { x: 66, y: 30 },
      { x: 74, y: 22 },
      { x: 82, y: 35 },
    ],
  },
  {
    id: 3,
    title: "First Fight",
    story: "Even in our first storm, I knew love was stronger than ego.",
    image: "/3.jfif",
    points: [
      { x: 18, y: 66 },
      { x: 28, y: 59 },
      { x: 36, y: 70 },
      { x: 46, y: 62 },
    ],
  },
  {
    id: 4,
    title: "Future Dreams",
    story: "A thousand little promises, one shared future, and forever us.",
    image: "/4.jfif",
    points: [
      { x: 60, y: 62 },
      { x: 69, y: 73 },
      { x: 78, y: 64 },
      { x: 86, y: 76 },
    ],
  },
];

const albumImages = {
  K: ["/1.jfif", "/2.jfif", "/3.jfif", "/4.jfif", "/5.jfif", "/6.jfif"],
  Baby: [
    "/7.jfif",
    "/8.jfif",
    "/9.jfif",
    "/10.jfif",
    "/11.jfif",
    "/12.jfif",
    "/13.jfif",
  ],
};

const talkingClips = [
  {
    title: "ForYouMyLove",
    src: "/For%20Baby%20%F0%9F%92%9E.m4a",
    type: "audio/mp4",
  },
];

const musicClips = [
  {
    title: "အလကား",
    src: "/အလကား.m4a",
    type: "audio/mp4",
  },
  {
    title: "ရက်ရာဇာ",
    src: "/ရက်ရာဇာ.m4a",
    type: "audio/mp4",
  },
  {
    title: "ဘယ်လိုလုပ်ရမလဲ",
    src: "/ဘယ်လိုလုပ်ရမလဲ.m4a",
    type: "audio/mp4",
  },
  {
    title: "ပီးနောက်",
    src: "/ပီးနောက်.m4a",
    type: "audio/mp4",
  },
];

const heartLines = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${6 + i * 7}%`,
  delay: (i % 7) * 0.5,
  duration: 1.8 + (i % 5) * 0.4,
}));

const heartFalls = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${4 + i * 8}%`,
  delay: (i % 6) * 0.55,
  duration: 2.2 + (i % 5) * 0.35,
}));

const romanticWords = [
  { id: 1, text: "Forever", left: "8%", top: "18%", delay: 0.2 },
  { id: 2, text: "My Love", left: "72%", top: "24%", delay: 0.8 },
  { id: 3, text: "Soulmate", left: "18%", top: "70%", delay: 1.3 },
  { id: 4, text: "Always", left: "78%", top: "76%", delay: 1.9 },
];

const rainDrops = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: `${(i * 2.5) % 100}%`,
  delay: (i % 10) * 0.3,
  duration: 1.4 + (i % 6) * 0.35,
}));

const pageBackground = {
  stars: "/background1.jfif",
  gallery: "/background2.jfif",
  voice: "/background1.jfif",
  love: "/background2.jfif",
  letters: "/background1.jfif",
};

const letters = [
  {
    id: "l1",
    title: "Open when sad",
    date: "2026-05-16",
    body: "My love, breathe slowly. You are never alone. Even in silence, I am right here with you. Your smile is my favorite light, and I will keep choosing you every day.",
  },
  {
    id: "l2",
    title: "Open when missing me",
    date: "2026-05-17",
    body: "If you miss me, put your hand on your heart. That beat is my answer. Distance is small when two hearts are this close. I love you, always.",
  },
  {
    id: "l3",
    title: "For our future",
    date: "2026-05-18",
    body: "One day we will read this together and smile. We will build soft mornings, warm nights, and a home full of laughter. You are my forever plan.",
  },
];

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addOneMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

function getStarProgress(now) {
  const dayMs = 24 * 60 * 60 * 1000;
  const start = startOfDay(new Date(RELATIONSHIP_START_DATE));
  const today = startOfDay(now);

  if (today < start) {
    return { normalStars: 0, shinyStars: 0 };
  }

  let shinyStars = 0;
  let monthCursor = new Date(start);

  while (true) {
    const nextMonth = addOneMonth(monthCursor);
    if (nextMonth <= today) {
      shinyStars += 1;
      monthCursor = nextMonth;
    } else {
      break;
    }
  }

  let normalStars;
  if (shinyStars === 0) {
    normalStars = Math.floor((today.getTime() - start.getTime()) / dayMs) + 1;
  } else {
    normalStars = Math.floor((today.getTime() - monthCursor.getTime()) / dayMs);
  }

  return { normalStars, shinyStars };
}

function buildStarLayout(count, startIndex = 0) {
  return Array.from({ length: count }, (_, i) => {
    const idx = i + startIndex + 1;
    const x = Math.abs(Math.sin(idx * 12.9898) * 43758.5453) % 100;
    const y = Math.abs(Math.sin(idx * 4.1414) * 24680.1357) % 100;
    return {
      id: idx,
      left: `${8 + (x % 84)}%`,
      top: `${10 + (y % 76)}%`,
      delay: (idx % 8) * 0.2,
    };
  });
}

function Typewriter({ text }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setDisplay(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, 65);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <p className="typewriter romantic-subtext mx-auto max-w-max text-center text-xl font-semibold text-pink-200">
      {display}
    </p>
  );
}

function BackgroundLayer({ image }) {
  return (
    <div
      className="absolute inset-0 -z-10"
      style={{
        backgroundImage: `linear-gradient(rgba(2,6,23,0.58), rgba(2,6,23,0.8)), url('${image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}

export default function App() {
  const [stage, setStage] = useState("nicknames");
  const [page, setPage] = useState("stars");
  const [currentUser, setCurrentUser] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [nameError, setNameError] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeMemory, setActiveMemory] = useState(null);
  const [musicOn, setMusicOn] = useState(true);

  const [activeAlbum, setActiveAlbum] = useState("K");
  const [galleryState, setGalleryState] = useState("start");
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [unlockTarget, setUnlockTarget] = useState("");
  const [albumPasswordInput, setAlbumPasswordInput] = useState("");
  const [albumPasswordError, setAlbumPasswordError] = useState("");
  const [unlockedAlbums, setUnlockedAlbums] = useState({
    K: false,
    Baby: false,
  });

  const [showLoveReveal, setShowLoveReveal] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [askSure, setAskSure] = useState(false);
  const [noBtnPos, setNoBtnPos] = useState({ x: 68, y: 56 });
  const [activeLetterId, setActiveLetterId] = useState("");
  const [currentClipSrc, setCurrentClipSrc] = useState("");
  const [currentClipType, setCurrentClipType] = useState("audio/mp4");
  const [currentClipTitle, setCurrentClipTitle] = useState("");
  const [isClipPlaying, setIsClipPlaying] = useState(false);

  const [now, setNow] = useState(new Date());
  const musicRef = useRef(null);
  const clipRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!musicRef.current) return;
    if (stage === "site" && musicOn && !isClipPlaying) {
      musicRef.current.play().catch(() => null);
    } else {
      musicRef.current.pause();
    }
  }, [musicOn, isClipPlaying, stage]);

  useEffect(() => {
    if (!showLoveReveal) return;
    const timer = setTimeout(() => {
      setShowLoveReveal(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showLoveReveal]);

  useEffect(() => {
    if (!currentClipSrc || !clipRef.current) return;
    clipRef.current.currentTime = 0;
    clipRef.current
      .play()
      .then(() => setIsClipPlaying(true))
      .catch(() => null);
  }, [currentClipSrc]);

  const partnerName = currentUser === "K" ? "Baby" : "K";
  const { normalStars, shinyStars } = useMemo(
    () => getStarProgress(now),
    [now],
  );
  const normalStarLayout = useMemo(
    () => buildStarLayout(normalStars, 0),
    [normalStars],
  );
  const shinyStarLayout = useMemo(
    () => buildStarLayout(shinyStars, normalStars),
    [normalStars, shinyStars],
  );
  const isActiveAlbumUnlocked = unlockedAlbums[activeAlbum];
  const activeAlbumPhotos = albumImages[activeAlbum] || [];
  const activePhoto =
    activeAlbumPhotos[activePhotoIndex] ||
    activeAlbumPhotos[0] ||
    "/background2.jfif";
  const activeLetter = letters.find((letter) => letter.id === activeLetterId);
  const relationshipDays = useMemo(() => {
    const start = startOfDay(new Date(RELATIONSHIP_START_DATE)).getTime();
    const today = startOfDay(now).getTime();
    if (today < start) return 0;
    return Math.floor((today - start) / (24 * 60 * 60 * 1000)) + 1;
  }, [now]);

  const submitNicknames = (e) => {
    e.preventDefault();
    const normalized = nameInput.trim().toLowerCase();
    if (normalized === "k") {
      setCurrentUser("K");
      setNameError("");
      setStage("password");
      return;
    }
    if (normalized === "baby") {
      setCurrentUser("Baby");
      setNameError("");
      setStage("password");
      return;
    }
    setNameError(`Only these names are allowed: ${ALLOWED_NAMES.join(" or ")}`);
  };

  const submitPassword = (e) => {
    e.preventDefault();
    if (password.trim().toLowerCase() === SECRET_PASSWORD) {
      setAuthError("");
      setMusicOn(true);
      setStage("site");
      return;
    }
    setAuthError("Wrong secret password. Try again.");
  };

  const requestAlbum = (name) => {
    if (unlockedAlbums[name]) {
      setActiveAlbum(name);
      setActivePhotoIndex(0);
      setGalleryState("view");
      return;
    }
    setUnlockTarget(name);
    setAlbumPasswordInput("");
    setAlbumPasswordError("");
  };

  const unlockAlbum = (e) => {
    e.preventDefault();
    if (albumPasswordInput.trim().toLowerCase() === ALBUM_PASSWORD) {
      setUnlockedAlbums((prev) => ({ ...prev, [unlockTarget]: true }));
      setActiveAlbum(unlockTarget);
      setActivePhotoIndex(0);
      setGalleryState("view");
      setUnlockTarget("");
      setAlbumPasswordInput("");
      setAlbumPasswordError("");
      return;
    }
    setAlbumPasswordError("Wrong password.");
  };

  const moveNoButton = () => {
    setNoBtnPos({
      x: Math.floor(Math.random() * 48) + 44,
      y: Math.floor(Math.random() * 42) + 42,
    });
  };

  const onNoClick = () => {
    setAskSure(true);
    setNoAttempts((v) => v + 1);
    moveNoButton();
  };

  const playClip = (clip) => {
    setCurrentClipTitle(clip.title);
    setCurrentClipType(clip.type || "audio/mpeg");
    setIsClipPlaying(true);
    if (currentClipSrc !== clip.src) {
      setCurrentClipSrc(clip.src);
      return;
    }
    if (!clipRef.current) return;
    clipRef.current.currentTime = 0;
    clipRef.current
      .play()
      .then(() => setIsClipPlaying(true))
      .catch(() => null);
  };

  const stopClip = () => {
    if (!clipRef.current) return;
    clipRef.current.pause();
    clipRef.current.currentTime = 0;
    setIsClipPlaying(false);
  };

  if (stage === "nicknames") {
    return (
      <main className="relative flex min-h-screen items-center justify-center px-4">
        <BackgroundLayer image="/first.jfif" />
        <motion.form
          onSubmit={submitNicknames}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass w-full max-w-md space-y-4 rounded-2xl border border-slate-700 p-6 shadow-2xl"
        >
          <h1 className="text-center text-4xl font-black text-pink-200">
            Our Universe
          </h1>
          <p className="text-center text-sm text-slate-300">
            Please use ur secret name!
          </p>
          <input
            className="w-full rounded-lg border border-slate-600 bg-slate-900/70 p-3 outline-none focus:border-pink-400"
            placeholder="enter your secret name !"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          {nameError && <p className="text-sm text-rose-300">{nameError}</p>}
          <button className="w-full rounded-lg bg-pink-500 px-4 py-3 font-semibold text-white hover:bg-pink-400">
            Continue
          </button>
        </motion.form>
      </main>
    );
  }

  if (stage === "password") {
    return (
      <main className="relative flex min-h-screen items-center justify-center px-4">
        <BackgroundLayer image="/first.jfif" />
        <motion.form
          onSubmit={submitPassword}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass w-full max-w-md space-y-4 rounded-2xl border border-indigo-500/40 p-6 shadow-2xl"
        >
          <h2 className="text-center text-3xl font-black text-indigo-200">
            Secret Password
          </h2>
          <p className="text-center text-sm text-slate-300">
            Hi {currentUser}. Enter the secret password.
          </p>
          <input
            type="password"
            className="w-full rounded-lg border border-slate-600 bg-slate-900/70 p-3 outline-none focus:border-indigo-300"
            placeholder="Enter secret password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {authError && <p className="text-sm text-rose-300">{authError}</p>}
          <button className="w-full rounded-lg bg-indigo-500 px-4 py-3 font-semibold text-white hover:bg-indigo-400">
            Unlock our universe
          </button>
        </motion.form>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 md:px-8">
      <BackgroundLayer image={pageBackground[page]} />
      <audio ref={musicRef} loop src="/athousandyears.mp3" />
      <audio
        ref={clipRef}
        src={currentClipSrc}
        onEnded={() => setIsClipPlaying(false)}
      >
        <source src={currentClipSrc} type={currentClipType} />
      </audio>

      <div className="pointer-events-none absolute inset-0">
        {rainDrops.map((drop) => (
          <span
            key={drop.id}
            className="rain-drop"
            style={{
              left: drop.left,
              animationDelay: `${drop.delay}s`,
              animationDuration: `${drop.duration}s`,
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {heartLines.map((heart) => (
          <motion.span
            key={heart.id}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: -150, opacity: [0, 1, 0] }}
            transition={{
              duration: 6 + heart.duration,
              delay: heart.delay,
              repeat: Infinity,
            }}
            className="pointer-events-none absolute bottom-0 text-xl"
            style={{ left: heart.left }}
          >
            💗
          </motion.span>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {heartFalls.map((heart) => (
          <motion.span
            key={`fall-${heart.id}`}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 0] }}
            transition={{
              duration: 7 + heart.duration,
              delay: heart.delay,
              repeat: Infinity,
            }}
            className="pointer-events-none absolute top-0 text-xl"
            style={{ left: heart.left }}
          >
            💖
          </motion.span>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {romanticWords.map((word) => (
          <motion.span
            key={word.id}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0.2, 0.85, 0.2], y: [0, -10, 0] }}
            transition={{
              duration: 4.8,
              delay: word.delay,
              repeat: Infinity,
            }}
            className="romantic-word pointer-events-none absolute text-sm font-semibold md:text-base"
            style={{ left: word.left, top: word.top }}
          >
            {word.text}
          </motion.span>
        ))}
      </AnimatePresence>

      <header className="mx-auto mb-6 flex max-w-6xl flex-col items-center justify-between gap-4 rounded-2xl border border-slate-700/70 bg-slate-900/40 p-4 md:flex-row">
        <div>
          <h1 className="sparkle-text text-3xl font-black text-amber-100">
            Our Universe
          </h1>
          <p className="romantic-subtext text-sm text-slate-200">
            Among billions of stars, my heart still chose you.
          </p>
          <p className="romantic-subtext mt-1 text-xs text-pink-200">
            {relationshipDays} days loving you endlessly.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            onClick={() => setMusicOn((v) => !v)}
            className="rounded-lg bg-pink-500 px-4 py-2 font-semibold text-white hover:bg-pink-400"
          >
            {musicOn ? "Pause music" : "Play music"}
          </button>
          {currentClipTitle && (
            <span className="rounded-lg border border-slate-500 bg-slate-900/60 px-3 py-2 text-xs text-slate-200">
              Now playing: {currentClipTitle}{" "}
              {isClipPlaying ? "(Playing)" : "(Paused/Ended)"}
            </span>
          )}
          {currentClipTitle && (
            <button
              onClick={stopClip}
              className="rounded-lg border border-rose-300 bg-rose-500/20 px-3 py-2 text-xs font-semibold text-rose-100"
            >
              Stop media
            </button>
          )}
        </div>
      </header>

      <nav className="mx-auto mb-6 flex max-w-6xl flex-wrap gap-2">
        {[
          ["stars", "Home Stars"],
          ["gallery", "Polaroid Gallery"],
          ["voice", "Voice Messages"],
          ["love", "Do You Love K?"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setPage(key)}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold ${
              page === key
                ? "border-pink-300 bg-pink-500/25 text-pink-100"
                : "border-slate-500 bg-slate-900/35 text-slate-200 hover:border-slate-300"
            }`}
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => setPage("letters")}
          className="rounded-lg border border-pink-300/40 bg-pink-500/10 px-3 py-2 text-sm text-pink-100 hover:bg-pink-500/20"
          title="Letters For You"
        >
          💌
        </button>
      </nav>

      {page === "stars" && (
        <section className="mx-auto grid max-w-6xl gap-6">
          <article className="relative h-[420px] overflow-hidden rounded-2xl border border-indigo-300/30 bg-slate-950/65">
            {normalStarLayout.map((star) => (
              <motion.span
                key={`n-${star.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{
                  duration: 2.4,
                  delay: star.delay,
                  repeat: Infinity,
                }}
                className="absolute h-[7px] w-[7px] rounded-full bg-amber-200"
                style={{
                  left: star.left,
                  top: star.top,
                  boxShadow: "0 0 10px rgba(253,224,71,0.7)",
                }}
              />
            ))}
            {shinyStarLayout.map((star) => (
              <motion.span
                key={`s-${star.id}`}
                initial={{ scale: 0.75, opacity: 0 }}
                animate={{ scale: [1, 1.22, 1], opacity: [0.55, 1, 0.55] }}
                transition={{
                  duration: 1.9,
                  delay: star.delay,
                  repeat: Infinity,
                }}
                className="absolute h-[14px] w-[14px] rounded-full bg-pink-200"
                style={{
                  left: star.left,
                  top: star.top,
                  boxShadow:
                    "0 0 14px rgba(244,114,182,0.95), 0 0 30px rgba(250,204,21,0.65)",
                }}
              />
            ))}
            <div className="background-text">
              ကောင်းကင်ကြီး မှောင်မည်းပြီး တိတ်ဆိတ်သွားရင်တောင်...
              ဘေဘီအပေါ်ထားတဲ့ ကို့အချစ်တွေက ဘယ်ကြယ်ပွင့်ထက်မဆို
              ပိုလင်းလက်နေမယ်ဆိုတာ သတိရပေးပါ။
            </div>
            <div className="absolute bottom-4 left-4 rounded-lg border border-slate-600/60 bg-slate-900/65 px-3 py-2">
              <p className="text-sm text-slate-200">
                Daily stars + monthly shiny stars.
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-700 bg-slate-900/45 p-5">
            <h2 className="mb-4 text-xl font-bold text-amber-200">
              Constellation Memories
            </h2>
            <div className="relative h-[320px] overflow-hidden rounded-xl bg-slate-950/70">
              <svg className="pointer-events-none absolute inset-0 h-full w-full">
                {constellations.map((constellation) =>
                  constellation.points.slice(0, -1).map((point, index) => {
                    const next = constellation.points[index + 1];
                    return (
                      <line
                        key={`${constellation.id}-line-${index}`}
                        x1={`${point.x}%`}
                        y1={`${point.y}%`}
                        x2={`${next.x}%`}
                        y2={`${next.y}%`}
                        stroke="rgba(251, 191, 36, 0.6)"
                        strokeWidth="1.5"
                      />
                    );
                  }),
                )}
              </svg>
              {constellations.map((constellation) =>
                constellation.points.map((point, index) => (
                  <motion.button
                    key={`${constellation.id}-star-${index}`}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setActiveMemory(constellation)}
                    className="star-glow absolute rounded-full bg-amber-300"
                    style={{
                      top: `${point.y}%`,
                      left: `${point.x}%`,
                      width: index === 0 ? "12px" : "10px",
                      height: index === 0 ? "12px" : "10px",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                )),
              )}
              {constellations.map((constellation) => (
                <button
                  key={`${constellation.id}-label`}
                  onClick={() => setActiveMemory(constellation)}
                  className="absolute rounded-md bg-slate-900/60 px-2 py-1 text-xs text-pink-100 hover:bg-pink-500/30"
                  style={{
                    top: `${constellation.points[0].y + 4}%`,
                    left: `${constellation.points[0].x + 2}%`,
                  }}
                >
                  {constellation.title}
                </button>
              ))}
              <p className="absolute bottom-3 left-3 text-xs text-slate-400">
                Click any constellation to open its story.
              </p>
            </div>
          </article>
        </section>
      )}

      {page === "gallery" && (
        <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[280px,1fr]">
          <article className="rounded-2xl border border-slate-700 bg-slate-900/45 p-5">
            <h3 className="mb-4 text-lg font-bold text-pink-200">
              Choose Album
            </h3>
            <p className="mb-3 text-sm text-slate-300">
              Please enter one of these 2 sections:
            </p>
            <div className="space-y-3">
              <button
                onClick={() => requestAlbum("K")}
                className="w-full rounded-lg border border-slate-500 px-3 py-2 text-left hover:border-pink-300"
              >
                Please enter password to see K&apos;s album
              </button>
              <button
                onClick={() => requestAlbum("Baby")}
                className="w-full rounded-lg border border-slate-500 px-3 py-2 text-left hover:border-pink-300"
              >
                Please enter password to see Baby&apos;s album
              </button>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-700 bg-slate-900/45 p-5">
            <h3 className="mb-4 text-lg font-bold text-pink-200">
              Dear My love-
            </h3>
            <div className="rounded-xl border border-slate-700 bg-slate-950/55 p-3">
              {galleryState === "start" ? (
                <>
                  <img
                    src="/background2.jfif"
                    alt="Dear My love"
                    className="h-[420px] w-full rounded-lg object-cover"
                  />
                  <p className="pt-3 text-center text-sm text-slate-200">
                    Choose K or Baby album to open photos.
                  </p>
                </>
              ) : (
                <>
                  <img
                    src={
                      isActiveAlbumUnlocked ? activePhoto : "/background2.jfif"
                    }
                    alt={
                      isActiveAlbumUnlocked
                        ? `${activeAlbum} photo ${activePhotoIndex + 1}`
                        : `${activeAlbum} album locked`
                    }
                    className="h-[420px] w-full rounded-lg object-cover"
                  />
                  <p className="pt-3 text-center text-sm text-slate-200">
                    {isActiveAlbumUnlocked
                      ? `${activeAlbum} photo ${activePhotoIndex + 1} / ${activeAlbumPhotos.length}`
                      : "Locked • Enter password to see photo"}
                  </p>
                  {isActiveAlbumUnlocked && activeAlbumPhotos.length > 1 && (
                    <div className="mt-3 flex justify-center gap-2">
                      <button
                        onClick={() =>
                          setActivePhotoIndex((idx) =>
                            idx === 0 ? activeAlbumPhotos.length - 1 : idx - 1,
                          )
                        }
                        className="rounded-lg border border-slate-400 px-3 py-1 text-xs text-slate-100"
                      >
                        Prev
                      </button>
                      <button
                        onClick={() =>
                          setActivePhotoIndex((idx) =>
                            idx === activeAlbumPhotos.length - 1 ? 0 : idx + 1,
                          )
                        }
                        className="rounded-lg border border-slate-400 px-3 py-1 text-xs text-slate-100"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </article>
          <div className="lg:col-span-2">
            <button
              onClick={() => {
                setGalleryState("start");
                setActivePhotoIndex(0);
              }}
              className="rounded-lg border border-slate-400 bg-slate-900/60 px-5 py-2 text-sm font-semibold text-slate-100 hover:border-pink-300"
            >
              Back
            </button>
          </div>
        </section>
      )}

      {page === "voice" && (
        <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-700 bg-slate-900/45 p-5">
            <h3 className="mb-3 text-lg font-bold text-rose-200">
              Motivational & Talking
            </h3>
            <div className="space-y-4">
              {talkingClips.map((clip) => (
                <div
                  key={clip.title}
                  className="rounded-lg border border-slate-600 p-3"
                >
                  <p className="mb-2 text-sm text-slate-300">{clip.title}</p>
                  <button
                    onClick={() => playClip(clip)}
                    className="rounded-lg bg-rose-400 px-4 py-2 text-sm font-semibold text-slate-900"
                  >
                    Play voice
                  </button>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-700 bg-slate-900/45 p-5">
            <h3 className="mb-3 text-lg font-bold text-cyan-200">
              Music (My Songs)
            </h3>
            <div className="space-y-4">
              {musicClips.map((clip) => (
                <div
                  key={clip.title}
                  className="rounded-lg border border-slate-600 p-3"
                >
                  <p className="mb-2 text-sm text-slate-300">{clip.title}</p>
                  <button
                    onClick={() => playClip(clip)}
                    className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900"
                  >
                    Play music
                  </button>
                </div>
              ))}
            </div>
          </article>
        </section>
      )}

      {page === "love" && (
        <section className="mx-auto max-w-6xl">
          <div className="relative flex h-[72vh] flex-col items-center justify-center overflow-hidden rounded-3xl border border-pink-300/40 bg-slate-900/50 px-4">
            <motion.h2
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              className="romantic-title mb-10 text-center text-5xl font-black text-pink-100 md:text-7xl"
            >
              Do You Love K?
            </motion.h2>

            <div className="relative h-56 w-full max-w-3xl">
              <button
                onClick={() => setShowLoveReveal(true)}
                className="heart-choice absolute left-[16%] top-[45%] -translate-y-1/2 bg-pink-500 text-white"
              >
                YES
              </button>

              <button
                onMouseEnter={moveNoButton}
                onFocus={moveNoButton}
                onClick={onNoClick}
                className="heart-choice absolute bg-indigo-500 text-white transition-all duration-150"
                style={{ left: `${noBtnPos.x}%`, top: `${noBtnPos.y}%` }}
              >
                NO
              </button>
            </div>

            {askSure && (
              <p className="mt-2 text-lg text-rose-200">
                Are you sure? No can&apos;t catch me.
              </p>
            )}
            {noAttempts >= 10 && (
              <p className="mt-2 text-lg font-semibold text-rose-200">
                Don&apos;t let you love me
              </p>
            )}
          </div>
        </section>
      )}

      {page === "letters" && (
        <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[300px,1fr]">
          <article className="rounded-2xl border border-slate-700 bg-slate-900/45 p-5">
            <h3 className="mb-4 text-lg font-bold text-pink-200">
              Letters For You
            </h3>
            <div className="space-y-3">
              {letters.map((letter) => (
                <button
                  key={letter.id}
                  onClick={() => setActiveLetterId(letter.id)}
                  className={`w-full rounded-lg border px-3 py-3 text-left ${
                    activeLetterId === letter.id
                      ? "border-pink-300 bg-pink-500/20"
                      : "border-slate-600 bg-slate-900/50 hover:border-pink-300/60"
                  }`}
                >
                  <p className="text-sm font-semibold text-pink-100">
                    {letter.title}
                  </p>
                  <p className="text-xs text-slate-300">{letter.date}</p>
                </button>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-700 bg-slate-900/45 p-5">
            {!activeLetter ? (
              <div className="grid h-full min-h-[320px] place-items-center rounded-xl border border-dashed border-pink-300/35 bg-slate-950/45">
                <p className="text-center text-slate-300">
                  Choose a letter to open it 💌
                </p>
              </div>
            ) : (
              <div className="handwritten min-h-[320px] rounded-xl border border-amber-200/30 bg-amber-50/95 p-6 text-slate-900">
                <p className="mb-1 text-sm text-slate-700">
                  {activeLetter.date}
                </p>
                <h4 className="mb-4 text-2xl font-bold text-pink-700">
                  {activeLetter.title}
                </h4>
                <p className="leading-8">{activeLetter.body}</p>
              </div>
            )}
          </article>
        </section>
      )}

      <section className="mx-auto mt-10 max-w-4xl rounded-2xl border border-pink-400/40 bg-slate-900/45 p-6 text-center">
        <Typewriter text="In every universe, I'd still choose you." />
      </section>

      <AnimatePresence>
        {unlockTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-slate-950/85 p-4"
            onClick={() => setUnlockTarget("")}
          >
            <motion.form
              initial={{ y: 20, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={unlockAlbum}
              className="w-full max-w-sm rounded-2xl border border-pink-400/40 bg-slate-900 p-5"
            >
              <h4 className="mb-2 text-lg font-bold text-pink-200">
                Unlock {unlockTarget}&apos;s album
              </h4>
              <input
                type="password"
                value={albumPasswordInput}
                onChange={(e) => setAlbumPasswordInput(e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-900/70 p-3 outline-none focus:border-pink-300"
                placeholder="Enter album password"
              />
              {albumPasswordError && (
                <p className="mt-2 text-sm text-rose-300">
                  {albumPasswordError}
                </p>
              )}
              <button className="mt-4 w-full rounded-lg bg-pink-500 px-4 py-2 font-semibold text-white">
                Open album
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-slate-950/85 p-4"
            onClick={() => setActiveMemory(null)}
          >
            <motion.div
              initial={{ y: 24, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl border border-amber-300/40 bg-slate-900 p-4"
            >
              <img
                src={activeMemory.image}
                alt={activeMemory.title}
                className="mb-3 h-56 w-full rounded-lg object-cover"
              />
              <h4 className="text-xl font-bold text-amber-200">
                {activeMemory.title}
              </h4>
              <p className="mt-2 text-slate-200">{activeMemory.story}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLoveReveal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-40 grid place-items-center bg-slate-950/70"
          >
            <motion.div
              initial={{ scale: 0.35, rotate: -8, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
              className="rounded-3xl border border-pink-300/50 bg-gradient-to-r from-fuchsia-500/30 via-pink-500/35 to-rose-500/30 px-14 py-12 text-center shadow-[0_0_40px_rgba(236,72,153,0.95)]"
            >
              <p className="text-5xl font-black tracking-wide text-pink-100 md:text-7xl">
                I LOVE YOU
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
