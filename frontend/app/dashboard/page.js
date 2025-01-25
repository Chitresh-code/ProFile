"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FileText, Plus, Upload, Sparkles, Crown, UserIcon, Briefcase, GraduationCap, Award } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription } from "../../components/ui/toast"
import { UserProfileDropdown } from "../../components/user-profile-dropdown"

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  // Static user data - will be replaced with API call later
  const user = {
    first_name: "John",
    last_name: "Doe",
    resume_created: 2,
    profile_completion: 75,
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    } else {
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      if (response.ok) {
        localStorage.removeItem("token")
        router.push("/")
      } else {
        setToastMessage("Logout failed. Please try again.")
        setShowToast(true)
      }
    } catch (error) {
      console.error("Logout error:", error)
      setToastMessage("An error occurred. Please try again.")
      setShowToast(true)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <header className="bg-gray-800/50 border-b border-gray-700 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">ProFile Dashboard</h1>
            <UserProfileDropdown onLogout={handleLogout} />
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Welcome, {user.first_name}! 👋</h2>
            <p className="text-gray-300 text-lg">
              Create professional resumes with AI-powered suggestions, manage your profile, and track your progress all
              in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors duration-200 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-400" />
                  Create AI-Powered Resume
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Build a professional resume with AI suggestions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Get intelligent suggestions and feedback as you create your resume. You've created{" "}
                  {user.resume_created} resume(s) so far.
                </p>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
                >
                  <Link href="/create-resume">
                    <Plus className="mr-2 h-5 w-5" />
                    Create New Resume
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors duration-200 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-emerald-400" />
                  Complete Your Profile
                </CardTitle>
                <CardDescription className="text-gray-400">Add your details for faster resume creation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Your profile is {user.profile_completion}% complete. Finish filling out your information to speed up
                  resume creation.
                </p>
                <Button asChild variant="secondary" className="w-full bg-gray-700 text-white hover:bg-gray-600">
                  <Link href="/profile">View Profile</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors duration-200 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                  <Upload className="h-5 w-5 text-emerald-400" />
                  Improve Existing Resume
                </CardTitle>
                <CardDescription className="text-gray-400">Upload and enhance your current resume</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Get AI-powered suggestions to improve your existing resume. Our AI can analyze and provide tailored
                  recommendations.
                </p>
                <Button variant="secondary" className="w-full bg-gray-700 text-white hover:bg-gray-600">
                  Upload Resume
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors duration-200 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-emerald-400" />
                  Job Search Tracker
                </CardTitle>
                <CardDescription className="text-gray-400">Keep track of your job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Organize your job search process. Track applications, interviews, and follow-ups all in one place.
                </p>
                <Button variant="secondary" className="w-full bg-gray-700 text-white hover:bg-gray-600">
                  View Job Tracker
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors duration-200 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-emerald-400" />
                  Skill Development
                </CardTitle>
                <CardDescription className="text-gray-400">Enhance your professional skills</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Access curated resources and courses to improve your skills and stay competitive in the job market.
                </p>
                <Button variant="secondary" className="w-full bg-gray-700 text-white hover:bg-gray-600">
                  Explore Skills
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors duration-200 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-emerald-400" />
                  Interview Preparation
                </CardTitle>
                <CardDescription className="text-gray-400">Practice and prepare for interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Access a library of common interview questions and use AI to practice your responses.
                </p>
                <Button variant="secondary" className="w-full bg-gray-700 text-white hover:bg-gray-600">
                  Start Practicing
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 opacity-75">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-emerald-400" />
                  Custom Templates
                </CardTitle>
                <CardDescription className="text-gray-400">Create your own resume templates</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Design and share your own resume templates with the community. Showcase your creativity and help
                  others stand out.
                </p>
                <Button variant="secondary" className="w-full bg-gray-700 text-white" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 opacity-75">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                  <Crown className="h-5 w-5 text-emerald-400" />
                  Pro Features
                </CardTitle>
                <CardDescription className="text-gray-400">Unlock advanced features and templates</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Get access to premium templates, advanced AI features, priority support, and more to supercharge your
                  job search.
                </p>
                <Button variant="secondary" className="w-full bg-gray-700 text-white" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <ToastViewport />
      {showToast && (
        <Toast variant="destructive">
          <ToastTitle>Error</ToastTitle>
          <ToastDescription>{toastMessage}</ToastDescription>
        </Toast>
      )}
    </ToastProvider>
  )
}

