import { createRouter, createWebHistory } from 'vue-router'

export const projects = [
  {
    num: "01.",
    title: "Industrial IoT Middleware System",
    description: "Middleware converting raw machine protocols — Modbus, UDP, FTP — into web-consumable data. Deployed across Jabodebek LRT and ANTAM POMALA weightbridge. 99% uptime, 40% reduction in manual inspection.",
    stack: "Node.js · Modbus TCP/IP · UDP · PostgreSQL · MySQL · RESTful API · Python · Node-RED",   
    url: "/projects/atwp",
    external: false,
  },
  {
    num: "02.",
    title: "ePaper Conference Badge",
    description: "Custom GFX layer ported from Adafruit, 5-page badge layout, tactile button navigation. 10×10cm PCB targeting JLCPCB fabrication.",
    stack: "ESP32 · SSD1680 · ESP-IDF · KiCad PCB · C · C++",
    url: "/projects/epaper",
    external: false,
  },
  {
    num: "03.",
    title: "J2ME Retro Archive",
    description: "Curated archive platform for retro mobile games. Solo PM, developer & DevOps — dari ideation sampai deployment.",
    stack: "Hono · Bun · PostgreSQL · Vue 3 · Cloudflare",
    url: "https://j2me-retro.mjmokhtar.cloud",
    external: true,
  },
  {
    num: "04.",
    title: "Running Text LED",
    description: "Middleware converting raw machine protocols — Modbus, UDP, FTP — into web-consumable data. Deployed across Jabodebek LRT and ANTAM POMALA weightbridge. 99% uptime, 40% reduction in manual inspection.",
    stack: "Arduino · Espressif · C · C++ · Eagle PCB · Raspberry Pi",
    url: "/projects/running-text",
    external: false,
  },
]