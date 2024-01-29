import { load, type CheerioAPI } from 'cheerio'

export const htmlDom = (htmlText: string) => {
  const htmlDom: CheerioAPI = load(htmlText)
  htmlDom.text().toLowerCase()
  return htmlDom
}
