"use client"
import { useEffect, useState } from "react"
import { nanoid } from "nanoid"

export default function useUsername() {
    const [username, setUsername] = useState<string | null>(null)       
    
    useEffect(() => {
        const usernameExists = localStorage.getItem("auth-token")
        if(usernameExists) {
            setUsername(usernameExists)
        }else{

            const generateUsername = nanoid()
            localStorage.setItem("auth-token", generateUsername)
            setUsername(generateUsername)
        }

    },[])
    return username
}