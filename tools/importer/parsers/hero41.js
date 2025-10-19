/* global WebImporter */
export default function parse(element, { document }) {
  // === HERO (hero41) BLOCK PARSER ===
  // 1. Find the background image (should be referenced, not cloned)
  let bgImg = null;
  const img = element.querySelector('img');
  if (img) bgImg = img;

  // 2. Find the content container (the div with heading, paragraph, and CTA)
  let contentDiv = null;
  // Find the first div with a heading inside
  const divs = element.querySelectorAll('div');
  for (const div of divs) {
    if (div.querySelector('h1, h2, h3, h4, h5, h6')) {
      contentDiv = div;
      break;
    }
  }

  // 3. Extract heading, subheading, and CTA (link/button)
  let heading = null;
  let subheading = null;
  let cta = null;
  if (contentDiv) {
    heading = contentDiv.querySelector('h1, h2, h3, h4, h5, h6');
    // Subheading: first <p> after heading
    const paragraphs = contentDiv.querySelectorAll('p');
    if (paragraphs.length > 0) {
      subheading = paragraphs[0];
    }
    // CTA: first <a> or <button>
    cta = contentDiv.querySelector('a, button');
  }

  // 4. Compose content cell for row 3 (preserve semantic meaning)
  const contentCell = document.createElement('div');
  if (heading) contentCell.appendChild(heading);
  if (subheading) contentCell.appendChild(subheading);
  if (cta) contentCell.appendChild(cta);

  // 5. Build table rows (header, image, content)
  const headerRow = ['Hero (hero41)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [contentCell.childNodes.length ? contentCell : ''];

  // 6. Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  // 7. Replace the original element
  element.replaceWith(table);
}
