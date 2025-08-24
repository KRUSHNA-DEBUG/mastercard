"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Heart, CreditCard, Shield, Gift } from "lucide-react"
import Link from "next/link"

export default function DonatePage() {
  const [amount, setAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [frequency, setFrequency] = useState("one-time")
  const [program, setProgram] = useState("")
  const [message, setMessage] = useState("")

  const presetAmounts = [25, 50, 100, 250, 500, 1000]

  const programs = [
    {
      id: "general",
      name: "General Fund",
      description: "Support our overall mission and operations",
      urgent: false,
    },
    {
      id: "clean-water",
      name: "Clean Water Initiative",
      description: "Provide clean water access to rural communities",
      raised: 45000,
      goal: 75000,
      urgent: true,
    },
    {
      id: "education",
      name: "Education Support",
      description: "Fund educational programs and scholarships",
      raised: 28000,
      goal: 50000,
      urgent: false,
    },
    {
      id: "environment",
      name: "Environmental Conservation",
      description: "Tree planting and habitat restoration projects",
      raised: 62000,
      goal: 80000,
      urgent: false,
    },
  ]

  const selectedProgram = programs.find((p) => p.id === program)

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
                <h1 className="text-xl font-semibold text-nature-800">Make a Donation</h1>
                <p className="text-sm text-nature-600">Your generosity makes a difference</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-nature-800 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-nature-600" />
                  Donation Details
                </CardTitle>
                <CardDescription>Choose your donation amount and program</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Amount Selection */}
                <div>
                  <Label className="text-nature-700 font-medium">Donation Amount</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {presetAmounts.map((preset) => (
                      <Button
                        key={preset}
                        variant={amount === preset.toString() ? "default" : "outline"}
                        className={
                          amount === preset.toString()
                            ? "bg-nature-600 hover:bg-nature-700"
                            : "border-nature-200 text-nature-700 hover:bg-nature-50 bg-transparent"
                        }
                        onClick={() => {
                          setAmount(preset.toString())
                          setCustomAmount("")
                        }}
                      >
                        ${preset}
                      </Button>
                    ))}
                  </div>
                  <div className="mt-3">
                    <Input
                      placeholder="Custom amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value)
                        setAmount("")
                      }}
                      className="border-nature-200 focus:border-nature-500"
                    />
                  </div>
                </div>

                {/* Frequency */}
                <div>
                  <Label className="text-nature-700 font-medium">Donation Frequency</Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger className="mt-2 border-nature-200 focus:border-nature-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time">One-time donation</SelectItem>
                      <SelectItem value="monthly">Monthly recurring</SelectItem>
                      <SelectItem value="quarterly">Quarterly recurring</SelectItem>
                      <SelectItem value="annually">Annual recurring</SelectItem>
                    </SelectContent>
                  </Select>
                  {frequency !== "one-time" && (
                    <p className="text-sm text-nature-600 mt-2">
                      You can cancel or modify your recurring donation at any time
                    </p>
                  )}
                </div>

                {/* Program Selection */}
                <div>
                  <Label className="text-nature-700 font-medium">Support Program</Label>
                  <Select value={program} onValueChange={setProgram}>
                    <SelectTrigger className="mt-2 border-nature-200 focus:border-nature-500">
                      <SelectValue placeholder="Choose a program to support" />
                    </SelectTrigger>
                    <SelectContent>
                      {programs.map((prog) => (
                        <SelectItem key={prog.id} value={prog.id}>
                          <div className="flex items-center gap-2">
                            {prog.name}
                            {prog.urgent && <Badge className="bg-red-100 text-red-700 text-xs">Urgent</Badge>}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Program Details */}
                {selectedProgram && selectedProgram.id !== "general" && (
                  <Card className="bg-nature-50 border-nature-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-nature-800 mb-2">{selectedProgram.name}</h4>
                      <p className="text-sm text-nature-600 mb-3">{selectedProgram.description}</p>
                      {selectedProgram.goal && (
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-nature-600">${selectedProgram.raised?.toLocaleString()} raised</span>
                            <span className="text-nature-600">${selectedProgram.goal.toLocaleString()} goal</span>
                          </div>
                          <Progress value={(selectedProgram.raised! / selectedProgram.goal) * 100} className="h-2" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Personal Message */}
                <div>
                  <Label className="text-nature-700 font-medium">Personal Message (Optional)</Label>
                  <Textarea
                    placeholder="Share why this cause matters to you..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-2 border-nature-200 focus:border-nature-500 min-h-20"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="border-0 shadow-sm mt-6">
              <CardHeader>
                <CardTitle className="text-nature-800 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-nature-600" />
                  Payment Information
                </CardTitle>
                <CardDescription>Secure payment processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-nature-700">Card Number</Label>
                    <Input placeholder="1234 5678 9012 3456" className="border-nature-200 focus:border-nature-500" />
                  </div>
                  <div>
                    <Label className="text-nature-700">Cardholder Name</Label>
                    <Input placeholder="John Doe" className="border-nature-200 focus:border-nature-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-nature-700">Expiry Date</Label>
                    <Input placeholder="MM/YY" className="border-nature-200 focus:border-nature-500" />
                  </div>
                  <div>
                    <Label className="text-nature-700">CVV</Label>
                    <Input placeholder="123" className="border-nature-200 focus:border-nature-500" />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-nature-600 bg-nature-50 p-3 rounded-lg">
                  <Shield className="h-4 w-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Donation Summary */}
          <div>
            <Card className="border-0 shadow-sm sticky top-8">
              <CardHeader>
                <CardTitle className="text-nature-800">Donation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-nature-600">Amount:</span>
                    <span className="font-medium text-nature-800">
                      ${(amount || customAmount || "0").toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-nature-600">Frequency:</span>
                    <span className="font-medium text-nature-800 capitalize">{frequency.replace("-", " ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-nature-600">Program:</span>
                    <span className="font-medium text-nature-800">{selectedProgram?.name || "Not selected"}</span>
                  </div>
                </div>

                <div className="border-t border-nature-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-nature-800">Total:</span>
                    <span className="text-nature-800">${(amount || customAmount || "0").toLocaleString()}</span>
                  </div>
                  {frequency !== "one-time" && (
                    <p className="text-sm text-nature-600 mt-1">
                      Charged{" "}
                      {frequency === "monthly" ? "monthly" : frequency === "quarterly" ? "quarterly" : "annually"}
                    </p>
                  )}
                </div>

                <Button
                  className="w-full bg-nature-600 hover:bg-nature-700"
                  disabled={!amount && !customAmount}
                  size="lg"
                >
                  <Gift className="h-4 w-4 mr-2" />
                  Complete Donation
                </Button>

                <div className="text-xs text-nature-600 text-center">
                  <p>Your donation is tax-deductible.</p>
                  <p>You will receive a receipt via email.</p>
                </div>
              </CardContent>
            </Card>

            {/* Impact Preview */}
            {(amount || customAmount) && (
              <Card className="border-0 shadow-sm mt-6">
                <CardHeader>
                  <CardTitle className="text-nature-800">Your Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-nature-600"></div>
                      <span className="text-nature-700">
                        Provides clean water for {Math.floor(Number.parseInt(amount || customAmount || "0") / 25)}{" "}
                        people
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-sunny-600"></div>
                      <span className="text-nature-700">
                        Funds {Math.floor(Number.parseInt(amount || customAmount || "0") / 50)} school meals
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-mint-600"></div>
                      <span className="text-nature-700">
                        Plants {Math.floor(Number.parseInt(amount || customAmount || "0") / 5)} trees
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
