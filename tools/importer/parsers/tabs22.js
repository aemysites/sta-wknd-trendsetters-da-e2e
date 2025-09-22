/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  function getImmediateChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // Header row as specified
  const headerRow = ['Tabs (tabs22)'];

  // Get tab menu and tab content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  // Defensive: If either missing, abort
  if (!tabMenu || !tabContent) return;

  // Get all tab menu links (labels)
  const tabLinks = Array.from(tabMenu.querySelectorAll('a.w-tab-link'));
  // Get all tab panes (contents)
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));

  // Defensive: If mismatch, abort
  if (tabLinks.length !== tabPanes.length || tabLinks.length === 0) return;

  // Build rows for each tab
  const rows = tabLinks.map((tabLink, i) => {
    // Get tab label text (from the inner div)
    let label = tabLink.querySelector('div');
    // Defensive: fallback to tabLink text
    if (!label) label = document.createTextNode(tabLink.textContent.trim());

    // Tab content: use the grid inside the pane if present, else the pane itself
    let contentEl = tabPanes[i].querySelector('.w-layout-grid') || tabPanes[i];
    // Defensive: if not found, fallback to pane
    if (!contentEl) contentEl = tabPanes[i];

    return [label, contentEl];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element
  element.replaceWith(block);
}
