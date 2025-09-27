/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row (must be a single cell)
  const headerRow = ['Cards (cards35)'];
  const rows = [headerRow];

  // Get all direct child divs (each is a card container)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Find the image in the card
    const img = cardDiv.querySelector('img');
    // Use the alt text as the card's title in a heading tag
    const altText = img?.getAttribute('alt')?.trim() || '';
    // For this HTML, there is no additional text, so use alt text as heading only
    if (img) {
      const heading = document.createElement('h3');
      heading.textContent = altText;
      // Put both image and heading in the cell array
      rows.push([
        img,
        heading
      ]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
