"use client"

import { Github } from 'lucide-react'
import { Twitter } from 'lucide-react'
import { Linkedin } from 'lucide-react'
import { Globe } from 'lucide-react'
import { ExternalLink } from 'lucide-react'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Edit, FileText } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Badge } from "../../components/ui/badge"
import { Separator } from "../../components/ui/separator"
import { ScrollArea } from "../../components/ui/scroll-area"
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription } from "../../components/ui/toast"

export default function ProfilePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    user_id: null,
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    resume_created: 0,
    profile_picture: "",
    address: "",
    phone_number: "",
    date_of_birth: "",
    user_details: []
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          router.push("/login")
          return
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_BACKEND_URL}/api/view-profile/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        const data = await response.json()
        console.log("Fetched profile data:", data)
        setProfileData(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching profile:", error)
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [router])

  const handlePersonalInfoChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_BACKEND_URL}/api/edit-profile/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          email: profileData.email,
          username: profileData.username,
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          address: profileData.address,
          phone_number: profileData.phone_number,
          date_of_birth: profileData.date_of_birth
        }),
      })

      if (response.ok) {
        setToastMessage("Profile updated successfully!")
        setShowToast(true)
        setIsEditing(false)
      } else {
        throw new Error("Failed to update profile")
      }
    } catch (error) {
      setToastMessage("Failed to update profile")
      setShowToast(true)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    )
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <header className="flex items-center justify-between mb-8">
            <Button variant="ghost" className="text-gray-300 hover:text-white" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Dashboard
            </Button>
            {isEditing ? (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
                  onClick={handleSubmit}
                >
                  <Save className="mr-2 h-5 w-5" />
                  Save Changes
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="border-emerald-500 text-emerald-500 hover:bg-emerald-500/10"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </header>

          {/* Profile Header Card */}
          <Card className="bg-gray-800/50 border-gray-700 mb-8 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20" />
            <CardHeader className="relative">
              <div className="flex flex-col md:flex-row md:items-end gap-6">
                <Avatar className="h-24 w-24 border-4 border-gray-800 absolute -top-12">
                  <AvatarImage
                    src={profileData.profile_picture || "/placeholder.svg"}
                    alt={profileData.first_name || "User"}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-cyan-500 text-white text-xl">
                    {profileData.first_name?.[0] || "U"}
                    {profileData.last_name?.[0] || "N"}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-12 md:mt-0 md:ml-32">
                  <CardTitle className="text-3xl font-bold text-white">
                    {profileData.first_name} {profileData.last_name}
                  </CardTitle>
                  <CardDescription className="text-gray-400 flex items-center gap-2">
                    @{profileData.username}
                    <span className="text-gray-600">•</span>
                    {profileData.resume_created} Resumes Created
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mt-4">
                {profileData.user_details[0]?.profile_urls && (
                  <>
                    {profileData.user_details[0].profile_urls.github && (
                      <a
                        href={profileData.user_details[0].profile_urls.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-emerald-500 transition-colors"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    )}
                    {profileData.user_details[0].profile_urls.twitter && (
                      <a
                        href={profileData.user_details[0].profile_urls.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-emerald-500 transition-colors"
                      >
                        <Twitter className="h-4 w-4" />
                        Twitter
                      </a>
                    )}
                    {profileData.user_details[0].profile_urls.linkedin && (
                      <a
                        href={profileData.user_details[0].profile_urls.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-emerald-500 transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                    )}
                    {profileData.user_details[0].profile_urls.portfolio && (
                      <a
                        href={profileData.user_details[0].profile_urls.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-emerald-500 transition-colors"
                      >
                        <Globe className="h-4 w-4" />
                        Portfolio
                      </a>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Tabs defaultValue="personal" className="space-y-4">
            <TabsList className="bg-gray-800/50 border-gray-700 p-1">
              <TabsTrigger
                value="personal"
                className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700/50"
              >
                Personal Info
              </TabsTrigger>
              {profileData.user_details.map((detail) => (
                <TabsTrigger
                  key={detail.user_details_id}
                  value={`profile-${detail.user_details_id}`}
                  className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700/50"
                >
                  {detail.name} Profile
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="personal">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-white">Personal Information</CardTitle>
                  <CardDescription className="text-gray-400">Update your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-gray-200">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={profileData.first_name}
                          onChange={(e) => handlePersonalInfoChange("first_name", e.target.value)}
                          disabled={!isEditing}
                          className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-gray-200">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          value={profileData.last_name}
                          onChange={(e) => handlePersonalInfoChange("last_name", e.target.value)}
                          disabled={!isEditing}
                          className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-200">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                          disabled={!isEditing}
                          className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-200">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          value={profileData.phone_number}
                          onChange={(e) => handlePersonalInfoChange("phone_number", e.target.value)}
                          disabled={!isEditing}
                          className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-gray-200">
                        Address
                      </Label>
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) => handlePersonalInfoChange("address", e.target.value)}
                        disabled={!isEditing}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth" className="text-gray-200">
                        Date of Birth
                      </Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profileData.date_of_birth}
                        onChange={(e) => handlePersonalInfoChange("date_of_birth", e.target.value)}
                        disabled={!isEditing}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {profileData.user_details.map((detail) => (
              <TabsContent key={detail.user_details_id} value={`profile-${detail.user_details_id}`}>
                <div className="grid gap-6">
                  {/* Skills Section */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-white">Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        {Object.entries(detail.skills).map(([category, skills]) => (
                          <div key={category}>
                            <h4 className="text-gray-300 capitalize mb-3">{category.replace("_", " ")}</h4>
                            <div className="flex flex-wrap gap-2">
                              {skills.map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="secondary"
                                  className="bg-gray-700/50 text-gray-200 hover:bg-gray-600/50"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Work Experience Section */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-xl font-semibold text-white">Work Experience</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="grid gap-4">
                          {detail.work_experience.map((exp, index) => (
                            <Card key={index} className="bg-gray-700/30 border-gray-600">
                              <CardHeader>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <CardTitle className="text-lg font-semibold text-white">{exp.position}</CardTitle>
                                    <CardDescription className="text-gray-300">{exp.company}</CardDescription>
                                  </div>
                                  <Badge variant="outline" className="text-gray-400 border-gray-600">
                                    {exp.start_date} - {exp.end_date}
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <p className="text-gray-300 text-sm leading-relaxed">{exp.description}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  {/* Education Section */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-white">Education</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {detail.education.map((edu, index) => (
                          <Card key={index} className="bg-gray-700/30 border-gray-600">
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-lg font-semibold text-white">{edu.degree}</CardTitle>
                                  <CardDescription className="text-gray-300">
                                    {edu.institution} • {edu.field_of_study}
                                  </CardDescription>
                                </div>
                                <Badge variant="outline" className="text-gray-400 border-gray-600">
                                  {edu.start_date} - {edu.end_date}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-300 text-sm">{edu.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Projects Section */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-white">Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {detail.projects.map((project, index) => (
                          <Card key={index} className="bg-gray-700/30 border-gray-600">
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg font-semibold text-white">{project.name}</CardTitle>
                                {project.live_url && (
                                  <a
                                    href={project.live_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-500 hover:text-emerald-400 flex items-center gap-1"
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                    Live Demo
                                  </a>
                                )}
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                  <Badge key={tech} variant="secondary" className="bg-gray-600/50 text-gray-200">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Awards and Honors Section */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-white">Awards & Honors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {detail.awards_and_honors.map((award, index) => (
                          <Card key={index} className="bg-gray-700/30 border-gray-600">
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-lg font-semibold text-white">{award.name}</CardTitle>
                                  <CardDescription className="text-gray-300">{award.organization}</CardDescription>
                                </div>
                                <Badge variant="outline" className="text-gray-400 border-gray-600">
                                  {award.date}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-300 text-sm">{award.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Volunteer Experience Section */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-white">Volunteer Experience</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {detail.volunteer_experience.map((exp, index) => (
                          <Card key={index} className="bg-gray-700/30 border-gray-600">
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-lg font-semibold text-white">{exp.role}</CardTitle>
                                  <CardDescription className="text-gray-300">{exp.organization}</CardDescription>
                                </div>
                                <Badge variant="outline" className="text-gray-400 border-gray-600">
                                  {exp.start_date} - {exp.end_date}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-300 text-sm">{exp.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* References Section */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-white">References</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {detail.references.map((reference, index) => (
                          <Card key={index} className="bg-gray-700/30 border-gray-600">
                            <CardHeader>
                              <CardTitle className="text-lg font-semibold text-white">{reference.name}</CardTitle>
                              <CardDescription className="text-gray-300">
                                {reference.job_title} at {reference.company}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <p className="text-gray-300 text-sm">{reference.contacts.description}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                  <span>Email: {reference.contacts.email}</span>
                                  <span>Phone: {reference.contacts.phone_number}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      <ToastViewport />
      {showToast && (
        <Toast>
          <ToastTitle>Success</ToastTitle>
          <ToastDescription>{toastMessage}</ToastDescription>
        </Toast>
      )}
    </ToastProvider>
  )
}
