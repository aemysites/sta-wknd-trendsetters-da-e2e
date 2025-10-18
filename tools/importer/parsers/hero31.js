/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero31)'];

  // Background image row (none in this case)
  const imageRow = [''];

  // Find the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Extract author
  const author = children.find((el) => el.classList.contains('paragraph-xl'));

  // Extract tags, preserving their original casing
  const tagsContainer = children.find((el) => el.classList.contains('flex-vertical'));
  let tagsList = null;
  if (tagsContainer) {
    tagsList = document.createElement('div');
    Array.from(tagsContainer.querySelectorAll('.tag')).forEach(tag => {
      // Use the text content as-is, preserving casing
      const tagDiv = document.createElement('div');
      tagDiv.textContent = tag.textContent.trim();
      tagsList.appendChild(tagDiv);
    });
  }

  // Extract heading
  const heading = children.find((el) => el.tagName === 'H2');

  // Extract rich text paragraphs
  const richText = children.find((el) => el.querySelector('.rich-text'));
  const paragraphs = richText ? richText.querySelector('.rich-text') : null;

  // Compose content for the content row
  const contentElements = [];
  if (author) contentElements.push(author.cloneNode(true));
  if (tagsList) contentElements.push(tagsList);
  if (heading) contentElements.push(heading.cloneNode(true));
  if (paragraphs) {
    Array.from(paragraphs.children).forEach(p => {
      contentElements.push(p.cloneNode(true));
    });
  }

  const contentRow = [contentElements];

  // Assemble table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
