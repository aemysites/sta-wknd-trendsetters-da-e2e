/* global WebImporter */
export default function parse(element, { document }) {
  // Find tab menu and tab content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  // Defensive: If either is missing, abort
  if (!tabMenu || !tabContent) return;

  // Get tab triggers (tab headers)
  const tabLinks = Array.from(tabMenu.querySelectorAll('.w-tab-link'));
  // Get tab panes (tab contents)
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));

  // Defensive: If counts mismatch, abort
  if (tabLinks.length !== tabPanes.length) return;

  // Table header row
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // For each tab, extract label and content
  for (let i = 0; i < tabLinks.length; i++) {
    const link = tabLinks[i];
    // Tab label: Use the inner text of the tab link (may have a div inside)
    let label = '';
    // Try to get the text from the child div if present
    const labelDiv = link.querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = link.textContent.trim();
    }

    // Tab content: Use the entire tab pane content
    const pane = tabPanes[i];
    if (!pane) continue;
    // Get the first grid-layout div inside the pane (contains heading and image)
    const grid = pane.querySelector('.grid-layout');
    // If grid is present, use it; else use pane itself
    const content = grid ? grid : pane;

    // Add row: [label, content]
    rows.push([label, content]);
  }

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
