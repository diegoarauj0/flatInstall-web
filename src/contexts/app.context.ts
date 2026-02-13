import { createContext } from "react";

export const appContext = createContext<{ type: "catalog" | "selected" }>({
  type: "selected",
});
