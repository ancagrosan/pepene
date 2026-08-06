import { STORIES } from "./data/stories.js";

const list = document.getElementById("stories-list");

STORIES.forEach((story) => {
  const card = document.createElement("div");
  card.className = "story-card";
  card.innerHTML = `
    ${story.img ? `<img src="${story.img}" class="story-img" alt="${story.title}" />` : ""}
    ${story.title ? `<h3>${story.title}</h3>` : ""}
    <p class="story-author">de ${story.author}</p>
    <p class="story-text">${story.text}</p>
  `;
  list.appendChild(card);
});
