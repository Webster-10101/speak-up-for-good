// Usage: node scripts/sync-app-drills.cjs /path/to/speak-up-app/lib/drills.ts
// Updates the shared website exercises; deliberately preserves website-only drills.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const input = process.argv[2];
if (!input) throw new Error('Supply the app lib/drills.ts path');
const source = fs.readFileSync(input, 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const context = { exports: {}, __DEV__: false };
vm.runInNewContext(compiled, context, { timeout: 1000 });
const shared = ['body-ready','enunciation','ride-the-spike','vocal-warmup','mini-set','rapid-fire','conviction-reps','the-edit','story-reps','dial-it-up'];
const data = Object.fromEntries(shared.map(slug => {
 const d = context.exports.DRILLS.find(d => d.slug === slug && d.status === 'active');
 if (!d) throw new Error('Missing active shared drill: '+slug);
 return [slug,{slug,name:d.name,blurb:d.blurb,kind:d.kind,cue:d.cue,prompts:d.prompts,steps:d.steps}];
}));
fs.writeFileSync(path.join(__dirname, '../lib/shared-drills.json'), JSON.stringify(data,null,2)+'\n');
console.log('Synced '+shared.length+' shared drills.');
