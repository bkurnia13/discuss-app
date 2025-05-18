import React from 'react';
import useInput from '../hooks/useInput';
import InputField from '../components/InputField';
import EmailIcon from '../assets/icons/EmailIcon';

const stories = {
  title: 'Input Field',
  component: InputField,
  tags: ['autodocs'],
};

export default stories;

const TemplateStory = (args) => {
  const [input, onInputChange] = useInput('');

  return (
    <InputField {...args} value={input} onChange={onInputChange}>
      <EmailIcon />
    </InputField>
  );
};

const Small = TemplateStory.bind({});
const Medium = TemplateStory.bind({});
const Large = TemplateStory.bind({});
const ExtraLarge = TemplateStory.bind({});

const argTypes = {
  type: {
    control: 'select',
    options: ['text', 'email', 'password'],
  },
  placeholder: {
    control: 'text',
  },
  disabled: {
    control: 'boolean',
  },
  size: {
    control: 'select',
    options: ['input-sm', 'input-md', 'input-lg', 'input-xl'],
  },
  color: {
    control: 'select',
    options: ['input-primary', 'input-secondary', 'input-error'],
  },
};

Small.argTypes = argTypes;
Medium.argTypes = argTypes;
Large.argTypes = argTypes;
ExtraLarge.argTypes = argTypes;

const defaultArgs = {
  type: 'email',
  placeholder: 'Email',
  disabled: false,
  color: 'input-primary',
};

Small.args = {
  ...defaultArgs,
  size: 'input-sm',
};

Medium.args = {
  ...defaultArgs,
  size: 'input-md',
};

Large.args = {
  ...defaultArgs,
  size: 'input-lg',
};

ExtraLarge.args = {
  ...defaultArgs,
  size: 'input-xl',
};

export { Small, Medium, Large, ExtraLarge };
