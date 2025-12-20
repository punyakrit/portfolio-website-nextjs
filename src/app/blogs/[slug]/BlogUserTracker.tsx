"use client"

import { useEffect, useRef } from "react"
import useUsername from "@/hooks/useUsername"
import { createUserBlog } from "@/lib/query/query"

export default function BlogUserTracker({ slug }: { slug: string }) {
  const username = useUsername()
  const lastKeyRef = useRef<string | null>(null)

  useEffect(() => {
    if (!username || !slug) return
    const key = `${slug}:${username}`
    if (lastKeyRef.current === key) return
    lastKeyRef.current = key
    void createUserBlog(slug, username)
  }, [slug, username])

  return null
}




