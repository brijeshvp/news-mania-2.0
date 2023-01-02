// type 'rfce'
import { categories } from "../constants"
import fetchNews from "../lib/fetchNews"
import NewsList from "./NewsList"
import response from '../response.json';

async function Homepage() {
  // fetch the news data
  // const news: NewsResponse = response || await fetchNews(categories.join(','))
  const news: NewsResponse = await fetchNews(categories.join(','))
  // console.log(news);

  // set timeout of 2 secs  - on loading on homescreen to see loader
  await new Promise((resolve)=>setTimeout(resolve,2000));

  return (
    <div>
      {/* newsList  */}
      <NewsList news={news} />
    </div>
  )
}

export default Homepage