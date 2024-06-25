import { parseDocument } from 'htmlparser2';
import { getElementsByTagName, textContent } from 'domutils';

export async function proxyRss(env) {
    const feed1Url = 'https://fetchrss.com/rss/667b038bd8d87f14ef01a1c2667b04e2f60d50502305cdf4.xml';
    const feed2Url = 'https://fetchrss.com/rss/667b038bd8d87f14ef01a1c2667af90947c63e9b2205e353.xml';

    const [feed1Response, feed2Response] = await Promise.all([
        fetch(feed1Url),
        fetch(feed2Url)
    ]);

    const feed1Text = await feed1Response.text();
    const feed2Text = await feed2Response.text();

    const feed1Doc = parseFeed(feed1Text.replaceAll('<br/><br/><span style="font-size:12px; color: gray;">(Feed generated with <a href="https://fetchrss.com" target="_blank">FetchRSS</a>)</span>', ''));
    const feed2Doc = parseFeed(feed2Text.replaceAll('<br/><br/><span style="font-size:12px; color: gray;">(Feed generated with <a href="https://fetchrss.com" target="_blank">FetchRSS</a>)</span>', ''));

    const feed1Items = feed1Doc.items;
    const feed2Items = feed2Doc.items;

    function convertToKST(pubDate) {
        const date = new Date(pubDate);
        const kstOffset = 9 * 60; // KST is UTC+9
        const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
        const kstDate = new Date(utc + (kstOffset * 60000));
        return kstDate.toUTCString();
    }

    feed1Items.forEach(item => {
        item.pubDate = convertToKST(item.pubDate);
    });

    feed2Items.forEach(item => {
        item.pubDate = convertToKST(item.pubDate);
    });

    const mergedFeed = {
        version: '2.0',
        channel: {
            title: '땡칠로그',
            description: '고민을 나누는 공간',
            link: `https://${env.SERVE_DOMAIN}`,
            pubDate: feed1Doc.channel.pubDate,
            items: [...feed1Items, ...feed2Items]
        }
    };

    const mergedFeedXML = buildFeed(mergedFeed);

    return new Response(mergedFeedXML, {
        headers: {
            'Content-Type': 'application/rss+xml;charset=UTF-8'
        }
    });
}

function parseFeed(xml) {
    const doc = parseDocument(xml, { xmlMode: true });

    const channel = getElementsByTagName('channel', doc)[0];
    const items = getElementsByTagName('item', channel).map(item => {
        return {
            title: textContent(getElementsByTagName('title', item)[0]),
            link: textContent(getElementsByTagName('link', item)[0]),
            description: textContent(getElementsByTagName('description', item)[0]),
            pubDate: textContent(getElementsByTagName('pubDate', item)[0]),
            guid: textContent(getElementsByTagName('guid', item)[0])
        };
    });

    return {
        channel: {
            title: textContent(getElementsByTagName('title', channel)[0]),
            link: textContent(getElementsByTagName('link', channel)[0]),
            description: textContent(getElementsByTagName('description', channel)[0]),
            pubDate: textContent(getElementsByTagName('pubDate', channel)[0])
        },
        items
    };
}

function buildFeed(feed) {
    let itemsXML = '';
    feed.channel.items.forEach(item => {
        itemsXML += `
        <item>
          <title><![CDATA[${item.title}]]></title>
          <link>${item.link}</link>
          <description><![CDATA[${item.description}]]></description>
          <pubDate>${item.pubDate}</pubDate>
          <guid>${item.guid}</guid>
        </item>
      `;
    });

    return `
      <rss version="2.0">
        <channel>
          <title><![CDATA[${feed.channel.title}]]></title>
          <link>${feed.channel.link}</link>
          <description><![CDATA[${feed.channel.description}]]></description>
          <pubDate>${feed.channel.pubDate}</pubDate>
          ${itemsXML}
        </channel>
      </rss>
    `;
}