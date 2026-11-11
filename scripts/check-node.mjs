// Avant de lancer le bureau : la bonne version de Node, et Claude Code installé.
import { execFileSync } from 'node:child_process';
import { homedir } from 'node:os';
import { join } from 'node:path';
const [maj, min] = process.versions.node.split('.').map(Number);
if (maj < 22 || (maj === 22 && min < 18)) {
  console.error(`\n  Le Bureau des agents demande Node.js 22.18 ou plus récent (tu as ${process.versions.node}).`);
  console.error('  Installe la dernière version sur https://nodejs.org, puis relance « npm start ».\n');
  process.exit(1);
}
// Comme le serveur : on essaie aussi ~/.local/bin (pas toujours dans le PATH), et claude.exe sous Windows.
const exe = process.platform === 'win32' ? 'claude.exe' : 'claude';
const candidates = [process.env.CLAUDE_BIN, 'claude', join(homedir(), '.local', 'bin', exe), join(homedir(), '.claude', 'local', exe)].filter(Boolean);
const found = candidates.some((bin) => {
  try { execFileSync(bin, ['--version'], { stdio: 'ignore', timeout: 15000 }); return true; } catch { return false; }
});
if (!found) {
  console.warn('\n  ⚠  Claude Code n’est pas trouvé : le bureau s’ouvrira en démo.');
  console.warn('  Installe-le (https://claude.com/claude-code), connecte-toi avec « claude », puis relance « npm start ».\n');
}
