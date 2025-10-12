/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per block guidelines
  const headerRow = ['Hero (hero29)'];

  // --- Extract background image ---
  // Find the first <img> in the hero block (background image)
  let bgImg = null;
  const imgEl = element.querySelector('img');
  if (imgEl) {
    bgImg = imgEl;
  }

  // --- Extract headline, subheading, CTA ---
  // Find the main heading (h1)
  let textContentEls = [];
  const h1 = element.querySelector('h1');
  if (h1) {
    // Use the original HTML headline as-is (preserve casing)
    textContentEls.push(h1.cloneNode(true));
  }

  // Optionally, add subheading (h2/h3) and CTA (button/a)
  const h2 = element.querySelector('h2');
  if (h2) textContentEls.push(h2.cloneNode(true));
  const h3 = element.querySelector('h3');
  if (h3) textContentEls.push(h3.cloneNode(true));

  // Look for CTA button or anchor
  const cta = element.querySelector('a, button');
  if (cta) {
    textContentEls.push(cta.cloneNode(true));
  }

  // --- Build table rows ---
  // Row 2: background image (if present)
  const imageRow = [bgImg ? bgImg : ''];
  // Row 3: text content (headline, subheading, CTA)
  const textRow = [textContentEls.length ? textContentEls : ''];

  // Compose table data
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block table
  element.replaceWith(block);
}
