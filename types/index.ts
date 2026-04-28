export type Level = 1 | 2 | 3 | 4 | 5;

export type Area =
  | "Linux"
  | "Redes"
  | "Seguridad"
  | "Reconocimiento"
  | "Pentesting"
  | "Malware"
  | "Binarios";

export interface Book {
  id: string;
  level: Level;
  area: Area;
  title: string;
  url: string;
}

export interface LevelGroup {
  level: Level;
  label: string;
  description: string;
  books: Book[];
}
