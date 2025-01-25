// This component uses the NEXT_PUBLIC_DJANGO_BACKEND_URL environment variable
// Make sure to set this in your .env.local file
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LogIn, Eye, EyeOff } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../../components/ui/card"
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from "../../components/ui/toast"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_BACKEND_URL}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem("token", data.token)
        router.push("/dashboard")
      } else {
        setToastMessage(data.error || "Login failed. Please try again.")
        setShowToast(true)
      }
    } catch (error) {
      console.error("Login error:", error)
      setToastMessage("An error occurred. Please try again.")
      setShowToast(true)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Welcome back</CardTitle>
            <CardDescription className="text-gray-400">Sign in to your account to continue</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-gray-200">
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-200">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Eye className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
              >
                Sign In
                <LogIn className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-sm text-gray-400 text-center">
                Don't have an account?{" "}
                <Link href="/signup" className="text-emerald-400 hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
      <ToastViewport />
      {showToast && (
        <Toast variant="destructive">
          <ToastTitle>Error</ToastTitle>
          <ToastDescription>{toastMessage}</ToastDescription>
          <ToastClose onClick={() => setShowToast(false)} />
        </Toast>
      )}
    </ToastProvider>
  )
}

