import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth/auth';
import Image from 'next/image';

import { ArticleNew } from '@/article';

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect('/api/auth/signin');

  return (
    <section className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 flex justify-between items-center">
          {session.user?.name}
          <span className="flex flex-row items-center">
            <span className="text-muted-foreground text-sm mr-4">{session.user?.email}</span>
            <Image
              className="w-10 h-10 rounded-full shadow-gray-300 shadow"
              src={session.user?.image || '/placeholder.svg'}
              height={100}
              width={100}
              alt={session.user?.name!}
            />
          </span>
        </h1>

        <section>
          <ArticleNew />
        </section>
      </div>
    </section>
  );
}
