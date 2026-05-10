import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { HeroVisual } from '@/components/luxury/AmbientBackground';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="relative">
      <HeroVisual variant="light" />
      
      <div className="relative py-32 max-w-4xl mx-auto px-8">
        <div className="mb-16 animate-fade-in">
          <span className="text-caption text-amber-600 mb-4 block">Blog</span>
          <h1 className="text-headline text-gray-900 mb-4">Latest Updates</h1>
          <p className="text-xl text-gray-500 font-light">
            News, releases, and insights from the sir.sh team
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No posts yet. Check back soon.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post, i) => (
              <article
                key={post.slug}
                className="luxury-card p-10 group animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                  <time className="text-caption">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <h2 className="text-2xl font-light text-gray-900 mb-4 group-hover:text-amber-700 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-500 font-light mb-6 leading-relaxed">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors"
                >
                  Read more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}