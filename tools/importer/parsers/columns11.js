/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block guidelines
  const headerRow = ['Columns block (columns11)'];

  // Defensive: get all direct children of the main section
  const mainChildren = Array.from(element.querySelectorAll(':scope > div'));

  // The first container holds the main content (title, text, author, button, etc)
  const mainContentContainer = mainChildren[0];
  // The second container holds the two images
  const imagesContainer = mainChildren[1];

  // --- LEFT COLUMN: Title, Text, Author, Button ---
  // Get grid layout (title/text/author/button)
  const gridLayout = mainContentContainer.querySelector('.grid-layout');
  // Defensive: get all direct children of this grid
  const gridChildren = Array.from(gridLayout.querySelectorAll(':scope > div'));

  // Title block (eyebrow + h1)
  const titleBlock = gridChildren[0];
  // Content block (paragraph, author, button)
  const contentBlock = gridChildren[1];

  // Paragraph text
  const paragraph = contentBlock.querySelector('.rich-text');
  // Author block (name/date/read time)
  const authorBlock = contentBlock.querySelector('.w-layout-grid .flex-horizontal.y-center');
  // Button
  const button = contentBlock.querySelector('a.button');

  // Compose left column: title, paragraph, author, button
  const leftColumnElements = [];
  if (titleBlock) leftColumnElements.push(titleBlock);
  if (paragraph) leftColumnElements.push(paragraph);
  if (authorBlock) leftColumnElements.push(authorBlock);
  if (button) leftColumnElements.push(button);

  // --- RIGHT COLUMN: Two images ---
  // Get the two image containers
  const imageDivs = Array.from(imagesContainer.querySelectorAll('.utility-aspect-1x1'));
  // Only use image elements (ignore avatars/blurred faces)
  const images = imageDivs.map(div => div.querySelector('img')).filter(Boolean);

  // Compose right column: both images
  // Defensive: only include images that exist
  const rightColumnElements = images;

  // Build the second row: left column and right column
  const secondRow = [leftColumnElements, rightColumnElements];

  // Create the table
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
