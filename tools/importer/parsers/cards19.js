/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate card children
  const cardNodes = Array.from(element.querySelectorAll(':scope > div'));
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  cardNodes.forEach((card) => {
    // Each card: icon (SVG) and text (p)
    // Defensive: find icon div and paragraph
    let iconDiv = null;
    let textDiv = null;
    const children = Array.from(card.children);
    // Find the icon container (usually first child)
    iconDiv = children.find((child) => child.querySelector('.icon'));
    // Find the paragraph (usually second child)
    textDiv = children.find((child) => child.tagName === 'P');
    // Fallback if structure changes
    if (!iconDiv) {
      iconDiv = card.querySelector('.icon');
    } else {
      iconDiv = iconDiv.querySelector('.icon');
    }
    if (!textDiv) {
      textDiv = card.querySelector('p');
    }
    // Defensive: if iconDiv or textDiv missing, skip
    if (!iconDiv || !textDiv) return;
    rows.push([iconDiv, textDiv]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
