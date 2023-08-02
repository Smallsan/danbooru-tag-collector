import fetch from 'node-fetch'
import fs from 'fs'

async function scrapeAllTags () {
  try {
    const apiUrl = 'https://danbooru.donmai.us/tags.json?'
    const tagsPerPage = 1000
    let page = 1
    let allTags = []

    while (true) {
      const url = `${apiUrl}limit=${tagsPerPage}&page=${page}&order=post_count&search=`
      const response = await fetch(url)
      const data = await response.json()

      if (page === 1000) {
        break
      }

      const tags = data.map(tag => tag.name)
      allTags = allTags.concat(tags)

      page++ // Move to the next page
      console.log('Page:', page)
      console.log(url)
    }

    const csvData = allTags.join('\n')
    fs.writeFileSync('all_tags.csv', 'Tag\n' + csvData)

    console.log('All tags scraped and written to all_tags.csv')
  } catch (error) {
    console.error('Error scraping tags:', error)
  }
}

scrapeAllTags()
