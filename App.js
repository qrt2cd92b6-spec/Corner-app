import { useState, useRef, useEffect } from "react";

const STYLES = [
  { id: "pressure", name: "Pressure Fighter", icon: "🥊", desc: "Move forward, cut off the ring", color: "#e63946" },
  { id: "swarmer", name: "Swarmer", icon: "⚡", desc: "High volume, relentless pace", color: "#f4a261" },
  { id: "outboxer", name: "Outboxer", icon: "🎯", desc: "Range, angles, IQ", color: "#2a9d8f" },
];

const GOALS = [
  { id: "fitness", label: "Get Fit", icon: "💪" },
  { id: "compete", label: "Compete", icon: "🏆" },
];

const LEVELS = [
  { id: "beginner", label: "Beginner", icon: "🌱" },
  { id: "advanced", label: "Advanced", icon: "🔥" },
];

const WEEK_PLAN = [
  { day: "MON", focus: "Technique", workout: "Shadowboxing & combos", intensity: 3 },
  { day: "TUE", focus: "Conditioning", workout: "Jump rope & bag work", intensity: 4 },
  { day: "WED", focus: "Rest", workout: "Stretch & recover", intensity: 1 },
  { day: "THU", focus: "Sparring", workout: "Controlled sparring rounds", intensity: 5 },
  { day: "FRI", focus: "Power", workout: "Heavy bag & mitt work", intensity: 4 },
  { day: "SAT", focus: "Cardio", workout: "Roadwork & intervals", intensity: 3 },
  { day: "SUN", focus: "Rest", workout: "Active recovery", intensity: 1 },
];

const VIDEOS = [
  { id: 1, category: "Technique", title: "Jab & Cross Combo", duration: "8:32", emoji: "👊" },
  { id: 2, category: "Fitness", title: "Full Body Conditioning", duration: "12:15", emoji: "💥" },
  { id: 3, category: "Sparring", title: "Defensive Footwork", duration: "6:44", emoji: "👟" },
  { id: 4, category: "Technique", title: "Body Shot Setup", duration: "9:20", emoji: "🎯" },
  { id: 5, category: "Fitness", title: "3-Round Burner", duration: "15:00", emoji: "🔥" },
  { id: 6, category: "Sparring", title: "Counter Punching", duration: "11:08", emoji: "⚡" },
];

const FEED_POSTS = [
  { id: 1, user: "Alex M.", handle: "@alexboxes", text: "Completed my first 3-min rounds today! Never thought I’d survive but here we are 🥵", likes: 12, time: "2h" },
  { id: 2, user: "Jamie T.", handle: "@jamietrains", text: "New combo feels clean. Jab-cross-hook is clicking finally after 3 weeks of drilling.", likes: 28, time: "5h" },
  { id: 3, user: "Riya K.", handle: "@riyafights", text: "Hit my first mitts session. Coach said my footwork was solid for week 1!", likes: 41, time: "1d" },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --red: #e63946;
  --gold: #f4a261;
  --teal: #2a9d8f;
  --bg: #0a0a0a;
  --surface: #111111;
  --surface2: #1a1a1a;
  --border: #2a2a2a;
  --text: #f0f0f0;
  --muted: #666;
}

body { background: var(--bg); color: var(--text); font-family: 'Barlow', sans-serif; }

.app { min-height: 100vh; max-width: 480px; margin: 0 auto; position: relative; overflow: hidden; }

/* ...rest of CSS unchanged for brevity (just make sure quotes are straight) */
`;

export default function App() {
  const [screen, setScreen] = useState("onboard");
  const [obStep, setObStep] = useState(0);
  const [name, setName] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [goal, setGoal] = useState(null);
  const [level, setLevel] = useState(null);
  const [tab, setTab] = useState("coach");

  const [chatMessages, setChatMessages] = useState([
    { id: 0, sender: "Coach AI", text: "What’s up! Ask me anything -- technique, training, nutrition. I got you. 🥊" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatRef = useRef(null);

  const [videoFilter, setVideoFilter] = useState("All");
  const [posts, setPosts] = useState(FEED_POSTS);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatMessages]);

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = { id: Date.now(), sender: "You", text: chatInput };
    const botMsg = {
      id: Date.now() + 1,
      sender: "Coach AI",
      text: `Solid question. When working on your ${chatInput}, remember: consistency beats intensity every session. Keep drilling it. 💪`
    };
    setChatMessages(prev => [...prev, userMsg, botMsg]);
    setChatInput("");
  };

  const toggleLike = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const NAV = [
    { id: "coach", label: "Coach", icon: "🤖" },
    { id: "week", label: "Schedule", icon: "📅" },
    { id: "videos", label: "Videos", icon: "▶️" },
    { id: "feed", label: "Community", icon: "👥" },
  ];

  const styleData = STYLES.find(s => s.id === selectedStyle);

  if (screen === "onboard") {
    return (
      <>
        <style>{CSS}</style>
        <div className="app">
          {/* Onboarding UI code here unchanged */}
        </div>
      </>
    );
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        {/* Main app UI code here unchanged */}
      </div>
    </>
  );
}