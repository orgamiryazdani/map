import { Meta, StoryObj } from "@storybook/react";
import { Textbox } from "./textbox";

const meta: Meta<typeof Textbox> = {
  component: Textbox,
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      document.documentElement.classList.add("dark");
      return <Story />;
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Textbox>;

export const BrandColor: Story = {
  render: () => (
    <>
      <Textbox />
      <Textbox variant='neutral' />
      <Textbox variant='primary' />
      <Textbox variant='secondary' />
      <Textbox variant='accent' />
      <Textbox variant='ghost' />
    </>
  ),
};

export const StateColors: Story = {
  render: () => (
    <>
      <Textbox variant='success' />
      <Textbox variant='info' />
      <Textbox variant='warning' />
      <Textbox variant='error' />
    </>
  ),
};

export const TextboxSizes: Story = {
  render: () => (
    <>
      <Textbox
        variant='neutral'
        size='tiny'
      />
      <Textbox
        variant='neutral'
        size='small'
      />
      <Textbox
        variant='neutral'
        size='normal'
      />
      <Textbox
        variant='neutral'
        size='large'
      />
    </>
  ),
};

export const DisabledTextbox: Story = {
  render: () => (
    <>
      <Textbox
        variant='neutral'
        disabled
      />
    </>
  ),
};
