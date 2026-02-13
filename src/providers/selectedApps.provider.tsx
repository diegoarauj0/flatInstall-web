import { selectedAppsContext } from "../contexts/selectedApps.context";
import { useState, type ReactNode } from "react";
import type { IApp } from "../services/apps.service";

export function SelectedAppsProvider({ children }: { children: ReactNode }) {
  const [apps, setApps] = useState<IApp[]>([]);

  return (
    <selectedAppsContext.Provider
      value={{
        apps: apps,
        clear: () => setApps([]),
        delete: (ID) => setApps(apps.filter((app) => app.id !== ID)),
        set: (_app) => {
          if (apps.filter((app) => app.id === _app.id)[0] === undefined) {
            setApps([...apps, _app]);
          }
        },
      }}
    >
      {children}
    </selectedAppsContext.Provider>
  );
}
