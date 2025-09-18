/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main container for the hero content
  // The structure is: section > div.container > div.grid-layout > (content div, button link)
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid: [contentDiv, ctaLink]
  const children = Array.from(grid.children);
  let contentDiv = null;
  let ctaLink = null;
  // Find the content div (with headings) and the CTA link (button)
  children.forEach(child => {
    if (child.tagName === 'A') {
      ctaLink = child;
    } else {
      contentDiv = child;
    }
  });

  // Defensive: If contentDiv missing, abort
  if (!contentDiv) return;

  // Find the heading and subheading in the contentDiv
  const heading = contentDiv.querySelector('h2, h1, h3, h4, h5, h6');
  const subheading = contentDiv.querySelector('p, .subheading');

  // Compose the content cell for the third row
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading && subheading !== heading) contentCell.push(subheading);
  if (ctaLink) contentCell.push(ctaLink);

  // Build the table rows
  const headerRow = ['Hero (hero35)'];
  const bgRow = ['']; // No background image in this HTML
  const contentRow = [contentCell];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
