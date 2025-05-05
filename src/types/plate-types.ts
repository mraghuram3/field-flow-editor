
import { Element, NodeEntry } from 'slate';
import { RenderElementProps } from 'slate-react';

// Extend Slate's Element type with our custom elements
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: { type?: string } & {
      type: 'paragraph' | 'field';
      children: CustomText[];
    };
    Text: CustomText;
  }
}

// Define our custom text
interface CustomText {
  text: string;
  bold?: boolean;
  italic?: boolean;
}

// Define our custom element types
export type CustomElementTypes = 'field';

// Define the structure of our field element
export interface FieldElement extends Element {
  type: 'field';
  id: string; // The field ID
  label: string; // Human-readable label
  children: [{ text: string }]; // Required by Slate
}

// Props for the field element component
export interface FieldElementProps {
  attributes: RenderElementProps['attributes'];
  children: RenderElementProps['children'];
  element: FieldElement;
  nodeProps?: Record<string, unknown>;
}

// Define available fields
export interface Field {
  id: string;
  label: string;
  description?: string;
}
