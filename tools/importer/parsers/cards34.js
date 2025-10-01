/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from each card anchor
  function extractCardContent(cardAnchor) {
    // Find the image (mandatory)
    const img = cardAnchor.querySelector('img');

    // Find the text container (the div after the image)
    const textContainer = Array.from(cardAnchor.children).find(
      (child) => child !== img && child.tagName === 'DIV'
    );

    // Defensive: If no text container, fallback to anchor
    const tc = textContainer || cardAnchor;

    // Find the heading (h3 or h4)
    const heading = tc.querySelector('h3, h4, h2, h1');

    // Find the description (first <p> after heading)
    let description = null;
    if (heading) {
      description = heading.nextElementSibling && heading.nextElementSibling.tagName === 'P'
        ? heading.nextElementSibling
        : tc.querySelector('p');
    } else {
      description = tc.querySelector('p');
    }

    // Find the CTA (the last div with text 'Read', or a link)
    let cta = null;
    // Try to find a link first
    cta = tc.querySelector('a');
    // If not found, look for a div with text 'Read'
    if (!cta) {
      const divs = tc.querySelectorAll('div');
      cta = Array.from(divs).find(div => div.textContent.trim().toLowerCase() === 'read');
    }
    // If found and not a link, wrap in a link to the card's href
    if (cta && cta.tagName !== 'A') {
      const link = document.createElement('a');
      link.href = cardAnchor.href;
      link.textContent = cta.textContent;
      cta = link;
    }
    // If not found, fallback to making a link with text 'Read'
    if (!cta && cardAnchor.href) {
      const link = document.createElement('a');
      link.href = cardAnchor.href;
      link.textContent = 'Read';
      cta = link;
    }

    // Compose the text cell: tag/label row, heading, description, CTA
    // Optionally, include tag and read time at the top
    const tagRow = tc.querySelector('.flex-horizontal, .utility-margin-bottom-1rem');
    let tagAndTime = null;
    if (tagRow) {
      tagAndTime = tagRow.cloneNode(true);
    }

    // Build the text content cell
    const textCellContent = [];
    if (tagAndTime) textCellContent.push(tagAndTime);
    if (heading) textCellContent.push(heading);
    if (description) textCellContent.push(description);
    if (cta) textCellContent.push(cta);

    return [img, textCellContent];
  }

  // Get all card anchors (direct children)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Build the table rows
  const rows = [
    ['Cards (cards34)'],
    ...cards.map(extractCardContent)
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
