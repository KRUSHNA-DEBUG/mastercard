import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Eye, Users, Award, Globe, Heart } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Executive Director",
      image: "/professional-woman-executive-director.png",
      bio: "15+ years in nonprofit leadership, passionate about sustainable development.",
    },
    {
      name: "Michael Chen",
      role: "Program Manager",
      image: "/professional-man-program-manager.png",
      bio: "Expert in community outreach and program implementation across diverse regions.",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Impact Assessment Lead",
      image: "/professional-woman-doctor-researcher.png",
      bio: "PhD in Social Sciences, specializes in measuring and maximizing program impact.",
    },
    {
      name: "James Wilson",
      role: "Operations Director",
      image: "/professional-operations-director.png",
      bio: "Former corporate executive bringing efficiency and innovation to NGO operations.",
    },
  ]

  const partners = [
    { name: "Global Health Initiative", logo: "/health-organization-logo.png" },
    { name: "Education for All Foundation", logo: "/education-foundation-logo.png" },
    { name: "Environmental Action Network", logo: "/environmental-organization-logo.png" },
    { name: "Community Development Corp", logo: "/community-development-logo.png" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            <Heart className="h-4 w-4 mr-2" />
            Our Story
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About GreenHope NGO</h1>
          <p className="text-xl text-muted-foreground">
            Founded in 2010, GreenHope NGO has been at the forefront of creating sustainable change in communities
            worldwide. Our journey began with a simple belief: every person deserves access to basic necessities and
            opportunities for growth.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="border-primary/20">
              <CardHeader>
                <Target className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To empower communities through sustainable development programs that address education, healthcare,
                  environmental conservation, and economic opportunities. We believe in creating lasting change by
                  working directly with local communities and building their capacity for self-sufficiency.
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/20">
              <CardHeader>
                <Eye className="h-12 w-12 text-accent-foreground mb-4" />
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  A world where every community has the resources, knowledge, and opportunities needed to thrive
                  sustainably. We envision resilient communities that can adapt to challenges while preserving their
                  cultural heritage and protecting the environment for future generations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Sustainability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Every program is designed with long-term impact in mind, ensuring communities can maintain and build
                  upon our initiatives.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Community-Centered</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  We work with communities, not for them. Local voices and needs drive our program design and
                  implementation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  We maintain open communication about our impact, finances, and challenges, building trust with all
                  stakeholders.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">Dedicated professionals committed to making a difference</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Partners</h2>
            <p className="text-xl text-muted-foreground">Working together to amplify our impact</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <Card key={index} className="p-6 flex items-center justify-center">
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="max-h-16 w-auto opacity-70 hover:opacity-100 transition-opacity"
                />
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
