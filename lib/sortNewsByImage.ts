export default function sortNewsByImage(news: NewsResponse){
    // news.data is array of news objects ->  each parameter item is one news object
    const newsWithImage = news.data.filter((item)=> item.image !== null);
    const newsWithoutImage = news.data.filter((item)=> item.image === null);

    const sortedNewsResponse = {
        pagination: news.pagination,
        data: [...newsWithImage,...newsWithoutImage],
    }

    return sortedNewsResponse;
}