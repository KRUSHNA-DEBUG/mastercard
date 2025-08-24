import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HandHeart, Clock, Award, Users, Heart, Star, CheckCircle } from "lucide-react"

export default function VolunteerPage() {
  const benefits = [
    {
      icon: Heart,
      title: "Make a Real Impact",
      description: "See the direct results of your efforts in communities worldwide",
    },
    {
      icon: Users,
      title: "Join a Community",
      description: "Connect with like-minded individuals passionate about change",
    },
    {
      icon: Award,
      title: "Gain Experience",
      description: "Develop new skills and gain valuable experience in nonprofit work",
    },
    {
      icon: Star,
      title: "Recognition",
      description: "Receive certificates and recognition for your volunteer contributions",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Environmental Volunteer",
      image: "/placeholder-g6yg8.png",
      quote:
        "Volunteering with GreenHope has been incredibly rewarding. I've helped plant over 500 trees and seen the immediate impact on local communities.",
      hours: 120,
    },
    {
      name: "David Park",
      role: "Education Volunteer",
      image: "/placeholder-snh5g.png",
      quote:
        "Teaching children in underserved communities has been life-changing. Their enthusiasm and gratitude motivate me every day.",
      hours: 200,
    },
    {
      name: "Lisa Rodriguez",
      role: "Healthcare Volunteer",
      image: "/placeholder-m8wht.png",
      quote:
        "As a nurse, I've been able to use my skills to provide healthcare in remote areas. It's the most fulfilling work I've ever done.",
      hours: 150,
    },
  ]

  const faqs = [
    {
      question: "How much time do I need to commit?",
      answer:
        "We offer flexible volunteering opportunities ranging from one-time events to ongoing commitments. You can volunteer as little as 2 hours per month or as much as you'd like.",
    },
    {
      question: "Do I need special skills or experience?",
      answer:
        "Not at all! We welcome volunteers from all backgrounds. We provide training for all our programs, and there are opportunities for both skilled and general volunteers.",
    },
    {
      question: "Are there age requirements?",
      answer:
        "Volunteers must be at least 16 years old for most programs. Some programs may have different age requirements, which will be clearly stated in the program description.",
    },
    {
      question: "Can I volunteer remotely?",
      answer:
        "Yes! We offer many remote volunteering opportunities including social media management, content creation, virtual tutoring, and administrative support.",
    },
    {
      question: "Will I receive training?",
      answer:
        "All volunteers receive comprehensive training specific to their chosen program. We also provide ongoing support and resources.",
    },
    {
      question: "Can I volunteer as part of a group?",
      answer:
        "Yes! We welcome corporate groups, school groups, and community organizations. Group volunteering is a great team-building activity.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            <HandHeart className="h-4 w-4 mr-2" />
            Join Our Mission
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Become a Volunteer</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Make a difference in your community and beyond. Join thousands of volunteers who are creating positive
            change around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="#signup">Sign Up Now</a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
              <a href="#benefits">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Volunteer With Us?</h2>
            <p className="text-xl text-muted-foreground">Discover the benefits of joining our volunteer community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Volunteer Stories</h2>
            <p className="text-xl text-muted-foreground">Hear from our amazing volunteers about their experiences</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                      <div className="flex items-center space-x-1 mt-1">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm text-primary font-medium">{testimonial.hours} hours</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Signup Form */}
      <section id="signup" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Join Our Team</h2>
            <p className="text-xl text-muted-foreground">Fill out the form below to start your volunteering journey</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Volunteer Application</CardTitle>
              <CardDescription>Tell us about yourself and how you'd like to contribute</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Enter your phone number" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">Areas of Interest</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary interest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="environment">Environmental Conservation</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="community">Community Development</SelectItem>
                    <SelectItem value="events">Event Organization</SelectItem>
                    <SelectItem value="admin">Administrative Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekdays">Weekdays</SelectItem>
                    <SelectItem value="weekends">Weekends</SelectItem>
                    <SelectItem value="evenings">Evenings</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills & Experience</Label>
                <Textarea
                  id="skills"
                  placeholder="Tell us about any relevant skills, experience, or qualifications"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">Why do you want to volunteer?</Label>
                <Textarea id="motivation" placeholder="Share your motivation for volunteering with us" rows={3} />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the terms and conditions and privacy policy
                </Label>
              </div>

              <Button className="w-full" size="lg">
                <CheckCircle className="h-5 w-5 mr-2" />
                Submit Application
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Get answers to common questions about volunteering</p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  )
}
