import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, MapPin, Users, Award, TrendingUp, Bell, BookOpen, Heart } from "lucide-react"
import Link from "next/link"

export default async function VolunteerDashboard() {
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

  // Get volunteer data
  const { data: volunteer } = await supabase.from("volunteers").select("*").eq("user_id", user.id).single()

  // Get applications
  const { data: applications } = await supabase
    .from("volunteer_applications")
    .select(`
      *,
      events (
        title,
        date,
        location,
        description
      )
    `)
    .eq("volunteer_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  // Get upcoming events
  const { data: upcomingEvents } = await supabase
    .from("events")
    .select("*")
    .gte("date", new Date().toISOString())
    .order("date", { ascending: true })
    .limit(3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-50 to-nature-100">
      {/* Header */}
      <div className="bg-white border-b border-nature-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-nature-600 flex items-center justify-center">
                <span className="text-white font-semibold">{profile?.full_name?.charAt(0) || "V"}</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-nature-800">
                  Welcome back, {profile?.full_name || "Volunteer"}!
                </h1>
                <p className="text-sm text-nature-600">Ready to make a difference today?</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-nature-600">
                <Bell className="h-4 w-4" />
              </Button>
              <Button asChild size="sm" className="bg-nature-600 hover:bg-nature-700">
                <Link href="/dashboard/volunteer/profile">View Profile</Link>
              </Button>
            </div>
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
                  <Clock className="h-6 w-6 text-nature-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-nature-800">{volunteer?.hours_volunteered || 0}</p>
                  <p className="text-sm text-nature-600">Hours Volunteered</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-sunny-100 flex items-center justify-center">
                  <Award className="h-6 w-6 text-sunny-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-nature-800">12</p>
                  <p className="text-sm text-nature-600">Events Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-mint-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-mint-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-nature-800">248</p>
                  <p className="text-sm text-nature-600">People Helped</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-nature-100 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-nature-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-nature-800">Gold</p>
                  <p className="text-sm text-nature-600">Volunteer Level</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-nature-800">Quick Actions</CardTitle>
                <CardDescription>Get started with your volunteer activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button asChild className="h-auto p-4 bg-nature-600 hover:bg-nature-700">
                    <Link href="/dashboard/volunteer/opportunities" className="flex flex-col items-center gap-2">
                      <Heart className="h-6 w-6" />
                      <span>Find Opportunities</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto p-4 border-nature-200 hover:bg-nature-50 bg-transparent"
                  >
                    <Link href="/dashboard/volunteer/applications" className="flex flex-col items-center gap-2">
                      <Calendar className="h-6 w-6 text-nature-600" />
                      <span>My Applications</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto p-4 border-nature-200 hover:bg-nature-50 bg-transparent"
                  >
                    <Link href="/dashboard/volunteer/training" className="flex flex-col items-center gap-2">
                      <BookOpen className="h-6 w-6 text-nature-600" />
                      <span>Training</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Applications */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-nature-800">Recent Applications</CardTitle>
                <CardDescription>Track your volunteer application status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications && applications.length > 0 ? (
                    applications.map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-4 bg-nature-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-nature-800">{app.events?.title}</h4>
                          <div className="flex items-center gap-4 mt-1 text-sm text-nature-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {app.events?.date ? new Date(app.events.date).toLocaleDateString() : "TBD"}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {app.events?.location}
                            </span>
                          </div>
                        </div>
                        <Badge
                          variant={
                            app.status === "approved"
                              ? "default"
                              : app.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                          className={app.status === "approved" ? "bg-nature-600" : ""}
                        >
                          {app.status}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-nature-600">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No applications yet</p>
                      <Button asChild className="mt-4 bg-nature-600 hover:bg-nature-700">
                        <Link href="/dashboard/volunteer/opportunities">Browse Opportunities</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Progress Tracking */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-nature-800">Monthly Progress</CardTitle>
                <CardDescription>Your volunteer goals for this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-nature-700">Hours Goal</span>
                    <span className="text-nature-600">15 / 20 hours</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-nature-700">Events Goal</span>
                    <span className="text-nature-600">2 / 3 events</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-nature-800">Upcoming Events</CardTitle>
                <CardDescription>Don't miss these opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents && upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event) => (
                      <div key={event.id} className="p-3 bg-nature-50 rounded-lg">
                        <h4 className="font-medium text-nature-800 text-sm">{event.title}</h4>
                        <div className="flex items-center gap-2 mt-1 text-xs text-nature-600">
                          <Calendar className="h-3 w-3" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-nature-600">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </div>
                        <Button size="sm" className="w-full mt-3 bg-nature-600 hover:bg-nature-700">
                          Apply Now
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-nature-600 text-center py-4">No upcoming events</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-nature-800">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-sunny-100 flex items-center justify-center">
                      <Award className="h-4 w-4 text-sunny-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-nature-800">Community Hero</p>
                      <p className="text-xs text-nature-600">50+ hours volunteered</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-mint-100 flex items-center justify-center">
                      <Users className="h-4 w-4 text-mint-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-nature-800">Team Player</p>
                      <p className="text-xs text-nature-600">10+ group events</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-nature-800">Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button asChild variant="ghost" className="w-full justify-start text-nature-700 hover:bg-nature-50">
                    <Link href="/dashboard/volunteer/training">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Training Materials
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full justify-start text-nature-700 hover:bg-nature-50">
                    <Link href="/dashboard/volunteer/guidelines">
                      <Users className="h-4 w-4 mr-2" />
                      Volunteer Guidelines
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
