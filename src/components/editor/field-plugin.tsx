
import React from 'react';
import { 
  PlatePlugin,
  createPluginFactory, 
  createPluginOptions
} from '@udecode/plate-common';
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
export const createFieldPlugin = createPluginFactory({
  key: 'field',
  isElement: true,
  isVoid: true, // Field nodes are void elements and cannot have children
  options: createPluginOptions(),

  // Render the field element component
  component: FieldElementComponent,

  // Deserialize from {{field_id}} format
  deserializeHtml: {
    rules: [
      {
        // Match {{field_id}} pattern
        validNodeName: ['SPAN'],
        getNode: (el) => {
          const fieldMatch = el.textContent?.match(/{{([a-z_]+)}}/i);
          if (fieldMatch) {
            const fieldId = fieldMatch[1];
            return createFieldElement(fieldId);
          }
          return undefined;
        },
      },
    ],
  },
  
  // Options to handle field nodes
  then: (editor) => {
    return editor;
  },
});

// Create the plugin instance
export const fieldPlugin: PlatePlugin = createFieldPlugin();
