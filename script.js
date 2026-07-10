const CITY_CENTER = [46.76903, 23.59020]; // Unirii Square
const INITIAL_ZOOM = 14;

// Init map
const map = L.map('map').setView(CITY_CENTER, INITIAL_ZOOM);

// Layer OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  maxZoom: 19
}).addTo(map);

const watermelonIcon = L.divIcon({
  html: '🍉',
  className: 'watermelon-icon',
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

// Load locations
fetch('data/locations.json')
  .then(res => res.json())
  .then(locations => {
    locations.forEach(p => {
      const marker = L.marker([p.lat, p.lng], { icon: watermelonIcon }).addTo(map);
      marker.bindPopup(`<b>${p.name}</b><br>${p.info || ''}`);
    });
  })
  .catch(err => {
    console.error('Error loading locations:', err);
  });