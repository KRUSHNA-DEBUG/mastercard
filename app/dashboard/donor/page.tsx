import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, DollarSign, Heart, TrendingUp, Bell, Download, Gift, Users, Target } from "lucide-react"
import Link from "next/link"

export default async function DonorDashboard() {
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

  if (profile?.role !== "donor") {
    redirect("/auth/login")
  }

  // Get donor data
  const { data: donor } = await supabase.from("donors").select("*").eq("user_id", user.id).single()

  // Get donation history
  const { data: donations } = await supabase
    .from("donations")
    .select("*")
    .eq("donor_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  // Get programs
  const { data: programs } = await supabase.from("programs").select("*").eq("status", "active").limit(3)

  // Calculate total donated
  const totalDonated = donations?.reduce((sum, donation) => sum + donation.amount, 0) || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-50 to-nature-100">
      {/* Header */}
      <div className="bg-white border-b border-nature-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-nature-600 flex items-center justify-center">
                <span className="text-white font-semibold">{profile?.full_name?.charAt(0) || "D"}</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-nature-800">
                  Welcome back, {profile?.full_name || "Donor"}!
                </h1>
                <p className="text-sm text-nature-600">Thank you for your continued support</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-nature-600">
                <Bell className="h-4 w-4" />
              </Button>
              <Button asChild size="sm" className="bg-nature-600 hover:bg-nature-700">
                <Link href="/dashboard/donor/donate">Make Donation</Link>
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
                  <DollarSign className="h-6 w-6 text-nature-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-nature-800">${totalDonated.toLocaleString()}</p>
                  <p className="text-sm text-nature-600">Total Donated</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-sunny-100 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-sunny-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-nature-800">{donations?.length || 0}</p>
                  <p className="text-sm text-nature-600">Donations Made</p>
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
                  <p className="text-2xl font-bold text-nature-800">1,247</p>
                  <p className="text-sm text-nature-600">Lives Impacted</p>
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
                  <p className="text-sm text-nature-600">Donor Level</p>
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
                <CardDescription>Manage your donations and support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button asChild className="h-auto p-4 bg-nature-600 hover:bg-nature-700">
                    <Link href="/dashboard/donor/donate" className="flex flex-col items-center gap-2">
                      <Gift className="h-6 w-6" />
                      <span>Make Donation</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto p-4 border-nature-200 hover:bg-nature-50 bg-transparent"
                  >
                    <Link href="/dashboard/donor/history" className="flex flex-col items-center gap-2">
                      <Calendar className="h-6 w-6 text-nature-600" />
                      <span>Donation History</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto p-4 border-nature-200 hover:bg-nature-50 bg-transparent"
                  >
                    <Link href="/dashboard/donor/programs" className="flex flex-col items-center gap-2">
                      <Target className="h-6 w-6 text-nature-600" />
                      <span>Support Programs</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Donations */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-nature-800">Recent Donations</CardTitle>
                    <CardDescription>Your latest contributions</CardDescription>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-nature-200 text-nature-700 bg-transparent"
                  >
                    <Link href="/dashboard/donor/history">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donations && donations.length > 0 ? (
                    donations.map((donation) => (
                      <div key={donation.id} className="flex items-center justify-between p-4 bg-nature-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-nature-800">${donation.amount.toLocaleString()}</h4>
                          <div className="flex items-center gap-4 mt-1 text-sm text-nature-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(donation.created_at).toLocaleDateString()}
                            </span>
                            <span>{donation.program_id ? "Program Support" : "General Fund"}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={donation.status === "completed" ? "default" : "secondary"}
                            className={donation.status === "completed" ? "bg-nature-600" : ""}
                          >
                            {donation.status}
                          </Badge>
                          <Button variant="ghost" size="sm" className="text-nature-600">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-nature-600">
                      <Gift className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No donations yet</p>
                      <Button asChild className="mt-4 bg-nature-600 hover:bg-nature-700">
                        <Link href="/dashboard/donor/donate">Make Your First Donation</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Impact Tracking */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-nature-800">Your Impact This Year</CardTitle>
                <CardDescription>See how your donations are making a difference</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-nature-700">Clean Water Access</span>
                    <span className="text-nature-600">127 people helped</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-nature-700">Education Support</span>
                    <span className="text-nature-600">43 children supported</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-nature-700">Environmental Projects</span>
                    <span className="text-nature-600">2,340 trees planted</span>
                  </div>
                  <Progress value={93} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recurring Donations */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-nature-800">Recurring Donations</CardTitle>
                <CardDescription>Manage your monthly contributions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-nature-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-nature-800">Monthly General Support</h4>
                      <p className="text-sm text-nature-600">$50/month • Next payment: Dec 15, 2024</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-nature-600">Active</Badge>
                      <Button variant="ghost" size="sm" className="text-nature-600">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="text-center py-4">
                    <Button
                      asChild
                      variant="outline"
                      className="border-nature-200 text-nature-700 hover:bg-nature-50 bg-transparent"
                    >
                      <Link href="/dashboard/donor/recurring">Set Up Recurring Donation</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Programs */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-nature-800">Featured Programs</CardTitle>
                <CardDescription>Support these urgent causes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {programs && programs.length > 0 ? (
                    programs.map((program) => (
                      <div key={program.id} className="p-3 bg-nature-50 rounded-lg">
                        <h4 className="font-medium text-nature-800 text-sm">{program.title}</h4>
                        <p className="text-xs text-nature-600 mt-1">{program.description?.substring(0, 80)}...</p>
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-nature-600">
                              ${program.current_funding?.toLocaleString() || 0} raised
                            </span>
                            <span className="text-nature-600">${program.funding_goal?.toLocaleString() || 0} goal</span>
                          </div>
                          <Progress
                            value={
                              program.funding_goal ? ((program.current_funding || 0) / program.funding_goal) * 100 : 0
                            }
                            className="h-1"
                          />
                        </div>
                        <Button size="sm" className="w-full mt-3 bg-nature-600 hover:bg-nature-700">
                          Donate Now
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-nature-600 text-center py-4">No featured programs</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-nature-800">Your Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-sunny-100 flex items-center justify-center">
                      <Heart className="h-4 w-4 text-sunny-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-nature-800">Generous Supporter</p>
                      <p className="text-xs text-nature-600">$1,000+ donated</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-mint-100 flex items-center justify-center">
                      <Users className="h-4 w-4 text-mint-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-nature-800">Community Champion</p>
                      <p className="text-xs text-nature-600">6 months of support</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-nature-100 flex items-center justify-center">
                      <Target className="h-4 w-4 text-nature-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-nature-800">Program Supporter</p>
                      <p className="text-xs text-nature-600">3 programs supported</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tax Information */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-nature-800">Tax Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="text-nature-700 font-medium">2024 Tax Deductible</p>
                    <p className="text-nature-600">${totalDonated.toLocaleString()}</p>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full border-nature-200 text-nature-700 hover:bg-nature-50 bg-transparent"
                  >
                    <Link href="/dashboard/donor/tax-documents">
                      <Download className="h-4 w-4 mr-2" />
                      Download Tax Receipt
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
