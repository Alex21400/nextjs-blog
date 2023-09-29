import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import Video from '@/components/Video'
import CustomImage from '@/components/CustomImage'

type Filetree = {
    "tree": [
        {
            "path": string
        }
    ]
}

export async function getPostByName(filename: string): Promise<BlogPost | undefined> {
    const res = await fetch(`https://raw.githubusercontent.com/alex21400/blogposts/main/${filename}`, {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-Github-Api-Version': '2022-11-28'
        }
    })

    if(!res.ok) {
        return undefined
    }

    const rawMDX = await res.text()

    if(rawMDX === '404: Not Found') return undefined

    const { frontmatter, content } = await compileMDX<{ title: string, date: string, tags: string[]}>({
        source: rawMDX,
        components: {
            Video,
            CustomImage
        },
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [
                    rehypeHighlight,
                    rehypeSlug,
                    [rehypeAutolinkHeadings, {
                        behavior: 'wrap'
                    }],
                ]
            }
        }
    })

    const id = filename.replace(/\.mdx$/, '')

    const blogPostObj: BlogPost = { meta: { id, title: frontmatter.title, date: frontmatter.date, tags: frontmatter.tags }, content }

    return blogPostObj
}

export async function getPostsMeta(): Promise<Meta[] | undefined> {
    const res = await fetch('https://api.github.com/repos/Alex21400/blogposts/git/trees/main?recursive=1', {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-Github-Api-Version': '2022-11-28'
        }
    })

    if(!res.ok) {
        return undefined
    }

    const repoFileTree: Filetree = await res.json()

    const filesArray = repoFileTree.tree.map(obj => obj.path).filter(path => path.endsWith('.mdx'))

    const posts: Meta[] = []

    for(const file of filesArray) {
        const post = await getPostByName(file)
        if(post) {
            const { meta } = post
            posts.push(meta)
        }
    }

    return posts.sort((a,b) => a.date < b.date ? 1 : -1)
}