
import { Node, Element as SlateElement, Text } from 'slate';

// Serializer function to convert field nodes to {{field_id}} format
export const serializeToText = (nodes: Node[]): string => {
  return nodes
    .map((node) => {
      if (!Text.isText(node)) {
        const element = node as SlateElement & { type?: string, id?: string };
        if (element.type === 'field' && element.id) {
          // Serialize field node to {{field_id}} format
          return `{{${element.id}}}`;
        } else if ('children' in element) {
          // Recursively serialize children
          return serializeToText(element.children as Node[]);
        }
      } else {
        // Return plain text nodes as is
        return node.text;
      }
      return '';
    })
    .join('');
};

// Serializer function to convert nodes to HTML
export const serializeToHtml = (nodes: Node[]): string => {
  return nodes
    .map((node) => {
      if (!Text.isText(node)) {
        const element = node as SlateElement & { type?: string, id?: string, level?: number };
        if (element.type === 'field' && element.id) {
          // Convert field nodes to span elements with data attributes
          return `<span data-field="${element.id}">{{${element.id}}}</span>`;
        } else if ('children' in element) {
          // Recursively serialize children based on node type
          if (element.type === 'paragraph') {
            return `<p>${serializeToHtml(element.children as Node[])}</p>`;
          } else if (element.type === 'heading' && element.level) {
            const level = element.level || 1;
            return `<h${level}>${serializeToHtml(element.children as Node[])}</h${level}>`;
          }
          return serializeToHtml(element.children as Node[]);
        }
      } else {
        return node.text;
      }
      return '';
    })
    .join('');
};
