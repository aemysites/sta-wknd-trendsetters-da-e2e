/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero29)'];

  // 2. Extract background image (row 2)
  // Find the image inside the first grid cell
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  if (gridDivs.length > 0) {
    // The first grid cell contains the image
    const img = gridDivs[0].querySelector('img');
    if (img) {
      bgImg = img;
    }
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Extract content (row 3)
  // The second grid cell contains the content (h1, etc)
  let contentCell = '';
  if (gridDivs.length > 1) {
    // Look for the container with the heading
    const contentContainer = gridDivs[1].querySelector('.utility-margin-bottom-6rem');
    if (contentContainer) {
      // We'll collect all children except empty button group
      const nodes = [];
      // Heading
      const h1 = contentContainer.querySelector('h1');
      if (h1) nodes.push(h1);
      // Button group (call to action) if not empty
      const btnGroup = contentContainer.querySelector('.button-group');
      if (btnGroup && btnGroup.children.length > 0) {
        nodes.push(btnGroup);
      }
      contentCell = nodes.length > 0 ? nodes : '';
    }
  }
  const contentRow = [contentCell];

  // 4. Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImgRow,
    contentRow,
  ], document);

  // 5. Replace original element
  element.replaceWith(table);
}
