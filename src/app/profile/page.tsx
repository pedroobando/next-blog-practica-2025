import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth/auth';
import Image from 'next/image';

import { ArticleNew } from '@/article';

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect('/api/auth/signin');

  return (
    <section className="mt-2 my-4 p-4">
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {session.user?.name}
      </h1>
      <h2 className="mt-4 text-muted-foreground text-sm">{session.user?.email}</h2>
      <Image
        className=" mt-4 w-20 h-20 rounded-full shadow-gray-300 shadow"
        src={session.user?.image || '/placeholder.svg'}
        height={20}
        width={20}
        alt={session.user?.name!}
      />

      <section>
        <ArticleNew />
      </section>
    </section>
  );
}
