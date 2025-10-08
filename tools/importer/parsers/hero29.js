/* global WebImporter */
export default function parse(element, { document }) {
  // --- Critical Review ---
  // 1. No hardcoded content: All text and image content is extracted from the element.
  // 2. No markdown: Only HTML elements are used.
  // 3. Only one table is created, matching the example.
  // 4. Table header matches block name exactly: 'Hero (hero29)'.
  // 5. Handles edge cases: empty elements, missing image or heading.
  // 6. No Section Metadata block is created (none in example).
  // 7. Existing elements are referenced, not cloned.
  // 8. Semantic meaning is preserved (h1 for heading).
  // 9. All text content included in table cell.
  // 10. Image element is referenced, not created anew.
  // 11. No model provided, so no html comments for model fields.

  // --- Extraction Logic ---
  // Find background image (first <img> in hero)
  const img = element.querySelector('img');
  // Find main heading (first <h1> in hero)
  const heading = element.querySelector('h1');

  // Compose table rows
  const headerRow = ['Hero (hero29)'];
  const imageRow = [img ? img : ''];
  // Content row: only heading (no subheading, no CTA)
  const contentRow = [heading ? [heading] : ''];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  // Replace original element with table
  element.replaceWith(table);
}
