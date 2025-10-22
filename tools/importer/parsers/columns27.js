/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // --- Top row: Heading and Quote ---
  // Get heading (h2 or p.h2-heading)
  const heading = mainGrid.querySelector('.h2-heading') || mainGrid.querySelector('h2');
  // Get quote (p.paragraph-lg)
  const quote = mainGrid.querySelector('.paragraph-lg');

  // --- Divider and Bottom Row ---
  // Nested grid contains divider, avatar, logo
  const nestedGrid = mainGrid.querySelector('.grid-layout.grid-gap-sm:not(:first-child)');
  let avatarBlock = null, logoBlock = null, dividerEl = null;
  if (nestedGrid) {
    // Divider is first child
    const divider = nestedGrid.querySelector('.divider');
    if (divider) {
      dividerEl = document.createElement('hr');
    }
    // --- Bottom row: Avatar, Logo ---
    // Avatar block: flex-horizontal
    const flexRow = nestedGrid.querySelector('.flex-horizontal');
    if (flexRow) {
      // Avatar image and name/title
      const avatar = flexRow.querySelector('.avatar');
      const nameTitle = flexRow.querySelectorAll(':scope > div:not(.avatar) > div');
      // Compose avatar block
      avatarBlock = document.createElement('div');
      if (avatar) avatarBlock.appendChild(avatar);
      nameTitle.forEach((nt) => avatarBlock.appendChild(nt));
    }
    // Logo block: utility-display-inline-block
    const logoContainer = nestedGrid.querySelector('.utility-display-inline-block');
    if (logoContainer) {
      logoBlock = document.createElement('div');
      // Copy logo image
      const logoImg = logoContainer.querySelector('img');
      if (logoImg) logoBlock.appendChild(logoImg.cloneNode(true));
      // Add logo text if present
      let logoText = '';
      // Get all text nodes (not just textContent)
      logoContainer.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          logoText += node.textContent.trim();
        }
      });
      // If no text, fallback to alt attribute
      if (!logoText && logoImg && logoImg.alt && logoImg.alt.trim()) {
        logoText = logoImg.alt.trim();
      }
      if (logoText) {
        logoBlock.appendChild(document.createTextNode(logoText));
      }
    }
  }

  // --- Table Construction ---
  const headerRow = ['Columns block (columns27)'];
  // Second row: Heading | Quote
  const secondRow = [heading, quote];
  // Third row: Avatar | Divider | Logo (always 3 columns, divider in center)
  const thirdRow = [avatarBlock, dividerEl || '', logoBlock];

  // Compose table rows
  const cells = [
    headerRow,
    secondRow,
    thirdRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
