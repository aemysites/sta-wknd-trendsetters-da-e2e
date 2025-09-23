/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero40)'];

  // 2. Background image row
  // Find the image with class 'cover-image' (background)
  let bgImg = element.querySelector('img.cover-image');
  let imageCell = '';
  if (bgImg) {
    imageCell = bgImg;
  }

  // 3. Content row: Heading, paragraph, CTA
  // Find main content container (the second grid cell)
  // The structure is:
  // <header>
  //   <div.grid-layout>
  //     <div> (image)
  //     <div> (content)
  //   </div>
  // </header>
  const gridDivs = element.querySelectorAll(':scope > div > div');
  let contentCell = '';
  if (gridDivs.length > 1) {
    // The second div contains the content
    const contentDiv = gridDivs[1];
    // Inside contentDiv: another grid, then h1, then flex-vertical with p and button
    const innerGrid = contentDiv.querySelector('.w-layout-grid');
    if (innerGrid) {
      // Get heading
      const heading = innerGrid.querySelector('h1');
      // Get paragraph and button
      const flexVertical = innerGrid.querySelector('.flex-vertical');
      let paragraph = '';
      let button = '';
      if (flexVertical) {
        paragraph = flexVertical.querySelector('p');
        // Button is inside .button-group > a
        const buttonGroup = flexVertical.querySelector('.button-group');
        if (buttonGroup) {
          button = buttonGroup.querySelector('a');
        }
      }
      // Compose cell: heading, paragraph, button (if present)
      const cellContents = [];
      if (heading) cellContents.push(heading);
      if (paragraph) cellContents.push(paragraph);
      if (button) cellContents.push(button);
      contentCell = cellContents;
    }
  }

  // Compose table rows
  const rows = [
    headerRow,
    [imageCell],
    [contentCell],
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
