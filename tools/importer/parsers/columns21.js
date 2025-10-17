/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid layout container (the direct child of .container)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (each column)
  const columns = Array.from(grid.children);

  // Defensive: Only proceed if there are at least 4 columns (logo/social + 3 nav columns)
  if (columns.length < 4) return;

  // Column 1: Logo + Brand + Social Icons
  const logoCol = columns[0];
  // Find the logo/link block
  const logoLink = logoCol.querySelector('.logo');
  // Find the social icons group
  const socialIcons = logoCol.querySelector('.footer-icons-group');

  // Fix: Normalize visually hidden text in social icons (remove <br> and fix spaced letters)
  if (socialIcons) {
    socialIcons.querySelectorAll('.utility-screen-reader-visible-only').forEach(el => {
      // Remove <br> tags
      el.innerHTML = el.innerHTML.replace(/<br\s*\/?>(\s*)?/gi, '');
      // If text is spaced out, join letters
      let txt = el.textContent.replace(/\s+/g, ' ').trim();
      // If the text is a single word with spaces between every letter, join them
      if (/^(?:[A-Za-z]\s*){3,}$/.test(txt) && txt.replace(/\s/g,'').length > 2) {
        txt = txt.replace(/\s+/g, '');
      }
      el.textContent = txt;
    });
  }

  // Compose column 1 cell
  const col1Content = [];
  if (logoLink) col1Content.push(logoLink);
  if (socialIcons) col1Content.push(socialIcons);

  // Column 2: Trends nav
  const trendsCol = columns[1].tagName === 'UL' ? columns[1] : columns[1].querySelector('ul') || columns[1];
  // Column 3: Inspire nav
  const inspireCol = columns[2].tagName === 'UL' ? columns[2] : columns[2].querySelector('ul') || columns[2];
  // Column 4: Explore nav
  const exploreCol = columns[3].tagName === 'UL' ? columns[3] : columns[3].querySelector('ul') || columns[3];

  // Compose the table rows
  // Header row: block name only
  const headerRow = ['Columns block (columns21)'];

  // Second row: Four columns (logo/social, Trends, Inspire, Explore)
  const secondRow = [col1Content, trendsCol, inspireCol, exploreCol];

  // Create the table
  const cells = [headerRow, secondRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
