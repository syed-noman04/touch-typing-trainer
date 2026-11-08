# ⌨️ Touch Typing Trainer

A web app for practising **touch typing** on the home row keys (`A S D F J K L ;`), built with **React** and **Vite**.

Touch typing means typing without looking at the keyboard. Each finger owns its own keys, and regular practice builds the muscle memory that leads to speed and accuracy. This app guides that practice with short phrases, a colour-coded on-screen keyboard, and live feedback.

**🔗 Live demo:** [https://touch-typing-trainer-by-noman.vercel.app/](https://touch-typing-trainer-by-noman.vercel.app)
**📦 Source code:** [https://github.com/syed-noman04/touch-typing-trainer](https://github.com/syed-noman04/touch-typing-trainer)


---

## ✨ Features

- **Typing box:** captures real key presses and shows the phrase you need to type
- **Next-key guidance:** the target character is highlighted in the phrase, and the matching key lights up on the on-screen keyboard
- **Finger colour coding:** each finger has its own colour (matching fingers on both hands share a colour), with a label showing which finger to use
- **5-minute timed session:** the timer starts on your **first keypress**, not on page load
- **Live stats:** keys pressed, correct keys, and accuracy %
- **Results screen:** shows total keys, correct keys, accuracy, and WPM when time is up, with a one-click restart
- **Three lessons:** left hand (`asdf`), right hand (`jkl;`), and both hands (`asdfjkl;`)
- **Hand-written phrases (12 to 16 characters):** designed to repeat finger patterns rather than random letters, which builds muscle memory better. A new phrase loads as soon as you finish the current one, and the same phrase never appears twice in a row
- **Space bar practice:** phrases include spaces, and the space bar is shown on the keyboard (thumb)

---

## 🧠 How the scoring works

| Metric | Definition |
|---|---|
| **Keys pressed** | Every valid typing key within the 5-minute window |
| **Accuracy** | `correct keys ÷ total keys × 100`, rounded. Shows `-` until the first key is pressed (never `NaN`) |
| **WPM** | Net words per minute: `correct keys ÷ 5 ÷ minutes elapsed` (1 word = 5 characters). Mistakes do not inflate speed |

A wrong key does **not** advance the cursor. It is flagged in red and counts against accuracy.

---

## 🛡️ Edge cases handled

- Timer starts on the first valid keypress, so you are not penalised for getting ready
- Modifier and special keys (Shift, Ctrl, Alt, Tab, arrows, function keys) are ignored and never count as mistakes
- Holding a key down counts only once (`event.repeat`)
- Browser shortcuts such as Ctrl+R still work
- Space bar does not scroll the page
- Accuracy and WPM guard against division by zero
- Input locks at 0:00 and the results modal takes focus
- Restart cleanly resets all state with no duplicate timers
- Switching lessons mid-session starts a fresh session
- Typing box is focused automatically on load, on restart, and after changing lesson

---

## 🧰 Tech stack

- **React** (functional components and hooks)
- **Vite** (dev server and build tool)
- **Plain CSS3** (CSS variables, flexbox, grid, transitions)
- No backend and no external UI libraries

### React concepts demonstrated

`useState` · `useEffect` (with cleanup) · `useRef` · props and callback props · lifting state up · conditional rendering · list rendering with `key` · derived values · lazy state initialisation · functional state updates · resetting a component with the `key` prop

---

## 🚀 Getting started

**Prerequisites:** Node.js 18 or newer

```bash
# 1. Clone the repository
git clone https://github.com/syed-noman04/touch-typing-trainer.git
cd touch-typing-trainer

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open the URL printed in the terminal (usually `http://localhost:5173`).

### Other scripts

| Command | What it does |
|---|---|
| `npm run build` | Creates an optimised production build in `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint (if configured) |

---

## 📁 Project structure

```
src/
├── components/
│   ├── Header/            Title and instructions
│   ├── LessonSelector/    Lesson buttons (left / right / both hands)
│   ├── TypingSession/     Owns the session state, keystroke handling and timer
│   ├── Stats/             Time left, keys pressed, correct keys, accuracy
│   ├── PromptDisplay/     The phrase, styled per character
│   ├── VirtualKeyboard/   On-screen keys with next-key highlight
│   └── ResultsModal/      End-of-session summary and restart
├── data/
│   ├── lessons.js         Lesson definitions
│   ├── phrases.js         Practice phrases per lesson
│   └── fingerMap.js       Key-to-finger mapping
├── utils/
│   ├── pickPhrase.js      Random phrase, never the same twice in a row
│   ├── calculateStats.js  Accuracy and WPM
│   └── formatTime.js      Seconds to m:ss
├── App.jsx
└── main.jsx
```

Each component lives in its own folder with an `index.jsx` and an `index.css`.

### Component tree

```
App                       owns: selected lesson
├── Header
├── LessonSelector
└── TypingSession         owns: phrase, cursor, key counts, status, time left
    ├── Stats
    ├── PromptDisplay
    ├── VirtualKeyboard
    └── ResultsModal      shown only when the session is finished
```

---

## 🏗️ Design decisions

- **One owner for state.** `TypingSession` holds all changing session data. Child components only display what they receive through props.
- **Derived, not stored.** Accuracy, WPM, and the next key are calculated during render from the source-of-truth state, so they can never get out of sync.
- **Status instead of booleans.** A single `status` value (`idle`, `running`, `finished`) drives the timer, the hint, and the results screen.
- **Timer in an effect with cleanup.** The interval is created when the status becomes `running` and cleared automatically when it changes, which prevents double-speed timers on restart.
- **Session reset via the `key` prop.** `<TypingSession key={lesson.id} />` makes React rebuild the component when the lesson changes, so no manual reset code is needed.
- **Stored phrases over random letters.** Hand-written phrases repeat finger patterns, which supports muscle memory better than random characters.
- **Focusable `div` instead of an `<input>`.** The app state is the source of truth, so the browser never needs to hold typed text.
- **Accessibility.** Visible focus states, `aria-pressed` on lesson buttons, `role="dialog"` with `aria-modal` on the results screen, and focus moved into the modal when it opens.

---

## 🔮 Possible improvements

- Caps Lock warning
- Notice for touch devices (a physical keyboard is required)
- Selectable session length (1, 3, or 5 minutes)
- Save best WPM and session history with `localStorage`
- Per-key mistake breakdown on the results screen
- Larger phrase pool and additional lessons (top row, bottom row)
- Unit tests for the stats helpers (Vitest)
- State management with Redux Toolkit

---

## 🌐 Deployment

Deployed on Vercel. Every push to `main` triggers a new deployment.

To deploy your own copy: import the repository on [vercel.com](https://vercel.com), keep the detected Vite defaults (build command `npm run build`, output directory `dist`), and click **Deploy**.

---

## 👤 Author

**Syed Noman Hussain**
GitHub: [@syed-noman04](https://github.com/syed-noman04)

Built as a learning project to practise React fundamentals.