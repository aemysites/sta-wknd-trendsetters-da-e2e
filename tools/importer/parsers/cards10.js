/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Defensive: get all direct child <a> elements (each card)
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach((card) => {
    // Find image (mandatory, always present)
    const imgContainer = card.querySelector(':scope > div.utility-aspect-3x2');
    let img = imgContainer ? imgContainer.querySelector('img') : null;

    // Find text container
    const textContainer = card.querySelector(':scope > div.utility-padding-all-1rem');
    let tag = null;
    let heading = null;
    let paragraph = null;

    if (textContainer) {
      // Tag (optional, but always present in this HTML)
      const tagGroup = textContainer.querySelector('.tag-group');
      if (tagGroup) {
        tag = tagGroup.querySelector('.tag');
      }
      // Heading
      heading = textContainer.querySelector('h3');
      // Description
      paragraph = textContainer.querySelector('p');
    }

    // Compose text cell
    const textCellContent = [];
    if (tag) textCellContent.push(tag);
    if (heading) textCellContent.push(heading);
    if (paragraph) textCellContent.push(paragraph);
    // Optionally, add CTA if present (not in this HTML, but future-proof)
    // Example: const cta = textContainer.querySelector('a'); if (cta) textCellContent.push(cta);

    // Each row: [image, text content]
    rows.push([
      img ? img : '',
      textCellContent
    ]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
