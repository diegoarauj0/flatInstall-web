import { createContext } from "react";
import type { IApp } from "../services/apps.service";

export const searchContext = createContext<{
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  results: IApp[];
}>({
  searchTerm: "",
  setSearchTerm: () => {},
  results: [],
});
