export default Handlebars.compile(`
#!/usr/bin/env bash
set -e

if ! command -v flatpak >/dev/null 2>&1; then
  echo "❌ Flatpak is not installed."
  echo "👉 See how to install it at: https://flatpak.org/setup/"
  exit 1
fi

{{#each apps}}
echo "📦 Installing {{name}}..."
flatpak install -y flathub {{id}}
{{/each}}

echo "✅ All applications were installed successfully!"
`);
