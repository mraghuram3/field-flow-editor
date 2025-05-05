
import React from 'react';
import { AVAILABLE_FIELDS } from '../../data/fields';
import { Editor } from 'slate';
import { ReactEditor } from 'slate-react';
import { createFieldElement } from './field-plugin';
import { Tag } from 'lucide-react';

interface FieldSelectorProps {
  editor: Editor & ReactEditor;
}

const FieldSelector: React.FC<FieldSelectorProps> = ({ editor }) => {
  const handleFieldClick = (fieldId: string) => {
    // Insert a field node at the current selection
    const field = createFieldElement(fieldId);
    
    // First ensure our editor has focus
    if (!ReactEditor.isFocused(editor)) {
      ReactEditor.focus(editor);
    }
    
    // Insert the field at the current selection
    Editor.insertNode(editor, field);
  };

  return (
    <div className="p-4 bg-white border rounded-md shadow-sm">
      <div className="flex items-center mb-3 text-sm font-medium text-gray-500">
        <Tag className="w-4 h-4 mr-2" />
        <span>Insert Field</span>
      </div>
      <div className="space-y-1.5">
        {AVAILABLE_FIELDS.map((field) => (
          <button
            key={field.id}
            onClick={() => handleFieldClick(field.id)}
            className="flex flex-col w-full px-3 py-2 text-left transition-colors rounded-sm hover:bg-field-light"
          >
            <span className="font-medium text-sm">{field.label}</span>
            {field.description && (
              <span className="text-xs text-gray-500">{field.description}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FieldSelector;
