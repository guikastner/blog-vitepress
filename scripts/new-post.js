import fs from 'fs';
import path from 'path';

function slugify(str) {
  return String(str)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const titleArgIndex = process.argv.findIndex((a) => a === '--title' || a === '-t');
const title = titleArgIndex !== -1 ? process.argv[titleArgIndex + 1] : null;

if (!title) {
  console.error('Uso: npm run new:post -- --title "Meu Título"');
  process.exit(1);
}

const now = new Date();
const year = String(now.getFullYear());
const month = String(now.getMonth() + 1).padStart(2, '0');
const date = now.toISOString().slice(0, 10);
const slug = slugify(title);

const dir = path.resolve('docs/posts', year, month);
const file = path.join(dir, `${slug}.md`);

fs.mkdirSync(dir, { recursive: true });

if (fs.existsSync(file)) {
  console.error(`Arquivo já existe: ${file}`);
  process.exit(1);
}

const frontmatter = `---\n` +
  `title: "${title}"\n` +
  `date: ${date}\n` +
  `description: ""\n` +
  `tags: []\n` +
  `---\n\n` +
  `# ${title}\n\n`;

fs.writeFileSync(file, frontmatter, 'utf8');

console.log(`✅ Post criado: ${file}`);
console.log('Dica: rode "npm run prebuild" para atualizar a lista de posts.');

