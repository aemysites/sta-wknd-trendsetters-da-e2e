/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // Get tab menu and tab content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  // Defensive: If missing, do nothing
  if (!tabMenu || !tabContent) return;

  // Get tab labels (in order)
  const tabLinks = Array.from(tabMenu.querySelectorAll('a.w-tab-link'));

  // Get tab panes (in order)
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));

  // Defensive: If mismatch, do nothing
  if (tabLinks.length !== tabPanes.length || tabLinks.length === 0) return;

  // Table header row
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // Build each tab row: [label, content]
  for (let i = 0; i < tabLinks.length; i++) {
    // Tab label: use inner text of the div inside the link
    const labelDiv = tabLinks[i].querySelector('div');
    let labelContent = labelDiv ? labelDiv.textContent.trim() : tabLinks[i].textContent.trim();
    // Tab content: use the direct content grid inside the pane
    // Defensive: If grid missing, use pane itself
    const grid = tabPanes[i].querySelector('.w-layout-grid') || tabPanes[i];
    rows.push([labelContent, grid]);
  }

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
