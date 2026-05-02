# 🕹️ PATIENCE.exe

> **A retro-themed patience test website. Only the truly patient and honest make it to the end.**

![Stage 1](https://img.shields.io/badge/Stage_1-SYSTEM_BOOT-33FF33?style=for-the-badge&labelColor=0A0A0F)
![Stage 2](https://img.shields.io/badge/Stage_2-CONNECTION-00F5FF?style=for-the-badge&labelColor=0A0A0F)
![Stage 3](https://img.shields.io/badge/Stage_3-SECURITY-39FF14?style=for-the-badge&labelColor=0A0A0F)
![Stage 4](https://img.shields.io/badge/Stage_4-FINAL_LOAD-FFB800?style=for-the-badge&labelColor=0A0A0F)
![Stage 5](https://img.shields.io/badge/Stage_5-REWARD-FF006E?style=for-the-badge&labelColor=0A0A0F)

---

## 🤔 What Is This?

**PATIENCE.exe** is a deliberately over-the-top, retro-styled website that puts visitors through **5 dramatic fake loading stages** before revealing a reward screen. It's a fun social experiment to see who is patient enough to wait through the entire sequence — and who bails early.

Think: **CRT monitors × neon pixels × absurd progress bars × dial-up nostalgia.**

Only **~12%** of visitors make it to the end. *(ok, that's a fake stat, but it sounds cool)*

---

## 🎮 The 5 Stages

| # | Stage | What Happens | Duration |
|:-:|:------|:-------------|:--------:|
| 1 | **SYSTEM BOOT** | Green BIOS-style text appears line by line in a terminal window. A chunky pixel progress bar fills up. | ~8s |
| 2 | **ESTABLISHING CONNECTION** | An ASCII globe spins. The progress bar crawls to 87%... and *hangs there*. "Connection unstable... retrying..." | ~12s |
| 3 | **SECURITY CLEARANCE** | Glitchy text header. Scrolling hex/binary code. Taunting messages: *"Are you still here?"*, *"Most people leave by now."* | ~8s |
| 4 | **FINAL LOADING** | The screen goes **completely black** (fake crash). A cursor blinks. Then slowly types: *"Just kidding. Almost there."* A massive rainbow progress bar fills to 100%. | ~10s |
| 5 | **THE REWARD** | 🎉 Confetti explosion! Neon "YOU MADE IT. YOU'RE LEGIT." with a patience timer, a stats card, and a **Certificate of Patience** you can screenshot and share. | ♾️ |

---

## ✨ Features

- 🖥️ **CRT Scanline Overlay** — Authentic retro monitor effect with scrolling scanlines
- 💚 **Neon Glow Aesthetic** — Hot pink, electric blue, lime green, amber — the full neon palette
- 🔤 **Pixel Fonts** — Press Start 2P & VT323 from Google Fonts
- 📊 **Chunky Progress Bars** — Pixel-block fills with `steps()` CSS timing
- 🌀 **Glitch Text Effect** — RGB channel-split glitch on the Security Clearance header
- 🎊 **Confetti Explosion** — 150+ particles on the reward screen
- ⏱️ **Patience Timer** — Tracks exactly how long you waited
- 📤 **Share Button** — Native Web Share API with clipboard fallback
- 🥚 **Easter Egg** — Click during Stage 2 and see what happens 😏
- 📱 **Responsive** — Works on desktop and mobile
- ♿ **Accessible** — Respects `prefers-reduced-motion`

---

## 🛠️ Tech Stack

| | Technology |
|:-:|:---|
| ⚡ | **Vite** — Lightning-fast dev server & build tool |
| 🟨 | **Vanilla JavaScript** — Zero frameworks, zero dependencies |
| 🎨 | **Vanilla CSS** — Hand-crafted animations, no utility frameworks |
| 🔤 | **Google Fonts** — Press Start 2P, VT323 |

**Total bundle size:** Tiny. It's just HTML, CSS, and JS.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/patience.git
cd patience

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open **http://localhost:5173** and wait... patiently. 😉

### Build for Production

```bash
npm run build
```

The optimized static files will be in the `dist/` folder.

---

## 🌐 Deployment

This is a static site — deploy it anywhere for free.

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

1. Run `npm run build`
2. Drag & drop the `dist/` folder at [app.netlify.com/drop](https://app.netlify.com/drop)

### GitHub Pages

1. Run `npm run build`
2. Push the `dist/` folder contents to a `gh-pages` branch
3. Enable GitHub Pages in your repo settings

---

## 📁 Project Structure

```
patience/
├── index.html          # Main HTML — all 5 stage containers
├── src/
│   ├── main.js         # Stage controller, animations, confetti, timer
│   └── style.css       # Full retro design system (CRT, neon, glitch)
├── public/             # Static assets
├── package.json
└── README.md
```

---

## 🎨 Color Palette

| Color | Hex | Usage |
|:------|:----|:------|
| 🟢 CRT Green | `#33FF33` | Terminal text, BIOS boot |
| 🔵 Electric Blue | `#00F5FF` | Progress bars, headings |
| 🟢 Lime | `#39FF14` | Success states, accents |
| 🟡 Amber | `#FFB800` | Warnings, certificate |
| 🔴 Neon Pink | `#FF006E` | Highlights, glitch effects |
| 🟣 Deep Purple | `#2D0050` | Background accents |
| ⚫ Dark BG | `#0A0A0F` | Main background |

---

## 🤝 Contributing

Got ideas for new stages, easter eggs, or visual effects? Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-stage`)
3. Commit your changes (`git commit -m 'Add new stage: Matrix Rain'`)
4. Push to the branch (`git push origin feature/new-stage`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  <strong>Built with patience, for the patient.</strong><br/>
  <sub>If you made it to the end of this README, you're already more patient than most. 🏆</sub>
</p>
