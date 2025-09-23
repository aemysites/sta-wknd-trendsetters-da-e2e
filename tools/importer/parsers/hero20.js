/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all immediate children of a node matching selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.querySelectorAll(':scope > ' + selector));
  }

  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Background image row (collage of images)
  // Find the grid of images
  let imagesRow = [];
  let imagesContainer;
  // Find the deepest grid-layout with multiple images
  const gridLayouts = element.querySelectorAll('.grid-layout');
  for (const grid of gridLayouts) {
    const imgs = grid.querySelectorAll('img');
    if (imgs.length > 0) {
      imagesContainer = grid;
      break;
    }
  }
  if (imagesContainer) {
    // Put all images in a fragment (or array)
    const imgs = Array.from(imagesContainer.querySelectorAll('img'));
    imagesRow = [imgs];
  } else {
    imagesRow = [''];
  }

  // 3. Content row (title, subheading, CTA)
  let contentRow = [];
  // Find the content container
  let contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  if (contentContainer) {
    // Use the inner container for text and buttons
    let innerContainer = contentContainer.querySelector('.container');
    if (innerContainer) {
      // Gather heading, subheading, and button group
      const heading = innerContainer.querySelector('h1');
      const subheading = innerContainer.querySelector('p');
      const buttonGroup = innerContainer.querySelector('.button-group');
      let cellContent = [];
      if (heading) cellContent.push(heading);
      if (subheading) cellContent.push(subheading);
      if (buttonGroup) cellContent.push(buttonGroup);
      contentRow = [cellContent];
    } else {
      contentRow = [''];
    }
  } else {
    contentRow = [''];
  }

  // Compose table rows
  const rows = [headerRow, imagesRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with block table
  element.replaceWith(table);
}
