
# mj.mokhtar — Personal Portfolio

Personal portfolio of Muhammad Jumi'at Mokhtar, Embedded Systems & IoT Engineer based in Jakarta, Indonesia.

Built with Vue 3 + Vite + Tailwind CSS v4. Inspired by [Swissfolio](https://github.com/michael-andreuzza/swissfolio) by Michael Andreuzza.

## Live

[mjmokhtar.cloud](https://mjmokhtar.netlify.app)

## Tech Stack

- **Vue 3** — Composition API
- **Vite** — Build tool
- **Tailwind CSS v4** — Styling via `@tailwindcss/vite`
- **AOS** — Scroll animations
- **Vue Router** — Client-side routing
- **Playfair Display + Geist** — Typography

## Project Structure

```
src/
├── components/
│   ├── HeroSection.vue
│   ├── IntroSection.vue
│   ├── ProjectsSection.vue
│   ├── TestimonialsSection.vue
│   ├── FeaturedSection.vue
│   └── ProjectGallery.vue
├── data/
│   ├── meta.js
│   ├── projects.js
│   ├── projectDetails.js
│   ├── testimonials.js
│   └── featured.js
├── router/
│   └── index.js
├── views/
│   ├── HomeView.vue
│   └── projects/
│       ├── AtwpView.vue
│       ├── EpaperView.vue
│       └── RunningTextView.vue
├── App.vue
├── main.js
└── style.css
```

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Adding a New Project

1. Add project data to `src/data/projects.js`
2. Add project details to `src/data/projectDetails.js`
3. Create a new view in `src/views/projects/`
4. Add route to `src/router/index.js`
5. Add photos to `public/projects/{project-name}/`

## Adding Photos to Existing Projects

Place photos in `public/projects/{project-name}/` and update the `gallery` array in `src/data/projectDetails.js`:

```js
gallery: [
  { src: "/projects/atwp/atwp-1.jpg", caption: "System overview" },
  { src: "/projects/atwp/atwp-2.jpg", caption: "Hardware deployment" },
  { src: "/projects/atwp/atwp-3.jpg", caption: "Architecture diagram" },
],
```


## Credits

- Design inspired by [Swissfolio](https://github.com/michael-andreuzza/swissfolio) — Michael Andreuzza
- Fonts: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) + [Geist](https://vercel.com/font) 
- Animations: [AOS](https://michalsnik.github.io/aos/)


