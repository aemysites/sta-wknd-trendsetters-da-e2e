/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to safely get the first matching element
  function getFirst(selector, parent) {
    const el = parent.querySelector(selector);
    return el || null;
  }

  // 1. Header row
  const headerRow = ['Hero (hero41)'];

  // 2. Background image row (row 2)
  // Find the first <img> inside the header block
  const bgImg = element.querySelector('img');
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row (row 3)
  // Find the content container with heading, paragraph, and button
  let contentCell = [];
  // The content is inside: .container > .w-layout-grid
  const container = element.querySelector('.container');
  if (container) {
    const grid = container.querySelector('.w-layout-grid');
    if (grid) {
      // Heading (h1)
      const heading = getFirst('h1', grid);
      if (heading) contentCell.push(heading);
      // Paragraph (subheading)
      const flex = getFirst('.flex-vertical', grid);
      if (flex) {
        // Paragraph
        const para = getFirst('p', flex);
        if (para) contentCell.push(para);
        // CTA (button link)
        const btnGroup = getFirst('.button-group', flex);
        if (btnGroup) {
          const btn = getFirst('a', btnGroup);
          if (btn) contentCell.push(btn);
        }
      }
    }
  }
  // Defensive: if nothing found, leave empty cell
  const contentRow = [contentCell.length ? contentCell : ''];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImgRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
