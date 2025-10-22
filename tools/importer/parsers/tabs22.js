/* global WebImporter */
export default function parse(element, { document }) {
  // Find tab menu and tab content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  // Defensive: If missing required containers, abort
  if (!tabMenu || !tabContent) return;

  // Get all tab triggers (anchors/buttons)
  const tabLinks = Array.from(tabMenu.querySelectorAll('[role="tab"]'));
  // Get all tab panels
  const tabPanels = Array.from(tabContent.querySelectorAll('[role="tabpanel"]'));

  // Defensive: If counts mismatch, abort
  if (tabLinks.length !== tabPanels.length || tabLinks.length === 0) return;

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Tabs (tabs22)']);

  // For each tab, extract label and content
  for (let i = 0; i < tabLinks.length; i++) {
    const tabLabel = tabLinks[i].textContent.trim();
    // Defensive: If label is empty, skip
    if (!tabLabel) continue;

    // Tab content: Use the main content grid inside the panel
    const panel = tabPanels[i];
    // Find the grid-layout div inside the panel
    const grid = panel.querySelector('.grid-layout');
    // Defensive: If no grid, use panel itself
    const tabContentElem = grid || panel;
    // Reference the existing element, do not clone
    rows.push([
      tabLabel,
      tabContentElem
    ]);
  }

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(table);
}
