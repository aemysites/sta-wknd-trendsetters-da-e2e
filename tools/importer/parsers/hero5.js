/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Get all direct children of the main grid
  const gridChildren = element.querySelectorAll(':scope > div > div, :scope > div > img');

  // Find the image (background asset)
  let imageEl = null;
  for (const child of gridChildren) {
    if (child.tagName === 'IMG') {
      imageEl = child;
      break;
    }
  }

  // Find the content block (title, subheading, CTA)
  let contentBlock = null;
  for (const child of gridChildren) {
    if (child.tagName === 'DIV') {
      // Look for the nested section with heading, paragraph, button group
      const section = child.querySelector(':scope > div.section');
      if (section) {
        contentBlock = section;
        break;
      }
    }
  }

  // Defensive fallback: If not found, try to find by class
  if (!contentBlock) {
    contentBlock = element.querySelector('.section');
  }

  // Table rows
  const headerRow = ['Hero (hero5)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [contentBlock ? contentBlock : ''];

  const cells = [headerRow, imageRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
