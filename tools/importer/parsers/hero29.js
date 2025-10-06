/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the background image (first <img> descendant)
  function findBackgroundImage(el) {
    const imgs = el.querySelectorAll('img');
    if (imgs.length > 0) return imgs[0];
    return '';
  }

  // Helper to find the title (first h1 descendant)
  function findTitle(el) {
    return el.querySelector('h1');
  }

  // Helper to find subheading (first h2 after h1)
  function findSubheading(el, title) {
    if (!title) return null;
    let next = title.nextElementSibling;
    while (next) {
      if (next.tagName === 'H2') return next;
      next = next.nextElementSibling;
    }
    return null;
  }

  // Helper to find CTA (first <a> descendant)
  function findCTA(el) {
    return el.querySelector('a');
  }

  // --- Extraction ---
  // 1. Header row
  const headerRow = ['Hero (hero29)'];

  // 2. Background Image row
  const bgImg = findBackgroundImage(element);
  const bgImgRow = [bgImg];

  // 3. Content row (title, subheading, CTA)
  // Find the content container (usually the text container)
  let contentContainer = null;
  const possibleContainers = Array.from(element.querySelectorAll('div'));
  for (const div of possibleContainers) {
    if (div.querySelector('h1')) {
      contentContainer = div;
      break;
    }
  }
  if (!contentContainer) contentContainer = element;

  const title = findTitle(contentContainer);
  const subheading = findSubheading(contentContainer, title);
  const cta = findCTA(contentContainer);

  // Compose content cell
  const contentCell = [];
  if (title) contentCell.push(title);
  if (subheading) contentCell.push(subheading);
  // Add all paragraphs after subheading
  if (subheading) {
    let next = subheading.nextElementSibling;
    while (next) {
      if (next.tagName === 'P') {
        contentCell.push(next);
      }
      next = next.nextElementSibling;
    }
  }
  // Add CTA if present and not already included
  if (cta && !contentCell.includes(cta)) contentCell.push(cta);

  // Defensive: if contentCell is empty, grab all headings and paragraphs in contentContainer
  if (contentCell.length === 0) {
    contentCell.push(...contentContainer.querySelectorAll('h1, h2, h3, h4, h5, h6, p'));
  }

  // Filter out empty elements
  const filteredContentCell = contentCell.filter(
    (el) => el && (el.textContent.trim() || el.tagName === 'IMG')
  );

  const contentRow = [filteredContentCell.length > 0 ? filteredContentCell : ''];

  // Assemble table
  const tableCells = [headerRow, bgImgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace original element
  element.replaceWith(table);
}
