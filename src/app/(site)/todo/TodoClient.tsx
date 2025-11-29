'use client';

import { Tab, TabList } from '@headlessui/react';
import clsx from 'clsx';
import { Categories } from './page';
import { Fragment } from 'react';


export function CategoryTabs({ categories }: { categories: Categories[]}) {
  return (
    <TabList className="flex justify-between gap-[8px]">
      {categories.map(({ label }) => (
        <Tab key={label} as={Fragment}>
          {({ selected }) => (
            <button
              className={clsx(
                "py-1 px-2 text-[16px] bg-transparent border-b-3 border-[rgba(220,98,98,0)] focus:outline-none hover:outline-none",
                selected && "border-b-3 border-[rgba(220,98,98,100)]"
              )}
            >
              {label}
            </button>
          )}
        </Tab>
      ))}
    </TabList>
  );
}