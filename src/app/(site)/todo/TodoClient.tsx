'use client';

import { TabGroup, TabPanel, TabPanels } from '@headlessui/react'
import type { Category } from 'src/types/data'
import UserTodoListContainer from 'src/containers/UserTodoListContainer'
import { Fragment, useEffect } from 'react';
import Separator from 'src/components/atoms/Separator'
import { TodoUIModel } from "src/types/data";
import { CategoryTabs } from "./CategoryTabs";
import { useTodos } from '@/hooks/useTodos';
import { useGlobalSpinnerActionsContext } from "src/contexts/GlobalSpinnerContext";

export type Categories = {
 label: string
 category: Category
}

const categories: Categories[] = [
  {
    label: 'すべて',
    category: 'all'
  },
  {
    label: '年',
    category: 'year'
  },
  {
    label: '月',
    category: 'month'
  },
  {
    label: '週',
    category: 'week'
  },
  {
    label: '日',
    category: 'day'
  },
  {
    label: '時間',
    category: 'time'
  }
]

const TodoClient = () => {

  const { data: todos = [], isLoading } = useTodos()
  const setGlobalSpinner = useGlobalSpinnerActionsContext()

  useEffect(() => {
    setGlobalSpinner(isLoading)

    return () => {
      setGlobalSpinner(false)
    }
  }, [isLoading, setGlobalSpinner])

  const yearCategory = todos.filter((todo) => todo.category === 'year')
  const monthCategory = todos.filter((todo) => todo.category === 'month')
  const weekCategory = todos.filter((todo) => todo.category === 'week')
  const dayCategory = todos.filter((todo) => todo.category === 'day')
  const timeCategory = todos.filter((todo) => todo.category === 'time')

  const categoryNameDict: Record<string, TodoUIModel[]> = {
    year: yearCategory,
    month: monthCategory,
    week: weekCategory,
    day: dayCategory,
    time: timeCategory
  }

  const allCategory = categories.filter(c => c.category === 'all')
  const otherCategory = categories.filter(c => c.category !== 'all')
  //const thisCategory = categories.filter(c => Object.keys(categoryNameDict).map(t => t === c.category))

  return (
      <div className='w-full overflow-hidden flex flex-col gap-6 mt-6 mb-16'>
        <TabGroup>
          <CategoryTabs categories={categories}/>
          <Separator />
          <TabPanels>
          { allCategory.map(({label}) => (
              <TabPanel key={label} className="pb-12">
                { otherCategory.map(({label,category}) => (
                  <Fragment key={label}>
                    <div className='my-2 text-center'>
                      <h2 className='text-[16px] font-normal leading-[1.4] text-(--text)'>
                        {categoryNameDict[category].length === 0 ? '' : `${label}`}
                      </h2>
                    </div>
                    <UserTodoListContainer todos={categoryNameDict[category]} period={label} />
                  </Fragment>
                ))}
              </TabPanel>
            ))}
            { otherCategory.map(({label,category}) => (
              <TabPanel key={label} className="py-[54px] px-0">
                <UserTodoListContainer todos={categoryNameDict[category]} period={label}/>
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
  )
}

export default TodoClient
