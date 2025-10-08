/* global WebImporter */
export default function parse(element, { document }) {
  // Tabs (tabs22) block parsing
  // 1. Find tab headers (anchors in tab menu)
  // 2. Find tab content panels (w-tab-pane)
  // 3. Build table: header row, then one row per tab: [label, content]

  // Helper: Get immediate child divs
  const topDivs = Array.from(element.querySelectorAll(':scope > div'));
  if (topDivs.length < 2) return; // Defensive: must have menu and content

  // Tab menu (headers)
  const tabMenu = topDivs.find(div => div.classList.contains('w-tab-menu'));
  // Tab content panels
  const tabContent = topDivs.find(div => div.classList.contains('w-tab-content'));

  if (!tabMenu || !tabContent) return;

  // Get tab label anchors
  const tabLinks = Array.from(tabMenu.querySelectorAll('a[role="tab"]'));
  // Get tab panes (content)
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));

  // Defensive: Only proceed if counts match
  if (tabLinks.length !== tabPanes.length || tabLinks.length === 0) return;

  // Build rows: header, then [label, content] for each tab
  const rows = [];
  rows.push(['Tabs (tabs22)']);

  for (let i = 0; i < tabLinks.length; i++) {
    const link = tabLinks[i];
    // Tab label: Use inner text of the label div inside anchor
    let label = '';
    const labelDiv = link.querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = link.textContent.trim();
    }

    // Tab content: Use the entire tab pane content
    const pane = tabPanes[i];
    // Defensive: If pane is empty, use blank div
    let contentElem = pane;
    if (!pane || !pane.childNodes.length) {
      contentElem = document.createElement('div');
    }

    rows.push([label, contentElem]);
  }

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
