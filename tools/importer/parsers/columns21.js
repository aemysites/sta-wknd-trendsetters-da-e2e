/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 4) return;

  // First column: logo + social icons
  const logoCol = columns[0];
  // Next three columns: navigation lists
  const navCols = columns.slice(1, 4);

  // --- Fix: Ensure all visually hidden social icon labels are included in the output and <br> is removed, and text is not spaced out ---
  // For the logo/social column, extract the logo and the social icons (with their accessible labels)
  const logoBlock = logoCol.querySelector('.logo');
  const logoClone = logoBlock ? logoBlock.cloneNode(true) : null;
  const socialList = logoCol.querySelector('.footer-icons-group');
  let socialIcons = [];
  if (socialList) {
    socialIcons = Array.from(socialList.querySelectorAll('li')).map(li => {
      // Clone the anchor
      const a = li.querySelector('a');
      if (!a) return null;
      const aClone = a.cloneNode(true);
      // Find the visually hidden label
      const label = aClone.querySelector('.utility-screen-reader-visible-only');
      if (label) {
        // Remove all <br> tags and flatten to plain text (no extra spaces)
        let txt = '';
        label.childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            txt += node.textContent;
          } else if (node.nodeName === 'BR') {
            txt += ' ';
          }
        });
        label.textContent = txt.trim();
        label.classList.remove('utility-screen-reader-visible-only');
      }
      return aClone;
    }).filter(Boolean);
  }
  // Compose the logo/social cell
  const logoSocialCell = document.createElement('div');
  if (logoClone) logoSocialCell.appendChild(logoClone);
  if (socialIcons.length) {
    const iconsRow = document.createElement('div');
    socialIcons.forEach(icon => iconsRow.appendChild(icon));
    logoSocialCell.appendChild(iconsRow);
  }

  // Compose the content row with FOUR columns
  const contentRow = [logoSocialCell, ...navCols];

  // Build the header row
  const headerRow = ['Columns (columns21)'];

  // Create the table for the Columns block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
