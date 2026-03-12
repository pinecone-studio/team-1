type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Record<string, boolean | undefined | null>
  | ClassValue[];

const isStringOrNumber = (input: ClassValue): input is string | number =>
  typeof input === 'string' || typeof input === 'number';

const isFalsyOrBoolean = (
  input: ClassValue,
): input is boolean | null | undefined => !input || typeof input === 'boolean';

const toClassNameFromObject = (
  input: Record<string, boolean | undefined | null>,
): string[] =>
  Object.entries(input)
    .filter(([, enabled]) => Boolean(enabled))
    .map(([className]) => className);

function toClassName(input: ClassValue): string[] {
  if (isFalsyOrBoolean(input)) {
    return [];
  }

  if (isStringOrNumber(input)) {
    return [String(input)];
  }

  if (Array.isArray(input)) {
    return input.flatMap(toClassName);
  }

  return toClassNameFromObject(input);
}

export function cn(...inputs: ClassValue[]) {
  return inputs.flatMap(toClassName).join(' ');
}
