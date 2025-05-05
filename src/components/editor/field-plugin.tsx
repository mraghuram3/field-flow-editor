
import React from 'react';
import { Editor, Element as SlateElement } from 'slate';
import { FieldElement as FieldElementComponent } from './FieldElement';
import { FieldElement } from '../../types/plate-types';
import { findFieldById } from '../../data/fields';

// Helper to create elements for the field plugin
export const createFieldElement = (id: string): FieldElement => {
  const field = findFieldById(id);
  return {
    type: 'field',
    id,
    label: field?.label || id,
    children: [{ text: '' }],
  };
};

// Create the plugin factory
export const createFieldPlugin = () => ({
  isElement: true,
  isVoid: true,
  isInline: true,

  // Handle field nodes
  renderElement: (props: any) => {
    if (props.element.type === 'field') {
      return <FieldElementComponent {...props} />;
    }
    return undefined;
  },
  
  // Deserialize from {{field_id}} format
  deserialize: {
    element: (el: HTMLElement) => {
      const fieldMatch = el.textContent?.match(/{{([a-z_]+)}}/i);
      if (fieldMatch) {
        const fieldId = fieldMatch[1];
        return createFieldElement(fieldId);
      }
      return undefined;
    }
  }
});

// Create the plugin instance
export const fieldPlugin = createFieldPlugin();
