"use client"
import { ReactNode } from "react"
import AuthProvider from "./AuthProvider"
import StoreProvider from "./StoreProvider"

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <StoreProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </StoreProvider>
    </>
  )
}
export default Providers