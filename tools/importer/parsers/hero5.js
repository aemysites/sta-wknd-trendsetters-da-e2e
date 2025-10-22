/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container (contains both text and image)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Find the hero image (background image)
  const heroImg = grid.querySelector('img');

  // Find the content section (contains heading, paragraph, buttons)
  const section = grid.querySelector('div.section');

  // Extract heading
  const heading = section ? section.querySelector('h2') : null;
  // Extract subheading/paragraph
  const paragraph = section ? section.querySelector('p') : null;
  // Extract CTA/button group
  const buttonGroup = section ? section.querySelector('.button-group') : null;

  // Compose content cell for row 3
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (paragraph) contentCell.push(paragraph);
  if (buttonGroup) contentCell.push(buttonGroup);

  // Compose table rows
  const headerRow = ['Hero (hero5)'];
  const imageRow = [heroImg ? heroImg : ''];
  const contentRow = [contentCell.length ? contentCell : ''];

  // Create table
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
