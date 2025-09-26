/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Cards (cards10)'];

  // Get all direct child anchor elements (each is a card)
  const cardLinks = element.querySelectorAll(':scope > a');

  // Build card rows
  const rows = Array.from(cardLinks).map((card) => {
    // Image cell: find the first image inside the card
    const imgContainer = card.querySelector('.utility-aspect-3x2');
    let imgEl = imgContainer ? imgContainer.querySelector('img') : null;
    // Defensive: if no image found, use the whole container (could be icon)
    const imageCell = imgEl || imgContainer || '';

    // Text cell: build content
    const textParts = [];
    // Tag (optional, above heading)
    const tag = card.querySelector('.tag-group .tag');
    if (tag) {
      // Wrap tag in a div for clarity
      const tagDiv = document.createElement('div');
      tagDiv.append(tag);
      textParts.push(tagDiv);
    }
    // Title (h3)
    const heading = card.querySelector('h3');
    if (heading) textParts.push(heading);
    // Description (p)
    const desc = card.querySelector('p');
    if (desc) textParts.push(desc);
    // Call-to-action (optional, not present in source, but if present)
    // Example: a link inside the card text area
    const cta = card.querySelector('.utility-padding-all-1rem a');
    if (cta) textParts.push(cta);

    return [imageCell, textParts];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
