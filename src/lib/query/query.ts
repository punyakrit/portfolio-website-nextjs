"use server"
import { prisma } from "../db/prisma"

export const upsertUser = async (username: string) => {
    try {   
        const user  = await prisma.user.upsert({
            where: {
                id: username
            },
            update: {
                id: username
            },
            create: {
                id: username
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
                    lastVisitedAt: new Date()
                }
            })
            return userLog
        } else {
            const userLog = await prisma.userLog.create({
                data: {
                    userId: username,
                    visitCount: 1,
                    lastVisitedAt: new Date(),
                    createdAt: new Date()
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