import { Converter } from 'showdown';
import { readFileSync, writeFile } from 'fs';
const converter = new Converter({
  tables: true,
  ghCompatibleHeaderId: true,
  parseImgDimensions: true,
  strikethrough: true,
  literalMidWordUnderscores: true,
  tasklists: true,
  disableForced4SpacesIndentedSublists: true,
  requireSpaceBeforeHeadingText: true,
});
let html;

// Read args
if (process.argv.length !== 3) {
  console.log('Usage: node index.js <markdown-file>');
  process.exit(1);
}

const markdownFile = process.argv[2];
let htmlFile = markdownFile.replace(/\.md$/i, '.html');
console.debug('input: ' + markdownFile);

// If filename turns out the same:
if (markdownFile === htmlFile) {
  htmlFile = markdownFile + '.html';
  console.warn('Warning: input and output file are the same. Saving to ' + htmlFile);
}
console.debug('output: ' + htmlFile);

try {
  const data = readFileSync(markdownFile, 'utf8');
  html = converter.makeHtml(data);
} catch (err) {
  console.error(err);
  process.exit(1);
}

writeFile(htmlFile, html, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Conversion complete. HTML saved to ' + htmlFile);
});

