import type { FieldErrors, Resolver } from "react-hook-form";
import type { ZodTypeAny, infer as ZodInfer } from "zod";

type ResolverError = {
  type: string;
  message: string;
};

const assignNestedError = (target: Record<string, unknown>, path: (string | number)[], value: ResolverError) => {
  if (path.length === 0) {
    target._root = value;
    return;
  }

  const [segment, ...rest] = path;
  const key = String(segment);

  if (rest.length === 0) {
    target[key] = value;
    return;
  }

  if (typeof target[key] !== "object" || target[key] === null) {
    target[key] = {};
  }

  assignNestedError(target[key] as Record<string, unknown>, rest, value);
};

export const zodResolver = <TSchema extends ZodTypeAny>(
  schema: TSchema
): Resolver<ZodInfer<TSchema>> =>
  async (values) => {
    const result = schema.safeParse(values);

    if (result.success) {
      return {
        values: result.data,
        errors: {}
      };
    }

    const fieldErrors: Record<string, unknown> = {};

    for (const issue of result.error.issues) {
      assignNestedError(fieldErrors, issue.path, {
        type: issue.code,
        message: issue.message
      });
    }

    return {
      values: {},
      errors: fieldErrors as FieldErrors<ZodInfer<TSchema>>
    };
  };

