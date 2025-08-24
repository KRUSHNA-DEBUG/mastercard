import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Leaf, Users, Heart, GraduationCap, Home, Droplets, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ProgramsPage() {
  const programs = [
    {
      id: "environment",
      title: "Environmental Conservation",
      description: "Protecting our planet through reforestation, clean energy, and sustainable practices.",
      icon: Leaf,
      image: "/forest-conservation-reforestation.png",
      goal: 100000,
      raised: 75000,
      beneficiaries: 15000,
      status: "Active",
      category: "Environment",
    },
    {
      id: "education",
      title: "Education for All",
      description: "Providing quality education and learning opportunities to underserved communities.",
      icon: GraduationCap,
      image: "/placeholder-voy6n.png",
      goal: 250000,
      raised: 180000,
      beneficiaries: 5000,
      status: "Active",
      category: "Education",
    },
    {
      id: "healthcare",
      title: "Healthcare Access",
      description: "Ensuring basic healthcare reaches every corner of our communities.",
      icon: Heart,
      image: "/placeholder-wjvl2.png",
      goal: 150000,
      raised: 120000,
      beneficiaries: 25000,
      status: "Active",
      category: "Healthcare",
    },
    {
      id: "housing",
      title: "Safe Housing Initiative",
      description: "Building safe, affordable housing for families in need.",
      icon: Home,
      image: "/placeholder-sntyu.png",
      goal: 500000,
      raised: 320000,
      beneficiaries: 1200,
      status: "Active",
      category: "Housing",
    },
    {
      id: "water",
      title: "Clean Water Access",
      description: "Providing clean, safe drinking water to remote communities.",
      icon: Droplets,
      image: "/placeholder-cqdzp.png",
      goal: 80000,
      raised: 65000,
      beneficiaries: 8000,
      status: "Active",
      category: "Water",
    },
    {
      id: "community",
      title: "Community Development",
      description: "Empowering communities through skill development and economic opportunities.",
      icon: Users,
      image: "/placeholder-gv74v.png",
      goal: 200000,
      raised: 150000,
      beneficiaries: 3500,
      status: "Active",
      category: "Development",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            <Users className="h-4 w-4 mr-2" />
            Our Impact
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Programs & Projects</h1>
          <p className="text-xl text-muted-foreground">
            Discover how we're creating lasting change across multiple initiatives. Each program is designed with
            sustainability and community empowerment at its core.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => {
              const Icon = program.icon
              const progressPercentage = (program.raised / program.goal) * 100

              return (
                <Card key={program.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={program.image || "/placeholder.svg"}
                      alt={program.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      {program.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon className="h-6 w-6 text-primary" />
                      <Badge variant="outline" className="text-xs">
                        {program.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                    <CardDescription>{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">
                          ${program.raised.toLocaleString()} / ${program.goal.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <span className="text-muted-foreground">Beneficiaries: </span>
                        <span className="font-medium text-primary">{program.beneficiaries.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{Math.round(progressPercentage)}% funded</span>
                      </div>
                    </div>

                    <Button asChild className="w-full">
                      <Link href={`/programs/${program.id}`}>
                        Learn More <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Impact Stories</h2>
            <p className="text-xl text-muted-foreground">Real stories from the communities we serve</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <img
                  src="/placeholder-nx44x.png"
                  alt="Maria's Story"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <CardTitle className="text-lg">Maria's Clean Water Story</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  "Before the well was built, I had to walk 3 hours every day to fetch water. Now my children can go to
                  school and I can focus on our small business."
                </p>
                <Badge variant="secondary">Clean Water Access</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <img
                  src="/placeholder-u7n1t.png"
                  alt="Ahmed's Story"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <CardTitle className="text-lg">Ahmed's Education Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  "The scholarship program changed my life. I'm now the first in my family to attend university and
                  study engineering."
                </p>
                <Badge variant="secondary">Education for All</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <img
                  src="/placeholder-1tx4d.png"
                  alt="Community Garden"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <CardTitle className="text-lg">Sustainable Community Gardens</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  "Our community garden now feeds 50 families and provides income through surplus sales. We've learned
                  sustainable farming techniques."
                </p>
                <Badge variant="secondary">Environmental Conservation</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Support Our Programs</h2>
          <p className="text-xl mb-8 opacity-90">
            Your contribution can make a real difference in someone's life. Choose a program that resonates with you and
            help us create lasting change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              asChild
            >
              <Link href="/volunteer">Volunteer With Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
