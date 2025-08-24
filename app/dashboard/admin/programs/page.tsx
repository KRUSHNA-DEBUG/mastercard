import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Search, Filter, ArrowLeft, Heart, Plus, Edit, MoreHorizontal, Target, DollarSign } from "lucide-react"
import Link from "next/link"

export default async function ProgramManagement() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    redirect("/auth/login")
  }

  // Get all programs
  const { data: programs } = await supabase.from("programs").select("*").order("created_at", { ascending: false })

  const totalPrograms = programs?.length || 0
  const activePrograms = programs?.filter((p) => p.status === "active").length || 0
  const completedPrograms = programs?.filter((p) => p.status === "completed").length || 0
  const totalFunding = programs?.reduce((sum, p) => sum + (p.current_funding || 0), 0) || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-50 to-nature-100">
      {/* Header */}
      <div className="bg-white border-b border-nature-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard/admin" className="text-nature-600">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-nature-800">Program Management</h1>
                <p className="text-sm text-nature-600">Create and manage your organization's programs</p>
              </div>
            </div>
            <Button asChild className="bg-nature-600 hover:bg-nature-700">
              <Link href="/dashboard/admin/programs/new">
                <Plus className="h-4 w-4 mr-2" />
                New Program
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-nature-100 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-nature-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-nature-800">{totalPrograms}</p>
                  <p className="text-sm text-nature-600">Total Programs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-sunny-100 flex items-center justify-center">
                  <Target className="h-6 w-6 text-sunny-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-nature-800">{activePrograms}</p>
                  <p className="text-sm text-nature-600">Active Programs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-mint-100 flex items-center justify-center">
                  <Target className="h-6 w-6 text-mint-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-nature-800">{completedPrograms}</p>
                  <p className="text-sm text-nature-600">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-nature-100 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-nature-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-nature-800">${totalFunding.toLocaleString()}</p>
                  <p className="text-sm text-nature-600">Total Funding</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-nature-400" />
                  <Input placeholder="Search programs..." className="pl-10 border-nature-200 focus:border-nature-500" />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-48 border-nature-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-48 border-nature-200">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="environment">Environment</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-nature-200 text-nature-700 hover:bg-nature-50 bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs && programs.length > 0 ? (
            programs.map((program) => (
              <Card key={program.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge
                      variant={program.status === "active" ? "default" : "secondary"}
                      className={program.status === "active" ? "bg-nature-600" : ""}
                    >
                      {program.status}
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-nature-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-lg text-nature-800">{program.title}</CardTitle>
                  <CardDescription className="text-nature-600">
                    {program.description?.substring(0, 100)}...
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {program.funding_goal && (
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-nature-600">
                            ${program.current_funding?.toLocaleString() || 0} raised
                          </span>
                          <span className="text-nature-600">${program.funding_goal.toLocaleString()} goal</span>
                        </div>
                        <Progress
                          value={
                            program.funding_goal ? ((program.current_funding || 0) / program.funding_goal) * 100 : 0
                          }
                          className="h-2"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-nature-600">
                      <span>Category: {program.category || "General"}</span>
                      <span>Created: {new Date(program.created_at).toLocaleDateString()}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button asChild size="sm" className="flex-1 bg-nature-600 hover:bg-nature-700">
                        <Link href={`/dashboard/admin/programs/${program.id}`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="border-nature-200 text-nature-700 bg-transparent">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Heart className="h-16 w-16 mx-auto mb-4 text-nature-300" />
              <h3 className="text-lg font-medium text-nature-800 mb-2">No programs yet</h3>
              <p className="text-nature-600 mb-4">Create your first program to get started</p>
              <Button asChild className="bg-nature-600 hover:bg-nature-700">
                <Link href="/dashboard/admin/programs/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Program
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
