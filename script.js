const CITY_CENTER = [46.76903, 23.5902]; // Unirii Square
const INITIAL_ZOOM = 13;

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

      marker.bindPopup(
        `<b>${p.name}</b><br/>
        ${p.address || ""}<br>
        ${p.notes || ""}
        ${imgHtml}`,
      );
    });
  })
  .catch((err) => {
    console.error("Error loading locations:", err);
  });
