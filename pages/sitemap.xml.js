// create sitemap.xml file
import {getAllPostsIdsForThePostPreview, getAllProjectsIdsForTheProjectPreview} from '../helpers/getTheResult';


export default function Sitemap() {
    return null;
}

export async function getServerSideProps({res}) {

    // GET THE URL
    const baseUrl = "https://gooadmin.com";

    // GET ALL POSTS IDS
    const allPostsIds = await getAllPostsIdsForThePostPreview();

    // GET ALL PROJECTS IDS
    const allProjectsIds = await getAllProjectsIdsForTheProjectPreview();

    // GET ALL POSTS URLS
    const allPostsUrls = allPostsIds.map((postId) => {
        return {
            url: `${baseUrl}/post/${postId.params.postId}`,
            changefreq: 'daily',
            priority: 0.9,
        }
    });

    // GET ALL PROJECTS URLS
    const allProjectsUrls = allProjectsIds.map((projectId) => {
        return {
            url: `${baseUrl}/project/${projectId.params.projectId}`,
            changefreq: 'daily',
            priority: 0.9,
        }
    });

    // GET ALL PAGES URLS
    const allPagesUrls = [
        {
            url: `${baseUrl}/`,
            changefreq: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            changefreq: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            changefreq: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/portfolio`,
            changefreq: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/subscribe`,
        },
        {
            url: `${baseUrl}/blog`,
            changefreq: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/courses`,
            changefreq: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/authentication/login`,
            changefreq: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/authentication/signup`,
            changefreq: 'daily',
            priority: 0.9,
        }
    ];

    // CREATE THE SITEMAP
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
            ${allPostsUrls.map((post) => {
        return `
                    <url>
                        <loc>${post.url}</loc>
                        <changefreq>${post.changefreq}</changefreq>
                        <priority>${post.priority}</priority>
                    </url>
                `
    }).join("")}
            ${allProjectsUrls.map((project) => {
        return `
                    <url>
                        <loc>${project.url}</loc>
                        <changefreq>${project.changefreq}</changefreq>
                        <priority>${project.priority}</priority>
                    </url>
                `
    }).join("")}
            ${allPagesUrls.map((page) => {
        return `
                    <url>
                        <loc>${page.url}</loc>
                        <changefreq>${page.changefreq}</changefreq>
                        <priority>${page.priority}</priority>
                    </url>
                `
    }).join("")}
        </urlset>
        `;

    // SET THE HEADERS
    res.setHeader("Content-Type", "text/xml");
    // WRITE THE SITEMAP
    res.write(sitemap);
    res.end();

    return {
        props: {},
    }
}
