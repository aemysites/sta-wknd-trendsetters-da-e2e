/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate children of a given element
  function getDirectChildren(el, selector) {
    return Array.from(el.querySelectorAll(selector));
  }

  // 1. Find tab triggers (tab headers)
  // The first child div is the tab menu
  const tabMenu = element.children[0];
  // Each tab trigger is an anchor (<a>)
  const tabLinks = getDirectChildren(tabMenu, ':scope > a');

  // 2. Find tab content panels
  // The second child div is the tab content container
  const tabContentContainer = element.children[1];
  // Each tab panel is a direct child div of tabContentContainer
  const tabPanels = getDirectChildren(tabContentContainer, ':scope > div');

  // Defensive: Only proceed if tabLinks and tabPanels match
  if (tabLinks.length !== tabPanels.length || tabLinks.length === 0) {
    // If mismatch, do nothing
    return;
  }

  // 3. Build table rows
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  for (let i = 0; i < tabLinks.length; i++) {
    // Tab label: get the text content of the tab link (may be inside a <div> child)
    let label = tabLinks[i].textContent.trim();
    // Tab content: use the entire tab panel element
    const content = tabPanels[i];
    rows.push([label, content]);
  }

  // 4. Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // 5. Replace original element
  element.replaceWith(block);
}
