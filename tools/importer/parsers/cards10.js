/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards10)'];

  // Get all immediate card-link children (each card)
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));

  // Build table rows for each card
  const rows = cards.map(card => {
    // Find image (first cell)
    const imgContainer = card.querySelector('.utility-aspect-3x2');
    const img = imgContainer ? imgContainer.querySelector('img') : null;
    // Defensive: If no image, cell will be empty
    const imageCell = img || '';

    // Text content (second cell)
    const textContentContainer = card.querySelector('.utility-padding-all-1rem');
    let textCellContent = [];
    if (textContentContainer) {
      // Tag (optional)
      const tagGroup = textContentContainer.querySelector('.tag-group');
      if (tagGroup) {
        // Use the tag element directly
        const tag = tagGroup.querySelector('.tag');
        if (tag) {
          textCellContent.push(tag);
        }
      }
      // Heading (optional)
      const heading = textContentContainer.querySelector('h3, .h4-heading');
      if (heading) {
        textCellContent.push(heading);
      }
      // Description (optional)
      const desc = textContentContainer.querySelector('p');
      if (desc) {
        textCellContent.push(desc);
      }
      // Call-to-action (optional): If card has an href, add as link at bottom
      if (card.href && card.href !== '#') {
        // Only add CTA if not just linking to homepage
        // Use the heading as CTA text if present, else fallback
        let ctaText = heading ? heading.textContent.trim() : 'Learn more';
        const cta = document.createElement('a');
        cta.href = card.href;
        cta.textContent = ctaText;
        cta.className = 'card-cta';
        textCellContent.push(cta);
      }
    }
    // Defensive: If no content, cell will be empty
    const textCell = textCellContent.length ? textCellContent : '';

    return [imageCell, textCell];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
