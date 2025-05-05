
import { Node } from 'slate';

// Serializer function to convert field nodes to {{field_id}} format
export const serializeToText = (nodes: Node[]): string => {
  return nodes
    .map((node) => {
      if (node.type === 'field' && 'id' in node) {
        // Serialize field node to {{field_id}} format
        return `{{${node.id}}}`;
      } else if ('text' in node) {
        // Return plain text nodes as is
        return node.text;
      } else if ('children' in node) {
        // Recursively serialize children
        return serializeToText(node.children as Node[]);
      }
      return '';
    })
    .join('');
};

// Serializer function to convert nodes to HTML
export const serializeToHtml = (nodes: Node[]): string => {
  return nodes
    .map((node) => {
      if (node.type === 'field' && 'id' in node) {
        // Convert field nodes to span elements with data attributes
        return `<span data-field="${node.id}">{{${node.id}}}</span>`;
      } else if ('text' in node) {
        // Return plain text nodes as is
        return node.text;
      } else if ('children' in node) {
        // Recursively serialize children based on node type
        if (node.type === 'paragraph') {
          return `<p>${serializeToHtml(node.children as Node[])}</p>`;
        } else if (node.type === 'heading') {
          const level = (node as any).level || 1;
          return `<h${level}>${serializeToHtml(node.children as Node[])}</h${level}>`;
        }
        return serializeToHtml(node.children as Node[]);
      }
      return '';
    })
    .join('');
};
