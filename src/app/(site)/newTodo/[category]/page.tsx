import { Category2 } from 'src/types/data';
import TodoForm from 'src/components/organisms/TodoForm'
import type { ResolvingMetadata } from "next";
import { buildPageMetadata } from "@/libs/metadata";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata
) {
  return buildPageMetadata("ToDo作成", "ToDo作成ページです。", parent);
}

const AddTodo = async({params}: {params: Promise<{ category: Category2}>}) => {
  const { category } =  await params;

  return (
      <div className='mt-4 mb-20'>
        <TodoForm category={category}/>
      </div>
  )
}

export default AddTodo



