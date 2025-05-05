
import { PlateEditor, insertNodes, withTransforms } from '@udecode/plate-common';
import { createFieldElement } from './field-plugin';

// Regex to match {{field_id}} patterns
const FIELD_PATTERN = /{{([a-z_]+)}}/i;

export const withAutofield = (editor: PlateEditor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]) => {
    // Only apply to text nodes
    if (node.text !== undefined) {
      const text = node.text;
      const match = FIELD_PATTERN.exec(text);
      
      // If we find a {{field_id}} pattern
      if (match) {
        const [fullMatch, fieldId] = match;
        const start = match.index;
        const end = start + fullMatch.length;
        
        // Split the text and insert the field node
        const beforeText = text.slice(0, start);
        const afterText = text.slice(end);
        
        // Create a field element
        const fieldElement = createFieldElement(fieldId);
        
        // Delete the original text
        editor.delete({
          at: {
            path,
            offset: start,
          },
          distance: fullMatch.length,
          unit: 'character',
        });
        
        // Insert the field element
        insertNodes(editor, fieldElement, {
          at: {
            path,
            offset: start,
          },
          select: true,
        });
        
        return;
      }
    }

    // Fall through to the original normalizeNode
    normalizeNode([node, path]);
  };

  return editor;
};

export const autoFieldPlugin = {
  key: 'autofield',
  withOverrides: withAutofield,
};
