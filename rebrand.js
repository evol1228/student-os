const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace texts
  content = content.replace(/Student OS/g, "kalm");
  content = content.replace(/StudentOS/g, "kalm");

  // Replace Hex Codes
  content = content.replace(/#066606/gi, "#1A1A1A");
  content = content.replace(/#0a990a/gi, "#1A1A1A");
  content = content.replace(/#044404/gi, "#1A1A1A");
  content = content.replace(/#055505/gi, "#1A1A1A");

  // Replace Tailwind specific green utilities (dark ones to #1A1A1A)
  content = content.replace(/\bbg-green-[56789]00\b/g, "bg-[#1A1A1A]");
  content = content.replace(/\btext-green-[56789]00\b/g, "text-[#1A1A1A]");
  content = content.replace(/\bborder-green-[56789]00\b/g, "border-[#1A1A1A]");
  content = content.replace(/\bring-green-[56789]00\b/g, "ring-[#1A1A1A]");
  
  // Replace Tailwind specific green utilities for hover (dark ones to #1A1A1A/80 or just #1A1A1A)
  content = content.replace(/hover:bg-green-[56789]00\b/g, "hover:bg-neutral-800");
  content = content.replace(/hover:text-green-[56789]00\b/g, "hover:text-[#1A1A1A]");
  content = content.replace(/hover:border-green-[56789]00\b/g, "hover:border-[#1A1A1A]");

  // Replace light green utilities with neutral
  content = content.replace(/\bbg-green-50\b/g, "bg-neutral-50");
  content = content.replace(/\btext-green-50\b/g, "text-neutral-50");
  content = content.replace(/\bborder-green-50\b/g, "border-neutral-50");
  
  content = content.replace(/\bbg-green-100\b/g, "bg-neutral-100");
  content = content.replace(/\btext-green-100\b/g, "text-neutral-100");
  content = content.replace(/\bborder-green-100\b/g, "border-neutral-100");

  content = content.replace(/\bbg-green-200\b/g, "bg-neutral-200");
  content = content.replace(/\btext-green-200\b/g, "text-neutral-200");
  content = content.replace(/\bborder-green-200\b/g, "border-neutral-200");

  content = content.replace(/\bbg-green-300\b/g, "bg-neutral-300");
  content = content.replace(/\btext-green-300\b/g, "text-neutral-300");
  content = content.replace(/\bborder-green-300\b/g, "border-neutral-300");
  content = content.replace(/\bhover:border-green-300\b/g, "hover:border-neutral-300");

  content = content.replace(/\bbg-green-400\b/g, "bg-neutral-400");
  content = content.replace(/\btext-green-400\b/g, "text-[#1A1A1A]");
  content = content.replace(/\bborder-green-400\b/g, "border-[#1A1A1A]");

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (/\.(tsx|ts|jsx|js|html)$/.test(filePath)) {
      replaceInFile(filePath);
    }
  }
}

processDirectory(directoryPath);
console.log('Rebranding complete!');
