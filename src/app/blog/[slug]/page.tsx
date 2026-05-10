import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { HeroVisual } from '@/components/luxury/AmbientBackground';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | sir.sh Blog`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="relative py-32 text-center">
        <h1 className="text-headline text-gray-900 mb-4">Post not found</h1>
        <Link href="/blog" className="text-amber-600 hover:underline">← Back to blog</Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <HeroVisual variant="light" />
      
      <article className="relative py-32 max-w-3xl mx-auto px-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-amber-600 mb-12 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          Back to blog
        </Link>

        <header className="mb-16 animate-fade-in">
          <div className="text-sm text-gray-500 mb-4">
            <time className="text-caption">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <h1 className="text-headline text-gray-900 mb-6">{post.title}</h1>
          <p className="text-xl text-gray-500 font-light leading-relaxed">{post.excerpt}</p>
        </header>

        <div 
          className="prose-luxury animate-fade-in-up"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}