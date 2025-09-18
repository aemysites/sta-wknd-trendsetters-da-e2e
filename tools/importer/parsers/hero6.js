/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only run if element is a header with expected structure
  if (!element || !element.querySelector) return;

  // Header row for the block table
  const headerRow = ['Hero (hero6)'];

  // --- Row 2: Background Image ---
  // Find the image with a src attribute inside the header
  let imageEl = null;
  const images = element.querySelectorAll('img');
  if (images.length > 0) {
    // Prefer image with class 'cover-image', otherwise first image
    imageEl = Array.from(images).find(img => img.classList.contains('cover-image')) || images[0];
  }
  // If found, use the image element directly
  const imageRow = [imageEl ? imageEl : ''];

  // --- Row 3: Content (headline, subheading, CTA) ---
  // Find the card containing the content
  let cardEl = null;
  const cards = element.querySelectorAll('.card');
  if (cards.length > 0) {
    cardEl = cards[0];
  }
  // Defensive: If not found, try to find the first div with a heading inside
  if (!cardEl) {
    cardEl = element.querySelector('h1')?.parentElement || '';
  }
  // Use the card element directly for the content cell
  const contentRow = [cardEl ? cardEl : ''];

  // --- Assemble table ---
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
