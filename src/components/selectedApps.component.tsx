import { useContext } from "react";
import { selectedAppsContext } from "../contexts/selectedApps.context";
import { AppsListComponent } from "./appsList.component";
import { appContext } from "../contexts/app.context";
import { useTranslation } from "react-i18next";

export function SelectedAppsComponent() {
  const { apps } = useContext(selectedAppsContext);
  const { t } = useTranslation();

  return (
    <section className="w-full">
      <h2 className="text-[var(--text-main)] text-2xl font-medium mb-4">
        {t("selected.title")}
      </h2>
      {apps.length > 0 ? (
        <p className="mb-4 text-sm text-[var(--text-muted)]">
          {t("selected.count", { count: apps.length })}
        </p>
      ) : null}
      <appContext.Provider value={{ type: "selected" }}>
        <AppsListComponent apps={apps} />
      </appContext.Provider>
    </section>
  );
}
