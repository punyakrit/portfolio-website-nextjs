import { NextRequest, NextResponse } from 'next/server'
import { notion } from '@/lib/notion'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

async function getImageUrlFromNotion(blogId: string): Promise<string | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: blogId }) as PageObjectResponse
    const mediaProp = page.properties?.media
    
    if (mediaProp && mediaProp.type === 'files' && mediaProp.files && Array.isArray(mediaProp.files) && mediaProp.files.length > 0) {
      const file = mediaProp.files[0]
      if (file && file.type === 'file' && file.file) {
        return file.file.url
      }
    }
    return null
  } catch (error) {
    console.error('Error fetching image from Notion:', error)
    return null
  }
}

async function fetchAndProxyImage(imageUrl: string): Promise<Response> {
  try {
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }

    const imageBuffer = await response.arrayBuffer()
    const contentType = response.headers.get('content-type') || 'image/jpeg'

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
        'CDN-Cache-Control': 'public, s-maxage=86400',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=86400',
      },
    })
  } catch (error) {
    console.error('Error proxying image:', error)
    return new NextResponse('Failed to fetch image', { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const blogId = searchParams.get('blogId')
  const imageUrl = searchParams.get('url')

  if (!blogId && !imageUrl) {
    return new NextResponse('Missing blogId or url parameter', { status: 400 })
  }

  let finalImageUrl: string | null = null

  if (imageUrl) {
    finalImageUrl = imageUrl
  } else if (blogId) {
    finalImageUrl = await getImageUrlFromNotion(blogId)
  }

  if (!finalImageUrl) {
    return new NextResponse('Image not found', { status: 404 })
  }

  return fetchAndProxyImage(finalImageUrl)
}

