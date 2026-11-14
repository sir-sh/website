import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="content-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12">Blog</h1>

        {posts.length === 0 ? (
          <p className="content-muted text-center py-12">No posts yet.</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="p-8 rounded-2xl border content-card"
              >
                <div className="flex items-center gap-3 text-sm content-muted mb-3">
                  <time>{new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}</time>
                </div>
                <h2 className="text-2xl font-bold mb-3">
                  <Link href={`/blog/${post.slug}`} className="content-link">
                    {post.title}
                  </Link>
                </h2>
                <p className="content-muted mb-4">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="content-link text-sm font-medium"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}