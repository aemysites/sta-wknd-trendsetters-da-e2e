/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct card containers
  const cards = Array.from(element.children);

  // Table header row
  const headerRow = ['Cards (cards26)'];
  const rows = [headerRow];

  cards.forEach(card => {
    // Find the image (mandatory)
    const img = card.querySelector('img');

    // Find the text content (title, description)
    let title = null;
    let desc = null;
    const textContainer = card.querySelector('.utility-padding-all-2rem');
    if (textContainer) {
      title = textContainer.querySelector('h3');
      desc = textContainer.querySelector('p');
    }
    // If not found, try to find h3/p directly
    if (!title) title = card.querySelector('h3');
    if (!desc) desc = card.querySelector('p');

    // Compose text cell
    const textCell = [];
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);
    // If neither, leave cell empty

    // Compose row: always [image, text]
    rows.push([
      img || '',
      textCell.length > 0 ? textCell : ''
    ]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
