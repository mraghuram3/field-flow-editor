
import React from 'react';
import { useSelected } from 'slate-react';
import { FieldElementProps } from '../../types/plate-types';

export const FieldElement: React.FC<FieldElementProps> = (props) => {
  const { attributes, children, element, nodeProps = {} } = props;
  const selected = useSelected();
  
  return (
    <span
      {...attributes}
      {...nodeProps}
      contentEditable={false}
      className={`inline-block px-1.5 py-0.5 mx-0.5 rounded-sm font-medium text-sm
        ${selected 
          ? 'bg-field-hover text-field-foreground ring-2 ring-field-border' 
          : 'bg-field-light text-field border border-field'
        }`}
      data-field-id={element.id}
    >
      {`{{${element.label}}}`}
      {children}
    </span>
  );
};

export default FieldElement;
