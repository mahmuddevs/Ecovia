"use client"

import { getAuthenticatedUser } from "@/actions/users/UserActions"
import { login, logout } from "@/lib/features/authSlice/authSlice"
import { useAppDispatch } from "@/lib/hooks"
import { ReactNode, useEffect } from "react"

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch()

    const getUser = async () => {
        const userData = await getAuthenticatedUser()
        if (!userData.success) {
            dispatch(logout())
        }
        dispatch(login(userData.user))
    }

    useEffect(() => {
        getUser()
    }, [getUser])

    return (
        <>{children}</>
    )
}
export default AuthProvider