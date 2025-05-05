
import React, { useState, useMemo } from 'react';
import { createEditor, Descendant, Editor, Element as SlateElement } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory, HistoryEditor } from 'slate-history';
import { fieldPlugin } from './field-plugin';
import { autoFieldPlugin } from './autofield-plugin';
import FieldSelector from './FieldSelector';
import { serializeToText } from './serializer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Initial editor value
const initialValue: Descendant[] = [
  {
    type: 'paragraph' as const,
    children: [{ text: 'Welcome! Try typing {{first_name}} or use the field selector.' }],
  },
];

// Define a custom element renderer
const Element = (props: any) => {
  const { attributes, children, element } = props;
  
  switch (element.type) {
    case 'field':
      return fieldPlugin.renderElement(props);
    default:
      return <p {...attributes}>{children}</p>;
  }
};

// Define a leaf renderer for text formatting
const Leaf = ({ attributes, children, leaf }: any) => {
  return <span {...attributes}>{children}</span>;
};

const FieldEditor: React.FC = () => {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [serialized, setSerialized] = useState<string>('');
  
  // Memoize the editor
  const editor = useMemo(() => {
    // Create our base editor with React and history plugins
    let baseEditor = withHistory(withReact(createEditor()));
    
    // Apply our custom plugins
    if (autoFieldPlugin.withOverrides) {
      baseEditor = autoFieldPlugin.withOverrides(baseEditor);
    }
    
    // Mark field nodes as void and inline
    const { isVoid, isInline } = baseEditor;
    
    baseEditor.isVoid = (element: any) => {
      return element.type === 'field' ? true : isVoid(element);
    };
    
    baseEditor.isInline = (element: any) => {
      return element.type === 'field' ? true : isInline(element);
    };
    
    return baseEditor;
  }, []);

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
          <Slate 
            editor={editor} 
            initialValue={value} 
            onChange={setValue}
          >
            <Editable
              placeholder="Type here..."
              className="outline-none min-h-[250px] prose prose-sm max-w-none"
              renderElement={Element}
              renderLeaf={Leaf}
            />
          </Slate>
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
        <FieldSelector editor={editor} />
      </div>
    </div>
  );
};

export default FieldEditor;
