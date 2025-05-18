import React from 'react';
import DiscussItem from '../components/DiscussItem';
import { store } from '../../.storybook/preview';

const thread = {
  ...store.getState().threads[0],
  user: { ...store.getState().users[0] },
};

const stories = {
  title: 'Disscuss Item',
  component: DiscussItem,
  tags: ['autodocs'],
};

export default stories;

const TemplateStory = (args) => <DiscussItem {...args} />;

const Small = TemplateStory.bind({});
const Medium = TemplateStory.bind({});
const Large = TemplateStory.bind({});
const ExtraLarge = TemplateStory.bind({});

const argTypes = {
  thread: {
    control: 'object',
  },
  size: {
    control: 'select',
    options: ['card-sm', 'card-md', 'card-lg', 'card-xl'],
  },
  bg: {
    control: 'select',
    options: ['bg-base-100', 'bg-base-200', 'bg-base-300'],
  },
  shadow: {
    control: 'select',
    options: ['shadow-sm', 'shadow-md', 'shadow-lg'],
  },
};

Medium.argTypes = argTypes;
Small.argTypes = argTypes;
Large.argTypes = argTypes;
ExtraLarge.argTypes = argTypes;

Small.args = {
  thread,
  size: 'card-sm',
  bg: 'bg-base-200',
  shadow: 'shadow-md',
};

Medium.args = {
  thread,
  size: 'card-md',
  bg: 'bg-base-200',
  shadow: 'shadow-md',
};

Large.args = {
  thread,
  size: 'card-lg',
  bg: 'bg-base-200',
  shadow: 'shadow-md',
};

ExtraLarge.args = {
  thread,
  size: 'card-xl',
  bg: 'bg-base-200',
  shadow: 'shadow-md',
};

export { Small, Medium, Large, ExtraLarge };
