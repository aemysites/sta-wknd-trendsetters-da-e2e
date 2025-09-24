/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children of a node
  function getImmediateChildren(node, selector = '*') {
    return Array.from(node.children).filter((child) => child.matches(selector));
  }

  // Find the main grid layout inside the section
  const container = element.querySelector('.container');
  if (!container) return;

  // The main grid contains: heading, paragraph, and a nested grid for the bottom row
  const mainGrid = container.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Get top-level children of the main grid
  const mainGridChildren = getImmediateChildren(mainGrid);
  if (mainGridChildren.length < 3) return;

  // 1. Header row
  const headerRow = ['Columns block (columns27)'];

  // 2. First content row: two columns
  // Left column: heading, divider, avatar, name/title
  // Right column: testimonial text, divider, logo

  // Left column content
  const leftColContent = [];
  // Heading
  leftColContent.push(mainGridChildren[0]);
  // Divider (from nested grid)
  const nestedGrid = mainGridChildren[2];
  if (!nestedGrid) return;
  const nestedGridChildren = getImmediateChildren(nestedGrid);
  if (nestedGridChildren.length < 3) return;
  leftColContent.push(nestedGridChildren[0]); // divider
  // Avatar + name/title
  leftColContent.push(nestedGridChildren[1]);

  // Right column content
  const rightColContent = [];
  // Testimonial paragraph
  rightColContent.push(mainGridChildren[1]);
  // Divider (from nested grid)
  rightColContent.push(nestedGridChildren[0].cloneNode(true)); // divider (clone for right side)
  // Logo (last child in nested grid)
  rightColContent.push(nestedGridChildren[2]);

  // Compose table rows
  const rows = [
    headerRow,
    [leftColContent, rightColContent]
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
