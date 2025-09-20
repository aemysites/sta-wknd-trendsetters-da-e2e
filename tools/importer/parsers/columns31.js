/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: expect 3 columns, but handle any count
  // 1st col: "Taylor Brooks"
  // 2nd col: tags
  // 3rd col: heading and rich text

  // Column 1: Taylor Brooks (text)
  const col1 = columns[0];
  // Column 2: tags (flex-vertical)
  const col2 = columns[1];
  // Column 3: heading
  const col3Heading = columns[2];
  // Column 4: rich text
  const col4RichText = columns[3];

  // Compose column 1: Taylor Brooks
  let col1Content = col1;

  // Compose column 2: tags (all .tag children)
  let col2Content = col2;

  // Compose column 3: heading + rich text
  // Defensive: combine heading and rich text if both exist
  let col3Content;
  if (col3Heading && col4RichText) {
    // Create a wrapper div for heading + rich text
    const wrapper = document.createElement('div');
    wrapper.appendChild(col3Heading);
    wrapper.appendChild(col4RichText);
    col3Content = wrapper;
  } else if (col3Heading) {
    col3Content = col3Heading;
  } else if (col4RichText) {
    col3Content = col4RichText;
  } else {
    col3Content = '';
  }

  // Build the table rows
  const headerRow = ['Columns (columns31)'];
  const contentRow = [col1Content, col2Content, col3Content];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
