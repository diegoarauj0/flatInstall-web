import type { IApp } from "../services/apps.service";
import { AppComponent } from "./app.component";

interface IAppsListProps {
  apps: Array<IApp>;
}

export function AppsListComponent({ apps }: IAppsListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {apps.map(({ name, summary, icon, id }) => (
        <AppComponent
          key={id}
          id={id}
          summary={summary || ""}
          name={name}
          icon={icon || ""}
        />
      ))}
    </div>
  );
}
