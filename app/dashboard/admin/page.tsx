import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  Heart,
  AlertCircle,
  Plus,
  Settings,
  BarChart3,
  FileText,
} from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
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

  // Get dashboard statistics
  const { data: volunteers } = await supabase.from("volunteers").select("id")
  const { data: donors } = await supabase.from("donors").select("id")
  const { data: donations } = await supabase.from("donations").select("amount, created_at")
  const { data: events } = await supabase.from("events").select("*")
  const { data: programs } = await supabase.from("programs").select("*")
  const { data: applications } = await supabase
    .from("volunteer_applications")
    .select("*")
    .eq("status", "pending")
    .limit(5)

  // Calculate metrics
  const totalDonations = donations?.reduce((sum, d) => sum + d.amount, 0) || 0
  const monthlyDonations =
    donations?.filter((d) => new Date(d.created_at).getMonth() === new Date().getMonth()).length || 0
  const activePrograms = programs?.filter((p) => p.status === "active").length || 0
  const upcomingEvents = events?.filter((e) => new Date(e.date) > new Date()).length || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-50 to-nature-100">
      {/* Header */}
      <div className="bg-white border-b border-nature-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-nature-600 flex items-center justify-center">
                <span className="text-white font-semibold">{profile?.full_name?.charAt(0) || "A"}</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-nature-800">Admin Dashboard</h1>
                <p className="text-sm text-nature-600">Manage your organization</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm" className="text-nature-600">
                <Link href="/dashboard/admin/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
              <Button asChild size="sm" className="bg-nature-600 hover:bg-nature-700">
                <Link href="/dashboard/admin/programs/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Program
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-nature-100 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-nature-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-nature-800">${totalDonations.toLocaleString()}</p>
                  <p className="text-sm text-nature-600">Total Donations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-sunny-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-sunny-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-nature-800">
                    {(volunteers?.length || 0) + (donors?.length || 0)}
                  </p>
                  <p className="text-sm text-nature-600">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-mint-100 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-mint-600" />
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
                <div className="h-12 w-12 rounded-lg bg-nature-100 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-nature-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-nature-800">{upcomingEvents}</p>
                  <p className="text-sm text-nature-600">Upcoming Events</p>
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
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button asChild className="h-auto p-4 bg-nature-600 hover:bg-nature-700">
                    <Link href="/dashboard/admin/users" className="flex flex-col items-center gap-2">
                      <Users className="h-6 w-6" />
                      <span className="text-sm">Manage Users</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto p-4 border-nature-200 hover:bg-nature-50 bg-transparent"
                  >
                    <Link href="/dashboard/admin/programs" className="flex flex-col items-center gap-2">
                      <Heart className="h-6 w-6 text-nature-600" />
                      <span className="text-sm">Programs</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto p-4 border-nature-200 hover:bg-nature-50 bg-transparent"
                  >
                    <Link href="/dashboard/admin/events" className="flex flex-col items-center gap-2">
                      <Calendar className="h-6 w-6 text-nature-600" />
                      <span className="text-sm">Events</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto p-4 border-nature-200 hover:bg-nature-50 bg-transparent"
                  >
                    <Link href="/dashboard/admin/reports" className="flex flex-col items-center gap-2">
                      <BarChart3 className="h-6 w-6 text-nature-600" />
                      <span className="text-sm">Reports</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-nature-800">Recent Activity</CardTitle>
                <CardDescription>Latest updates across your organization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-nature-50 rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-nature-600 flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-nature-800">New donation received</p>
                      <p className="text-xs text-nature-600">$250 from John Smith • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-nature-50 rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-sunny-600 flex items-center justify-center">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-nature-800">New volunteer application</p>
                      <p className="text-xs text-nature-600">Sarah Johnson applied for Beach Cleanup • 4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-nature-50 rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-mint-600 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-nature-800">Event registration milestone</p>
                      <p className="text-xs text-nature-600">Community Garden reached 50 volunteers • 6 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Program Performance */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-nature-800">Program Performance</CardTitle>
                <CardDescription>Track progress of active programs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-nature-700">Clean Water Initiative</span>
                    <span className="text-nature-600">$45,000 / $75,000</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-nature-700">Education Support</span>
                    <span className="text-nature-600">$28,000 / $50,000</span>
                  </div>
                  <Progress value={56} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-nature-700">Environmental Conservation</span>
                    <span className="text-nature-600">$62,000 / $80,000</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pending Actions */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-nature-800 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-sunny-600" />
                  Pending Actions
                </CardTitle>
                <CardDescription>Items requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-nature-800">Volunteer Applications</p>
                      <p className="text-xs text-nature-600">{applications?.length || 0} pending review</p>
                    </div>
                    <Button asChild size="sm" className="bg-nature-600 hover:bg-nature-700">
                      <Link href="/dashboard/admin/applications">Review</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-nature-800">Program Updates</p>
                      <p className="text-xs text-nature-600">2 programs need updates</p>
                    </div>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="border-nature-200 text-nature-700 bg-transparent"
                    >
                      <Link href="/dashboard/admin/programs">Update</Link>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-nature-800">Monthly Reports</p>
                      <p className="text-xs text-nature-600">Due in 3 days</p>
                    </div>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="border-nature-200 text-nature-700 bg-transparent"
                    >
                      <Link href="/dashboard/admin/reports">Generate</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-nature-800">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-nature-600">New Volunteers</span>
                    <span className="font-medium text-nature-800">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-nature-600">New Donors</span>
                    <span className="font-medium text-nature-800">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-nature-600">Donations</span>
                    <span className="font-medium text-nature-800">{monthlyDonations}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-nature-600">Events Completed</span>
                    <span className="font-medium text-nature-800">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-nature-800">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-nature-600">Database</span>
                    <Badge className="bg-nature-600">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-nature-600">Payment Processing</span>
                    <Badge className="bg-nature-600">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-nature-600">Email Service</span>
                    <Badge className="bg-nature-600">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-nature-600">Backup</span>
                    <Badge variant="secondary">Last: 2h ago</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-nature-800">Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button asChild variant="ghost" className="w-full justify-start text-nature-700 hover:bg-nature-50">
                    <Link href="/dashboard/admin/users">
                      <Users className="h-4 w-4 mr-2" />
                      User Management
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full justify-start text-nature-700 hover:bg-nature-50">
                    <Link href="/dashboard/admin/donations">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Donation Management
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full justify-start text-nature-700 hover:bg-nature-50">
                    <Link href="/dashboard/admin/content">
                      <FileText className="h-4 w-4 mr-2" />
                      Content Management
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full justify-start text-nature-700 hover:bg-nature-50">
                    <Link href="/dashboard/admin/analytics">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Analytics
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
