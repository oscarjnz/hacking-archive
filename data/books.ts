import type { Book, LevelGroup } from "@/types";

const ARCHIVE_BASE =
  "https://archive.org/details/nmap-network-scanning-the-official-nmap-project-guide-to-network-discovery-and-s_202102";

const slugify = (input: string): string =>
  input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

const book = (
  level: Book["level"],
  area: Book["area"],
  title: string,
  path: string,
): Book => ({
  id: `n${level}-${slugify(title)}`,
  level,
  area,
  title,
  url: `${ARCHIVE_BASE}/${path}`,
});

export const BOOKS: Book[] = [
  // Nivel 1
  book(
    1,
    "Linux",
    "Linux Command Line and Shell Scripting Bible",
    "linux-command-line-and-shell-scripting-bible-by-richard-blum-christine-bresnahan%283rd%20Edition%20%29",
  ),
  book(
    1,
    "Linux",
    "Linux Administration Handbook, 2nd",
    "Linux%20Administration%20Handbook%2C%202nd",
  ),
  book(
    1,
    "Redes",
    "CompTIA Network+ Study Guide Exam N10-007",
    "CompTIA%20Network%2B%20Study%20Guide_%20Exam%20N10-007%20%28%20PDFDrive%20%29",
  ),
  book(
    1,
    "Seguridad",
    "CompTIA Security+ Study Guide Exam SY0-501",
    "CompTIA%20Security%2B%20Study%20Guide_%20Exam%20SY0-501%20%28%20PDFDrive%20%29",
  ),
  book(
    1,
    "Seguridad",
    "Principles of Computer Security CompTIA Security+ and Beyond",
    "Principles%20of%20Computer%20Security%20CompTIA%20Security_%20and%20Beyond%20Labregory%20White%20%26%20Wm.%20Arthur%20Conklin%20%26%20Matthew%20Hirsch%20%26%20Corey%20Schou",
  ),

  // Nivel 2
  book(
    2,
    "Linux",
    "Linux - The Complete Reference",
    "Linux%20-%20The%20Complete%20Reference",
  ),
  book(
    2,
    "Linux",
    "Sybex Linux System Administration",
    "Sybex.Linux.System.Administration.eBook-EEn",
  ),
  book(
    2,
    "Reconocimiento",
    "Nmap Network Scanning",
    "Nmap%20Network%20Scanning_%20The%20Official%20Nmap%20Project%20Guide%20to%20Network%20Discovery%20and%20Security%20Scanning%20%28%20PDFDrive%20%29",
  ),

  // Nivel 3
  book(
    3,
    "Pentesting",
    "Penetration Testing: A Hands-On Introduction to Hacking",
    "Penetration%20testing%20a%20Hands-on%20introduction%20to%20Hacking%20%28%20PDFDrive%20%29",
  ),
  book(
    3,
    "Pentesting",
    "CompTIA Pentest+ Study Guide Exam PT0-001",
    "Comptia%20Pentest%2B%20Study%20Guide_%20Exam%20Pt0-001%20%28%20PDFDrive%20%29",
  ),
  book(
    3,
    "Pentesting",
    "Ethical Hacking and Penetration Testing Guide",
    "Ethical%20Hacking%20and%20Penetration%20Testing%20Guide%20%28%20PDFDrive%20%29",
  ),

  // Nivel 4
  book(
    4,
    "Pentesting",
    "The Hacker Playbook",
    "The%20Hacker%20Playbook_%20Practical%20Guide%20To%20Penetration%20Testing%20%28%20PDFDrive%20%29",
  ),
  book(
    4,
    "Pentesting",
    "The Hacker Playbook 2",
    "The%20Hacker%20Playbook%202_%20Practical%20Guide%20To%20Penetration%20Testing%20%28%20PDFDrive%20%29",
  ),
  book(
    4,
    "Pentesting",
    "The Hacker Playbook 3",
    "The%20Hacker%20Playbook%203_%20Practical%20Guide%20To%20Penetration%20Testing%20%28%20PDFDrive%20%29",
  ),
  book(
    4,
    "Seguridad",
    "Gray Hat Hacking: The Ethical Hacker's Handbook",
    "Gray%20Hat%20Hacking%20The%20Ethical%20Hacker%E2%80%99s%20Handbook%20%28%20PDFDrive%20%29",
  ),

  // Nivel 5
  book(
    5,
    "Malware",
    "Practical Malware Analysis",
    "Practical%20Malware%20Analysis_%20The%20Hands-On%20Guide%20to%20Dissecting%20Malicious%20Software%20%28%20PDFDrive%20%29",
  ),
  book(
    5,
    "Malware",
    "Rootkits and Bootkits",
    "Rootkits%20and%20Bootkits_%20Reversing%20Modern%20Malware%20and%20Next%20Generation%20Threats%20%28%20PDFDrive%20%29",
  ),
  book(
    5,
    "Binarios",
    "Practical Binary Analysis",
    "Practical%20Binary%20Analysis.%20Build%20Your%20Own%20Linux%20Tools%20for%20Binary%20Instrumentation%2C%20Analysis%2C%20and%20Disassembly%20%28%20PDFDrive%20%29",
  ),
];

export const LEVEL_META: Record<
  Book["level"],
  { label: string; description: string }
> = {
  1: {
    label: "Nivel 1",
    description: "Fundamentos: Linux, redes y seguridad base.",
  },
  2: {
    label: "Nivel 2",
    description: "Administración avanzada y reconocimiento.",
  },
  3: {
    label: "Nivel 3",
    description: "Introducción al pentesting práctico.",
  },
  4: {
    label: "Nivel 4",
    description: "Pentesting avanzado y hacking ético.",
  },
  5: {
    label: "Nivel 5",
    description: "Análisis de malware e ingeniería inversa.",
  },
};

export const LEVEL_GROUPS: LevelGroup[] = (
  Object.keys(LEVEL_META) as unknown as Array<keyof typeof LEVEL_META>
)
  .map((key) => Number(key) as Book["level"])
  .sort((a, b) => a - b)
  .map((level) => ({
    level,
    label: LEVEL_META[level].label,
    description: LEVEL_META[level].description,
    books: BOOKS.filter((b) => b.level === level),
  }));

export const ALL_AREAS: Book["area"][] = Array.from(
  new Set(BOOKS.map((b) => b.area)),
).sort((a, b) => a.localeCompare(b)) as Book["area"][];
