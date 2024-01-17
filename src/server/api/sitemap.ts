interface SiteMap {
  lastNews: { id: number; link_keyword: string; topstory_image: string; snippet: string; title: string; timestamp: number }[]
  posts: { id: number; lastpost_date: number }[]
}

export default cachedEventHandler(
  async () => {
    const runtimeConfig = useRuntimeConfig()

    const { lastNews, posts } = (await $fetch<SiteMap>(runtimeConfig.public.serverApiUrl + '/map/data'))

    const routeLastNews = lastNews.map((p) => {
      return { loc: `/community/news/${p.id}/${p.link_keyword}`, lastmod: new Date(p.timestamp * 1000) } // images: [{ loc: p.topstory_image, title: p.title }]
    })
    const routePosts = posts.map((p) => {
      return { loc: `/forum/sujet/${p.id}`, lastmod: new Date(p.lastpost_date * 1000) }
    })

    return [...routeLastNews, ...routePosts].map((p) => {
      return p
    })
  },
  {
    name: 'sitemap-dynamic-url',
    maxAge: 60 * 60 // cache URLs for 60 minutes
  }
)
