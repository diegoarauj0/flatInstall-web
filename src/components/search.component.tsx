import { useContext } from "react";
import { searchContext } from "../contexts/search.context";
import { useTranslation } from "react-i18next";

export function SearchComponent() {
  const { searchTerm, setSearchTerm, results } = useContext(searchContext);
  const { t } = useTranslation();

  return (
    <div className="mb-4">
      <div className="relative">
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder={t("search.placeholder")}
          className="w-full rounded-2xl bg-[var(--bg-search)] p-3 pr-14 text-[1rem] font-medium text-[var(--text-main)] outline-none ring-1 ring-transparent transition focus:ring-[var(--text-muted)]"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-sm font-semibold text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-card)] hover:text-[var(--text-main)]"
          >
            {t("search.clear")}
          </button>
        )}
      </div>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        {t("search.result", { count: results.length })}
      </p>
    </div>
  );
}
