/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the carousel images
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (each is a slide)
  const slideDivs = Array.from(grid.children);

  // Prepare the header row as required
  const headerRow = ['Carousel (carousel16)'];
  const rows = [headerRow];

  // For each slide, extract the image and any text content
  slideDivs.forEach((slideDiv) => {
    const img = slideDiv.querySelector('img');
    if (!img) return;

    // Try to find text content in the slideDiv
    const textContent = [];
    // Heading (h1-h6)
    const heading = slideDiv.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      textContent.push(heading.cloneNode(true));
    }
    // Paragraphs
    const paragraphs = slideDiv.querySelectorAll('p');
    paragraphs.forEach(p => {
      textContent.push(p.cloneNode(true));
    });
    // Links (call-to-action)
    const links = slideDiv.querySelectorAll('a');
    links.forEach(a => {
      textContent.push(a.cloneNode(true));
    });

    // Always push two columns per row: image and (possibly empty) text cell
    rows.push([img, textContent.length ? textContent : undefined]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
