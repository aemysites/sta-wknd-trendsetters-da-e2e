/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a card-link element
  function extractCardContent(cardLink) {
    // Get image (first .utility-aspect-3x2 img inside cardLink)
    const imageContainer = cardLink.querySelector('.utility-aspect-3x2');
    let image = imageContainer ? imageContainer.querySelector('img') : null;

    // Get tag (optional)
    let tag = null;
    const tagDiv = cardLink.querySelector('.tag-group .tag');
    if (tagDiv) {
      tag = tagDiv.cloneNode(true);
    }

    // Get heading (h3)
    let heading = cardLink.querySelector('h3');
    let headingClone = heading ? heading.cloneNode(true) : null;

    // Get description (p)
    let desc = cardLink.querySelector('p');
    let descClone = desc ? desc.cloneNode(true) : null;

    // Compose text cell content
    const textContent = [];
    if (tag) {
      textContent.push(tag);
    }
    if (headingClone) {
      textContent.push(headingClone);
    }
    if (descClone) {
      textContent.push(descClone);
    }
    // Optionally, add CTA if the card link has a distinct CTA (not present in this HTML)
    // If you want to make the whole card clickable, you could wrap the text in a link, but block spec says CTA is optional

    return [image, textContent];
  }

  // Get all direct card links
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));

  // Build table rows
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  cards.forEach(cardLink => {
    const [image, textContent] = extractCardContent(cardLink);
    rows.push([image, textContent]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
