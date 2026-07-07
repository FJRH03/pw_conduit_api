import { test, expect } from '@playwright/test';

// GET
test('Get Test Tags', async ({ request }) => {
  const tagsResponse = await request.get('https://conduit-api.bondaracademy.com/api/tags');

  // Parse responso object to JSON object. (a.k.a JSONFY)
  const responseJSON = await tagsResponse.json();

  // Assertions
  expect(tagsResponse.status()).toBe(200);
  expect(responseJSON.tags.length).toBeGreaterThan(0);
  expect(responseJSON.tags[0]).toEqual('Test');
  expect(responseJSON.tags.length).toBeLessThanOrEqual(10);

  // Log result in console
  console.log(JSON.stringify(responseJSON));
});


// GET
test('Get Test Articles', async ({ request }) => {

  // Get API Response
  const articlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=2&offset=0');

  // Parse responso object to JSON object.
  const articlesJSON = await articlesResponse.json();

  // Assertions
  expect(articlesResponse.status()).toBe(200);
  expect(articlesJSON.articles.length).toBeGreaterThan(0);

  // Log in console
  console.log(articlesJSON);
});


// POST
test('Create and Delete Test Article', async ({ request }) => {

  // Request Body
  const bodyData = { data: { "user": { "email": "franktest@test.com", "password": "Test1234" } } }

  // POST request and get the token in response
  const tokenResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', bodyData);
  const tokenResponseJSON = await tokenResponse.json();
  const token = tokenResponseJSON.user.token;
  const authToken = `Token ${token}`;

  // Create Article Body for POST Request
  const createArticleBody = {
    "article": {
      "title": "Frank Test",
      "description": "This is a Frank Test",
      "body": "This is a description for frank test",
      "tagList": ["Playwright", "REST API"]
    }
  };

  // Authorized POST request
  const newArticleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
    data: createArticleBody,
    headers: { Authorization: authToken }
  });

  // Parse response object to JSON object
  const newArticleResponseJSON = await newArticleResponse.json();

  // Get Article Slug
  const slugId = newArticleResponseJSON.article.slug;

  // Assertions
  expect(newArticleResponse.status()).toBe(201);
  expect(newArticleResponseJSON.article.title).toBe('Frank Test');

  // Validate Article created by using GET Method
  const articlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=2&offset=0', { headers: { Authorization: authToken } });
  const articlesJSON = await articlesResponse.json();

  // Assertions
  expect(articlesResponse.status()).toBe(200);
  expect(articlesJSON.articles[0].title).toBe('Frank Test');

  // DELETE Article
  const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
    headers: { Authorization: authToken }
  });

  // Assertions
  expect(deleteArticleResponse.status()).toBe(204);

});

// GET POST PUT DELETE
// Create, Get, Update and Delete Article Test Case
test.only('Create, Update and Delete Test Article', async ({ request }) => {

  // Request Body
  const bodyData = { data: { "user": { "email": "franktest@test.com", "password": "Test1234" } } }

  // POST request and get the token in response
  const tokenResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', bodyData);
  const tokenResponseJSON = await tokenResponse.json();
  const token = tokenResponseJSON.user.token;
  const authToken = `Token ${token}`;

  // Create Article Body for POST Request
  const createArticleBody = {
    "article": {
      "title": "Frank Test",
      "description": "This is a Frank Test",
      "body": "This is a description for frank test",
      "tagList": ["Playwright", "REST API"]
    }
  };

  // Authorized POST request
  const newArticleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
    data: createArticleBody,
    headers: { Authorization: authToken }
  });

  // Parse response object to JSON object
  const newArticleResponseJSON = await newArticleResponse.json();

  // Get Article Slug
  const slugId = newArticleResponseJSON.article.slug;

  // Assertions
  expect(newArticleResponse.status()).toBe(201);
  expect(newArticleResponseJSON.article.title).toBe('Frank Test');

  // Validate Article created by using GET Method
  const articlesResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=2&offset=0', { headers: { Authorization: authToken } });
  const articlesJSON = await articlesResponse.json();

  // Assertions
  expect(articlesResponse.status()).toBe(200);
  expect(articlesJSON.articles[0].title).toBe('Frank Test');

  // PUT Method - UPDATE ARTICLE
  const updateArticleBody = {
    "article":
      { "title": "Test Article Modified", "description": "Test Article Description", "body": "Test Article Description", "tagList": [], "slug": "Test-Article-41503" }
  };

  const updatedArticleResponse = await request.put(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`,
    {
      data: updateArticleBody, headers: { Authorization: authToken }
    });
  const updatedArticleResponseJSON = await updatedArticleResponse.json();

  // Assertions
  expect(updatedArticleResponse.status()).toBe(200);
  expect(updatedArticleResponseJSON.article.title).toBe('Test Article Modified');

  // Save new Slug ID
  const updatedSlugId = updatedArticleResponseJSON.article.slug;

  // DELETE Article
  const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${updatedSlugId}`, {
    headers: { Authorization: authToken }
  });

  // Assertions
  expect(deleteArticleResponse.status()).toBe(204);

});