/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find background image (row 2)
  function findBackgroundImage() {
    // Look for an absolutely positioned image in the first grid cell
    const gridDivs = element.querySelectorAll(':scope > div > div');
    for (const div of gridDivs) {
      const img = div.querySelector('img.cover-image.utility-position-absolute');
      if (img) return img;
    }
    return null;
  }

  // Helper to find main content (row 3)
  function findMainContent() {
    // The main content is inside the card-body
    const cardBody = element.querySelector('.card-body');
    if (!cardBody) return null;
    // The grid inside card-body
    const grid = cardBody.querySelector('.grid-layout');
    if (!grid) return cardBody;
    // We'll collect the image (left) and the text/button (right)
    const children = Array.from(grid.children);
    // Defensive: find image and content
    let image = null;
    let content = null;
    for (const child of children) {
      if (child.tagName === 'IMG') image = child;
      else content = child;
    }
    // Compose content array
    const contentArr = [];
    if (image) contentArr.push(image);
    if (content) contentArr.push(content);
    return contentArr.length ? contentArr : grid;
  }

  // Build table rows
  const headerRow = ['Hero (hero13)'];
  const backgroundImg = findBackgroundImage();
  const row2 = [backgroundImg ? backgroundImg : ''];
  const mainContent = findMainContent();
  const row3 = [mainContent];

  // Create block table
  const cells = [headerRow, row2, row3];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
