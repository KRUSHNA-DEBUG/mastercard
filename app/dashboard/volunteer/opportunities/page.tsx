import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Users, Search, Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function VolunteerOpportunities() {
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

  if (profile?.role !== "volunteer") {
    redirect("/auth/login")
  }

  // Get available events/opportunities
  const { data: opportunities } = await supabase
    .from("events")
    .select("*")
    .gte("date", new Date().toISOString())
    .order("date", { ascending: true })

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-50 to-nature-100">
      {/* Header */}
      <div className="bg-white border-b border-nature-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard/volunteer" className="text-nature-600">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-nature-800">Volunteer Opportunities</h1>
                <p className="text-sm text-nature-600">Find meaningful ways to contribute</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="border-0 shadow-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-nature-400" />
                  <Input
                    placeholder="Search opportunities..."
                    className="pl-10 border-nature-200 focus:border-nature-500"
                  />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-48 border-nature-200">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="environment">Environment</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-48 border-nature-200">
                  <SelectValue placeholder="Time Commitment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Duration</SelectItem>
                  <SelectItem value="short">1-3 hours</SelectItem>
                  <SelectItem value="medium">4-8 hours</SelectItem>
                  <SelectItem value="long">Full day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities && opportunities.length > 0 ? (
            opportunities.map((opportunity) => (
              <Card key={opportunity.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge className="bg-nature-100 text-nature-700 hover:bg-nature-100">
                      {opportunity.category || "Community"}
                    </Badge>
                    <Heart className="h-5 w-5 text-nature-300 hover:text-nature-600 cursor-pointer" />
                  </div>
                  <CardTitle className="text-lg text-nature-800">{opportunity.title}</CardTitle>
                  <CardDescription className="text-nature-600">
                    {opportunity.description?.substring(0, 100)}...
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-nature-600">
                      <Calendar className="h-4 w-4" />
                      {new Date(opportunity.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-nature-600">
                      <Clock className="h-4 w-4" />
                      {opportunity.duration || "4 hours"}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-nature-600">
                      <MapPin className="h-4 w-4" />
                      {opportunity.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-nature-600">
                      <Users className="h-4 w-4" />
                      {opportunity.volunteers_needed || 10} volunteers needed
                    </div>
                  </div>
                  <div className="flex gap-2 mt-6">
                    <Button className="flex-1 bg-nature-600 hover:bg-nature-700">Apply Now</Button>
                    <Button variant="outline" size="sm" className="border-nature-200 text-nature-700 bg-transparent">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Heart className="h-16 w-16 mx-auto mb-4 text-nature-300" />
              <h3 className="text-lg font-medium text-nature-800 mb-2">No opportunities available</h3>
              <p className="text-nature-600">Check back soon for new volunteer opportunities!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
