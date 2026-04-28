export const cn = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(" ");

export const normalize = (input: string): string =>
  input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
