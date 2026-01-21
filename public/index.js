import scriptTemplate from "./templates/script.template.js";
import appListHandler from "./appListHandler.js";
import config from "./config.js";
import apps from "./apps.js";

const serachInputElement = document.querySelector(".js-search-input");
const selectedAppsElement = document.querySelector(".js-selected-apps");
const appListElement = document.querySelector(".js-apps-list");
const scriptOutputElement = document.querySelector(".js-script-output");
const copyScriptElement = document.querySelector(".js-copy-script");

function getAppById(id) {
  return apps.find((app) => app.id === id);
}

copyScriptElement?.addEventListener("click", () => {
  navigator.clipboard.writeText(scriptOutputElement.innerText);
});

selectedAppsElement?.addEventListener("click", (event) => {
  const card = event.target.closest(".js-app-card");
  if (!card) return;

  if (appListHandler.selectedApps.get(card.id) === undefined) return;

  appListHandler.selectedApps.delete(card.id);

  const apps = appListHandler.selectedApps.getAll();

  scriptOutputElement.classList.add("hidden");

  scriptOutputElement.innerHTML = scriptTemplate({
    apps,
  });

  if (apps.length > 0) {
    scriptOutputElement.classList.remove("hidden");
  }
});

appListElement?.addEventListener("click", (event) => {
  const card = event.target.closest(".js-app-card");
  if (!card) return;

  if (appListHandler.selectedApps.get(card.id) !== undefined) return;

  const app = getAppById(card.id);
  if (!app) return;

  appListHandler.selectedApps.set(app);

  const apps = appListHandler.selectedApps.getAll();

  scriptOutputElement.classList.add("hidden");

  scriptOutputElement.innerHTML = scriptTemplate({
    apps,
  });

  if (apps.length > 0) {
    scriptOutputElement.classList.remove("hidden");
  }
});

function setRandomApps() {
  for (let i = 0; i < config.limit; i++) {
    appListHandler.appsList.set(apps[Math.floor(Math.random() * apps.length)]);
  }
}

if (serachInputElement !== null) {
  let serachValue = serachInputElement.value;

  if (serachValue !== undefined && serachValue !== "") {
    serachInputElement.value = "";
  }

  serachInputElement.addEventListener("input", () => {
    serachValue = serachInputElement.value;

    const fuse = new Fuse(apps, {
      keys: ["name", "summary", "id"],
      threshold: 0.3,
    });

    const results = fuse
      .search(serachValue)
      .map((r) => r.item)
      .slice(0, config.limit);

    appListHandler.appsList.clear();

    results.forEach((app) => {
      appListHandler.appsList.set(app);
    });

    if (results.length === 0) {
      setRandomApps();
    }
  });
}

setRandomApps();

setInterval(() => {
  appListHandler.selectedApps.render();
  appListHandler.appsList.render()
}, 100);
