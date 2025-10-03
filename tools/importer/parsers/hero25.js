/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract background media (image or video)
  function getMediaCell(grid) {
    // Look for YouTube embed image first
    const youtubeEmbed = grid.querySelector('.w-embed-youtubevideo');
    if (youtubeEmbed) {
      const img = youtubeEmbed.querySelector('img');
      if (img) return img;
      const iframe = youtubeEmbed.querySelector('iframe');
      if (iframe && iframe.src) {
        const a = document.createElement('a');
        a.href = iframe.src;
        a.textContent = iframe.src;
        return a;
      }
    }
    // Fallback: any image or iframe
    const img = grid.querySelector('img');
    if (img) return img;
    const iframe = grid.querySelector('iframe');
    if (iframe && iframe.src) {
      const a = document.createElement('a');
      a.href = iframe.src;
      a.textContent = iframe.src;
      return a;
    }
    return '';
  }

  // Helper to extract content cell (title, subheading, CTA)
  function getContentCell(grid) {
    const content = [];
    // Title: .h1-heading or h1 (prefer .h1-heading if present)
    let title = grid.querySelector('.h1-heading');
    if (!title) title = grid.querySelector('h1');
    if (title) {
      if (title.tagName.toLowerCase() !== 'h1') {
        const h1 = document.createElement('h1');
        h1.innerHTML = title.innerHTML;
        content.push(h1);
      } else {
        content.push(title);
      }
    }
    // Subheading: .subheading
    const subheading = grid.querySelector('.subheading');
    if (subheading) content.push(subheading);
    // Paragraphs not in .subheading
    const paragraphs = Array.from(grid.querySelectorAll('p')).filter(p => !p.classList.contains('subheading'));
    paragraphs.forEach(p => content.push(p));
    // CTA buttons: .button-group
    const buttonGroup = grid.querySelector('.button-group');
    if (buttonGroup) content.push(buttonGroup);

    // Remove duplicates and invalid nested paragraphs
    // Only keep unique elements by reference and tag/content
    const seen = new Set();
    const deduped = [];
    content.forEach(el => {
      const key = el.tagName + '|' + el.textContent.trim();
      if (!seen.has(key)) {
        seen.add(key);
        // Avoid nested <p><p>...</p></p>
        if (el.tagName === 'P' && el.querySelector('p')) {
          // Flatten inner <p>
          Array.from(el.querySelectorAll('p')).forEach(innerP => {
            if (!seen.has('P|' + innerP.textContent.trim())) {
              seen.add('P|' + innerP.textContent.trim());
              deduped.push(innerP);
            }
          });
        } else {
          deduped.push(el);
        }
      }
    });
    return deduped;
  }

  // Find the grid layout inside the element
  const grid = element.querySelector('.grid-layout');

  // Compose table rows
  const headerRow = ['Hero (hero25)'];
  const mediaCell = [getMediaCell(grid)];
  const contentCell = [getContentCell(grid)];

  const cells = [
    headerRow,
    mediaCell,
    contentCell,
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
