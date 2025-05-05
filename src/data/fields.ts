
import { Field } from '../types/plate-types';

export const AVAILABLE_FIELDS: Field[] = [
  {
    id: 'first_name',
    label: 'First Name',
    description: 'The first name of the recipient'
  },
  {
    id: 'last_name',
    label: 'Last Name',
    description: 'The last name of the recipient'
  },
  {
    id: 'email',
    label: 'Email',
    description: 'The email address of the recipient'
  },
  {
    id: 'company',
    label: 'Company',
    description: 'The company name'
  },
  {
    id: 'job_title',
    label: 'Job Title',
    description: 'The job title of the recipient'
  },
  {
    id: 'address',
    label: 'Address',
    description: 'The address of the recipient'
  },
  {
    id: 'city',
    label: 'City',
    description: 'The city of the recipient'
  },
  {
    id: 'state',
    label: 'State',
    description: 'The state of the recipient'
  },
  {
    id: 'zip',
    label: 'ZIP Code',
    description: 'The ZIP code of the recipient'
  },
  {
    id: 'phone',
    label: 'Phone',
    description: 'The phone number of the recipient'
  }
];

// Helper function to find a field by ID
export const findFieldById = (id: string): Field | undefined => {
  return AVAILABLE_FIELDS.find(field => field.id === id);
};
