"use server"
import { headers } from "next/headers"
import { unstable_cache } from "next/cache"
import { prisma } from "../db/prisma"
import { getRequestCoordinates } from "../request-geo"

export const upsertUser = async (username: string) => {
    try {   
        const headersList = await headers()
        const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown"
        const user  = await prisma.user.upsert({
            where: {
                id: username
            },
            update: {
                ip: ip
            },
            create: {
                id: username,
                ip: ip
            }
        })
        return user
    } catch (error) {
        console.error(error)
        return null
    }
}

export const getVisitCount = async (username: string) => {
    try {
        const existingLog = await prisma.userLog.findFirst({
            where: {
                userId: username
            }
        })
        return existingLog ? existingLog.visitCount : 0
    }
    catch (error) {
        console.error(error)
        return 0
    }
}

export const userLog = async (username: string) => {
    try {
        const headersList = await headers()
        const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown"
        const coordinates = getRequestCoordinates()
        const existingLog = await prisma.userLog.findFirst({
            where: {
                userId: username
            }
        })

        if (existingLog) {
            const userLog = await prisma.userLog.update({
                where: {
                    id: existingLog.id
                },
                data: {
                    visitCount: { increment: 1 },
                    lastVisitedAt: new Date(),
                    ip: ip,
                    // Only overwrite with a real fix, so a visit Cloudflare
                    // could not place keeps the last known location.
                    ...(coordinates ?? {})
                }
            })
            return { userLog, visitCount: userLog.visitCount }
        } else {
            const userLog = await prisma.userLog.create({
                data: {
                    userId: username,
                    visitCount: 1,
                    lastVisitedAt: new Date(),
                    createdAt: new Date(),
                    ip: ip,
                    ...(coordinates ?? {})
                }
            })
            return { userLog, visitCount: userLog.visitCount }
        }
    }
    catch (error) {
        console.error(error)
        return null
    }
}



async function _getUniqueUserCount() {
    try {
        return await prisma.user.count()
    } catch (error) {
        console.error(error)
        return 0
    }
}

export const getUniqueUserCount = unstable_cache(
    _getUniqueUserCount,
    ["unique-user-count"],
    {
        revalidate: 900
    }
)

export async function createUserBlog(blogSlug: string, userId: string) {
    try{
        const existing = await prisma.blogsUser.findFirst({
            where: {
                blogSlug: blogSlug,
                userId: userId
            }
        })

        if (existing) {
            return await prisma.blogsUser.update({
                where: {
                    id: existing.id
                },
                data: {
                    Isviewed: true,
                    updatedAt: new Date()
                }
            })
        }

        return await prisma.blogsUser.create({
            data: {
                blogSlug: blogSlug,
                userId: userId,
                Isviewed: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
    }catch(error){
        console.error(error)
        return null
    }
}


export async function getBlogReadCount(blogSlug: string) {
    try {
        const count = await prisma.blogsUser.count({
            where: {
                blogSlug: blogSlug
            }
        })
        return count
    }
    catch (error) {
        console.error(error)
        return 0
    }
}

export async function likeBlog(blogSlug: string, userId: string) {
    try {
        const existing = await prisma.blogsUser.findFirst({
            where: {
                blogSlug: blogSlug,
                userId: userId
            }
        })
        if (existing) {
            return await prisma.blogsUser.update({
                where: {
                    id: existing.id
                },
                data: {
                    isLiked: true
                }
            })
        }
        return await prisma.blogsUser.create({
            data: {
                blogSlug: blogSlug,
                userId: userId,
                Isviewed: true,
                isLiked: true
            }
        })
    }
    catch (error) {
        console.error(error)
        return 0
    }
}


export async function dislikeBlog(blogSlug: string, userId: string) {
    try {
        const existing = await prisma.blogsUser.findFirst({
            where: {
                blogSlug: blogSlug,
                userId: userId
            }
        })
        if (existing) {
            return await prisma.blogsUser.update({
                where: {
                    id: existing.id
                },
                data: {
                    isLiked: false
                }
            })
        }
    }
    catch (error) {
        console.error(error)
        return 0
    }
}

export async function getBlogLikeCount(blogSlug: string) {
    try {
        const count = await prisma.blogsUser.count({
            where: {
                blogSlug: blogSlug,
                isLiked: true
            }
        })
        return count
    }
    catch (error) {
        console.error(error)
        return 0
    }
}

export async function getUserLikeStatus(blogSlug: string, userId: string) {
    try {
        const existing = await prisma.blogsUser.findFirst({
            where: {
                blogSlug: blogSlug,
                userId: userId
            }
        })
        return existing?.isLiked ?? false
    }
    catch (error) {
        console.error(error)
        return false
    }
}


// One point per distinct location with the visits summed, so the map payload
// carries no IPs and stays small however many rows UserLog grows to.
//
// Deliberately no try/catch: unstable_cache stores whatever the function
// returns, so swallowing a database error here would cache an empty map for
// the full revalidate window. Letting it throw keeps the failure uncached and
// the next request tries again.
async function _getVisitorLocations() {
    const rows = await prisma.userLog.groupBy({
        by: ["latitude", "longitude"],
        where: {
            latitude: { not: null },
            longitude: { not: null }
        },
        _sum: { visitCount: true }
    })
    return rows.map((row) => ({
        latitude: row.latitude as number,
        longitude: row.longitude as number,
        visitCount: row._sum.visitCount ?? 0
    }))
}

// Replaces the Upstash Redis cache, which no longer exists. On Cloudflare this
// is persisted by OpenNext's incremental cache (R2), so the database is read
// at most once an hour, not once per map view.
export const getVisitorLocations = unstable_cache(
    _getVisitorLocations,
    ["visitor-locations"],
    {
        revalidate: 60 * 60
    }
)