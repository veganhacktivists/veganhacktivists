import React from 'react';

import Label from '../../forms/inputs/label';
import SelectInput from '../../forms/inputs/selectInput';

import type { OptionType } from '../../forms/inputs/selectInput';

// TODO: Replace with actual bots
export type Bot = 'ENG' | 'DE';

// TODO: Handle differently once data is fetched dynamically
export const botAttributes: Record<
  Bot,
  { readonly label: string; readonly color: string }
> = {
  ENG: {
    label: 'English',
    color: '#DD3E2B',
  },
  DE: {
    label: 'German',
    color: '#7F3C97',
  },
};

/** Proptypes of `DateRangeSelectInput`. */
interface CategorySelectInputProps {
  /** The id of a category. */
  readonly category: string | undefined;
  /** Callback to set a new category. */
  readonly setCategory: (category: string) => void;
  /** The available categories list for the current `DataDashboardProject`. */
  readonly availableCategories: string[];
}

/**
 * Select input to choose a category.
 * @type {React.FC<CategorySelectInputProps>}
 * @return {React.ReactElement} A category select input.
 */
const CategorySelectInput: React.FC<CategorySelectInputProps> = ({
  category,
  setCategory,
  availableCategories,
}) => {
  const categoryOptions: OptionType<string>[] = [
    {
      value: 'All',
      label: 'All languages',
    },
  ].concat(
    availableCategories.map((c) => ({
      value: c,
      label: botAttributes[c as Bot]?.label ?? c,
    }))
  );

  return (
    <>
      <Label className="text-white" name="bot">
        Select bot
      </Label>
      <SelectInput
        updatable
        theme="data"
        name="bot"
        current={categoryOptions.find((d) => d.value == category) ?? null}
        options={categoryOptions}
        onChange={(option) => {
          if (option) {
            setCategory(option.value);
          }
        }}
      />
    </>
  );
};

export default CategorySelectInput;
