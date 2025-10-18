/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns block (columns13)'];

  // Find the main grid containing the columns
  const outerGrid = element.querySelector('.grid-layout.desktop-1-column');
  if (!outerGrid) return;
  const overlayGrid = outerGrid.querySelector('.grid-layout.desktop-3-column');
  if (!overlayGrid) return;

  // LEFT COLUMN: Concert crowd image
  let imgCell = document.createElement('div');
  const concertImg = overlayGrid.querySelector('img[alt="image of a concert crowd"]');
  if (concertImg) {
    imgCell.appendChild(concertImg.cloneNode(true));
  }

  // RIGHT COLUMN: All text content (heading, list with icons, dividers, button)
  let textCell = document.createElement('div');
  const cardBody = overlayGrid.querySelector('.card-body');
  if (cardBody) {
    // Heading
    const heading = cardBody.querySelector('h2');
    if (heading) textCell.appendChild(heading.cloneNode(true));
    // List items (with icons and text) and dividers
    const flexVert = cardBody.querySelector('.flex-vertical');
    if (flexVert) {
      // Iterate over all children to preserve order (rows and dividers)
      Array.from(flexVert.children).forEach((node) => {
        if (node.classList.contains('flex-horizontal')) {
          const rowDiv = document.createElement('div');
          // Icon
          const icon = node.querySelector('.icon-small img');
          if (icon) rowDiv.appendChild(icon.cloneNode(true));
          // Text
          const p = node.querySelector('p');
          if (p) rowDiv.appendChild(p.cloneNode(true));
          textCell.appendChild(rowDiv);
        } else if (node.classList.contains('divider')) {
          textCell.appendChild(node.cloneNode(true));
        }
      });
    }
    // Button
    const buttonGroup = cardBody.querySelector('.button-group');
    if (buttonGroup) {
      const button = buttonGroup.querySelector('a');
      if (button) textCell.appendChild(button.cloneNode(true));
    }
  }

  // Compose the columns row
  const columnsRow = [imgCell, textCell];

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
