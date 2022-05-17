import incidents from '../incidents.json';
import dayjs from 'dayjs';

export async function get() {
	const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<atom:link href="https://epibug.vercel.app/rss.xml" rel="self" type="application/rss+xml" />
<title>Epibug - Mon école bug</title>
<link>https://epibug.vercel.app</link>
<description>Mon école bug, c'est ici que vous retrouverez tous les incidents interne de l'EPITA.</description>
${incidents
	.map(
		i => `<item>
<guid>${dayjs(i.date, 'YYYY-MM-DD').format('D MMMM YYYY')}</guid>
<title>${i.name}</title>
<link>${i.source || ''}</link>
<description>${i.description}</description>
<pubDate>${dayjs(i.date, 'YYYY-MM-DD').format('D MMMM YYYY')}</pubDate>
</item>`
	)
	.join('')}
</channel>
</rss>
`;

	const headers = {
		'Cache-Control': 'max-age=0, s-maxage=3600',
		'Content-Type': 'application/xml'
	};
	return {
		headers,
		body
	};
}

