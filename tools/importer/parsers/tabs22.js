/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure we have the expected tab menu and content containers
  const tabMenu = Array.from(element.children).find(child => child.classList.contains('w-tab-menu'));
  const tabContent = Array.from(element.children).find(child => child.classList.contains('w-tab-content'));
  if (!tabMenu || !tabContent) return;

  // Get tab labels from tabMenu
  const tabLinks = Array.from(tabMenu.querySelectorAll('a.w-tab-link'));
  // Get tab panes from tabContent
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));

  // Defensive: ensure matching number of tabs and panes
  if (tabLinks.length !== tabPanes.length || tabLinks.length === 0) return;

  // Table header
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // For each tab, add a row: [label, content]
  for (let i = 0; i < tabLinks.length; i++) {
    // Tab label: use the inner text of the tab link (usually a div inside)
    let label = tabLinks[i].textContent.trim();
    // Tab content: reference the entire pane's main content (usually a grid)
    // Defensive: find the main grid inside the pane
    let grid = tabPanes[i].querySelector('.w-layout-grid');
    let content = grid ? grid : tabPanes[i];
    rows.push([label, content]);
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
