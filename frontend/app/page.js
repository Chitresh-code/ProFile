import Link from "next/link"
import { ArrowRight, FileText, Zap, Award } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col items-center text-center space-y-8">
          <Link
            href="https://github.com/Chitresh-code/ProFile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full px-3 py-1 text-sm leading-6 text-emerald-400 ring-1 ring-emerald-400/30 hover:ring-emerald-400/50 transition-all duration-200 hover:scale-105"
          >
            Announcing our new AI features - View on GitHub <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-3xl">
            Create Professional Resumes with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              AI-Powered
            </span>{" "}
            Tools
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            ProFile helps you build impressive resumes in minutes. Get personalized suggestions and stand out from the
            crowd.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 transform hover:scale-105 transition-transform duration-200"
            >
              <Link href="/signup">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800 transform hover:scale-105 transition-transform duration-200"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors duration-200 transform hover:scale-105">
            <CardContent className="pt-6">
              <div className="rounded-full w-12 h-12 bg-emerald-500/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Suggestions</h3>
              <p className="text-gray-400">
                Get intelligent recommendations for your resume content based on your experience and industry.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors duration-200 transform hover:scale-105">
            <CardContent className="pt-6">
              <div className="rounded-full w-12 h-12 bg-emerald-500/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Multiple Templates</h3>
              <p className="text-gray-400">
                Choose from a variety of professional templates designed to match your career goals.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-colors duration-200 transform hover:scale-105">
            <CardContent className="pt-6">
              <div className="rounded-full w-12 h-12 bg-emerald-500/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Expert Scoring</h3>
              <p className="text-gray-400">
                Get your resume scored against industry standards and receive improvement suggestions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-400 border-t border-gray-800">
        <p>© 2024 ProFile. All rights reserved.</p>
      </footer>
    </div>
  )
}

