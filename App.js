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
@import url(‘https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600&display=swap’);

- { box-sizing: border-box; margin: 0; padding: 0; }

:root {
–red: #e63946;
–gold: #f4a261;
–teal: #2a9d8f;
–bg: #0a0a0a;
–surface: #111111;
–surface2: #1a1a1a;
–border: #2a2a2a;
–text: #f0f0f0;
–muted: #666;
}

body { background: var(–bg); color: var(–text); font-family: ‘Barlow’, sans-serif; }

.app { min-height: 100vh; max-width: 480px; margin: 0 auto; position: relative; overflow: hidden; }

/* ONBOARDING */
.ob-wrap {
min-height: 100vh;
display: flex;
flex-direction: column;
padding: 0;
background: var(–bg);
}
.ob-header {
padding: 48px 28px 24px;
border-bottom: 1px solid var(–border);
}
.ob-logo {
font-family: ‘Barlow Condensed’, sans-serif;
font-size: 13px;
font-weight: 700;
letter-spacing: 0.25em;
color: var(–red);
text-transform: uppercase;
margin-bottom: 32px;
}
.ob-step-label {
font-size: 11px;
font-weight: 600;
letter-spacing: 0.2em;
color: var(–muted);
text-transform: uppercase;
margin-bottom: 10px;
}
.ob-title {
font-family: ‘Barlow Condensed’, sans-serif;
font-size: 52px;
font-weight: 900;
line-height: 0.95;
text-transform: uppercase;
letter-spacing: -0.02em;
}
.ob-title span { color: var(–red); }
.ob-body { padding: 32px 28px; flex: 1; display: flex; flex-direction: column; gap: 16px; }

.ob-input {
background: var(–surface2);
border: 1px solid var(–border);
border-radius: 4px;
padding: 16px 18px;
color: var(–text);
font-family: ‘Barlow’, sans-serif;
font-size: 16px;
width: 100%;
outline: none;
transition: border-color 0.2s;
}
.ob-input:focus { border-color: var(–red); }
.ob-input::placeholder { color: var(–muted); }

.btn-primary {
background: var(–red);
color: white;
border: none;
border-radius: 4px;
padding: 16px 24px;
font-family: ‘Barlow Condensed’, sans-serif;
font-size: 18px;
font-weight: 700;
letter-spacing: 0.1em;
text-transform: uppercase;
cursor: pointer;
width: 100%;
transition: opacity 0.2s, transform 0.1s;
}
.btn-primary:hover { opacity: 0.9; }
.btn-primary:active { transform: scale(0.98); }
.btn-primary:disabled { opacity: 0.3; cursor: not-allowed; }

.style-card {
border: 1px solid var(–border);
border-radius: 6px;
padding: 18px;
cursor: pointer;
display: flex;
align-items: center;
gap: 16px;
transition: all 0.18s;
background: var(–surface);
}
.style-card:hover { border-color: #444; background: var(–surface2); }
.style-card.selected { border-color: var(–red); background: rgba(230,57,70,0.08); }
.style-icon { font-size: 28px; width: 44px; text-align: center; }
.style-name { font-family: ‘Barlow Condensed’, sans-serif; font-size: 20px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
.style-desc { font-size: 12px; color: var(–muted); margin-top: 2px; }

.choice-row { display: flex; gap: 12px; }
.choice-btn {
flex: 1;
border: 1px solid var(–border);
border-radius: 6px;
padding: 20px 12px;
cursor: pointer;
background: var(–surface);
color: var(–text);
font-family: ‘Barlow Condensed’, sans-serif;
font-size: 20px;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 0.08em;
transition: all 0.18s;
text-align: center;
}
.choice-btn:hover { border-color: #444; }
.choice-btn.selected { border-color: var(–red); background: rgba(230,57,70,0.08); }
.choice-icon { font-size: 24px; display: block; margin-bottom: 6px; }

/* PROGRESS BAR */
.ob-progress { display: flex; gap: 6px; padding: 0 28px 20px; }
.ob-progress-dot { height: 3px; flex: 1; border-radius: 2px; background: var(–border); transition: background 0.3s; }
.ob-progress-dot.active { background: var(–red); }

/* MAIN APP */
.main-wrap { min-height: 100vh; display: flex; flex-direction: column; }

.top-bar {
padding: 20px 20px 0;
display: flex;
align-items: flex-end;
justify-content: space-between;
}
.top-greeting {
font-family: ‘Barlow Condensed’, sans-serif;
font-size: 32px;
font-weight: 900;
text-transform: uppercase;
letter-spacing: -0.01em;
line-height: 1;
}
.top-greeting span { color: var(–red); }
.top-badge {
font-size: 10px;
font-weight: 600;
letter-spacing: 0.15em;
color: var(–muted);
text-transform: uppercase;
padding-bottom: 4px;
}

/* NAV */
.bottom-nav {
position: sticky;
bottom: 0;
background: var(–surface);
border-top: 1px solid var(–border);
display: flex;
padding: 0;
z-index: 10;
}
.nav-btn {
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
gap: 3px;
padding: 12px 8px;
cursor: pointer;
border: none;
background: transparent;
color: var(–muted);
font-family: ‘Barlow Condensed’, sans-serif;
font-size: 10px;
font-weight: 700;
letter-spacing: 0.15em;
text-transform: uppercase;
transition: color 0.2s;
}
.nav-btn.active { color: var(–red); }
.nav-icon { font-size: 20px; }

/* CONTENT */
.tab-content { flex: 1; padding: 20px; overflow-y: auto; padding-bottom: 80px; }

/* COACH CHAT */
.chat-box {
border: 1px solid var(–border);
border-radius: 6px;
height: 300px;
overflow-y: auto;
padding: 14px;
display: flex;
flex-direction: column;
gap: 10px;
background: var(–surface);
margin-bottom: 12px;
}
.chat-bubble {
max-width: 80%;
padding: 10px 14px;
border-radius: 6px;
font-size: 14px;
line-height: 1.4;
}
.chat-bubble.you {
align-self: flex-end;
background: var(–red);
color: white;
border-bottom-right-radius: 2px;
}
.chat-bubble.coach {
align-self: flex-start;
background: var(–surface2);
border: 1px solid var(–border);
border-bottom-left-radius: 2px;
}
.bubble-name { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px; color: var(–muted); }
.chat-input-row { display: flex; gap: 8px; }
.chat-input {
flex: 1;
background: var(–surface2);
border: 1px solid var(–border);
border-radius: 4px;
padding: 12px 14px;
color: var(–text);
font-family: ‘Barlow’, sans-serif;
font-size: 14px;
outline: none;
transition: border-color 0.2s;
}
.chat-input:focus { border-color: var(–red); }
.chat-send {
background: var(–red);
border: none;
border-radius: 4px;
padding: 0 18px;
color: white;
font-size: 18px;
cursor: pointer;
transition: opacity 0.2s;
}
.chat-send:hover { opacity: 0.85; }
.chat-empty { color: var(–muted); font-size: 13px; text-align: center; margin: auto; }

/* WEEK */
.day-card {
border: 1px solid var(–border);
border-radius: 6px;
padding: 16px;
display: flex;
align-items: center;
gap: 16px;
margin-bottom: 8px;
background: var(–surface);
}
.day-label {
font-family: ‘Barlow Condensed’, sans-serif;
font-size: 22px;
font-weight: 900;
color: var(–muted);
width: 44px;
text-align: center;
flex-shrink: 0;
}
.day-info { flex: 1; }
.day-focus {
font-family: ‘Barlow Condensed’, sans-serif;
font-size: 16px;
font-weight: 700;
text-transform: uppercase;
letter-spacing: 0.1em;
color: var(–red);
margin-bottom: 2px;
}
.day-workout { font-size: 13px; color: var(–muted); }
.intensity-dots { display: flex; gap: 3px; }
.intensity-dot { width: 6px; height: 6px; border-radius: 50%; background: var(–border); }
.intensity-dot.filled { background: var(–red); }

/* VIDEOS */
.video-filters { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.filter-btn {
border: 1px solid var(–border);
background: var(–surface);
color: var(–muted);
font-family: ‘Barlow Condensed’, sans-serif;
font-size: 13px;
font-weight: 700;
letter-spacing: 0.1em;
text-transform: uppercase;
padding: 6px 14px;
border-radius: 20px;
cursor: pointer;
transition: all 0.18s;
}
.filter-btn.active { background: var(–red); border-color: var(–red); color: white; }
.video-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.video-card {
border: 1px solid var(–border);
border-radius: 6px;
overflow: hidden;
background: var(–surface);
cursor: pointer;
transition: border-color 0.18s;
}
.video-card:hover { border-color: #444; }
.video-thumb {
height: 90px;
background: var(–surface2);
display: flex;
align-items: center;
justify-content: center;
font-size: 36px;
border-bottom: 1px solid var(–border);
}
.video-info { padding: 10px; }
.video-title { font-size: 12px; font-weight: 600; line-height: 1.3; margin-bottom: 4px; }
.video-meta { font-size: 11px; color: var(–muted); }

/* FEED */
.post-card {
border: 1px solid var(–border);
border-radius: 6px;
padding: 16px;
background: var(–surface);
margin-bottom: 10px;
}
.post-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.post-user-name { font-weight: 600; font-size: 14px; }
.post-handle { font-size: 12px; color: var(–muted); }
.post-time { font-size: 11px; color: var(–muted); }
.post-text { font-size: 14px; line-height: 1.5; margin-bottom: 12px; }
.post-actions { display: flex; align-items: center; gap: 8px; }
.like-btn {
border: 1px solid var(–border);
background: transparent;
color: var(–muted);
font-size: 12px;
font-family: ‘Barlow’, sans-serif;
padding: 5px 12px;
border-radius: 20px;
cursor: pointer;
transition: all 0.18s;
display: flex;
align-items: center;
gap: 5px;
}
.like-btn:hover { border-color: var(–red); color: var(–red); }

.section-label {
font-family: ‘Barlow Condensed’, sans-serif;
font-size: 11px;
font-weight: 700;
letter-spacing: 0.2em;
color: var(–muted);
text-transform: uppercase;
margin-bottom: 16px;
}
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
setChatMessages(prev => […prev, userMsg, botMsg]);
setChatInput("");
};

const toggleLike = (id) => {
setPosts(posts.map(p => p.id === id ? { …p, likes: p.likes + 1 } : p));
};

const NAV = [
{ id: "coach", label: "Coach", icon: "🤖" },
{ id: "week", label: "Schedule", icon: "📅" },
{ id: "videos", label: "Videos", icon: "▶️" },
{ id: "feed", label: "Feed", icon: "👥" },
];

const styleData = STYLES.find(s => s.id === selectedStyle);

if (screen === "onboard") {
return (
<>
<style>{CSS}</style>
<div className="app">
<div className="ob-wrap">
<div className="ob-header">
<div className="ob-logo">⬛ BoxOS</div>
<div className="ob-step-label">Step {obStep + 1} of 4</div>
<h1 className="ob-title">
{obStep === 0 && <><span>Let’s</span> get started</>}
{obStep === 1 && <>Your <span>style</span></>}
{obStep === 2 && <>Your <span>goal</span></>}
{obStep === 3 && <>Your <span>level</span></>}
</h1>
</div>

```
        <div className="ob-progress" style={{ paddingTop: 16 }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`ob-progress-dot ${i <= obStep ? "active" : ""}`} />
          ))}
        </div>

        <div className="ob-body">
          {obStep === 0 && (
            <>
              <input
                className="ob-input"
                placeholder="Enter your name"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && name && setObStep(1)}
                autoFocus
              />
              <button className="btn-primary" onClick={() => setObStep(1)} disabled={!name}>
                Continue →
              </button>
            </>
          )}

          {obStep === 1 && (
            <>
              {STYLES.map(s => (
                <div
                  key={s.id}
                  className={`style-card ${selectedStyle === s.id ? "selected" : ""}`}
                  onClick={() => setSelectedStyle(s.id)}
                >
                  <div className="style-icon">{s.icon}</div>
                  <div>
                    <div className="style-name">{s.name}</div>
                    <div className="style-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
              <button className="btn-primary" onClick={() => setObStep(2)} disabled={!selectedStyle}>
                Continue →
              </button>
            </>
          )}

          {obStep === 2 && (
            <>
              <div className="choice-row">
                {GOALS.map(g => (
                  <button
                    key={g.id}
                    className={`choice-btn ${goal === g.id ? "selected" : ""}`}
                    onClick={() => setGoal(g.id)}
                  >
                    <span className="choice-icon">{g.icon}</span>
                    {g.label}
                  </button>
                ))}
              </div>
              <button className="btn-primary" onClick={() => setObStep(3)} disabled={!goal}>
                Continue →
              </button>
            </>
          )}

          {obStep === 3 && (
            <>
              <div className="choice-row">
                {LEVELS.map(l => (
                  <button
                    key={l.id}
                    className={`choice-btn ${level === l.id ? "selected" : ""}`}
                    onClick={() => setLevel(l.id)}
                  >
                    <span className="choice-icon">{l.icon}</span>
                    {l.label}
                  </button>
                ))}
              </div>
              <button className="btn-primary" onClick={() => setScreen("main")} disabled={!level}>
                Let's Train 🥊
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  </>
);
```

}

return (
<>
<style>{CSS}</style>
<div className="app">
<div className="main-wrap">
<div className="top-bar">
<div>
<div className="top-greeting">
Hey <span>{name}</span> 👋
</div>
{styleData && (
<div style={{ fontSize: 12, color: "var(–muted)", marginTop: 4 }}>
{styleData.icon} {styleData.name}
</div>
)}
</div>
<div className="top-badge">BoxOS</div>
</div>

```
      <div className="tab-content">

        {tab === "coach" && (
          <div>
            <div className="section-label">AI Coach</div>
            <div className="chat-box" ref={chatRef}>
              {chatMessages.length === 0 && (
                <div className="chat-empty">Ask your coach anything...</div>
              )}
              {chatMessages.map(m => (
                <div key={m.id} className={`chat-bubble ${m.sender === "You" ? "you" : "coach"}`}>
                  <div className="bubble-name">{m.sender}</div>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="chat-input-row">
              <input
                className="chat-input"
                placeholder="Ask about technique, training..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendChat()}
              />
              <button className="chat-send" onClick={sendChat}>↑</button>
            </div>
          </div>
        )}

        {tab === "week" && (
          <div>
            <div className="section-label">This Week</div>
            {WEEK_PLAN.map((d, i) => (
              <div key={i} className="day-card">
                <div className="day-label">{d.day}</div>
                <div className="day-info">
                  <div className="day-focus">{d.focus}</div>
                  <div className="day-workout">{d.workout}</div>
                </div>
                <div className="intensity-dots">
                  {[1, 2, 3, 4, 5].map(n => (
                    <div key={n} className={`intensity-dot ${n <= d.intensity ? "filled" : ""}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "videos" && (
          <div>
            <div className="section-label">Library</div>
            <div className="video-filters">
              {["All", "Technique", "Fitness", "Sparring"].map(f => (
                <button
                  key={f}
                  className={`filter-btn ${videoFilter === f ? "active" : ""}`}
                  onClick={() => setVideoFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="video-grid">
              {VIDEOS.filter(v => videoFilter === "All" || v.category === videoFilter).map(v => (
                <div key={v.id} className="video-card">
                  <div className="video-thumb">{v.emoji}</div>
                  <div className="video-info">
                    <div className="video-title">{v.title}</div>
                    <div className="video-meta">{v.category} · {v.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "feed" && (
          <div>
            <div className="section-label">Community</div>
            {posts.map(p => (
              <div key={p.id} className="post-card">
                <div className="post-header">
                  <div>
                    <div className="post-user-name">{p.user}</div>
                    <div className="post-handle">{p.handle}</div>
                  </div>
                  <div className="post-time">{p.time} ago</div>
                </div>
                <div className="post-text">{p.text}</div>
                <div className="post-actions">
                  <button className="like-btn" onClick={() => toggleLike(p.id)}>
                    ❤️ {p.likes}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <nav className="bottom-nav">
        {NAV.map(n => (
          <button
            key={n.id}
            className={`nav-btn ${tab === n.id ? "active" : ""}`}
            onClick={() => setTab(n.id)}
          >
            <span className="nav-icon">{n.icon}</span>
            {n.label}
          </button>
        ))}
      </nav>
    </div>
  </div>
</>
```

);
}