
import { Editor, Range, Transforms, Text, Node } from 'slate';
import { ReactEditor } from 'slate-react';
import { createFieldElement } from './field-plugin';

// Regex to match {{field_id}} patterns
const FIELD_PATTERN = /{{([a-z_]+)}}/i;

export const withAutofield = (editor: Editor & ReactEditor) => {
  const { insertText } = editor;

  editor.insertText = (text) => {
    const { selection } = editor;

    // If we don't have a valid selection, insert text normally
    if (!selection || !Range.isCollapsed(selection)) {
      insertText(text);
      return;
    }

    // Get the current line of text
    const currentLineRange = Editor.before(editor, selection, { unit: 'line' });
    const lineStart = currentLineRange ? Editor.before(editor, currentLineRange, { unit: 'character' }) : selection.anchor;
    const line = lineStart && Editor.string(editor, { anchor: lineStart, focus: selection.anchor });
    
    // Check if ending a field pattern
    if (text === '}' && line && line.endsWith('}')) {
      const lineWithNewChar = line + text;
      const match = FIELD_PATTERN.exec(lineWithNewChar);
      
      if (match) {
        const [fullMatch, fieldId] = match;
        const startPos = lineWithNewChar.indexOf(fullMatch);
        const fieldStart = {
          path: selection.anchor.path,
          offset: selection.anchor.offset - fullMatch.length + 1
        };

        // Delete the field text pattern
        Transforms.delete(editor, {
          at: {
            anchor: fieldStart,
            focus: selection.anchor
          }
        });

        // Create and insert the field element
        const fieldElement = createFieldElement(fieldId);
        Transforms.insertNodes(editor, fieldElement);
        return;
      }
    }

    // Default: insert text normally
    insertText(text);
  };

  return editor;
};

export const autoFieldPlugin = {
  withOverrides: withAutofield
};
