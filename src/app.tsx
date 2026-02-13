import { AppsCatalogComponent } from "./components/appsCatalog.component";
import { HeaderComponent } from "./components/header.component";
import { ScriptBoxComponent } from "./components/scriptBox.component";
import { SearchComponent } from "./components/search.component";
import { SelectedAppsComponent } from "./components/selectedApps.component";
import { ToastContainer } from "react-toastify";

export function App() {
  return (
    <main className="bg-[var(--bg-main)] w-screen h-screen overflow-y-auto">
      <ToastContainer />
      <HeaderComponent />

      <div className="p-6">
        <SearchComponent />
        <AppsCatalogComponent />
        <SelectedAppsComponent />
        <ScriptBoxComponent />
      </div>
    </main>
  );
}

export default App;
