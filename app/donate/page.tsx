import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, CreditCard, Shield, Users, Leaf, GraduationCap, Home } from "lucide-react"

export default function DonatePage() {
  const impactLevels = [
    {
      amount: 25,
      title: "Supporter",
      description: "Provides school supplies for 2 children",
      icon: GraduationCap,
    },
    {
      amount: 50,
      title: "Advocate",
      description: "Plants 10 trees in deforested areas",
      icon: Leaf,
    },
    {
      amount: 100,
      title: "Champion",
      description: "Provides clean water access for 1 family",
      icon: Users,
    },
    {
      amount: 250,
      title: "Hero",
      description: "Supports healthcare for 5 families for a month",
      icon: Heart,
    },
    {
      amount: 500,
      title: "Guardian",
      description: "Helps build safe housing materials",
      icon: Home,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            <Heart className="h-4 w-4 mr-2" />
            Make a Difference
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Your Donation Creates Impact</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Every contribution, no matter the size, helps us create lasting change in communities worldwide. See exactly
            how your donation makes a difference.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <span>Tax Deductible</span>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Levels */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Your Impact</h2>
            <p className="text-xl text-muted-foreground">See how different donation amounts create real change</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {impactLevels.map((level, index) => {
              const Icon = level.icon
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50"
                >
                  <CardHeader>
                    <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-2xl font-bold text-primary">${level.amount}</CardTitle>
                    <Badge variant="secondary" className="mx-auto">
                      {level.title}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{level.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Make Your Donation</h2>
            <p className="text-xl text-muted-foreground">Choose your donation amount and frequency</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Donation Details</CardTitle>
              <CardDescription>Your contribution helps us continue our mission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Donation Type */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Donation Type</Label>
                <RadioGroup defaultValue="one-time" className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="one-time" id="one-time" />
                    <Label htmlFor="one-time" className="cursor-pointer">
                      One-time Donation
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="recurring" id="recurring" />
                    <Label htmlFor="recurring" className="cursor-pointer">
                      Monthly Recurring
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Amount Selection */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Donation Amount</Label>
                <div className="grid grid-cols-3 gap-3">
                  {[25, 50, 100, 250, 500, 1000].map((amount) => (
                    <Button key={amount} variant="outline" className="h-12 bg-transparent">
                      ${amount}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">$</span>
                  <Input placeholder="Custom amount" type="number" />
                </div>
              </div>

              {/* Program Selection */}
              <div className="space-y-2">
                <Label htmlFor="program">Support a Specific Program (Optional)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose where your donation goes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Where needed most</SelectItem>
                    <SelectItem value="environment">Environmental Conservation</SelectItem>
                    <SelectItem value="education">Education for All</SelectItem>
                    <SelectItem value="healthcare">Healthcare Access</SelectItem>
                    <SelectItem value="housing">Safe Housing Initiative</SelectItem>
                    <SelectItem value="water">Clean Water Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Donor Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Donor Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input id="phone" type="tel" placeholder="Enter your phone number" />
                </div>
              </div>

              {/* Payment Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billingAddress">Billing Address</Label>
                  <Input id="billingAddress" placeholder="Enter your billing address" />
                </div>
              </div>

              {/* Preferences */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="anonymous" />
                  <Label htmlFor="anonymous" className="text-sm">
                    Make this donation anonymous
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="newsletter" />
                  <Label htmlFor="newsletter" className="text-sm">
                    Subscribe to our newsletter for impact updates
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="receipt" />
                  <Label htmlFor="receipt" className="text-sm">
                    Email me a tax-deductible receipt
                  </Label>
                </div>
              </div>

              <Button className="w-full" size="lg">
                <Heart className="h-5 w-5 mr-2" />
                Complete Donation
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Your payment is secure and encrypted. You will receive a confirmation email and tax receipt after your
                donation is processed.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Why Donate With Us?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>100% Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your payment information is encrypted and secure. We never store your card details.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Direct Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  95% of your donation goes directly to programs. We maintain low overhead costs.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CreditCard className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Tax Deductible</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All donations are tax-deductible. You'll receive an official receipt immediately.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
