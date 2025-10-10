/* global WebImporter */
export default function parse(element, { document }) {
  // Find tab menu and tab content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  // Defensive: If missing required containers, abort
  if (!tabMenu || !tabContent) return;

  // Extract tab labels (anchors)
  const tabLinks = Array.from(tabMenu.querySelectorAll('.w-tab-link'));
  // Extract tab panels (content)
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));

  // Defensive: Only process if tab count matches panel count
  if (tabLinks.length !== tabPanes.length || tabLinks.length === 0) return;

  // Header row (block name)
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // For each tab, extract label and content
  for (let i = 0; i < tabLinks.length; i++) {
    const link = tabLinks[i];
    // Tab label: Use the text content of the anchor's inner div
    let label = '';
    const labelDiv = link.querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = link.textContent.trim();
    }

    // Tab content: Use the whole grid/layout inside the tab pane
    const pane = tabPanes[i];
    let contentBlock = null;
    // Prefer the grid-layout or w-layout-grid inside pane
    contentBlock = pane.querySelector('.w-layout-grid, .grid-layout');
    if (!contentBlock) {
      // Fallback: use the pane itself
      contentBlock = pane;
    }

    // Reference the existing node, do not clone
    rows.push([label, contentBlock]);
  }

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
