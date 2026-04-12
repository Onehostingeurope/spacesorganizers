const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'dictionaries');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

for (const file of files) {
  const p = path.join(dir, file);
  const content = fs.readFileSync(p, 'utf8');
  
  if (content.includes('Ã©') || content.includes('â€”') || content.includes('ÐŸ')) {
    console.log(`Fixing ${file}`);
    const fixedContent = Buffer.from(content, 'latin1').toString('utf8');
    fs.writeFileSync(p, fixedContent, 'utf8');
  } else {
    console.log(`Skipping ${file} - no obvious corruption`);
  }
}
