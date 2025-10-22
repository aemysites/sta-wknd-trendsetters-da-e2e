/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container
  const container = element.querySelector('.container');
  const grid = container ? container.querySelector('.grid-layout') : element.querySelector('.grid-layout');
  const gridRoot = grid || element;
  const gridItems = Array.from(gridRoot.children);

  // Identify columns and image
  let leftCol = null, rightCol = null, img = null;
  for (const child of gridItems) {
    if (child.tagName === 'UL') {
      rightCol = child;
    } else if (child.tagName === 'IMG') {
      img = child;
    } else if (child.tagName === 'DIV') {
      leftCol = child;
    }
  }

  // Defensive fallback
  if (!leftCol) leftCol = gridItems.find(c => c.tagName === 'DIV');
  if (!rightCol) rightCol = gridItems.find(c => c.tagName === 'UL');
  if (!img) img = gridItems.find(c => c.tagName === 'IMG');

  // Left column: headings and subheading
  const leftColContent = [];
  if (leftCol) {
    const eyebrow = leftCol.querySelector('h2');
    if (eyebrow) leftColContent.push(eyebrow);
    const heading = leftCol.querySelector('h3');
    if (heading) leftColContent.push(heading);
    const subheading = leftCol.querySelector('p');
    if (subheading) leftColContent.push(subheading);
  }

  // Right column: contact info list (must wrap <li> in <ul> for valid HTML)
  let rightColContent = null;
  if (rightCol) {
    const ul = document.createElement('ul');
    Array.from(rightCol.children).forEach(li => {
      ul.appendChild(li.cloneNode(true));
    });
    rightColContent = ul;
  }

  // Table header row
  const headerRow = ['Columns block (columns9)'];
  // Table second row: left column (text), right column (contacts)
  const secondRow = [leftColContent, rightColContent];
  // Table third row: image row must have two columns (image, empty)
  const thirdRow = [img, ''];

  // Create table
  const cells = [
    headerRow,
    secondRow,
    thirdRow
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
