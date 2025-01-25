"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Download } from 'lucide-react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "../../components/ui/label"

export default function CreateResumePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    resumeName: "",
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      summary: "",
    },
    education: [
      {
        institution: "",
        degree: "",
        field: "",
        graduationYear: "",
      },
    ],
    experience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    skills: "",
    projects: [
      {
        name: "",
        description: "",
        technologies: "",
      },
    ],
  })

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    } else {
      setIsLoading(false)
    }
  }, [router])

  const handleSubmit = (e) => {
    e.preventDefault()
    // This will be implemented later with the backend
    console.log(formData)
  }

  const handleChange = (section, field, value, index = null) => {
    setFormData((prev) => {
      if (index !== null) {
        const newSection = [...prev[section]]
        newSection[index] = { ...newSection[index], [field]: value }
        return { ...prev, [section]: newSection }
      }
      if (section === "personalInfo") {
        return {
          ...prev,
          personalInfo: { ...prev.personalInfo, [field]: value },
        }
      }
      return { ...prev, [section]: value }
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" className="text-gray-300 hover:text-white" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Dashboard
          </Button>
          <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600">
            <Download className="mr-2 h-5 w-5" />
            Download PDF
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">Resume Details</CardTitle>
              <CardDescription className="text-gray-400">
                Give your resume a name and add your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resumeName" className="text-gray-200">
                  Resume Name
                </Label>
                <Input
                  id="resumeName"
                  value={formData.resumeName}
                  onChange={(e) => handleChange("resumeName", null, e.target.value)}
                  placeholder="e.g., Software Developer Resume"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-200">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  value={formData.personalInfo.fullName}
                  onChange={(e) => handleChange("personalInfo", "fullName", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => handleChange("personalInfo", "email", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-200">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={formData.personalInfo.phone}
                    onChange={(e) => handleChange("personalInfo", "phone", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary" className="text-gray-200">
                  Professional Summary
                </Label>
                <Textarea
                  id="summary"
                  value={formData.personalInfo.summary}
                  onChange={(e) => handleChange("personalInfo", "summary", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Education, Experience, Skills, and Projects sections remain unchanged */}

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              className="text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
            >
              Save Resume
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
