// WordPress API client for fetching recipes and blog posts via WPGraphQL

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://your-wordpress-site.com/graphql';

export async function fetchGraphQL(query, variables = {}) {
  const headers = { 'Content-Type': 'application/json' };

  console.log('Fetching from WordPress:', WORDPRESS_API_URL);

  const res = await fetch(WORDPRESS_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!res.ok) {
    console.error('HTTP Error:', res.status, res.statusText);
    throw new Error(`HTTP Error: ${res.status}`);
  }

  const json = await res.json();
  
  console.log('WordPress response:', JSON.stringify(json, null, 2));

  if (json.errors) {
    console.error('GraphQL Errors:', json.errors);
    throw new Error(`GraphQL Error: ${json.errors[0]?.message || 'Unknown error'}`);
  }

  return json;
}

// Fetch all recipes
export async function getAllRecipes() {
  const data = await fetchGraphQL(`
    query GetRecipes {
      posts(where: {categoryName: "recipe"}, first: 100) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          content
        }
      }
    }
  `);

  return data.data.posts.nodes;
}

// Fetch single recipe by slug
export async function getRecipeBySlug(slug) {
  const data = await fetchGraphQL(`
    query GetRecipeBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        content
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  `, { slug });

  return data.data.post;
}

// Fetch all blog posts
export async function getAllBlogPosts() {
  const data = await fetchGraphQL(`
    query GetBlogPosts {
      posts(where: {categoryIn: ["garlic-blog", "ginger-blog"]}, first: 100) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  `);

  return data.data.posts.nodes;
}

// Fetch single blog post by slug
export async function getBlogPostBySlug(slug) {
  const data = await fetchGraphQL(`
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        content
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  `, { slug });

  return data.data.post;
}

// Fetch featured recipes for home page
export async function getFeaturedRecipes(limit = 6) {
  const data = await fetchGraphQL(`
    query GetFeaturedRecipes($limit: Int!) {
      posts(where: {categoryName: "recipe"}, first: $limit) {
        nodes {
          id
          title
          slug
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  `, { limit });

  return data.data.posts.nodes;
}
