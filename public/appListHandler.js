import { flathubService } from "./services/flathub.service.js";
import appTemplate from "./templates/app.template.js";

class AppListHandler {
  constructor(element) {
    this.element = element;
    this.apps = new Map();
  }

  render() {
    if (!this.element.classList.contains("update")) return;

    this.element.classList.remove("update");
    this.element.innerHTML = "";
    for (let app of this.getAll()) {
      this.element.innerHTML += appTemplate({ ...app });
    }
  }

  set(app) {
    this.apps.set(app.id, app);

    flathubService.get(app.id).then((response) => {
      this.apps.delete(app.id);
      this.apps.set(app.id, { ...app, ...response });
      this.element.classList.add("update");
    });

    this.element.classList.add("update");
  }

  delete(id) {
    this.apps.delete(id);
    this.element.classList.add("update");
  }

  get(id) {
    return this.apps.get(id);
  }

  getAll() {
    const apps = [];

    this.apps.forEach((app) => {
      apps.push(app);
    });

    return apps;
  }

  clear() {
    this.apps.clear();
    this.element.classList.add("update");
  }
}

export default {
  appsList: new AppListHandler(document.querySelector(".js-apps-list")),
  selectedApps: new AppListHandler(document.querySelector(".js-selected-apps")),
};
