import Link from "next/link"

const NotFound = () => {
    return (
        <div className="text-center">
            <p className="mt-10">Sorry, the post You are looking for does not exist.</p>
            <Link href='/'>&larr; Back to Home</Link>
        </div>
    )
}

export default NotFound