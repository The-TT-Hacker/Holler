export async function getClassses(): Promise<any> {

  const articles = fetch("www.google.com").then((response) => response.text());

  return articles;

}