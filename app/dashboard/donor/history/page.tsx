import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, Search, Filter, ArrowLeft, DollarSign } from "lucide-react"
import Link from "next/link"

export default async function DonationHistory() {
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

  // Get all donations
  const { data: donations } = await supabase
    .from("donations")
    .select(`
      *,
      programs (
        title
      )
    `)
    .eq("donor_id", user.id)
    .order("created_at", { ascending: false })

  const totalDonated = donations?.reduce((sum, donation) => sum + donation.amount, 0) || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-50 to-nature-100">
      {/* Header */}
      <div className="bg-white border-b border-nature-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard/donor" className="text-nature-600">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-nature-800">Donation History</h1>
                <p className="text-sm text-nature-600">Track all your contributions</p>
              </div>
            </div>
            <Button className="bg-nature-600 hover:bg-nature-700">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                  <Calendar className="h-6 w-6 text-sunny-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-nature-800">{donations?.length || 0}</p>
                  <p className="text-sm text-nature-600">Total Donations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-mint-100 flex items-center justify-center">
                  <Download className="h-6 w-6 text-mint-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-nature-800">
                    $
                    {donations?.filter((d) => d.created_at.startsWith("2024")).reduce((sum, d) => sum + d.amount, 0) ||
                      0}
                  </p>
                  <p className="text-sm text-nature-600">2024 Tax Deductible</p>
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
                  <Input
                    placeholder="Search donations..."
                    className="pl-10 border-nature-200 focus:border-nature-500"
                  />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-48 border-nature-200">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-48 border-nature-200">
                  <SelectValue placeholder="Program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  <SelectItem value="general">General Fund</SelectItem>
                  <SelectItem value="clean-water">Clean Water</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-nature-200 text-nature-700 hover:bg-nature-50 bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Donations List */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-nature-800">All Donations</CardTitle>
            <CardDescription>Complete history of your contributions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {donations && donations.length > 0 ? (
                donations.map((donation) => (
                  <div
                    key={donation.id}
                    className="flex items-center justify-between p-4 bg-nature-50 rounded-lg hover:bg-nature-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-nature-800">${donation.amount.toLocaleString()}</h4>
                        <Badge
                          variant={donation.status === "completed" ? "default" : "secondary"}
                          className={donation.status === "completed" ? "bg-nature-600" : ""}
                        >
                          {donation.status}
                        </Badge>
                        {donation.recurring && (
                          <Badge variant="outline" className="border-nature-200 text-nature-700">
                            Recurring
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-nature-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(donation.created_at).toLocaleDateString()}
                        </span>
                        <span>{donation.programs?.title || "General Fund"}</span>
                        {donation.payment_method && <span>•••• {donation.payment_method.slice(-4)}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-nature-600">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-nature-600">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-nature-600">
                  <DollarSign className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium text-nature-800 mb-2">No donations yet</h3>
                  <p className="text-nature-600 mb-4">Start making a difference today</p>
                  <Button asChild className="bg-nature-600 hover:bg-nature-700">
                    <Link href="/dashboard/donor/donate">Make Your First Donation</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
