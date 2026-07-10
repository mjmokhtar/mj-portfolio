import { createRouter, createWebHistory } from 'vue-router'

export const projects = [
  {
    num: "01.",
    title: "IoT System Integration",
    description: "End-to-end IoT integration — connecting field sensors and industrial protocols (Modbus, MQTT, UDP) to cloud-based dashboards. Backend, database, and frontend built to fit each deployment's scale and data needs.",
    stack: "Node.js · Python · Vue.js · MySQL · PostgreSQL · TimescaleDB · Modbus TCP/IP · MQTT · REST API · WebSocket · CoAP",
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
    description: "Designed and developed an ESP32-based RGB LED controller with network communication for Front Destination Information running text displays used in Jabodebek and Commuter Line trains. Enhanced display stability and reliability across 50+ deployed train units.",
    stack: "Arduino · Espressif · C · C++ · Eagle PCB · Raspberry Pi",
    url: "/projects/running-text",
    external: false,
  },
]