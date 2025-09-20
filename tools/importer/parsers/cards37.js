/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor
  function extractCardInfo(cardAnchor) {
    // Find image (if present)
    let img = cardAnchor.querySelector('img');
    // Only include cards with images (per block description: image/icon mandatory)
    if (!img) return null;
    // Collect all text content (tags, headings, paragraphs, etc.)
    const textContent = [];
    // Include tag-group/tag if present
    cardAnchor.querySelectorAll('.tag-group, .tag').forEach(el => {
      textContent.push(el.cloneNode(true));
    });
    // Include heading (h2, h3, h4)
    const heading = cardAnchor.querySelector('h2, h3, h4');
    if (heading) textContent.push(heading.cloneNode(true));
    // Include description (p)
    const desc = cardAnchor.querySelector('p');
    if (desc) textContent.push(desc.cloneNode(true));
    // Include CTA (anchor inside, but not the main anchor)
    cardAnchor.querySelectorAll('a').forEach(a => {
      if (a !== cardAnchor) textContent.push(a.cloneNode(true));
    });
    return [img.cloneNode(true), textContent];
  }

  // Find the grid layout containing cards
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Collect all card anchors (only those with images)
  const cardAnchors = Array.from(grid.querySelectorAll('a.utility-link-content-block'));

  // Build table rows
  const rows = [];
  const headerRow = ['Cards (cards37)'];
  rows.push(headerRow);
  cardAnchors.forEach(cardAnchor => {
    const cardInfo = extractCardInfo(cardAnchor);
    if (cardInfo) rows.push(cardInfo);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
