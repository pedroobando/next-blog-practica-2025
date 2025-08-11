import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Dot } from 'lucide-react';

export default async function Page({ params }: { params: Promise<{ tagid: string }> }) {
  const { tagid } = await params;

  const findTag = await prisma.tag.findFirst({ where: { id: tagid }, include: { articles: true } });
  if (!findTag) {
    return <h2>`Etiqueta ${tagid} no encontrada.`</h2>;
  }

  return (
    <main className="px-4 py-4 md:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {`Tag: ${findTag.name}`}
        </h2>

        <ul role="list" className="space-y-3 mt-5">
          {findTag.articles.map((item) => (
            <Link href={`/blog/${item.slug}`} key={item.id} className="flex gap-3 my-2">
              <Dot aria-hidden className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
              <div>
                <p className="font-medium leading-6">{item.title}</p>
                {item.title ? (
                  <p className="text-sm text-muted-foreground">
                    {item.content?.substring(0, 160)}...
                  </p>
                ) : null}
              </div>
            </Link>
          ))}
        </ul>
      </article>
    </main>
  );
}
