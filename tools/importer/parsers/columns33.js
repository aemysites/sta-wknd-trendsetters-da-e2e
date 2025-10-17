/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Find the two columns: image and content
  const children = Array.from(grid.children);
  if (children.length < 2) return;

  // Identify image and content columns
  const imageCol = children.find((el) => el.tagName === 'IMG');
  const contentCol = children.find((el) => el !== imageCol);
  if (!imageCol || !contentCol) return;

  // --- COLUMN 1: IMAGE ---
  // Use the existing image element directly (do not clone)
  const imageCell = imageCol;

  // --- COLUMN 2: CONTENT ---
  // Compose a fragment to preserve structure and semantics
  const frag = document.createDocumentFragment();

  // Eyebrow (Fresh fits, bold moves)
  const eyebrow = contentCol.querySelector('.eyebrow');
  if (eyebrow) frag.appendChild(eyebrow);

  // Tag (Trend Report)
  const tag = contentCol.querySelector('.tag');
  if (tag) frag.appendChild(tag);

  // Heading (Style that never sleeps)
  const heading = contentCol.querySelector('h2, h1, h3, h4, h5, h6');
  if (heading) frag.appendChild(heading);

  // Byline (Taylor Kim • Fashion Editor • June 2024)
  const bylineContainer = Array.from(contentCol.querySelectorAll('.flex-horizontal'))
    .find(div => Array.from(div.children).some(child => child.textContent.includes('•')));
  if (bylineContainer) frag.appendChild(bylineContainer);

  // Table header row (must match block name exactly)
  const headerRow = ['Columns (columns33)'];
  // Table content row
  const contentRow = [imageCell, frag];

  // Create the columns table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the section with the table
  element.replaceWith(table);
}
