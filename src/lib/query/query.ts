"use server"
import { headers } from "next/headers"
import { prisma } from "../db/prisma"

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
                    ip: ip
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
                    ip: ip
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



export async function getUniqueUserCount() {
    try {
        return await prisma.user.count()
    } catch (error) {
        console.error(error)
        return 0
    }
}

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