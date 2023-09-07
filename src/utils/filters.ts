export const formatToHour = (value: number) => {
  return Math.floor(value / 3600)
}

export const formatNumber = (value: number) => {
  return String(value).replace(/(.)(?=(\d{3})+$)/g, '$1 ')
}

export const toHash = (value: string) => {
  return encodeURI(value.replace(' ', '').toLowerCase())
}

export const formatDateComplet = (value: number) => {
  const date = new Date(value * 1000)

  const day = (date.getDate() < 10 ? '0' : '') + date.getDate()
  const month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1)
  const year = date.getFullYear()

  const hour = (date.getHours() < 10 ? '0' : '') + date.getHours()
  const minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()

  return `${day}/${month}/${year} à ${hour}:${minute}`
}

export const formatDate = (value: number) => {
  const date = new Date(value * 1000)

  const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']

  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}

export const timeAgo = (timestamp: number) => {
  const seconds = Date.now() / 1000 - timestamp

  let interval = seconds / 31536000 // 365 * 24 * 60 * 60

  if (interval > 1) { return Math.floor(interval) + ' année' + (Math.floor(interval) > 1 ? 's' : '') }

  interval = seconds / 2592000 // 30 * 24 * 60 * 60
  if (interval > 1) { return Math.floor(interval) + ' mois' }

  interval = seconds / 86400 // 24 * 60 * 60
  if (interval > 1) { return Math.floor(interval) + ' jour' + (Math.floor(interval) > 1 ? 's' : '') }

  interval = seconds / 3600 // 60 * 60
  if (interval > 1) { return Math.floor(interval) + ' heure' + (Math.floor(interval) > 1 ? 's' : '') }

  interval = seconds / 60
  if (interval > 1) { return Math.floor(interval) + ' minute' + (Math.floor(interval) > 1 ? 's' : '') }

  return Math.floor(seconds) + ' seconde' + (Math.floor(seconds) > 1 ? 's' : '')
}

export const round = (value: number) => {
  return Math.floor(value)
}

export const bbcode = (text: string) => {
  text = text.replace(/</igm, '&lt')
  return bbcodeList.reduce((text, code) => text.replace(code.regexp, code.replacement), text)
}

const bbcodeList = [
  { regexp: /\r/igm, replacement: '' },
  { regexp: /\n/igm, replacement: '<br>' },
  { regexp: /\[br\]/igm, replacement: '<br>' },
  { regexp: /\[quote\](.+?)\[\/quote\]/igm, replacement: '<div class="bbcode-quote">$1</div>' },
  { regexp: /\[b\](.+?)\[\/b\]/igm, replacement: '<b>$1</b>' },
  { regexp: /\[center\](.*?)\[\/center\]/igm, replacement: '<div class="center">$1</div>' },
  { regexp: /\[i\](.*?)\[\/i\]/igm, replacement: '<em>$1</em>' },
  { regexp: /\[u\](.*?)\[\/u\]/igm, replacement: '<u>$1</u>' },
  { regexp: /\[s\](.*?)\[\/s\]/igm, replacement: '<s>$1</s>' },
  { regexp: /\[url=http(.*?)](.*?)\[\/url\]/igm, replacement: '<a href="http$1" target="_bank">$2</a>' },
  { regexp: /\[url\](.*?)\[\/url\]/igm, replacement: '<a href="$1" target="_bank">$1</a>' },
  { regexp: /\[color=(.*?)](.*?)\[\/color\]/igm, replacement: '<font color="$1">$2</font>' },
  { regexp: /\[size=small\](.*?)\[\/size\]/igm, replacement: '<font size="1">$1</font>' },
  { regexp: /\[size=large\](.*?)\[\/size\]/igm, replacement: '<font size="3">$1</font>' },
  { regexp: /\[code\](.*?)\[\/code\]/igm, replacement: '<pre>$1</pre>' },
  {
    regexp: /\[img\]http(.*?)(beeimg\.com|zupimages\.net|i\.imgur\.com|cdn\.wibbo\.org|cdn\.discordapp\.com|media\.discordapp\.net|image\.noelshack\.com)\/(.*?)\[\/img\]/igm,
    replacement: '<img src="//$2/$3" class="max-w-full">'
  },
  {
    regexp: /\[youtube\](.+)?watch?(.+)?v=(.+)(&.+)?\[\/youtube\]/igm,
    replacement: '<iframe width="100%" height="400" src="//www.youtube.com/embed/$3" frameborder="0" allowfullscreen></iframe>'
  },
  { regexp: /<br>/igm, replacement: '\n' }
]
