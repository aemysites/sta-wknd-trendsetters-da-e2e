/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (each is a column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract its content (usually an image inside a div)
  const columns = columnDivs.map((colDiv) => {
    // Get the first image inside this div
    const img = colDiv.querySelector('img');
    if (img) {
      // Reference the existing image element (do not clone)
      return img;
    }
    // If no image, just use the whole div (reference, not clone)
    return colDiv;
  });

  // Build table rows
  const headerRow = ['Columns block (columns30)'];
  const contentRow = columns;

  const cells = [
    headerRow,
    contentRow,
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block table
  element.replaceWith(block);
}
