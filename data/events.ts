export interface Event {
  eventId: string
  eventTitle: string
  description: string
  eventCategory: string
  eventType: "Conference" | "Festival" | "Academic" | "Networking" | "Sports" | "Workshop"
  maxAttendees: number
  status: "Active" | "Cancelled" | "Completed" | "Draft"
  isFeatured: boolean
  qrCode: string
  imageURL: string
  organizerId: string
  venueId: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
  eventDate: string
  eventStartTime: string
  eventEndTime: string
  ticketingDetails: string
  refundPolicy: string
  dressCode: string
  ageRestriction: string
  tags: string[]
  websiteURL?: string
  hashtag?: string
  // Additional fields for display
  organizer: string
  venue: string
  address: string
  registeredCount: number
  availableSeats: number
  typeColor: string
}

export const events: Event[] = [
  {
    eventId: "tech-conference-2025",
    eventTitle: "Annual Tech Conference 2025",
    description:
      "Join us for the annual technology conference featuring keynote speakers, workshops, and networking opportunities. This event brings together industry leaders, researchers, and students to discuss the latest trends and innovations in technology.",
    eventCategory: "Technology",
    eventType: "Conference",
    maxAttendees: 300,
    status: "Active",
    isFeatured: true,
    qrCode: "QR_TECH_CONF_2025",
    imageURL: "/placeholder.svg?height=300&width=400",
    organizerId: "org_001",
    venueId: "venue_001",
    createdAt: "2024-12-01T10:00:00Z",
    updatedAt: "2024-12-15T14:30:00Z",
    eventDate: "2025-04-15",
    eventStartTime: "09:00",
    eventEndTime: "17:00",
    ticketingDetails: "Free registration required",
    refundPolicy: "Full refund available until 48 hours before event",
    dressCode: "Business casual",
    ageRestriction: "18+",
    tags: ["Conference", "Technology", "Networking", "Featured"],
    websiteURL: "https://techconf.ur.ac.rw",
    hashtag: "#URTechConf2025",
    organizer: "Computer Science Department",
    venue: "Main Auditorium",
    address: "College of Science and Technology, Kigali Campus",
    registeredCount: 145,
    availableSeats: 155,
    typeColor: "blue",
  },
  {
    eventId: "cultural-festival-2025",
    eventTitle: "Cultural Festival 2025",
    description:
      "Experience the rich cultural diversity of Rwanda and beyond at our annual cultural festival. Enjoy traditional performances, art exhibitions, culinary delights, and interactive cultural workshops.",
    eventCategory: "Culture",
    eventType: "Festival",
    maxAttendees: 500,
    status: "Active",
    isFeatured: true,
    qrCode: "QR_CULT_FEST_2025",
    imageURL: "/placeholder.svg?height=300&width=400",
    organizerId: "org_002",
    venueId: "venue_002",
    createdAt: "2024-11-15T09:00:00Z",
    updatedAt: "2024-12-10T16:45:00Z",
    eventDate: "2025-04-20",
    eventStartTime: "10:00",
    eventEndTime: "20:00",
    ticketingDetails: "Free entry for all",
    refundPolicy: "N/A - Free event",
    dressCode: "Casual or traditional attire",
    ageRestriction: "All ages welcome",
    tags: ["Festival", "Culture", "Arts", "Featured"],
    websiteURL: "https://culture.ur.ac.rw",
    hashtag: "#URCulturalFest",
    organizer: "Cultural Affairs Office",
    venue: "University Grounds",
    address: "Central Campus, University of Rwanda, Kigali",
    registeredCount: 320,
    availableSeats: 180,
    typeColor: "purple",
  },
  {
    eventId: "research-symposium-2025",
    eventTitle: "Research Symposium 2025",
    description:
      "A platform for graduate students to present their research findings and receive feedback from faculty and peers. The symposium covers various disciplines and encourages interdisciplinary collaboration.",
    eventCategory: "Research",
    eventType: "Academic",
    maxAttendees: 150,
    status: "Active",
    isFeatured: false,
    qrCode: "QR_RESEARCH_SYMP_2025",
    imageURL: "/placeholder.svg?height=300&width=400",
    organizerId: "org_003",
    venueId: "venue_003",
    createdAt: "2024-12-05T11:30:00Z",
    updatedAt: "2024-12-12T13:15:00Z",
    eventDate: "2025-04-25",
    eventStartTime: "13:00",
    eventEndTime: "18:00",
    ticketingDetails: "Registration required for presenters and attendees",
    refundPolicy: "No refund policy - Free event",
    dressCode: "Academic formal",
    ageRestriction: "Graduate students and faculty only",
    tags: ["Academic", "Research", "Graduate"],
    websiteURL: "https://research.ur.ac.rw/symposium",
    hashtag: "#URResearchSymp",
    organizer: "Graduate Studies Office",
    venue: "Science Building",
    address: "Science Campus, University of Rwanda, Kigali",
    registeredCount: 78,
    availableSeats: 72,
    typeColor: "green",
  },
  {
    eventId: "career-fair-2025",
    eventTitle: "Career Fair 2025",
    description:
      "Connect with leading employers and explore career opportunities across various industries. This event features company booths, networking sessions, and on-the-spot interviews.",
    eventCategory: "Career",
    eventType: "Networking",
    maxAttendees: 400,
    status: "Active",
    isFeatured: true,
    qrCode: "QR_CAREER_FAIR_2025",
    imageURL: "/placeholder.svg?height=300&width=400",
    organizerId: "org_004",
    venueId: "venue_004",
    createdAt: "2024-11-20T08:00:00Z",
    updatedAt: "2024-12-14T10:20:00Z",
    eventDate: "2025-05-05",
    eventStartTime: "10:00",
    eventEndTime: "16:00",
    ticketingDetails: "Free for students, registration required",
    refundPolicy: "N/A - Free event",
    dressCode: "Professional attire required",
    ageRestriction: "University students and recent graduates",
    tags: ["Career", "Networking", "Professional", "Featured"],
    websiteURL: "https://careers.ur.ac.rw/fair",
    hashtag: "#URCareerFair2025",
    organizer: "Career Services Center",
    venue: "Business School",
    address: "Business Campus, University of Rwanda, Kigali",
    registeredCount: 210,
    availableSeats: 190,
    typeColor: "blue",
  },
  {
    eventId: "alumni-meetup-2025",
    eventTitle: "Alumni Meetup 2025",
    description:
      "Reconnect with fellow alumni, share experiences, and build lasting professional networks. Join us for an evening of networking, dinner, and inspiring conversations.",
    eventCategory: "Networking",
    eventType: "Networking",
    maxAttendees: 120,
    status: "Active",
    isFeatured: false,
    qrCode: "QR_ALUMNI_MEET_2025",
    imageURL: "/placeholder.svg?height=300&width=400",
    organizerId: "org_005",
    venueId: "venue_005",
    createdAt: "2024-12-01T15:00:00Z",
    updatedAt: "2024-12-13T17:30:00Z",
    eventDate: "2025-05-12",
    eventStartTime: "18:00",
    eventEndTime: "21:00",
    ticketingDetails: "RWF 15,000 per person (includes dinner)",
    refundPolicy: "50% refund available until 7 days before event",
    dressCode: "Smart casual",
    ageRestriction: "Alumni only",
    tags: ["Alumni", "Networking", "Dinner"],
    websiteURL: "https://alumni.ur.ac.rw/meetup",
    hashtag: "#URAlumniMeetup",
    organizer: "Alumni Relations Office",
    venue: "University Club",
    address: "University Club, Kigali",
    registeredCount: 95,
    availableSeats: 25,
    typeColor: "blue",
  },
  {
    eventId: "sports-tournament-2025",
    eventTitle: "Inter-Faculty Sports Tournament 2025",
    description:
      "Annual sports competition featuring multiple disciplines including football, basketball, volleyball, and athletics. Compete for the championship trophy and showcase your athletic talents.",
    eventCategory: "Sports",
    eventType: "Sports",
    maxAttendees: 250,
    status: "Active",
    isFeatured: true,
    qrCode: "QR_SPORTS_TOURN_2025",
    imageURL: "/placeholder.svg?height=300&width=400",
    organizerId: "org_006",
    venueId: "venue_006",
    createdAt: "2024-11-25T12:00:00Z",
    updatedAt: "2024-12-11T14:45:00Z",
    eventDate: "2025-05-18",
    eventStartTime: "08:00",
    eventEndTime: "18:00",
    ticketingDetails: "Free participation for registered teams",
    refundPolicy: "N/A - Free event",
    dressCode: "Sports attire required",
    ageRestriction: "University students only",
    tags: ["Sports", "Competition", "Inter-Faculty", "Featured"],
    websiteURL: "https://sports.ur.ac.rw/tournament",
    hashtag: "#URSportsTournament",
    organizer: "Sports Department",
    venue: "Sports Complex",
    address: "Sports Complex, University of Rwanda, Kigali",
    registeredCount: 180,
    availableSeats: 70,
    typeColor: "green",
  },
]

// Helper functions
export const getFeaturedEvents = () => events.filter((event) => event.isFeatured)
export const getEventsByCategory = (category: string) => events.filter((event) => event.eventCategory === category)
export const getEventById = (id: string) => events.find((event) => event.eventId === id)
export const getUpcomingEvents = () =>
  events.filter((event) => event.status === "Active" && new Date(event.eventDate) > new Date())
