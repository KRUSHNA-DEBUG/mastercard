import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Community Clean-Up Drive",
      date: "March 15, 2024",
      time: "9:00 AM - 2:00 PM",
      location: "Central Park",
      participants: 45,
      maxParticipants: 100,
      description: "Join us for a community-wide clean-up initiative to keep our parks beautiful and sustainable.",
      category: "Environment",
    },
    {
      id: 2,
      title: "Educational Workshop Series",
      date: "March 22, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Community Center",
      participants: 28,
      maxParticipants: 50,
      description: "Interactive workshops on digital literacy and skill development for underserved communities.",
      category: "Education",
    },
    {
      id: 3,
      title: "Health Screening Camp",
      date: "March 30, 2024",
      time: "8:00 AM - 5:00 PM",
      location: "Village Health Center",
      participants: 67,
      maxParticipants: 150,
      description: "Free health screenings and medical consultations for rural communities.",
      category: "Healthcare",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Upcoming Events & Drives</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our community events and make a direct impact. Every event is an opportunity to create positive
              change.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{event.category}</Badge>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {event.participants}/{event.maxParticipants}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <Button className="w-full mt-4">Register Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">Want to organize your own event or drive?</p>
            <Button variant="outline" size="lg">
              Propose an Event
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
