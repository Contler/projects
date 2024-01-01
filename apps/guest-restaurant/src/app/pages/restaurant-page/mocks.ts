import { InputType } from '@contler/dynamic-form';

export const FormMock = [
  {
    active: true,
    description: 'Radio input',
    option: ['Option 1', 'Option 2', 'Option 3'],
    required: true,
    type: InputType.RADIO,
  },
  {
    active: true,
    description: 'Multiselect',
    option: ['Option 1', 'Option 2', 'Option 3'],
    required: true,
    type: InputType.MULTI_SELECT,
  },
  {
    active: true,
    description: 'Text input',
    required: true,
    type: InputType.TEXT,
  },
  {
    active: true,
    description: 'Multi select with quantities',
    option: ['Option 1', 'Option 2', 'Option 3'],
    required: true,
    type: InputType.MULTISELECT_WITH_QUANTITY,
  },
];
