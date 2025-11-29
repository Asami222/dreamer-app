
export type FieldErrors = Record<string, { message: string }>;

type Error = {
  message: string;
  status: number;
  fieldErrors?: FieldErrors;
};

export type FormStatus = "idle" | "submitting" | "success" | "error";

export type FormState<T> = T & {
  updatedAt: string;
  error: Error | null;
  status?: FormStatus;
};

export const handleSuccess = <T>(prevState: FormState<T>): FormState<T> => ({
  ...prevState,
  status: "success",
  updatedAt: Date.now().toString(),
  error: null,
});

export const handleError = <T>(prevState: FormState<T>,error: Error): FormState<T> => ({
  ...prevState,
  updatedAt: Date.now().toString(),
  error,
});

export const errors = {
  400: { message: "Bad Request", status: 400 },
  401: { message: "ログインしてください", status: 401 },
  500: { message: "エラーが発生しました", status: 500 },
};
