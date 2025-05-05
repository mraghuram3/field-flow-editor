
import { PlateElementProps, TElement } from '@udecode/plate-common';

// Define our custom element types
export type CustomElementTypes = 'field';

// Define the structure of our field element
export interface FieldElement extends TElement {
  type: 'field';
  id: string; // The field ID
  label: string; // Human-readable label
}

// Props for the field element component
export interface FieldElementProps extends PlateElementProps<FieldElement> {}

// Define available fields
export interface Field {
  id: string;
  label: string;
  description?: string;
}

declare module '@udecode/plate-common' {
  interface PlateElementsType {
    field: FieldElement;
  }
}
