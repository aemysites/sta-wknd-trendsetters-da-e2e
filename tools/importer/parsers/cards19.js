/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: check for element and document
  if (!element || !document) return;

  // Header row as required
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Get all direct card children
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Each cardDiv should have two children: icon container and text paragraph
    // Defensive: check for children
    const children = Array.from(cardDiv.children);
    if (children.length < 2) return;

    // Icon cell: find the first svg inside the first child
    let iconEl = null;
    const iconContainer = children[0];
    if (iconContainer) {
      iconEl = iconContainer.querySelector('svg');
    }
    // If no SVG, fallback to the iconContainer itself
    const iconCell = iconEl || iconContainer;

    // Text cell: the second child is the <p>
    const textCell = children[1];

    rows.push([iconCell, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
