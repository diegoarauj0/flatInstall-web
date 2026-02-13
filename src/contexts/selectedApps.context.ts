import { createContext } from "react";
import type { IApp } from "../services/apps.service";

export const selectedAppsContext = createContext<{
  apps: IApp[];
  delete: (ID: string) => void;
  set: (app: IApp) => void;
  clear: () => void;
}>({ apps: [], delete: () => {}, set: () => {}, clear: () => {} });
