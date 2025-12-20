"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { likeBlog, dislikeBlog, getBlogLikeCount, getUserLikeStatus } from "@/lib/query/query"
import useUsername from "@/hooks/useUsername"

export default function LikeButton({ slug }: { slug: string }) {
  const username = useUsername()
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!username || !slug) return
    
    const fetchLikeData = async () => {
      try {
        const [count, liked] = await Promise.all([
          getBlogLikeCount(slug),
          getUserLikeStatus(slug, username)
        ])
        setLikeCount(count)
        setIsLiked(liked)
      } catch (error) {
        console.error("Error fetching like data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLikeData()
  }, [slug, username])

  const handleLike = async () => {
    if (!username || isLoading) return

    setIsLoading(true)
    const newLikedState = !isLiked

    try {
      if (newLikedState) {
        await likeBlog(slug, username)
        setLikeCount(prev => prev + 1)
      } else {
        await dislikeBlog(slug, username)
        setLikeCount(prev => Math.max(0, prev - 1))
      }
      setIsLiked(newLikedState)
    } catch (error) {
      console.error("Error toggling like:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!username) return null

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLike}
        disabled={isLoading}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Heart
          className={`h-4 w-4 transition-colors ${
            isLiked ? "fill-red-500 text-red-500" : ""
          }`}
        />
        <span>{likeCount}</span>
      </button>
    </div>
  )
}

