/* global WebImporter */
export default function parse(element, { document }) {
  // Identify the two columns: left (image), right (content)
  let imgEl = element.querySelector('img');
  let rightColEl = null;
  // Find the right column: contains h1, p, button group
  const gridDivs = element.querySelectorAll(':scope > div, :scope > .container > .w-layout-grid');
  for (const div of gridDivs) {
    if (
      div.querySelector('h1') ||
      div.querySelector('p') ||
      div.querySelector('.button-group')
    ) {
      rightColEl = div;
      break;
    }
  }
  if (!rightColEl) {
    rightColEl = element;
  }

  // --- Right column content extraction ---
  // Heading
  const heading = rightColEl.querySelector('h1');
  // Subheading
  const subheading = rightColEl.querySelector('p');
  // Button group (may contain multiple links)
  const buttonGroup = rightColEl.querySelector('.button-group');

  // Compose right column fragment
  const frag = document.createDocumentFragment();
  if (heading) frag.appendChild(heading.cloneNode(true));
  if (subheading) frag.appendChild(subheading.cloneNode(true));
  if (buttonGroup) frag.appendChild(buttonGroup.cloneNode(true));

  // --- Table construction ---
  const headerRow = ['Columns block (columns3)'];
  // Reference the actual image element (do not clone)
  const contentRow = [imgEl, frag];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
