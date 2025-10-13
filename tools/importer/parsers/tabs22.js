/* global WebImporter */
export default function parse(element, { document }) {
  // Find tab navigation and content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  // Defensive: Ensure both exist
  if (!tabMenu || !tabContent) return;

  // Get tab triggers and content panels
  const tabLinks = tabMenu.querySelectorAll('.w-tab-link');
  const tabPanes = tabContent.querySelectorAll('.w-tab-pane');

  // Defensive: Ensure counts match
  if (tabLinks.length !== tabPanes.length) return;

  // Block header row (must match spec exactly)
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // For each tab, extract label and content
  for (let i = 0; i < tabLinks.length; i++) {
    const link = tabLinks[i];
    // Tab label: Use the inner text of the child div if present, else fallback to link text
    let label = link.querySelector('div') ? link.querySelector('div').textContent.trim() : link.textContent.trim();
    // Tab content: Use the entire tab pane's main content (reference, do not clone)
    const pane = tabPanes[i];
    // Prefer the grid child for semantic grouping, else use pane itself
    let contentBlock = pane.querySelector('.w-layout-grid') || pane;
    rows.push([label, contentBlock]);
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
