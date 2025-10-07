/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero29) block: 1 column, 3 rows
  // Row 1: Block name
  // Row 2: Background image (optional)
  // Row 3: Heading, subheading, CTA (optional)

  // Header row
  const headerRow = ['Hero (hero29)'];

  // --- Row 2: Background image ---
  // Find the first <img> inside the hero block
  let imgEl = element.querySelector('img');
  let imageCell = imgEl ? imgEl : '';

  // --- Row 3: Text content (heading, subheading, CTA) ---
  let textCellContent = [];
  // Find the main heading (h1, h2, etc.)
  let headingEl = element.querySelector('h1, h2, h3, h4, h5, h6');
  if (headingEl) {
    // Preserve original HTML, including <br> and casing
    const h1 = document.createElement('h1');
    h1.innerHTML = headingEl.innerHTML;
    textCellContent.push(h1);
  }

  // Find CTA (anchor/button)
  let ctaEl = element.querySelector('a, button');
  if (ctaEl) textCellContent.push(ctaEl);

  // Defensive: If no heading, but there's text, use it
  if (textCellContent.length === 0) {
    // Try to find any text content
    const textNodes = Array.from(element.childNodes).filter(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
    if (textNodes.length > 0) {
      const p = document.createElement('p');
      p.textContent = textNodes.map(n => n.textContent.trim()).join(' ');
      textCellContent.push(p);
    }
  }

  // Table rows
  const rows = [
    headerRow,
    [imageCell],
    [textCellContent.length > 0 ? textCellContent : '']
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
