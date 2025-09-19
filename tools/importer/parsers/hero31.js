/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Hero (hero31)'];

  // --- Row 2: Background Image (optional) ---
  // There is no background image in the provided HTML, so cell is empty
  const bgImageRow = [''];

  // --- Row 3: Title, Subheading, CTA, etc ---
  const grid = element.querySelector('.w-layout-grid');
  let contentCell = '';
  if (grid) {
    // Find the heading (h2)
    const heading = grid.querySelector('h2');
    // Find the tags (optional subheading)
    const tagsContainer = grid.querySelector('.flex-vertical');
    // Find the rich text (paragraphs)
    const richText = grid.querySelector('.rich-text, .w-richtext');

    // Compose content: heading, tags, richText
    // Only include elements that exist, and clone them to avoid moving from DOM
    const contentArr = [];
    if (heading) contentArr.push(heading.cloneNode(true));
    if (tagsContainer) contentArr.push(tagsContainer.cloneNode(true));
    if (richText) contentArr.push(richText.cloneNode(true));
    // If only one element, use it directly; if multiple, wrap in a div
    if (contentArr.length === 1) {
      contentCell = contentArr[0];
    } else if (contentArr.length > 1) {
      const wrapper = document.createElement('div');
      contentArr.forEach(el => wrapper.appendChild(el));
      contentCell = wrapper;
    }
  }

  // Always produce 3 rows: header, bg image (empty if none), content
  const rows = [headerRow, bgImageRow, [contentCell]];

  // Build the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
