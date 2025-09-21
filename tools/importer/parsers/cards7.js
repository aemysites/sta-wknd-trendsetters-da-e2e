/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards7) block: 2 columns, multiple rows
  // First row: block name (one column only)
  // Each subsequent row: [Image/Icon, Text Content]

  // Header row: exactly one column, per Table Header Guidelines
  const headerRow = ['Cards (cards7)'];
  const cells = [headerRow];

  // For each card, build [image, text] row
  const cards = Array.from(element.querySelectorAll(':scope > div'));
  cards.forEach((cardDiv) => {
    // Find image (mandatory)
    const img = cardDiv.querySelector('img');
    if (!img) return;

    // Use alt text as description (source HTML only has alt)
    let textContent = '';
    if (img.alt && img.alt.trim()) {
      textContent = img.alt.trim();
    }
    const p = document.createElement('p');
    p.textContent = textContent;

    // Add row: [image, text]
    cells.push([img, p]);
  });

  // Create table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Fix: set colspan=2 on header row for correct table structure
  const headerTr = table.querySelector('tr');
  if (headerTr && headerTr.children.length === 1) {
    headerTr.children[0].setAttribute('colspan', '2');
  }

  // Replace original element
  element.replaceWith(table);
}
