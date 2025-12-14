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
            return userLog
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
            return userLog
        }
    }
    catch (error) {
        console.error(error)
        return null
    }
}