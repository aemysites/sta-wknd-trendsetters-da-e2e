/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get direct children of a node by tag name
  function getDirectChildByTag(parent, tag) {
    return Array.from(parent.children).find((el) => el.tagName.toLowerCase() === tag.toLowerCase());
  }

  // 1. Header row
  const headerRow = ['Hero (hero41)'];

  // 2. Background image row
  // Find the first .grid-layout > div that contains an <img>
  let backgroundImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  for (const div of gridDivs) {
    const img = div.querySelector('img');
    if (img) {
      backgroundImg = img;
      break;
    }
  }
  const backgroundRow = [backgroundImg ? backgroundImg : ''];

  // 3. Content row (headline, paragraph, CTA)
  // Find the .container > .grid-layout (the second main grid)
  let contentCell = '';
  for (const div of gridDivs) {
    // Look for a child with class 'container'
    if (div.classList.contains('container')) {
      const innerGrid = div.querySelector('.grid-layout');
      if (innerGrid) {
        // The headline is the first h1
        const h1 = innerGrid.querySelector('h1');
        // The paragraph and button are in .flex-vertical
        const flexVertical = innerGrid.querySelector('.flex-vertical');
        let p = null;
        let buttonGroup = null;
        if (flexVertical) {
          p = flexVertical.querySelector('p');
          buttonGroup = flexVertical.querySelector('.button-group');
        }
        // Compose content cell
        const content = [];
        if (h1) content.push(h1);
        if (p) content.push(p);
        if (buttonGroup) {
          // Only include the first link (CTA)
          const cta = buttonGroup.querySelector('a');
          if (cta) content.push(cta);
        }
        contentCell = content.length ? content : '';
      }
    }
  }
  const contentRow = [contentCell];

  // Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
