
import React, { useState, useMemo } from 'react';
import { createPlateUI, Plate, PlateEditor, TElement, TText, createPlugins } from '@udecode/plate-core';
import { fieldPlugin } from './field-plugin';
import { autoFieldPlugin } from './autofield-plugin';
import FieldSelector from './FieldSelector';
import { serializeToText } from './serializer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Initial editor value
const initialValue: TElement[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Welcome! Try typing {{first_name}} or use the field selector.' }],
  },
];

// Define plugins
const plugins = createPlugins([
  fieldPlugin,
  autoFieldPlugin,
], {
  components: createPlateUI(),
});

const FieldEditor: React.FC = () => {
  const [editor, setEditor] = useState<PlateEditor | null>(null);
  const [value, setValue] = useState<TElement[]>(initialValue);
  const [serialized, setSerialized] = useState<string>('');
  
  // Memoize the editor
  const onEditorChange = useMemo(
    () => (newValue: TElement[]) => {
      setValue(newValue);
    },
    []
  );

  const handleSave = () => {
    if (value) {
      const serializedText = serializeToText(value);
      setSerialized(serializedText);
      alert('Content saved! Check console for serialized output.');
      console.log('Serialized content:', serializedText);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full min-h-[400px]">
      <div className={cn(
        "flex-1 border rounded-md shadow-sm overflow-hidden",
        "flex flex-col"
      )}>
        <div className="bg-gray-50 border-b px-4 py-2 flex justify-between items-center">
          <h3 className="font-medium text-sm">Editor</h3>
          <Button size="sm" onClick={handleSave}>
            Save Content
          </Button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1">
          <Plate
            plugins={plugins}
            initialValue={initialValue}
            onChange={onEditorChange}
            editableProps={{
              placeholder: 'Type here...',
              className: 'outline-none min-h-[250px] prose prose-sm max-w-none',
            }}
            onEditorChange={setEditor}
          />
        </div>

        {serialized && (
          <div className="bg-gray-50 border-t px-4 py-3">
            <h4 className="text-sm font-medium mb-1">Serialized Output:</h4>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
              {serialized}
            </pre>
          </div>
        )}
      </div>
      
      <div className="md:w-72 w-full">
        {editor && <FieldSelector editor={editor} />}
      </div>
    </div>
  );
};

export default FieldEditor;
