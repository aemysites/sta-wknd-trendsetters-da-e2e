/* global WebImporter */
export default function parse(element, { document }) {
  // Get immediate children divs
  const topDivs = element.querySelectorAll(':scope > div');

  // Find background image (first .utility-position-relative with img.cover-image)
  let bgImg = null;
  for (const div of topDivs) {
    const img = div.querySelector('img.cover-image');
    if (img) {
      bgImg = img;
      break;
    }
  }

  // Find the main content container (should contain .card)
  let contentContainer = null;
  for (const div of topDivs) {
    if (div.querySelector('.card')) {
      contentContainer = div;
      break;
    }
  }
  if (!contentContainer) contentContainer = topDivs[0];

  // Within contentContainer, find the .card-body > .grid-layout
  let cardBodyGrid = contentContainer.querySelector('.card-body .grid-layout');
  if (!cardBodyGrid) cardBodyGrid = contentContainer;

  // In the grid: first child is the square image, second is the text stack
  const gridChildren = cardBodyGrid ? cardBodyGrid.children : [];
  let cardImg = null;
  let textStack = null;
  if (gridChildren.length > 0) {
    for (const child of gridChildren) {
      if (child.tagName === 'IMG') {
        cardImg = child;
        break;
      }
    }
    for (const child of gridChildren) {
      if (child.querySelector && child.querySelector('h2')) {
        textStack = child;
        break;
      }
    }
  }

  // Compose the content for the text cell (heading, features, divider, button)
  let textCellContent = [];
  if (cardImg) textCellContent.push(cardImg);
  if (textStack) {
    // Heading
    const heading = textStack.querySelector('h2');
    if (heading) textCellContent.push(heading);

    // Features (icon + text rows + divider)
    const featuresContainer = textStack.querySelector('.flex-vertical');
    if (featuresContainer) {
      const featureRows = featuresContainer.querySelectorAll(':scope > *');
      featureRows.forEach(row => {
        if (row.classList.contains('flex-horizontal') || row.classList.contains('divider')) {
          textCellContent.push(row);
        }
      });
    }

    // Button (CTA)
    const buttonGroup = textStack.querySelector('.button-group');
    if (buttonGroup) {
      const btn = buttonGroup.querySelector('a,button');
      if (btn) textCellContent.push(buttonGroup);
    }
  }

  // Compose the third row: all required content (inset image + text)
  const thirdRowContent = document.createElement('div');
  textCellContent.forEach(node => thirdRowContent.appendChild(node));

  // Build the table
  const cells = [
    ['Hero (hero13)'],
    [bgImg ? bgImg : ''],
    [thirdRowContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
