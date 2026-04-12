const fs = require('fs');
const iconv = require('iconv-lite');
const path = require('path');

const dir = path.join(__dirname, 'src', 'dictionaries');
const files = ['fr.json', 'de.json', 'ru.json'];

for (const f of files) {
  const p = path.join(dir, f);
  const str = fs.readFileSync(p, 'utf8');
  
  try {
    const originalBytes = Buffer.from(str, 'binary');
    const corrected = originalBytes.toString('utf8');
    
    // Test if parsing works
    JSON.parse(corrected);
    fs.writeFileSync(p, corrected, 'utf8');
    console.log(`Restored ${f}`);
  } catch(e) {
    console.log(`Failed to parse newly decoded ${f}: ${e.message}`);
  }
}
