# 🌀 HurricaneReady.ai

**AI-powered hurricane prep for Miami homeowners.**

**🌐 Live Demo:** [dborrego.github.io/hurricane-ready](https://dborrego.github.io/hurricane-ready/)

![HurricaneReady.ai](https://img.shields.io/badge/Status-MVP-blue) ![Miami](https://img.shields.io/badge/Location-Miami--Dade-teal)

## 🎯 What It Does

HurricaneReady.ai monitors tropical storms and **automatically books hurricane prep services** before everyone panics. No more last-minute scrambling.

### Key Features

- **24/7 AI Storm Monitoring** — We track every tropical system targeting Miami
- **Auto-Book Services** — Shutters, generators, supplies booked with vetted contractors
- **Risk Zone Checker** — Enter your address, see your evacuation zone
- **Post-Storm Support** — Insurance claim filing assistance

### Services We Coordinate

| Service | When Booked |
|---------|-------------|
| Hurricane Shutters | 5-7 days before landfall |
| Generator Service | 4-6 days before landfall |
| Emergency Supplies | 5-7 days before landfall |
| Flood Protection | 3-5 days before landfall |
| Tree Trimming | 7-10 days before landfall |
| Insurance Claims | Within 48 hours post-storm |

## 💰 Pricing

| Plan | Cost | Includes |
|------|------|----------|
| Annual Membership | $199/year | AI monitoring, alerts, priority access |
| Storm Activation | $499/storm | Full service coordination + claim filing |

*Service costs billed separately at pre-negotiated rates. No surge pricing.*

## 🛠 Tech Stack

Simple and fast:
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Hosting:** Vercel (static)
- **Fonts:** Inter (Google Fonts)

No frameworks, no build steps. Just open `index.html`.

## 🚀 Quick Start

### Local Development

```bash
# Clone the repo
git clone https://github.com/dborrego/hurricane-ready.git
cd hurricane-ready

# Open in browser (no server needed)
open index.html

# Or use a local server
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 📁 Project Structure

```
hurricane-ready/
├── index.html      # Main landing page
├── styles.css      # All styles (CSS variables, responsive)
├── app.js          # Interactive features (risk checker, forms)
├── vercel.json     # Vercel deployment config
└── README.md       # You're reading it
```

## 🌴 Miami-Specific Features

### Evacuation Zone Logic

The risk checker uses Miami-Dade County evacuation zone data:

- **Zone A** — Barrier islands, coastal (mandatory evac Cat 1+)
- **Zone B** — Near-coastal areas (evac Cat 2+)
- **Zone C** — Inner flood-prone areas (evac Cat 3+)
- **Zone D/E** — Inland areas (lower priority)

Keywords are matched against common Miami neighborhoods and streets.

### Official Resources

- [Miami-Dade Evacuation Zones](https://www.miamidade.gov/global/emergency/hurricane-evacuation-zones.page)
- [NOAA Hurricane Center](https://www.nhc.noaa.gov/)

## 🔜 Roadmap (Post-MVP)

- [ ] Backend API for waitlist storage
- [ ] Real-time storm tracking integration (NOAA API)
- [ ] Contractor network onboarding
- [ ] SMS/push notifications
- [ ] Customer dashboard
- [ ] Mobile app

## 📬 Contact

**Email:** hello@hurricaneready.ai  
**Location:** Miami, FL

---

Built with 💙 in Miami. Stay safe out there.
