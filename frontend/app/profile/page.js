"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription } from "../../components/ui/toast"

export default function ProfilePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [profileData, setProfileData] = useState({
    user: {
      username: "",
      email: "",
      first_name: "",
      last_name: "",
    },
    user_detail: {
      profile_picture: "",
      address: "",
      phone_number: "",
      date_of_birth: "",
      description: "",
      profile_urls: {
        linkedin: "",
        github: "",
        portfolio: "",
      },
      work_experience: [
        {
          company: "",
          position: "",
          start_date: "",
          end_date: "",
          description: "",
        },
      ],
      education: [
        {
          institution: "",
          degree: "",
          field: "",
          graduation_year: "",
        },
      ],
      skills: [],
      certifications: [],
      projects: [
        {
          name: "",
          description: "",
          technologies: "",
        },
      ],
    },
  })

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    } else {
      // Simulating API call to fetch user data
      // This will be replaced with an actual API call in the future
      setTimeout(() => {
        setProfileData({
          user: {
            username: "johndoe",
            email: "john@example.com",
            first_name: "John",
            last_name: "Doe",
          },
          user_detail: {
            profile_picture: "/placeholder.svg",
            address: "123 Main St, Anytown, USA",
            phone_number: "+1 (555) 123-4567",
            date_of_birth: "1990-01-01",
            description: "Passionate software developer with 5+ years of experience.",
            profile_urls: {
              linkedin: "https://linkedin.com/in/johndoe",
              github: "https://github.com/johndoe",
              portfolio: "https://johndoe.com",
            },
            work_experience: [
              {
                company: "Tech Corp",
                position: "Senior Developer",
                start_date: "2020-01-01",
                end_date: "Present",
                description: "Leading a team of developers on various projects.",
              },
            ],
            education: [
              {
                institution: "University of Technology",
                degree: "Bachelor of Science",
                field: "Computer Science",
                graduation_year: "2015",
              },
            ],
            skills: ["JavaScript", "React", "Node.js", "Python"],
            certifications: ["AWS Certified Developer", "Scrum Master"],
            projects: [
              {
                name: "E-commerce Platform",
                description: "Developed a full-stack e-commerce solution.",
                technologies: "React, Node.js, MongoDB",
              },
            ],
          },
        })
        setIsLoading(false)
      }, 1000)
    }
  }, [router])

  const handleChange = (section, field, value, index = null) => {
    setProfileData((prev) => {
      if (index !== null) {
        const newSection = [...prev.user_detail[section]]
        newSection[index] = { ...newSection[index], [field]: value }
        return {
          ...prev,
          user_detail: {
            ...prev.user_detail,
            [section]: newSection,
          },
        }
      }
      if (section === "user") {
        return { ...prev, user: { ...prev.user, [field]: value } }
      }
      if (section === "user_detail") {
        if (field.includes(".")) {
          const [parentField, childField] = field.split(".")
          return {
            ...prev,
            user_detail: {
              ...prev.user_detail,
              [parentField]: {
                ...prev.user_detail[parentField],
                [childField]: value,
              },
            },
          }
        }
        return {
          ...prev,
          user_detail: { ...prev.user_detail, [field]: value },
        }
      }
      return prev
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // This will be implemented later with the backend
    console.log(profileData)
    setToastMessage("Profile updated successfully!")
    setShowToast(true)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" className="text-gray-300 hover:text-white" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Dashboard
            </Button>
            <Button
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
              onClick={handleSubmit}
            >
              <Save className="mr-2 h-5 w-5" />
              Save Changes
            </Button>
          </div>

          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profileData.user_detail.profile_picture} alt={profileData.user.first_name} />
                  <AvatarFallback>
                    {profileData.user.first_name[0]}
                    {profileData.user.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl font-bold text-white">
                    {profileData.user.first_name} {profileData.user.last_name}
                  </CardTitle>
                  <CardDescription className="text-gray-400">@{profileData.user.username}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="personal" className="space-y-4">
            <TabsList className="bg-gray-800/50 border-gray-700">
              <TabsTrigger
                value="personal"
                className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700/50"
              >
                Personal Info
              </TabsTrigger>
              <TabsTrigger
                value="professional"
                className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700/50"
              >
                Professional Info
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-white">Personal Information</CardTitle>
                  <CardDescription className="text-gray-400">Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-gray-200">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={profileData.user.first_name}
                        onChange={(e) => handleChange("user", "first_name", e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-gray-200">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={profileData.user.last_name}
                        onChange={(e) => handleChange("user", "last_name", e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-200">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.user.email}
                      onChange={(e) => handleChange("user", "email", e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-200">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={profileData.user_detail.phone_number}
                      onChange={(e) => handleChange("user_detail", "phone_number", e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-gray-200">
                      Address
                    </Label>
                    <Input
                      id="address"
                      value={profileData.user_detail.address}
                      onChange={(e) => handleChange("user_detail", "address", e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-gray-200">
                      Date of Birth
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profileData.user_detail.date_of_birth}
                      onChange={(e) => handleChange("user_detail", "date_of_birth", e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="professional">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-white">Professional Information</CardTitle>
                  <CardDescription className="text-gray-400">
                    Update your professional details and experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-200">
                      Professional Summary
                    </Label>
                    <Textarea
                      id="description"
                      value={profileData.user_detail.description}
                      onChange={(e) => handleChange("user_detail", "description", e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-gray-200">Profile URLs</Label>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin" className="text-gray-300">
                        LinkedIn
                      </Label>
                      <Input
                        id="linkedin"
                        value={profileData.user_detail.profile_urls.linkedin}
                        onChange={(e) => handleChange("user_detail", "profile_urls.linkedin", e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github" className="text-gray-300">
                        GitHub
                      </Label>
                      <Input
                        id="github"
                        value={profileData.user_detail.profile_urls.github}
                        onChange={(e) => handleChange("user_detail", "profile_urls.github", e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="portfolio" className="text-gray-300">
                        Portfolio
                      </Label>
                      <Input
                        id="portfolio"
                        value={profileData.user_detail.profile_urls.portfolio}
                        onChange={(e) => handleChange("user_detail", "profile_urls.portfolio", e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-gray-200">Work Experience</Label>
                    {profileData.user_detail.work_experience.map((exp, index) => (
                      <Card key={index} className="bg-gray-700/50 border-gray-600">
                        <CardContent className="pt-6 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`company-${index}`} className="text-gray-300">
                              Company
                            </Label>
                            <Input
                              id={`company-${index}`}
                              value={exp.company}
                              onChange={(e) => handleChange("work_experience", "company", e.target.value, index)}
                              className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`position-${index}`} className="text-gray-300">
                              Position
                            </Label>
                            <Input
                              id={`position-${index}`}
                              value={exp.position}
                              onChange={(e) => handleChange("work_experience", "position", e.target.value, index)}
                              className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`startDate-${index}`} className="text-gray-300">
                                Start Date
                              </Label>
                              <Input
                                id={`startDate-${index}`}
                                type="date"
                                value={exp.start_date}
                                onChange={(e) => handleChange("work_experience", "start_date", e.target.value, index)}
                                className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`endDate-${index}`} className="text-gray-300">
                                End Date
                              </Label>
                              <Input
                                id={`endDate-${index}`}
                                type="date"
                                value={exp.end_date}
                                onChange={(e) => handleChange("work_experience", "end_date", e.target.value, index)}
                                className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`description-${index}`} className="text-gray-300">
                              Description
                            </Label>
                            <Textarea
                              id={`description-${index}`}
                              value={exp.description}
                              onChange={(e) => handleChange("work_experience", "description", e.target.value, index)}
                              className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                              rows={3}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <Label className="text-gray-200">Education</Label>
                    {profileData.user_detail.education.map((edu, index) => (
                      <Card key={index} className="bg-gray-700/50 border-gray-600">
                        <CardContent className="pt-6 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`institution-${index}`} className="text-gray-300">
                              Institution
                            </Label>
                            <Input
                              id={`institution-${index}`}
                              value={edu.institution}
                              onChange={(e) => handleChange("education", "institution", e.target.value, index)}
                              className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`degree-${index}`} className="text-gray-300">
                              Degree
                            </Label>
                            <Input
                              id={`degree-${index}`}
                              value={edu.degree}
                              onChange={(e) => handleChange("education", "degree", e.target.value, index)}
                              className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`field-${index}`} className="text-gray-300">
                              Field of Study
                            </Label>
                            <Input
                              id={`field-${index}`}
                              value={edu.field}
                              onChange={(e) => handleChange("education", "field", e.target.value, index)}
                              className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`graduationYear-${index}`} className="text-gray-300">
                              Graduation Year
                            </Label>
                            <Input
                              id={`graduationYear-${index}`}
                              value={edu.graduation_year}
                              onChange={(e) => handleChange("education", "graduation_year", e.target.value, index)}
                              className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills" className="text-gray-200">
                      Skills
                    </Label>
                    <Textarea
                      id="skills"
                      value={profileData.user_detail.skills.join(", ")}
                      onChange={(e) => handleChange("user_detail", "skills", e.target.value.split(", "))}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      placeholder="Enter skills separated by commas"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="certifications" className="text-gray-200">
                      Certifications
                    </Label>
                    <Textarea
                      id="certifications"
                      value={profileData.user_detail.certifications.join(", ")}
                      onChange={(e) => handleChange("user_detail", "certifications", e.target.value.split(", "))}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      placeholder="Enter certifications separated by commas"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-gray-200">Projects</Label>
                    {profileData.user_detail.projects.map((project, index) => (
                      <Card key={index} className="bg-gray-700/50 border-gray-600">
                        <CardContent className="pt-6 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`projectName-${index}`} className="text-gray-300">
                              Project Name
                            </Label>
                            <Input
                              id={`projectName-${index}`}
                              value={project.name}
                              onChange={(e) => handleChange("projects", "name", e.target.value, index)}
                              className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`projectDescription-${index}`} className="text-gray-300">
                              Description
                            </Label>
                            <Textarea
                              id={`projectDescription-${index}`}
                              value={project.description}
                              onChange={(e) => handleChange("projects", "description", e.target.value, index)}
                              className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                              rows={3}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`projectTechnologies-${index}`} className="text-gray-300">
                              Technologies
                            </Label>
                            <Input
                              id={`projectTechnologies-${index}`}
                              value={project.technologies}
                              onChange={(e) => handleChange("projects", "technologies", e.target.value, index)}
                              className="bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
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

