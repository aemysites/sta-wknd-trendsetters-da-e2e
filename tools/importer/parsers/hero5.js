/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children of a node by tag name
  function getDirectChildByTag(parent, tag) {
    return Array.from(parent.children).find(child => child.tagName.toLowerCase() === tag);
  }

  // 1. Header row
  const headerRow = ['Hero (hero5)'];

  // 2. Find the main grid container (contains both text and image)
  const grid = element.querySelector('.grid-layout.container');
  let imageEl = null;
  let contentEl = null;

  // The image is a direct child of the outer grid, not inside the inner grid
  const outerGrid = element.querySelector('.grid-layout');
  if (outerGrid) {
    // Find the first img direct child of the outer grid
    imageEl = Array.from(outerGrid.children).find(
      (child) => child.tagName === 'IMG'
    );
  }

  // The content is the inner grid's first child (which is a .section)
  if (grid) {
    contentEl = Array.from(grid.children).find(
      (child) => child.classList.contains('section')
    );
  }

  // 2nd row: background image (optional)
  const backgroundRow = [imageEl ? imageEl : ''];

  // 3rd row: text content (heading, paragraph, buttons)
  let textContent = [];
  if (contentEl) {
    // Heading
    const heading = getDirectChildByTag(contentEl, 'h2');
    if (heading) textContent.push(heading);
    // Paragraph (rich text)
    const richText = contentEl.querySelector('.rich-text, .w-richtext');
    if (richText) textContent.push(richText);
    // Button group
    const btnGroup = contentEl.querySelector('.button-group');
    if (btnGroup) textContent.push(btnGroup);
  }
  const textRow = [textContent.length ? textContent : ''];

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundRow,
    textRow,
  ], document);

  // Replace the element
  element.replaceWith(table);
}
