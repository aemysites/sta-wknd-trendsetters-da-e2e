/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element is present
  if (!element) return;

  // Header row for the block table
  const headerRow = ['Tabs (tabs22)'];

  // Find tab menu and tab content containers
  const tabMenu = Array.from(element.children).find(child => child.classList.contains('w-tab-menu'));
  const tabContent = Array.from(element.children).find(child => child.classList.contains('w-tab-content'));
  if (!tabMenu || !tabContent) return;

  // Get tab labels from menu
  const tabLinks = Array.from(tabMenu.querySelectorAll('a.w-tab-link'));
  // Get tab panes from content
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));

  // Defensive: Ensure labels and panes match
  if (tabLinks.length !== tabPanes.length) return;

  // Build rows for each tab
  const rows = tabLinks.map((tabLink, i) => {
    // Tab label: Use the inner content of the tab link (usually a div)
    let labelContent = tabLink.querySelector('div') || tabLink;
    // Tab content: Use the entire pane's inner grid (usually a div)
    // Defensive: Find the first child div inside the pane
    let paneGrid = tabPanes[i].querySelector('div');
    // If not found, fallback to the pane itself
    if (!paneGrid) paneGrid = tabPanes[i];
    return [labelContent, paneGrid];
  });

  // Compose the table data
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
