/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children of a given parent
  function getDirectChildren(parent, selector) {
    return Array.from(parent.querySelectorAll(':scope > ' + selector));
  }

  // 1. Header row (always required for this block)
  const headerRow = ['Hero (hero38)'];

  // 2. Background image row (none in this source HTML, so leave cell empty)
  const bgImageRow = [''];

  // 3. Content row: Title, Subheading, CTA
  // Source HTML structure:
  // <section>
  //   <div class="container">
  //     <div class="grid-layout">
  //       <div> ... <h2>Title</h2><p>Subheading</p> </div>
  //       <a>CTA</a>
  //     </div>
  //   </div>
  // </section>

  // Defensive: Find the grid-layout div
  const container = element.querySelector('.container');
  let grid = container ? container.querySelector('.grid-layout') : null;
  if (!grid) {
    // fallback: use first child div
    grid = container ? getDirectChildren(container, 'div')[0] : null;
  }

  let title, subheading, cta;
  if (grid) {
    // Find the content div (with heading and subheading)
    const gridChildren = getDirectChildren(grid, 'div, a');
    // Usually first div is text, second is CTA
    const textDiv = gridChildren.find(el => el.tagName === 'DIV');
    const ctaLink = gridChildren.find(el => el.tagName === 'A');

    if (textDiv) {
      title = textDiv.querySelector('h2');
      subheading = textDiv.querySelector('p');
    }
    if (ctaLink) {
      cta = ctaLink;
    }
  }

  // Compose content cell
  const contentCell = [];
  if (title) contentCell.push(title);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);

  // If nothing found, fallback to all text in element
  if (contentCell.length === 0) {
    contentCell.push(document.createTextNode(element.textContent.trim()));
  }

  // Build table rows
  const rows = [
    headerRow,
    bgImageRow,
    [contentCell],
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
