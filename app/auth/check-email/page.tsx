import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Leaf } from "lucide-react"
import Link from "next/link"

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nature-50 to-nature-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-8 w-8 text-nature-600" />
            <span className="text-2xl font-bold text-nature-800">GreenHope</span>
          </div>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-nature-100">
              <Mail className="h-8 w-8 text-nature-600" />
            </div>
            <CardTitle className="text-2xl text-nature-800">Check Your Email</CardTitle>
            <CardDescription className="text-nature-600">
              We've sent you a confirmation link to complete your registration
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-nature-600">
              Please check your email and click the confirmation link to activate your account. You may need to check
              your spam folder.
            </p>
            <div className="pt-4">
              <Button
                asChild
                variant="outline"
                className="border-nature-200 text-nature-700 hover:bg-nature-50 bg-transparent"
              >
                <Link href="/auth/login">Back to Sign In</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
