import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Award, ArrowLeft, Camera, Edit } from "lucide-react"
import Link from "next/link"

export default async function VolunteerProfile() {
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
                <h1 className="text-xl font-semibold text-nature-800">My Profile</h1>
                <p className="text-sm text-nature-600">Manage your volunteer information</p>
              </div>
            </div>
            <Button className="bg-nature-600 hover:bg-nature-700">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <div className="h-24 w-24 rounded-full bg-nature-600 flex items-center justify-center mx-auto">
                    <span className="text-2xl font-semibold text-white">{profile?.full_name?.charAt(0) || "V"}</span>
                  </div>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-nature-600 hover:bg-nature-700"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-semibold text-nature-800 mb-1">{profile?.full_name || "Volunteer"}</h2>
                <p className="text-nature-600 mb-4">{profile?.email}</p>
                <Badge className="bg-nature-100 text-nature-700 hover:bg-nature-100">Gold Volunteer</Badge>

                <div className="mt-6 space-y-3 text-left">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-nature-600" />
                    <span className="text-nature-700">
                      Joined {volunteer?.created_at ? new Date(volunteer.created_at).toLocaleDateString() : "Recently"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Award className="h-4 w-4 text-nature-600" />
                    <span className="text-nature-700">{volunteer?.hours_volunteered || 0} hours volunteered</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="border-0 shadow-sm mt-6">
              <CardHeader>
                <CardTitle className="text-nature-800">Skills & Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-nature-700">Skills</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile?.skills && profile.skills.length > 0 ? (
                        profile.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="bg-nature-100 text-nature-700">
                            {skill}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-nature-600">No skills added yet</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-nature-700">Interests</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile?.interests && profile.interests.length > 0 ? (
                        profile.interests.map((interest, index) => (
                          <Badge key={index} variant="outline" className="border-nature-200 text-nature-700">
                            {interest}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-nature-600">No interests added yet</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-nature-800">Personal Information</CardTitle>
                <CardDescription>Update your contact details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-nature-700">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={profile?.full_name || ""}
                      className="border-nature-200 focus:border-nature-500"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-nature-700">
                      Email
                    </Label>
                    <Input
                      id="email"
                      value={profile?.email || ""}
                      className="border-nature-200 focus:border-nature-500"
                      readOnly
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-nature-700">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={profile?.phone || ""}
                      placeholder="Your phone number"
                      className="border-nature-200 focus:border-nature-500"
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-nature-700">
                      Address
                    </Label>
                    <Input
                      id="address"
                      value={profile?.address || ""}
                      placeholder="Your address"
                      className="border-nature-200 focus:border-nature-500"
                      readOnly
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio" className="text-nature-700">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={profile?.bio || ""}
                    placeholder="Tell us about yourself and your volunteer interests..."
                    className="border-nature-200 focus:border-nature-500 min-h-24"
                    readOnly
                  />
                </div>

                <div>
                  <Label className="text-nature-700">Availability</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {["Weekdays", "Weekends", "Evenings", "Flexible"].map((time) => (
                      <Badge key={time} variant="outline" className="justify-center border-nature-200 text-nature-700">
                        {time}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Volunteer History */}
            <Card className="border-0 shadow-sm mt-6">
              <CardHeader>
                <CardTitle className="text-nature-800">Volunteer History</CardTitle>
                <CardDescription>Your recent volunteer activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-nature-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-nature-800">Beach Cleanup Drive</h4>
                      <p className="text-sm text-nature-600">Environmental • 4 hours</p>
                    </div>
                    <Badge className="bg-nature-600">Completed</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-nature-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-nature-800">Community Garden Project</h4>
                      <p className="text-sm text-nature-600">Community • 6 hours</p>
                    </div>
                    <Badge className="bg-nature-600">Completed</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-nature-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-nature-800">Food Distribution</h4>
                      <p className="text-sm text-nature-600">Community • 3 hours</p>
                    </div>
                    <Badge className="bg-nature-600">Completed</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
