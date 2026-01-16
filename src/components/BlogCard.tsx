import Image from 'next/image';
import Link from 'next/link';
import { Recipe } from '@/types/recipe';

interface BlogCardProps {
  post: Recipe;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
        {post.featuredImage?.node.sourceUrl && (
          <div className="relative h-64 w-full">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <time className="text-sm text-gray-500 mb-2 block">{formattedDate}</time>
          <h3 className="text-2xl font-semibold mb-3 group-hover:text-green-600 transition-colors">
            {post.title}
          </h3>
          {post.excerpt && (
            <div 
              className="text-gray-600 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          )}
        </div>
      </article>
    </Link>
  );
}
