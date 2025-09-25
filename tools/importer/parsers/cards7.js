/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required by block spec
  const headerRow = ['Cards (cards7)'];

  // Get all direct children (each is a card container)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each cardDiv should contain an image (no text in source)
  // For the text cell, use the image alt text as the card title (best available text content)
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    // Use the image alt text as the text cell content (as a heading)
    const textCell = document.createElement('div');
    if (img.alt && img.alt.trim()) {
      // Use the full alt text as both title and description if no other text is present
      const heading = document.createElement('h3');
      heading.textContent = img.alt.trim();
      textCell.appendChild(heading);
      // Optionally, you could repeat alt as description, but here just heading
    } else {
      // Fallback: show 'Image' if no alt
      const heading = document.createElement('h3');
      heading.textContent = 'Image';
      textCell.appendChild(heading);
    }
    return [img, textCell];
  }).filter(Boolean);

  // Compose table cells
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
