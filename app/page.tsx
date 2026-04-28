import { Archive } from "@/components/Archive";
import { BOOKS, LEVEL_GROUPS } from "@/data/books";

export default function HomePage() {
  return (
    <>
      <Archive />
      <StructuredData />
    </>
  );
}

function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "hacking-archive · cybersecurity reading roadmap",
    description:
      "Libros de ciberseguridad organizados por nivel y área temática.",
    numberOfItems: BOOKS.length,
    itemListElement: LEVEL_GROUPS.flatMap((group) =>
      group.books.map((book, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "Book",
          name: book.title,
          url: book.url,
          genre: book.area,
          inLanguage: "en",
          additionalProperty: {
            "@type": "PropertyValue",
            name: "level",
            value: group.label,
          },
        },
      })),
    ),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
