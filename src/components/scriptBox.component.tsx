import { selectedAppsContext } from "../contexts/selectedApps.context";
import { useContext, useMemo, useState } from "react";

export function ScriptBoxComponent() {
  const { apps } = useContext(selectedAppsContext);
  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );

  const script = useMemo(() => {
    const lines: string[] = [
      "#!/usr/bin/env bash",
      "set -e",
      "",
      "if ! command -v flatpak >/dev/null 2>&1; then",
      '  echo "❌ Flatpak is not installed."',
      '  echo "👉 See setup instructions: https://flatpak.org/setup/"',
      "  exit 1",
      "fi",
      "",
    ];

    if (apps.length === 0) {
      lines.push('echo "❌ No apps selected."');
      return lines.join("\n");
    }

    apps.forEach(({ id, name }) => {
      lines.push(`echo "📦 Installing ${name}..."`);
      lines.push(`flatpak install -y flathub ${id}`);
    });

    lines.push("", 'echo "✅ All selected apps were installed successfully."');
    return lines.join("\n");
  }, [apps]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script);
      setCopyStatus("success");
    } catch {
      setCopyStatus("error");
    }

    window.setTimeout(() => setCopyStatus("idle"), 1800);
  };

  return (
    <section className="mt-6">
      <header className="flex justify-between items-center my-4 p-4 border-b-1 border-b-[var(--text-muted)]">
        <h2 className="text-2xl text-[var(--text-main)] font-semibold">
          Installation script 📃
        </h2>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-lg bg-[var(--bg-card)] px-3 py-2 text-sm font-medium text-[var(--text-main)] transition-colors hover:bg-[var(--bg-card-hover)] cursor-pointer"
        >
          {copyStatus === "idle" && "Copy"}
          {copyStatus === "success" && "Copied"}
          {copyStatus === "error" && "Failed"}
        </button>
      </header>

      <pre className="w-full max-h-[320px] overflow-auto rounded-2xl bg-[var(--bg-script)] p-4 text-md text-[var(--text-main)]">
        <code>{script}</code>
      </pre>
    </section>
  );
}
