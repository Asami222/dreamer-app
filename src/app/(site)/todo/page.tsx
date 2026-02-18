
import type { ResolvingMetadata } from "next";
import { buildPageMetadata } from "@/libs/metadata";
import TodoClient from "./TodoClient";


export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata
) {
  return buildPageMetadata("ToDo", "ToDoページです。", parent);
}

const Todo = async() => {

  return <TodoClient />;
}

export default Todo
