// Test script to check WordPress GraphQL connection
const WORDPRESS_API_URL = 'https://garlicandginger.ca/graphql';

async function testConnection() {
  console.log('Testing WordPress connection to:', WORDPRESS_API_URL);
  console.log('---');

  // Test 1: Simple query to check connection
  console.log('Test 1: Basic connection test');
  try {
    const res1 = await fetch(WORDPRESS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            generalSettings {
              title
              url
            }
          }
        `
      })
    });
    const data1 = await res1.json();
    console.log('✓ Connection successful!');
    console.log('Site:', data1.data?.generalSettings?.title);
    console.log('---');
  } catch (error) {
    console.error('✗ Connection failed:', error);
    return;
  }

  // Test 2: Check categories
  console.log('Test 2: Checking available categories');
  try {
    const res2 = await fetch(WORDPRESS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            categories(first: 100) {
              nodes {
                name
                slug
                count
              }
            }
          }
        `
      })
    });
    const data2 = await res2.json();
    console.log('Available categories:');
    data2.data?.categories?.nodes?.forEach((cat) => {
      console.log(`  - ${cat.name} (${cat.slug}) - ${cat.count} posts`);
    });
    console.log('---');
  } catch (error) {
    console.error('✗ Failed to fetch categories:', error);
  }

  // Test 3: Get all posts
  console.log('Test 3: Fetching recent posts');
  try {
    const res3 = await fetch(WORDPRESS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            posts(first: 10) {
              nodes {
                id
                title
                slug
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
    const data3 = await res3.json();
    console.log('Recent posts:');
    data3.data?.posts?.nodes?.forEach((post) => {
      const cats = post.categories?.nodes?.map(c => c.slug).join(', ') || 'none';
      console.log(`  - ${post.title} [${cats}]`);
    });
    console.log('---');
  } catch (error) {
    console.error('✗ Failed to fetch posts:', error);
  }

  // Test 4: Try fetching with category filter
  console.log('Test 4: Fetching posts by category "recipe"');
  try {
    const res4 = await fetch(WORDPRESS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            posts(where: {categoryName: "recipe"}, first: 10) {
              nodes {
                id
                title
                slug
              }
            }
          }
        `
      })
    });
    const data4 = await res4.json();
    if (data4.errors) {
      console.error('✗ GraphQL errors:', data4.errors);
    } else {
      console.log(`Found ${data4.data?.posts?.nodes?.length || 0} recipe posts`);
      data4.data?.posts?.nodes?.forEach((post) => {
        console.log(`  - ${post.title}`);
      });
    }
  } catch (error) {
    console.error('✗ Failed to fetch recipes:', error);
  }
}

testConnection();
