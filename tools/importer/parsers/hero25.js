/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero25)'];

  // Defensive: get direct children of the main grid layout
  const grid = element.querySelector('.grid-layout');
  const children = grid ? Array.from(grid.children) : [];

  // --- Extract background image or embed (row 2) ---
  let backgroundMediaCell = null;
  // Find the embed container (YouTube)
  const embedContainer = children.find(child => child.querySelector('.w-embed-youtubevideo'));
  if (embedContainer) {
    const embedDiv = embedContainer.querySelector('.w-embed-youtubevideo');
    // If there's an image (YouTube placeholder), include it
    const img = embedDiv.querySelector('img');
    // If there's an iframe, convert to a link (not embed)
    const iframe = embedDiv.querySelector('iframe');
    let videoLink = null;
    if (iframe && iframe.src) {
      videoLink = document.createElement('a');
      videoLink.href = iframe.src;
      // Use the iframe's title for link text if present
      videoLink.textContent = iframe.title && iframe.title.trim() ? iframe.title : 'Watch video';
    }
    // Compose cell: image (if present) and video link (if present)
    const cellContent = [];
    if (img) cellContent.push(img);
    if (videoLink) cellContent.push(videoLink);
    backgroundMediaCell = cellContent.length === 1 ? cellContent[0] : cellContent;
  }
  // If no embed, cell is empty
  if (!backgroundMediaCell) backgroundMediaCell = '';

  // --- Extract text content and CTA (row 3) ---
  // Main headline: visible headline only (not visually hidden h1)
  const headingDiv = children.find(child => child.classList.contains('h1-heading'));
  let mainHeadline = null;
  if (headingDiv) {
    // Use the exact text and wrap in a heading tag (h1)
    const h1 = document.createElement('h1');
    h1.textContent = headingDiv.textContent;
    mainHeadline = h1;
  }

  // Subheading: paragraph with class 'subheading'
  const subheadingDiv = children.find(child => child.querySelector('.subheading'));
  const subheading = subheadingDiv ? subheadingDiv.querySelector('.subheading') : null;

  // CTA buttons: div with class 'button-group'
  const buttonGroupDiv = children.find(child => child.classList.contains('button-group'));
  let ctaLinks = [];
  if (buttonGroupDiv) {
    ctaLinks = Array.from(buttonGroupDiv.querySelectorAll('a'));
  }

  // Compose text/CTA cell
  const textCellContent = [];
  if (mainHeadline) textCellContent.push(mainHeadline);
  if (subheading) textCellContent.push(subheading);
  if (ctaLinks.length) textCellContent.push(...ctaLinks);
  const textCell = textCellContent.length === 1 ? textCellContent[0] : textCellContent;

  // Compose table rows
  const rows = [
    headerRow,
    [backgroundMediaCell],
    [textCell],
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
