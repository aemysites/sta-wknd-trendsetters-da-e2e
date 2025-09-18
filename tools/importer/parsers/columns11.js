/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // Get main grid: the first grid is the header/text/author/button, second grid is the images
  const container = element.querySelector('.container');
  if (!container) return;

  // Get the two main grids
  const grids = container.querySelectorAll('.w-layout-grid');
  if (grids.length < 2) return;
  const topGrid = grids[0]; // Contains title, intro, author, button
  const bottomGrid = grids[1]; // Contains two images

  // --- First column: left side ---
  // Get the left content block (title, eyebrow)
  const leftBlock = getDirectChildren(topGrid, 'div')[0];

  // --- Second column: right side ---
  // Get the right content block (intro, author, button)
  const rightBlock = getDirectChildren(topGrid, 'div')[1];

  // Compose right column content
  // Get intro paragraph
  const introParagraph = rightBlock.querySelector('.rich-text');
  // Get author block (avatar, name, date, read time)
  const authorRow = rightBlock.querySelector('.grid-layout .y-center');
  // Get button
  const readMoreBtn = rightBlock.querySelector('a.button');

  // Compose right column cell
  const rightColumnContent = [];
  if (introParagraph) rightColumnContent.push(introParagraph);
  if (authorRow) rightColumnContent.push(authorRow);
  if (readMoreBtn) rightColumnContent.push(readMoreBtn);

  // --- Images row ---
  // Get image wrappers
  const imageWrappers = getDirectChildren(bottomGrid, 'div.utility-aspect-1x1');
  // Only include images, not avatars
  const images = imageWrappers.map(div => div.querySelector('img')).filter(img => img);

  // Compose table rows
  const headerRow = ['Columns block (columns11)'];
  const firstRow = [leftBlock, rightColumnContent];
  const secondRow = images;

  // Remove any empty rows from cells
  const cells = [headerRow, firstRow, secondRow].filter(row => row.length && row.some(cell => cell));
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
