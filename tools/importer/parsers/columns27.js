/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Extract heading and testimonial (top row)
  const heading = mainGrid.querySelector('p.h2-heading');
  const testimonial = mainGrid.querySelector('p.paragraph-lg');

  // Extract nested grid (bottom row)
  const nestedGrid = mainGrid.querySelector('.w-layout-grid.grid-layout:not(:first-child)');
  if (!nestedGrid) return;

  // Divider (horizontal line)
  const divider = nestedGrid.querySelector('.divider');

  // Avatar cell (image + name/title)
  let avatarCell = null;
  const flexRow = nestedGrid.querySelector('.flex-horizontal');
  if (flexRow) {
    const avatarDiv = flexRow.querySelector('.avatar');
    const avatarImg = avatarDiv ? avatarDiv.querySelector('img') : null;
    // The name/title div is the next sibling after avatarDiv
    let nameTitleDiv = null;
    if (avatarDiv && avatarDiv.nextElementSibling) {
      nameTitleDiv = avatarDiv.nextElementSibling;
    }
    if (avatarImg && nameTitleDiv) {
      avatarCell = [avatarImg, ...nameTitleDiv.children];
    } else if (avatarImg) {
      avatarCell = [avatarImg];
    }
  }

  // Logo cell (rightmost cell)
  const logoCellDiv = nestedGrid.querySelector('.utility-display-inline-block');
  let logoCell = '';
  if (logoCellDiv) {
    // Find the image and any text node
    const logoImg = logoCellDiv.querySelector('img');
    // Try to extract the text '360LAB' (from screenshot analysis)
    let logoText = '';
    // Check for direct text node and for text in descendants
    logoCellDiv.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent && node.textContent.trim()) {
        logoText += node.textContent.trim();
      }
    });
    // If not found, check for text in descendants
    if (!logoText) {
      // Try to find text in descendants that is not part of an SVG or IMG
      const walker = document.createTreeWalker(logoCellDiv, NodeFilter.SHOW_TEXT, null);
      let node;
      while ((node = walker.nextNode())) {
        if (node.parentNode && node.parentNode.nodeName !== 'SVG' && node.parentNode.nodeName !== 'IMG') {
          const t = node.textContent.trim();
          if (t) logoText += t;
        }
      }
    }
    // Compose logo cell
    if (logoImg && logoText) {
      logoCell = [logoImg, document.createTextNode(logoText)];
    } else if (logoImg) {
      logoCell = [logoImg];
    } else if (logoText) {
      logoCell = [document.createTextNode(logoText)];
    }
  }

  // Compose table rows
  const headerRow = ['Columns block (columns27)'];
  // All content rows must have the same number of columns (3)
  const secondRow = [heading, testimonial, ''];
  // Divider row: divider should span all columns
  const dividerRow = [divider ? divider.cloneNode(true) : '', '', ''];
  const thirdRow = [avatarCell, '', logoCell];

  // Ensure all cells are present and fallback to empty string if missing
  const safeRow = (row) => row.map(cell => cell || '');

  const rows = [
    headerRow,
    safeRow(secondRow),
    safeRow(dividerRow),
    safeRow(thirdRow)
  ];

  // Create table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
