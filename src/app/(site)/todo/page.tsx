
import type { ResolvingMetadata } from "next";
import { buildPageMetadata } from "@/libs/metadata";
import TodoClient from "./TodoClient";
import { getTodo } from "@/services/getTodo";


export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata
) {
  return buildPageMetadata("ToDo", "ToDoページです。", parent);
}

const Todo = async() => {

const { todos } = await getTodo();

  return <TodoClient initialData={todos}/>;
}

export default Todo
