// import type { Meta, StoryObj } from "@storybook/react";
// import { fn } from "@storybook/test";
// import { Button } from "./Button";

// // A simple placeholder icon component
// const PlaceholderIcon = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 16 16"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M8 0C3.58 0 0 3.58 0 8C0 12.42 3.58 16 8 16C12.42 16 16 12.42 16 8C16 3.58 12.42 0 8 0ZM8 14C4.69 14 2 11.31 2 8C2 4.69 4.69 2 8 2C11.31 2 14 4.69 14 8C14 11.31 11.31 14 8 14Z"
//       fill="currentColor"
//     />
//     <path
//       d="M8 4C7.45 4 7 4.45 7 5V7H5C4.45 7 4 7.45 4 8C4 8.55 4.45 9 5 9H7V11C7 11.55 7.45 12 8 12C8.55 12 9 11.55 9 11V9H11C11.55 9 12 8.55 12 8C12 7.45 11.55 7 11 7H9V5C9 4.45 8.55 4 8 4Z"
//       fill="currentColor"
//     />
//   </svg>
// );

// const meta = {
//   title: "Components/Button",
//   component: Button,
//   parameters: {
//     layout: "centered",
//   },
//   tags: ["autodocs"],
//   argTypes: {
//     children: {
//       control: "text",
//     },
//     variant: {
//       control: "select",
//       options: ["primary", "secondary", "danger", "success"],
//     },
//     size: {
//       control: "select",
//       options: ["small", "medium", "large"],
//     },
//     fullWidth: {
//       control: "boolean",
//     },
//     icon: {
//       control: {
//         disable: true, // We can't control ReactNodes easily in Storybook controls
//       },
//     },
//     iconPos: {
//       control: "select",
//       options: ["left", "right"],
//     },
//   },
//   args: { onClick: fn() },
// } satisfies Meta<typeof Button>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// export const Primary: Story = {
//   args: {
//     variant: "primary",
//     children: "Button",
//   },
// };

// export const Secondary: Story = {
//   args: {
//     variant: "secondary",
//     children: "Button",
//   },
// };

// export const Large: Story = {
//   args: {
//     size: "large",
//     children: "Button",
//   },
// };

// export const Small: Story = {
//   args: {
//     size: "small",
//     children: "Button",
//   },
// };

// export const WithIconLeft: Story = {
//   args: {
//     variant: "primary",
//     children: "Icon Left",
//     icon: <PlaceholderIcon />,
//     iconPos: "left",
//   },
// };

// export const WithIconRight: Story = {
//   args: {
//     variant: "secondary",
//     children: "Icon Right",
//     icon: <PlaceholderIcon />,
//     iconPos: "right",
//   },
// };

// export const IconOnly: Story = {
//   args: {
//     variant: "primary",
//     size: "medium",
//     children: "",
//     icon: <PlaceholderIcon />,
//   },
// };
