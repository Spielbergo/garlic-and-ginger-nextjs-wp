// More detailed test for recipe fetching
const WORDPRESS_API_URL = 'https://garlicandginger.ca/graphql';

async function detailedTest() {
  console.log('Testing different query approaches...\n');

  // Test with categoryId
  console.log('Test 1: Using category ID');
  try {
    const res = await fetch(WORDPRESS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            posts(where: {categoryId: 5}, first: 20) {
              nodes {
                id
                title
                status
              }
            }
          }
        `
      })
    });
    const data = await res.json();
    console.log(`Found ${data.data?.posts?.nodes?.length || 0} posts with categoryId 5`);
    console.log('---\n');
  } catch (error) {
    console.error('Error:', error.message);
  }

  // Test with just getting all posts and filtering
  console.log('Test 2: Getting all posts (to see status)');
  try {
    const res = await fetch(WORDPRESS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            posts(first: 20) {
              nodes {
                id
                title
                status
                categories {
                  nodes {
                    name
                    slug
                  }
                }
              }
            }
          }
        `
      })
    });
    const data = await res.json();
    const allPosts = data.data?.posts?.nodes || [];
    const recipePosts = allPosts.filter(p => 
      p.categories?.nodes?.some(c => c.slug === 'recipe')
    );
    console.log(`Total posts: ${allPosts.length}`);
    console.log(`Recipe posts: ${recipePosts.length}`);
    console.log('\nRecipe posts:');
    recipePosts.forEach(p => {
      console.log(`  - ${p.title} (${p.status})`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

detailedTest();
