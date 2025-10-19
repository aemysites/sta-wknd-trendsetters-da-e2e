/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout
  const grid = element.querySelector('.w-layout-grid');
  const gridChildren = Array.from(grid.children);

  // --- Extract Video Embed ---
  let videoEmbedCell = null;
  const videoEmbedDiv = gridChildren.find((c) => c.querySelector('.w-embed-youtubevideo'));
  if (videoEmbedDiv) {
    const embed = videoEmbedDiv.querySelector('.w-embed-youtubevideo');
    const img = embed.querySelector('img');
    const iframe = embed.querySelector('iframe');
    let videoLink = null;
    if (iframe && iframe.src) {
      videoLink = document.createElement('a');
      videoLink.href = iframe.src;
      videoLink.textContent = iframe.title || 'Watch video';
      videoLink.target = '_blank';
      videoLink.rel = 'noopener';
    }
    const cellContent = [];
    if (img) cellContent.push(img);
    if (videoLink) cellContent.push(videoLink);
    videoEmbedCell = cellContent.length === 1 ? cellContent[0] : cellContent;
  }

  // --- Extract Headings and Text ---
  // Only include the main visible heading (not the screen-reader-only h1)
  const mainHeading = gridChildren.find((c) => c.classList.contains('h1-heading'));
  // Subheading
  const subheadingDiv = gridChildren.find((c) => c.querySelector('p.subheading'));
  const subheading = subheadingDiv ? subheadingDiv.querySelector('p.subheading') : null;
  // CTA buttons
  const buttonGroup = gridChildren.find((c) => c.classList.contains('button-group'));
  const ctas = buttonGroup ? Array.from(buttonGroup.querySelectorAll('a')) : [];

  // Compose text cell: main heading, subheading, CTAs
  const textCellContent = [];
  if (mainHeading) textCellContent.push(mainHeading);
  if (subheading) textCellContent.push(subheading);
  if (ctas.length) textCellContent.push(...ctas);

  // --- Table Construction ---
  const headerRow = ['Hero (hero25)'];
  const rows = [
    headerRow,
    [videoEmbedCell],
    [textCellContent]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
