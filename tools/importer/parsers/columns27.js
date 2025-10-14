/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Get direct children: heading, quote, inner grid
  const children = mainGrid.querySelectorAll(':scope > *');
  const heading = children[0]; // h2-heading
  const quote = children[1]; // paragraph-lg
  const innerGrid = children[2]; // nested grid-layout
  if (!heading || !quote || !innerGrid) return;

  // Divider (horizontal rule)
  const divider = innerGrid.querySelector('.divider');

  // Lower row: left (avatar/name/title), right (logo image + text)
  const leftFooter = innerGrid.querySelector('.flex-horizontal');
  const rightFooter = innerGrid.querySelector('.utility-display-inline-block');

  // Extract logo image and logo text ('360LAB') for the right cell of third row
  let logoCell = document.createElement('div');
  if (rightFooter) {
    // Clone all children (should be img and possibly text)
    Array.from(rightFooter.childNodes).forEach((node) => {
      logoCell.appendChild(node.cloneNode(true));
    });
    // Add logo text if present and not already included
    const logoText = rightFooter.textContent.trim();
    if (logoText && !logoCell.textContent.includes(logoText)) {
      logoCell.appendChild(document.createTextNode(logoText));
    }
  }

  // Columns block header row
  const headerRow = ['Columns block (columns27)'];
  // Second row: heading (left), quote (right)
  const secondRow = [heading, quote];

  // Third row: left (avatar/name/title), right (logo image + text)
  const thirdRow = [leftFooter, logoCell];

  // Divider should be a visual element within the left cell of the third row
  // Place the divider at the top of the left cell
  if (divider && leftFooter) {
    divider.parentNode && divider.parentNode.removeChild(divider);
    const leftCell = document.createElement('div');
    leftCell.appendChild(divider);
    leftCell.appendChild(leftFooter);
    thirdRow[0] = leftCell;
  }

  const cells = [
    headerRow,
    secondRow,
    thirdRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
