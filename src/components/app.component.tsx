import { useContext, useEffect, useRef, useState } from "react";
import { selectedAppsContext } from "../contexts/selectedApps.context";
import { appContext } from "../contexts/app.context";
import { toast } from "react-toastify";

interface IAppProps {
  id: string;
  icon?: string;
  name: string;
  summary: string;
}

export function AppComponent({ id, icon, name, summary }: IAppProps) {
  const [error, setError] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const errorTimeout = useRef<number | null>(null);
  const shakeFrame = useRef<number | null>(null);
  const apps = useContext(selectedAppsContext);
  const { type } = useContext(appContext);

  useEffect(() => {
    return () => {
      if (errorTimeout.current) window.clearTimeout(errorTimeout.current);
      if (shakeFrame.current) window.cancelAnimationFrame(shakeFrame.current);
    };
  }, []);

  const triggerDuplicateFeedback = () => {
    setError(true);
    setIsShaking(false);
    if (shakeFrame.current) window.cancelAnimationFrame(shakeFrame.current);
    shakeFrame.current = window.requestAnimationFrame(() => {
      setIsShaking(true);
      shakeFrame.current = null;
    });

    if (errorTimeout.current) window.clearTimeout(errorTimeout.current);

    errorTimeout.current = window.setTimeout(() => {
      setError(false);
      setIsShaking(false);
      errorTimeout.current = null;
    }, 500);
  };

  const handleClick = () => {
    if (type === "catalog") {
      const isSelected = apps.apps.some((app) => app.id === id);

      if (isSelected) {
        toast("This app is already selected.", { type: "error", theme: "dark" });
        triggerDuplicateFeedback();
        return;
      }

      apps.set({ id, icon, name, summary });
      return;
    }

    apps.delete(id);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onAnimationEnd={() => setIsShaking(false)}
      className={`flex h-[130px] w-full cursor-pointer items-center gap-4 rounded-2xl bg-[var(--bg-card)] p-4 text-left shadow-xs ${error ? "bg-red-500" : "app-card "} ${isShaking ? "app-card-shake" : ""} `}
      aria-label={`${type === "catalog" ? "Adicionar" : "Remover"} ${name}`}
    >
      <div className="h-16 w-16 shrink-0">
        {icon ? (
          <img src={icon} alt={`icon ${name}`} className="h-16 w-16" />
        ) : (
          <div
            className="h-16 w-16 rounded-md bg-[var(--bg-search)]"
            aria-hidden="true"
          />
        )}
      </div>
      <div className="min-w-0">
        <h3 className="truncate text-xl font-semibold text-[var(--text-main)]">
          {name}
        </h3>
        <p className="line-clamp-2 text-sm text-[var(--text-muted)]">
          {summary}
        </p>
      </div>
    </button>
  );
}
