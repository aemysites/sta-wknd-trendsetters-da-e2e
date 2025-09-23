/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get direct children divs of the grid-layout
  const grid = element.querySelector('.w-layout-grid');
  let bgImg = null;
  let textContent = null;

  if (grid) {
    // Find all direct children of grid
    const gridChildren = Array.from(grid.children);
    // The first child contains the image (background)
    const bgDiv = gridChildren[0];
    if (bgDiv) {
      // Find the image inside
      bgImg = bgDiv.querySelector('img');
    }
    // The second child contains the text content
    const textDiv = gridChildren[1];
    if (textDiv) {
      // Find the headline container
      const headlineContainer = textDiv.querySelector('.utility-margin-bottom-6rem');
      if (headlineContainer) {
        // Remove empty button group if present
        const btnGroup = headlineContainer.querySelector('.button-group');
        if (btnGroup && btnGroup.childElementCount === 0) {
          btnGroup.remove();
        }
        textContent = headlineContainer;
      } else {
        textContent = textDiv;
      }
    }
  }

  // Build the table rows
  const headerRow = ['Hero (hero29)'];
  const bgImgRow = [bgImg ? bgImg : ''];
  const contentRow = [textContent ? textContent : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImgRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
