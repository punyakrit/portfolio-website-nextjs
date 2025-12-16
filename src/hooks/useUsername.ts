"use client"
import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import { upsertUser, userLog } from "@/lib/query/query"

let isLogging = false
let loggedUsername: string | null = null

export default function useUsername() {
    const [username, setUsername] = useState<string>("")
    
    useEffect(() => {
        const usernameExists = localStorage.getItem("auth-token")
        let actualUsername: string
        if(usernameExists) {
            actualUsername = usernameExists
            setUsername(usernameExists)
        }else{

            const generateUsername = nanoid()
            actualUsername = generateUsername
            localStorage.setItem("auth-token", generateUsername)
            setUsername(generateUsername)
        }

        upsertUser(actualUsername)
        
        if (!isLogging && loggedUsername !== actualUsername) {
            isLogging = true
            loggedUsername = actualUsername
            userLog(actualUsername).finally(() => {
                isLogging = false
            })
        }
    },[])
    return username
}

export function useFirstVisit() {
    const [isFirstVisit, setIsFirstVisit] = useState<boolean | null>(null)
    const username = useUsername()
    
    useEffect(() => {
        const checkVisit = async () => {
            if (!username) return
            
            await new Promise(resolve => setTimeout(resolve, 200))
            
            const { getVisitCount } = await import("@/lib/query/query")
            const visitCount = await getVisitCount(username)
            setIsFirstVisit(visitCount === 1)
        }

        if (username) {
            checkVisit()
        }
    }, [username])
    
    return { isFirstVisit, username }
}