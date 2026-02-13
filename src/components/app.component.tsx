import { useContext } from "react";
import { selectedAppsContext } from "../contexts/selectedApps.context";
import { appContext } from "../contexts/app.context";

interface IAppProps {
  ID: string;
  icon?: string;
  name: string;
  summary: string;
}

export function AppComponent(data: IAppProps) {
  const apps = useContext(selectedAppsContext);
  const { type } = useContext(appContext);

  const handleClick = () => {
    if (type === "catalog") return apps.set({ id: data.ID, ...data });
    return apps.delete(data.ID);
  };

  const { ID, icon, name, summary } = data;

  return (
    <article
      key={ID}
      onClick={handleClick}
      className="flex h-[130px] cursor-pointer items-center gap-4 rounded-2xl bg-[var(--bg-card)] p-4 shadow-xs app-card"
    >
      <div className="h-16 w-16 shrink-0">
        <img src={icon} alt={`icon ${name}`} className="h-16 w-16" />
      </div>
      <div className="min-w-0">
        <h3 className="truncate text-xl font-semibold text-[var(--text-main)]">
          {name}
        </h3>
        <p className="line-clamp-2 text-sm text-[var(--text-muted)]">
          {summary}
        </p>
      </div>
    </article>
  );
}
