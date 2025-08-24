import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Filter, ArrowLeft, Users, Mail, Phone, MoreHorizontal, UserPlus } from "lucide-react"
import Link from "next/link"

export default async function UserManagement() {
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

  // Get all users
  const { data: users } = await supabase
    .from("profiles")
    .select(`
      *,
      volunteers (
        hours_volunteered,
        skills,
        availability
      ),
      donors (
        total_donated,
        donation_frequency
      )
    `)
    .order("created_at", { ascending: false })

  const totalUsers = users?.length || 0
  const volunteers = users?.filter((u) => u.role === "volunteer").length || 0
  const donors = users?.filter((u) => u.role === "donor").length || 0
  const admins = users?.filter((u) => u.role === "admin").length || 0

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
                <h1 className="text-xl font-semibold text-nature-800">User Management</h1>
                <p className="text-sm text-nature-600">Manage volunteers, donors, and administrators</p>
              </div>
            </div>
            <Button className="bg-nature-600 hover:bg-nature-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
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
                  <Users className="h-6 w-6 text-nature-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-nature-800">{totalUsers}</p>
                  <p className="text-sm text-nature-600">Total Users</p>
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
                  <p className="text-2xl font-bold text-nature-800">{volunteers}</p>
                  <p className="text-sm text-nature-600">Volunteers</p>
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
                  <p className="text-2xl font-bold text-nature-800">{donors}</p>
                  <p className="text-sm text-nature-600">Donors</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-nature-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-nature-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-nature-800">{admins}</p>
                  <p className="text-sm text-nature-600">Administrators</p>
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
                  <Input placeholder="Search users..." className="pl-10 border-nature-200 focus:border-nature-500" />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-48 border-nature-200">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="volunteer">Volunteers</SelectItem>
                  <SelectItem value="donor">Donors</SelectItem>
                  <SelectItem value="admin">Administrators</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-48 border-nature-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-nature-200 text-nature-700 hover:bg-nature-50 bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-nature-800">All Users</CardTitle>
            <CardDescription>Manage user accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users && users.length > 0 ? (
                users.map((userItem) => (
                  <div
                    key={userItem.id}
                    className="flex items-center justify-between p-4 bg-nature-50 rounded-lg hover:bg-nature-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-nature-600 text-white">
                          {userItem.full_name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-nature-800">{userItem.full_name || "Unknown User"}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-nature-600">
                          <span className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {userItem.email}
                          </span>
                          {userItem.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              {userItem.phone}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant={
                              userItem.role === "admin"
                                ? "default"
                                : userItem.role === "volunteer"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={userItem.role === "admin" ? "bg-nature-600" : ""}
                          >
                            {userItem.role}
                          </Badge>
                          {userItem.role === "volunteer" && userItem.volunteers?.[0] && (
                            <Badge variant="outline" className="border-nature-200 text-nature-700">
                              {userItem.volunteers[0].hours_volunteered || 0} hours
                            </Badge>
                          )}
                          {userItem.role === "donor" && userItem.donors?.[0] && (
                            <Badge variant="outline" className="border-nature-200 text-nature-700">
                              ${userItem.donors[0].total_donated?.toLocaleString() || 0} donated
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-nature-600">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-nature-600">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-nature-600">
                  <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium text-nature-800 mb-2">No users found</h3>
                  <p className="text-nature-600">Start by adding your first user</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
