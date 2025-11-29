import { Category2 } from 'src/types/data';
import TodoForm from 'src/components/organisms/TodoForm'
//import type { Metadata } from "next";


const AddTodo = async({params}: {params: Promise<{ category: Category2}>}) => {
  const { category } =  await params;

  return (
      <div className='mt-4 mb-[80px]'>
        <TodoForm category={category}/>
      </div>
  )
}

export default AddTodo



