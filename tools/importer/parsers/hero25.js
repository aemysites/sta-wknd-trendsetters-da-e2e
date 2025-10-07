/* global WebImporter */
export default function parse(element, { document }) {
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Find main heading (large text, visible only)
  const heading = children.find((el) => el.classList.contains('h1-heading'));

  // Find video embed container
  const videoContainer = children.find((el) =>
    el.classList.contains('utility-position-relative')
  );
  let videoEmbed = null;
  if (videoContainer) {
    videoEmbed = videoContainer.querySelector('.w-embed-youtubevideo');
  }

  // Find subheading paragraph
  const subheadingDiv = children.find((el) => el.querySelector('p.subheading'));
  let subheading = null;
  if (subheadingDiv) subheading = subheadingDiv.querySelector('p.subheading');

  // Find CTA buttons
  const buttonGroup = children.find((el) => el.classList.contains('button-group'));
  let ctas = [];
  if (buttonGroup) {
    ctas = Array.from(buttonGroup.querySelectorAll('a'));
  }

  // --- Table Construction ---
  const headerRow = ['Hero (hero25)'];

  // Row 2: Background image or video embed (convert iframe to link)
  let mediaCell = null;
  if (videoEmbed) {
    // Find img (thumbnail)
    const img = videoEmbed.querySelector('img');
    // Find iframe and convert to a link (using its title if present)
    const iframe = videoEmbed.querySelector('iframe');
    let videoLink = null;
    if (iframe && iframe.src) {
      videoLink = document.createElement('a');
      videoLink.href = iframe.src;
      videoLink.textContent = iframe.title || 'Watch video';
    }
    // Compose media cell: include img and link (not iframe)
    const mediaFrag = document.createDocumentFragment();
    if (img) mediaFrag.appendChild(img.cloneNode(true));
    if (videoLink) mediaFrag.appendChild(videoLink);
    mediaCell = mediaFrag;
  }

  // Row 3: Content (main heading, subheading, CTA)
  const contentCell = [];
  if (heading) {
    // Convert to h1 for semantic heading if it's not already
    let hElem = heading;
    if (heading.tagName.toLowerCase() !== 'h1') {
      const h1 = document.createElement('h1');
      h1.innerHTML = heading.innerHTML;
      hElem = h1;
    }
    contentCell.push(hElem);
  }
  if (subheading) contentCell.push(subheading);
  if (ctas.length) contentCell.push(...ctas);

  // Compose table rows
  const rows = [
    headerRow,
    [mediaCell],
    [contentCell]
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
