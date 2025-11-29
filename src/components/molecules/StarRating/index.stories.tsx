import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { StarRating1, StarRating2 } from "./index";

const meta: Meta<typeof StarRating1> = {
  title: "Molecules/StarRating",
  component: StarRating1,
};

export default meta;

// StarRating1 の Story
export const StarRating1Story: StoryFn<typeof StarRating1> = () => {
  const [value, setValue] = useState(3);
  return <StarRating1 value={value} setValue={setValue} />;
};

// StarRating2 の Story
export const StarRating2Story: StoryFn<typeof StarRating2> = () => {
  return <StarRating2 num={4} />;
};