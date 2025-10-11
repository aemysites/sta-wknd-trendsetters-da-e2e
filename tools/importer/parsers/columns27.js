/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the content
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // The mainGrid children:
  // [0] Heading
  // [1] Quote
  // [2] Nested grid (divider, avatar/testimonial, logo)
  const [heading, quote, nestedGrid] = mainGrid.children;

  // --- First row: block name header ---
  const headerRow = ['Columns (columns27)'];

  // --- Second row: heading | quote ---
  const secondRow = [heading, quote];

  // --- Third row: avatar/testimonial | empty | logo ---
  // The nestedGrid contains:
  // [0] divider (visual only, skip)
  // [1] flex-horizontal (avatar + name/title)
  // [2] logo image (right)
  const nestedChildren = nestedGrid.querySelectorAll(':scope > div');
  const avatarBlock = nestedChildren[1];
  const logoBlock = nestedChildren[2];

  // Add logo text if present and not already included
  let logoText = logoBlock.textContent.trim();
  if (logoText) {
    // Remove existing text nodes (to avoid duplication)
    Array.from(logoBlock.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) node.remove();
    });
    const span = document.createElement('span');
    span.textContent = logoText;
    logoBlock.appendChild(span);
  }

  // The center column is intentionally empty for spacing
  const thirdRow = [avatarBlock, '', logoBlock];

  // Build the table
  const cells = [
    headerRow,
    secondRow,
    thirdRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
