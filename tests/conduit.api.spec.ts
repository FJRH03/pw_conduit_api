import { test, expect } from '@playwright/test';

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