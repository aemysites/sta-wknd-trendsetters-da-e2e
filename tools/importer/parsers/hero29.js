/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Table header row
  const headerRow = ['Hero (hero29)'];

  // --- Extract background image (2nd row) ---
  let bgImg = null;
  // Find the image inside the hero block
  // The image is inside a div with class 'ix-parallax-scale-out-hero', which itself is inside a grid-layout
  const gridDiv = element.querySelector('.w-layout-grid');
  if (gridDiv) {
    // Find the first img inside gridDiv
    bgImg = gridDiv.querySelector('img');
  }
  // If not found, leave cell empty
  const imageRow = [bgImg ? bgImg : ''];

  // --- Extract text content (3rd row) ---
  let textContent = document.createElement('div');
  // The heading is inside the second grid child, in a div with class 'container'
  let heading = null;
  if (gridDiv) {
    // The second child (container) holds the heading
    const gridChildren = gridDiv.querySelectorAll(':scope > div');
    if (gridChildren.length > 1) {
      const containerDiv = gridChildren[1];
      // The heading is inside a div with class 'utility-margin-bottom-6rem'
      const headingWrap = containerDiv.querySelector('.utility-margin-bottom-6rem');
      if (headingWrap) {
        // Find h1
        heading = headingWrap.querySelector('h1');
        if (heading) {
          textContent.appendChild(heading);
        }
        // Find button group (call-to-action), if present
        const buttonGroup = headingWrap.querySelector('.button-group');
        if (buttonGroup && buttonGroup.children.length > 0) {
          textContent.appendChild(buttonGroup);
        }
      }
    }
  }
  const textRow = [textContent.childNodes.length > 0 ? textContent : ''];

  // Compose table
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block table
  element.replaceWith(block);
}
