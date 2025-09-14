/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from an anchor element
  function extractCardContent(card) {
    // Image: first div > img
    const imageDiv = card.querySelector('div.utility-aspect-2x3');
    let image = null;
    if (imageDiv) {
      image = imageDiv.querySelector('img');
    }

    // Text content: tag/date row + heading
    // We'll combine the tag/date row and the heading into a single div
    const contentFragments = [];
    // Tag/date row
    const tagRow = card.querySelector('.flex-horizontal');
    if (tagRow) {
      contentFragments.push(tagRow);
    }
    // Heading
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) {
      contentFragments.push(heading);
    }
    // Wrap text content in a div for structure
    let textContent;
    if (contentFragments.length === 1) {
      textContent = contentFragments[0];
    } else if (contentFragments.length > 1) {
      textContent = document.createElement('div');
      contentFragments.forEach(frag => textContent.appendChild(frag));
    } else {
      textContent = document.createTextNode('');
    }
    return [image, textContent];
  }

  // Get all card anchor elements (direct children)
  const cards = Array.from(element.querySelectorAll(':scope > a.utility-link-content-block'));

  // Build the table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards24)']);
  // Card rows
  cards.forEach(card => {
    const [image, textContent] = extractCardContent(card);
    rows.push([image, textContent]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
