/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Header row
  const headerRow = ['Hero (hero29)'];

  // 2. Find background image (row 2)
  let bgImg = null;
  // Find the first <img> inside the element (background image)
  const img = element.querySelector('img');
  if (img) {
    bgImg = img;
  }

  // 3. Find headline, subheading, CTA (row 3)
  // The main heading is inside an h1
  let row3Content = [];

  // Find the text container (the second direct child div of grid-layout)
  const grid = element.querySelector('.w-layout-grid');
  let textContainer = null;
  if (grid) {
    const directDivs = grid.querySelectorAll(':scope > div');
    if (directDivs.length > 1) {
      textContainer = directDivs[1];
    }
  }

  if (textContainer) {
    // Find h1 (title)
    const title = textContainer.querySelector('h1');
    if (title) row3Content.push(title);
    // Find subheading (h2, h3, h4)
    const subheading = textContainer.querySelector('h2, h3, h4');
    if (subheading) row3Content.push(subheading);
    // Find CTA (a or button)
    const cta = textContainer.querySelector('a, button');
    if (cta) row3Content.push(cta);
    // If nothing found, fallback to all text content
    if (row3Content.length === 0) {
      // Only add text nodes, not empty divs
      const text = textContainer.textContent.trim();
      if (text) row3Content.push(document.createTextNode(text));
    }
  }

  // Defensive: If still nothing, fallback to element text
  if (row3Content.length === 0) {
    const text = element.textContent.trim();
    if (text) row3Content.push(document.createTextNode(text));
  }

  // 4. Build table rows
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [row3Content.length > 0 ? row3Content : ''],
  ];

  // 5. Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // 6. Replace original element
  element.replaceWith(block);
}
