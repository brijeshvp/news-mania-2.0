import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (category?: Category | string, keywords?: string, isDynamic?: boolean) => {
    // graphQl query
    const query = gql`
  query MyQuery(
    $access_key: String!
    $categories: String!
    $keywords: String
  )   {
    myQuery(access_key: $access_key,categories: $categories, countries: "in", sort:"published_desc",keywords: $keywords) {
      data {
        author
        category
        image
        description
        country
        published_at
        language
        source
        title
        url
      }
      pagination {
        count
        limit
        offset
        total
      }
    }
  }
`;
    // fetch function with next.js v13 caching...
  const res = await fetch('https://huazhou.stepzen.net/api/fuzzy-tapir/__graphql',{
    method:'POST',
    cache: isDynamic? "no-cache" : "default",
    next: isDynamic ? {revalidate: 0} : {revalidate: 20},
    headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
    },
    body: JSON.stringify({
        query: query,
        variables:{
            access_key: process.env.MEDIASTACK_API_KEY,
            categories: category,
            keywords: keywords,
        }
    })
  })

  console.log(
    "LOADING NEWS DATA FROM API for category >>> ", category, keywords
  )

  const newsResponse = await res.json();
    // sort function which sorts by images vs not images present
    const news = sortNewsByImage(newsResponse.data.myQuery);

    // return news
    return news;
}

export default fetchNews;

// stepzen import curl "http://api.mediastack.com/v1/news?access_key=dff8f51a656c927687e1e2ba6cb4334d&sources=business,sports"

// final command
// stepzen import curl "http://api.mediastack.com/v1/news?access_key=dff8f51a656c927687e1e2ba6cb4334d&countries=in&limit=100&offset=0&sort=published_desc"