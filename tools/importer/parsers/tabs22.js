/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // Get tab menu and content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  // Defensive: If missing structure, do nothing
  if (!tabMenu || !tabContent) return;

  // Get tab labels
  const tabLinks = getDirectChildren(tabMenu, 'a');
  // Get tab panes
  const tabPanes = getDirectChildren(tabContent, '.w-tab-pane');

  // Defensive: If mismatch, do nothing
  if (tabLinks.length !== tabPanes.length || tabLinks.length === 0) return;

  // Table header row
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // For each tab, extract label and content
  for (let i = 0; i < tabLinks.length; i++) {
    const tabLink = tabLinks[i];
    // Tab label: use the inner text of the label div inside the link
    let tabLabel = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv) {
      tabLabel = labelDiv.textContent.trim();
    } else {
      tabLabel = tabLink.textContent.trim();
    }

    // Tab content: use the direct grid div inside the pane
    const tabPane = tabPanes[i];
    // Defensive: find the grid div (content container)
    let tabContentDiv = tabPane.querySelector('.grid-layout');
    let tabContentElem = tabContentDiv || tabPane;
    // Place the content element directly in the cell
    rows.push([tabLabel, tabContentElem]);
  }

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(table);
}
