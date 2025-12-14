"use client"
import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import { upsertUser, userLog } from "@/lib/query/query"

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
        userLog(actualUsername)
    },[])
    return username
}