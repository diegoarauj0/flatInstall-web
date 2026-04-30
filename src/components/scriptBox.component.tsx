import { toast } from "react-toastify";
import { selectedAppsContext } from "../contexts/selectedApps.context";
import { useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export function ScriptBoxComponent() {
  const { apps } = useContext(selectedAppsContext);
  const { t } = useTranslation();
  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );

  const SCRIPT_COPIED_NOTIFICATION_ID = "scriptCopiedNotification";

  const script = useMemo(() => {
    const lines: string[] = [
      "#!/usr/bin/env bash",
      "set -e",
      "",
      "if ! command -v flatpak >/dev/null 2>&1; then",
      `  echo "${t("script.flatpakMissing")}"`,
      `  echo "${t("script.setupInstructions")}"`,
      "  exit 1",
      "fi",
      "",
    ];

    if (apps.length === 0) {
      lines.push(`echo "${t("script.noApps")}"`);
      return lines.join("\n");
    }

    apps.forEach(({ id, name }) => {
      lines.push(`echo "${t("script.installing", { name })}"`);
      lines.push(`flatpak install -y flathub ${id}`);
    });

    lines.push("", `echo "${t("script.done")}"`);
    return lines.join("\n");
  }, [apps, t]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script);
      toast(t("script.copiedToast"), {
        type: "success",
        theme: "dark",
        toastId: SCRIPT_COPIED_NOTIFICATION_ID,
      });
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
          {t("script.title")}
        </h2>
        <button
          type="button"
          onClick={handleCopy}
          disabled={apps.length === 0}
          className={`rounded-lg bg-[var(--bg-card)] px-3 py-2 text-sm font-medium text-[var(--text-main)] transition-colors ${apps.length === 0 ? "opacity-20 cursor-not-allowed" : "hover:bg-[var(--bg-card-hover)] cursor-pointer"}`}
        >
          {copyStatus === "idle" && t("script.copy")}
          {copyStatus === "success" && t("script.copied")}
          {copyStatus === "error" && t("script.failed")}
        </button>
      </header>

      <pre className="w-full max-h-[320px] overflow-auto rounded-2xl bg-[var(--bg-script)] p-4 text-md text-[var(--text-main)]">
        <code>{script}</code>
      </pre>
    </section>
  );
}
