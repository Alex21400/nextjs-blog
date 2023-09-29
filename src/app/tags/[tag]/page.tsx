import { getPostsMeta } from "@/lib/posts"
import ListItem from "@/components/ListItem"
import Link from "next/link"

export const revalidate = 86400

type Params = {
    params: {
        tag: string
    }
}

export async function generateStaticParams() {
    const posts = await getPostsMeta()

    if(!posts) return []

    const tags = new Set(posts.map(post => post.tags).flat())

    return Array.from(tags).map(tag => ({ tag }))
}

export async function generateMetadata({ params: { tag } }: Params) {
    return {
        title: tag
    }
}

export default async function TagPostList({ params: { tag } }: Params) {
  const posts = await getPostsMeta()

  if(!posts) return <p className="mt-10 text-center">Sorry, no posts avaliable for this tag</p>

  const tagPosts = posts.filter(post => post.tags.includes(tag)) 

  if(!tagPosts.length) {
    return (
        <div className="text-center">
            <p className="mt-10">Sorry, no posts for this tag</p>
            <Link href='/'>&larr; Back to Home</Link>
        </div>
    )
  }

  return (
    <>
        <h2 className="text-3xl mt-4 mb-0">Results for: #{tag}</h2>
        <section className="mt-6 mx-auto max-w-2xl">
            <ul className="w-full list-none p-0">
                {tagPosts.map(post => {
                    return <ListItem post={post} key={post.id} />
                })}
            </ul>
        </section>
    </>
  )
}
