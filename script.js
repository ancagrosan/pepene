const CITY_CENTER = [46.77026, 23.59576];
const INITIAL_ZOOM = 13;
import { WATERMELON_FACTS } from "./data/facts.js";

// Init map
const map = L.map("map", {
  minZoom: 11,
  bounceAtZoomLimits: false,
}).setView(CITY_CENTER, INITIAL_ZOOM);

// Layer OpenStreetMap
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const watermelonIcon = L.divIcon({
  html: "🍉",
  className: "watermelon-icon",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

// Load locations
fetch("data/locations.json")
  .then((res) => res.json())
  .then((locations) => {
    locations.forEach((p) => {
      const marker = L.marker([p.lat, p.long], { icon: watermelonIcon }).addTo(map);

      const imgHtml = p.img
        ? `<img src="${p.img}" alt="${p.name}" onerror="this.style.display='none'">`
        : "";

      const notes = p.notes ? `ⓘ ${p.notes}<br/>` : "";

      marker.bindPopup(
        `<b>${p.name}</b><br/>
        ${p.address || ""}<br>
        ${notes}
        ${imgHtml}`,
      );
    });
  })
  .catch((err) => {
    console.error("Error loading locations:", err);
  });

// Facts
function getFactOfTheDay(facts) {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((today - startOfYear) / 86400000);
  const index = dayOfYear % facts.length;

  return facts[index];
}

const { title, body } = getFactOfTheDay(WATERMELON_FACTS);
document.getElementById("fun-fact-text").textContent = body;
