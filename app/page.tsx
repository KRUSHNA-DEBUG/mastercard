import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Calendar, TrendingUp, ArrowRight, Leaf, Globe, HandHeart } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              <Globe className="h-4 w-4 mr-2" />
              Making a Global Impact
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Building a Better
              <span className="text-primary block">Tomorrow Together</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join our mission to create sustainable change in communities worldwide. Every action counts, every
              donation matters, every volunteer makes a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/volunteer">
                  <HandHeart className="h-5 w-5 mr-2" />
                  Become a Volunteer
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
                <Link href="/donate">
                  <Heart className="h-5 w-5 mr-2" />
                  Make a Donation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold">2,500+</CardTitle>
                <CardDescription>Active Volunteers</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold">50,000+</CardTitle>
                <CardDescription>Lives Impacted</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold">150+</CardTitle>
                <CardDescription>Events This Year</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold">$2.5M+</CardTitle>
                <CardDescription>Funds Raised</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Impact Programs</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how we're making a difference across multiple initiatives
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-4 flex items-center justify-center">
                  <Leaf className="h-16 w-16 text-primary" />
                </div>
                <CardTitle>Environmental Conservation</CardTitle>
                <CardDescription>
                  Protecting our planet through reforestation, clean energy, and sustainable practices.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">15,000 trees planted</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/programs/environment">
                      Learn More <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-48 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg mb-4 flex items-center justify-center">
                  <Users className="h-16 w-16 text-accent-foreground" />
                </div>
                <CardTitle>Education for All</CardTitle>
                <CardDescription>
                  Providing quality education and learning opportunities to underserved communities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">5,000 students supported</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/programs/education">
                      Learn More <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/10 rounded-lg mb-4 flex items-center justify-center">
                  <Heart className="h-16 w-16 text-primary" />
                </div>
                <CardTitle>Healthcare Access</CardTitle>
                <CardDescription>Ensuring basic healthcare reaches every corner of our communities.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">25,000 people served</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/programs/healthcare">
                      Learn More <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of volunteers and donors who are already creating positive change in the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <Link href="/volunteer">Start Volunteering</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              asChild
            >
              <Link href="/donate">Donate Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
