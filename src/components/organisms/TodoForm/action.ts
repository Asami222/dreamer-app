"use server";

import { getServerSession } from "src/libs/auth";
import { prisma } from "src/libs/prisma";
import { ZodError } from "zod";
//import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { validateFormData, transformFieldErrors } from "src/utils/validate";
import { handleError, errors, type FormState, handleSuccess } from "src/utils/state";
import { todoSchema } from "./schema";
import type { TodoInput } from "./schema";


export async function createTodo(
  prevState: FormState<TodoInput>,
  formData: FormData,
): Promise<FormState<TodoInput>> {
  const session = await getServerSession();
  if (!session) return handleError(prevState, errors[401]);

  const userId = session.user.id;
  
  try {
    const payload = validateFormData(formData, todoSchema);
    const { todo, image, limit1, limit2, detail, description, starNum, category } = payload;
    const limit1Arr = limit1  ? [limit1] : [];
    const limit2Arr = limit2 ? [limit2] : [];
    const imageUrl = image?.[0]?.src ?? "";
    console.log("limit1",limit1)
    console.log("limit2",limit2)
    let limit: number[] = [];
    if (limit1Arr.length || limit2Arr.length) {
      limit = [...limit1Arr, ...limit2Arr];
    }
    
    await prisma.todo.create({
      data: {
        user: {
          connect: { id: userId } // ← Userの紐付けが必要！
        },
        image: imageUrl,
        todo,
        category,
        limit,
        detail,
        description,
        starNum,
      }
    });
/*
    await prisma.todo.create({
      data: { 
      user: {
        connect: { id: userId } // ← Userの紐付けが必要！
      },
        todo: "test",
        limit: [1, 2, 3],
        category
      },
    });
*/
    revalidateTag("todos", "max");
    return handleSuccess(prevState);

    //return handleSuccess(prevState);
  } catch (err) {
    if (err instanceof ZodError) {
      return handleError(prevState, {
        ...errors[400],
        fieldErrors: transformFieldErrors(err),
      });
    }
    return handleError(prevState, errors[500]);
  }
}