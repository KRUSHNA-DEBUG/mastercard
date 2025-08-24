import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function BlogPage() {
  const stories = [
    {
      id: 1,
      title: "How Maria's Life Changed Through Our Education Program",
      excerpt: "From struggling to read to becoming a community teacher, Maria's journey shows the power of education.",
      author: "Sarah Johnson",
      date: "March 10, 2024",
      category: "Success Story",
      readTime: "5 min read",
      image: "/young-woman-teaching-children.png",
    },
    {
      id: 2,
      title: "The Impact of Our Clean Water Initiative",
      excerpt: "See how providing clean water access has transformed entire villages and improved health outcomes.",
      author: "Dr. Michael Chen",
      date: "March 8, 2024",
      category: "Impact Report",
      readTime: "7 min read",
      image: "/clean-water-well-in-village.png",
    },
    {
      id: 3,
      title: "Volunteers Make the Difference: A Day in the Field",
      excerpt: "Follow our volunteers as they work directly with communities to create lasting change.",
      author: "Emma Rodriguez",
      date: "March 5, 2024",
      category: "Volunteer Story",
      readTime: "4 min read",
      image: "/volunteers-working-with-community.png",
    },
    {
      id: 4,
      title: "Sustainable Farming: Growing Hope in Rural Areas",
      excerpt: "Our agricultural program is helping farmers increase yields while protecting the environment.",
      author: "James Wilson",
      date: "March 3, 2024",
      category: "Program Update",
      readTime: "6 min read",
      image: "/sustainable-farming.png",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Stories of Impact</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Read inspiring stories from our programs, volunteers, and the communities we serve together.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {stories.map((story) => (
              <Card key={story.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video bg-muted">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{story.category}</Badge>
                    <span className="text-sm text-muted-foreground">{story.readTime}</span>
                  </div>
                  <CardTitle className="text-xl hover:text-primary transition-colors">
                    <Link href={`/blog/${story.id}`}>{story.title}</Link>
                  </CardTitle>
                  <CardDescription>{story.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {story.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {story.date}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/blog/${story.id}`}>
                        Read More <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Stories
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
