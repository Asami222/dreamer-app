import { TabGroup, TabPanel, TabPanels } from '@headlessui/react'
import type { Category, Todo} from 'src/types/data'
import UserTodoListContainer from 'src/containers/UserTodoListContainer'
import { Fragment } from 'react';
import Separator from 'src/components/atoms/Separator'
import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { TodoUIModel } from "src/types/data";
import { CategoryTabs } from "./TodoClient";
import { toTodosUI } from "src/utils/transform";
import { getUserTodosWithImageUrl } from "@/libs/todo";
import type { ResolvingMetadata } from "next";
import { buildPageMetadata } from "@/libs/metadata";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata
) {
  return buildPageMetadata("Todo", "Todoページです。", parent);
}

const E2E_TODOS: TodoUIModel[] = [
  {
    id: "todo-1",
    title: "テストTodo",
    description: "詳細テキスト",
    category: "day",
    star: 3,
    image: '',
    limit: [10],
    detail: '',
  },
];

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

const Todo = async() => {

  const isE2E = process.env.NEXT_PUBLIC_E2E_TEST === "true"
  let todos: TodoUIModel[]

  if (isE2E) {
    // E2E時：認証・DBを完全スキップ
    todos = E2E_TODOS
  } else {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) notFound(); 
  const userId = user.id;

  const todosWithImageUrl = await getUserTodosWithImageUrl(userId)
  todos = toTodosUI(todosWithImageUrl)
  }

  

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
      <div className='w-full overflow-hidden flex flex-col gap-[24px] mt-6'>
        <TabGroup>
          <CategoryTabs categories={categories}/>
          <Separator />
          <TabPanels>
          { allCategory.map(({label}) => (
              <TabPanel key={label} className="pb-[48px]">
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

export default Todo
