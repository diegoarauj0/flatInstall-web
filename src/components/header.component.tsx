export function HeaderComponent() {
  return (
    <header className="w-screen p-4 border-b-[var(--text-main)] border-b-2">
      <h1 className="text-[var(--text-main)] text-2xl font-bold">
        FlatInstall
      </h1>
      <p className="text-[var(--text-muted)] font-medium">
        Generate an automated script for installing Flatpak applications.
      </p>
    </header>
  );
}
