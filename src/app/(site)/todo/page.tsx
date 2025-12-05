import { prisma } from "src/libs/prisma";
import { TabGroup, TabPanel, TabPanels } from '@headlessui/react'
//import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next'
//import getAllTodos from 'services/todos/get-all-todos'
import type { Category, Todo} from 'src/types/data'
import UserTodoListContainer from 'src/containers/UserTodoListContainer'
//import getUser from 'services/users/get-user'
//import getAllUsers from 'services/users/get-all-users'
import { Fragment } from 'react';
import Separator from 'src/components/atoms/Separator'
//import { useMyTodosContext } from "contexts/TodoContext"
//import { getTodo } from 'src/services/getTodo'
import { notFound } from "next/navigation";
import { getServerSession } from "src/libs/auth";
//import { TodoCategory } from '@prisma/client';
import { toTodosUI } from "src/utils/transform";
import { TodoUIModel } from "src/types/data";
import { CategoryTabs } from "./TodoClient";
//import { useRouter } from 'next/router'


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

  const session = await getServerSession();
  const userId = session?.user?.id;

  if (!userId) notFound();

  const todo = await prisma.todo.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  const todos = toTodosUI(todo)


/*
  const [session, { todos }] = await Promise.all([
    getServerSession(),
    getTodo({revalidate: 10}),
  ]);
  if (!getTodo || !session?.user) {
    notFound();
  }
*/
  /*
  const { myTodos,setTodo } = useMyTodosContext()
  useEffect(() => {
    setTodo(todos)
  }, [setTodo, todos]);
  */
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
