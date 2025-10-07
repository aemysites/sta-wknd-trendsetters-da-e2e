/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Columns block (columns27)'];

  // Get the main grid containing the two columns
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Get all immediate children of the main grid
  const gridChildren = Array.from(mainGrid.children);

  // Find heading and testimonial paragraphs
  const heading = gridChildren.find((el) => el.tagName === 'P' && el.classList.contains('h2-heading'));
  const testimonial = gridChildren.find((el) => el.tagName === 'P' && el.classList.contains('paragraph-lg'));

  // Find the nested grid for the bottom row
  const bottomGrid = gridChildren.find((el) => el.classList.contains('w-layout-grid'));
  let divider = null, authorCell = null, logoCell = null, logoText = '';
  if (bottomGrid) {
    const bottomChildren = Array.from(bottomGrid.children);
    // Divider is a div with class 'divider'
    divider = bottomChildren.find((el) => el.classList.contains('divider'));
    // Author info: flex-horizontal
    authorCell = bottomChildren.find((el) => el.classList.contains('flex-horizontal'));
    // Logo: div with utility-display-inline-block
    logoCell = bottomChildren.find((el) => el.classList.contains('utility-display-inline-block'));
    // Try to extract logo text if present (SVG alt or text)
    if (logoCell) {
      // If the logo is an <img> with alt, use alt
      const img = logoCell.querySelector('img[alt]');
      if (img && img.alt && img.alt.trim()) {
        logoText = img.alt.trim();
      } else {
        // Try to extract text from SVG if present
        const svg = logoCell.querySelector('svg');
        if (svg) {
          // Look for <text> nodes inside SVG
          const textNodes = svg.querySelectorAll('text');
          if (textNodes.length) {
            logoText = Array.from(textNodes).map(n => n.textContent.trim()).join(' ');
          }
        }
      }
    }
  }

  // First content row: heading (left), testimonial (right)
  const firstContentRow = [heading || '', testimonial || ''];

  // Divider row: two columns, divider in left, empty in right (no colspan)
  const dividerRow = [divider ? divider.cloneNode(true) : '', ''];

  // Author/logo row: author info (left), logo (right, with text if found)
  let logoCellContent = logoCell || '';
  if (logoText) {
    // If we found logo text, append it after the logo image
    const wrapper = document.createElement('div');
    if (logoCell) wrapper.appendChild(logoCell.cloneNode(true));
    wrapper.appendChild(document.createTextNode(' ' + logoText));
    logoCellContent = wrapper;
  }

  const authorLogoRow = [authorCell || '', logoCellContent];

  // Compose table
  const cells = [
    headerRow,
    firstContentRow,
    dividerRow,
    authorLogoRow
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
