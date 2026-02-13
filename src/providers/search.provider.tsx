import Fuse from "fuse.js";
import { useMemo, useState, type ReactNode } from "react";
import { searchContext } from "../contexts/search.context";
import { AppsService, type IApp } from "../services/apps.service";

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");

  const limit = Number(import.meta.env.VITE_APPS_LIMIT) || 10;
  const allApps = useMemo(() => AppsService.findAll(), []);
  const baseCatalog = useMemo(() => AppsService.getRandomItems(limit), [limit]);

  const results: IApp[] = useMemo(() => {
    const term = searchTerm.trim();
    if (!term) return baseCatalog;

    const fuse = new Fuse(allApps, {
      keys: ["name", "summary", "ID"],
      threshold: 0.3,
      ignoreLocation: true,
    });

    return fuse
      .search(term)
      .map(({ item }) => item)
      .slice(0, limit);
  }, [allApps, baseCatalog, limit, searchTerm]);

  return (
    <searchContext.Provider value={{ searchTerm, setSearchTerm, results }}>
      {children}
    </searchContext.Provider>
  );
}
