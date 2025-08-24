"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Leaf } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      console.log("[v0] Starting login process...")

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        console.log("[v0] Auth error:", authError)
        throw authError
      }

      console.log("[v0] Authentication successful, user ID:", authData.user?.id)

      let profile = null
      try {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", authData.user.id)
          .single()

        if (profileError && profileError.code !== "PGRST116") {
          // PGRST116 is "not found" error, which we can handle
          console.log("[v0] Profile fetch error:", profileError)
          throw profileError
        }

        profile = profileData
        console.log("[v0] Profile found:", profile)
      } catch (profileFetchError) {
        console.log("[v0] Error fetching profile:", profileFetchError)
      }

      if (!profile) {
        console.log("[v0] No profile found, creating one...")
        const { data: newProfile, error: createError } = await supabase
          .from("profiles")
          .insert({
            id: authData.user.id,
            email: authData.user.email,
            full_name: authData.user.user_metadata?.full_name || "",
            role: "donor", // default role
          })
          .select("role")
          .single()

        if (createError) {
          console.log("[v0] Error creating profile:", createError)
          // If we can't create a profile, default to donor dashboard
          profile = { role: "donor" }
        } else {
          profile = newProfile
          console.log("[v0] Profile created:", profile)
        }
      }

      const userRole = profile?.role || "donor"
      console.log("[v0] Redirecting user with role:", userRole)

      if (userRole === "admin") {
        router.push("/dashboard/admin")
      } else if (userRole === "volunteer") {
        router.push("/dashboard/volunteer")
      } else {
        router.push("/dashboard/donor")
      }

      router.refresh()
    } catch (error: unknown) {
      console.log("[v0] Login error:", error)
      setError(error instanceof Error ? error.message : "An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nature-50 to-nature-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-8 w-8 text-nature-600" />
            <span className="text-2xl font-bold text-nature-800">GreenHope</span>
          </div>
          <h1 className="text-3xl font-bold text-nature-800 mb-2">Welcome Back</h1>
          <p className="text-nature-600">Sign in to your account to continue</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-nature-800">Sign In</CardTitle>
            <CardDescription className="text-center text-nature-600">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-nature-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-nature-200 focus:border-nature-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-nature-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-nature-200 focus:border-nature-500"
                />
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">{error}</div>
              )}
              <Button type="submit" className="w-full bg-nature-600 hover:bg-nature-700" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-nature-600">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-nature-600 hover:text-nature-800 font-medium underline underline-offset-4"
              >
                Sign up here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
