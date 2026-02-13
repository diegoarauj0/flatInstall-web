import { useContext } from "react";
import { AppsListComponent } from "./appsList.component";
import { appContext } from "../contexts/app.context";
import { searchContext } from "../contexts/search.context";
import { useTranslation } from "react-i18next";

export function AppsCatalogComponent() {
  const { results, searchTerm } = useContext(searchContext);
  const { t } = useTranslation();

  return (
    <section className="w-full mb-4">
      <h2 className="text-[var(--text-main)] text-2xl font-medium mb-4">
        {t("catalog.title")}
      </h2>
      {searchTerm && (
        <p className="mb-4 text-sm text-[var(--text-muted)]">
          {t("catalog.resultsFor", { term: searchTerm })}
        </p>
      )}
      <appContext.Provider value={{ type: "catalog" }}>
        <AppsListComponent apps={results} />
      </appContext.Provider>
      {results.length === 0 && (
        <p className="mt-4 text-[var(--text-muted)]">{t("catalog.noApps")}</p>
      )}
    </section>
  );
}
