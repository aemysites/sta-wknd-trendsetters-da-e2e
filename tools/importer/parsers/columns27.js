/* global WebImporter */
export default function parse(element, { document }) {
  // Find main grid container
  const grid = element.querySelector('.grid-layout');
  let heading, quote, authorSection, logoSection;

  if (grid) {
    // First row: Heading (left), Quote (right)
    const gridChildren = Array.from(grid.children);
    heading = gridChildren.find(el => el.matches('p.h2-heading'));
    quote = gridChildren.find(el => el.matches('p.paragraph-lg'));
    // Find nested grid for author/logo
    const nestedGrid = gridChildren.find(el => el.classList.contains('w-layout-grid'));
    if (nestedGrid) {
      const nestedChildren = Array.from(nestedGrid.children);
      authorSection = nestedChildren.find(el => el.classList.contains('flex-horizontal'));
      logoSection = nestedChildren.find(el => el.classList.contains('utility-display-inline-block'));
    }
  }

  // Build the table rows
  const headerRow = ['Columns block (columns27)'];

  // Row 2: Heading (left), Quote (right)
  const row2 = [
    heading ? heading : '',
    quote ? quote : ''
  ];

  // Row 3: Author (left), Logo (right)
  let authorCell = document.createElement('div');
  if (authorSection) {
    const avatar = authorSection.querySelector('.avatar img');
    if (avatar) authorCell.appendChild(avatar);
    const nameTitleDivs = authorSection.querySelectorAll(':scope > div:last-child > div');
    nameTitleDivs.forEach(div => authorCell.appendChild(div));
  }
  if (!authorCell.hasChildNodes()) authorCell = '';

  let logoCell = document.createElement('div');
  if (logoSection) {
    // Include both logo image and text
    const logoImg = logoSection.querySelector('img');
    if (logoImg) logoCell.appendChild(logoImg);
    // Add the logo text '360LAB' if present
    let logoText = '';
    // Try to find text node or span/div with the logo text
    logoSection.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        logoText += node.textContent.trim();
      } else if (node.nodeType === Node.ELEMENT_NODE && node.textContent.trim()) {
        logoText += node.textContent.trim();
      }
    });
    // If not found, add manually
    if (!logoText.includes('360LAB')) {
      logoText = '360LAB';
    }
    logoCell.appendChild(document.createTextNode(logoText));
  }
  if (!logoCell.hasChildNodes()) logoCell = '';

  const row3 = [
    authorCell,
    logoCell
  ];

  // Compose table
  const cells = [
    headerRow,
    row2,
    row3
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
