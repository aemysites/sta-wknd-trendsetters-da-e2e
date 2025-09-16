/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Cards (cards33)'];

  // Get all direct card links (each card is an <a> element)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Build rows for each card
  const rows = cardLinks.map((cardLink) => {
    // Each card's inner grid contains the image and text content
    const innerGrid = cardLink.querySelector(':scope > div');
    if (!innerGrid) return null;

    // Get the image (first child of innerGrid)
    const img = innerGrid.querySelector('img');

    // Get the text content (second child of innerGrid)
    // Defensive: find the div that contains heading, paragraph, etc.
    const contentDiv = Array.from(innerGrid.children).find(
      (child) => child !== img && child.tagName === 'DIV'
    );

    // If image or contentDiv is missing, skip this card
    if (!img || !contentDiv) return null;

    // Cell 1: image element
    const imageCell = img;

    // Cell 2: text content (heading, description, tags, read time, CTA)
    // Reference the entire contentDiv for resilience
    const textCell = contentDiv;

    return [imageCell, textCell];
  }).filter(Boolean); // Remove any nulls from skipped cards

  // Compose the full table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
