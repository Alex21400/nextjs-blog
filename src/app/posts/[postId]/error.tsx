'use client'

import { useEffect } from "react"
import Link from "next/link";

export default function Error({
    error,
    reset
}: {
    error: Error;
    reset: () => void
}) {

    useEffect(() => {
        console.log(error)
    }, [error])

    return (
        <div>
            <h2 className="my-4 text-2xl font-bold">Oops, something went wrong!</h2>
            <button className="mb-4 p-4 bg-red-500 text-white rounded-xl" onClick={() => reset()}>
                Try Again
            </button>
            <p className="text-xl">
                <Link href='/'>&larr; Back to Home</Link>
            </p>
        </div>
    )
}