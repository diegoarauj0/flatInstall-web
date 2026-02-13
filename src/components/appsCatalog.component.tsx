import { useContext } from "react";
import { AppsListComponent } from "./appsList.component";
import { appContext } from "../contexts/app.context";
import { searchContext } from "../contexts/search.context";

export function AppsCatalogComponent() {
  const { results, searchTerm } = useContext(searchContext);

  return (
    <section className="w-full mb-4">
      <h2 className="text-[var(--text-main)] text-2xl font-medium mb-4">
        Apps Catalog 🌐
      </h2>
      {searchTerm && (
        <p className="mb-4 text-sm text-[var(--text-muted)]">
          Results for "{searchTerm}"
        </p>
      )}
      <appContext.Provider value={{ type: "catalog" }}>
        <AppsListComponent apps={results} />
      </appContext.Provider>
      {results.length === 0 && (
        <p className="mt-4 text-[var(--text-muted)]">
          No apps found for this search.
        </p>
      )}
    </section>
  );
}
