export interface Venue {
  venueId: string
  venueName: string
  capacity: number
  location: string
  latitude: number
  longitude: number
  googleMapsLink: string
  managerId: string
  isAvailable: boolean
  isBooked: boolean
  amenities: string
  venueType: string
  contactPerson: string
  contactEmail: string
  contactPhone: string
  websiteURL?: string
  // Additional fields for display
  description?: string
  availability?: Array<{
    date: string
    timeSlots: string[]
  }>
  imageSrc?: string
}

export const venues: Venue[] = [
  {
    venueId: "main-auditorium",
    venueName: "Main Auditorium",
    capacity: 500,
    location: "Main Campus, Block A",
    latitude: -1.9441,
    longitude: 30.0619,
    googleMapsLink: "https://maps.google.com/?q=-1.9441,30.0619",
    managerId: "mgr_001",
    isAvailable: true,
    isBooked: false,
    amenities: "Projector,Sound System,Air Conditioning,Stage,Wi-Fi,Microphones,Lighting",
    venueType: "Auditorium",
    contactPerson: "John Uwimana",
    contactEmail: "auditorium@ur.ac.rw",
    contactPhone: "+250 788 123 456",
    websiteURL: "https://ur.ac.rw/venues/main-auditorium",
    description:
      "The Main Auditorium is a spacious venue perfect for large conferences, ceremonies, and performances. It features a large stage, professional sound system, and comfortable seating for up to 500 attendees.",
    availability: [
      { date: "May 15, 2025", timeSlots: ["9:00 AM - 12:00 PM", "1:00 PM - 5:00 PM"] },
      { date: "May 16, 2025", timeSlots: ["9:00 AM - 12:00 PM", "1:00 PM - 5:00 PM"] },
      { date: "May 17, 2025", timeSlots: ["9:00 AM - 12:00 PM", "1:00 PM - 5:00 PM"] },
    ],
    imageSrc: "/placeholder.svg?height=500&width=1000",
  },
  {
    venueId: "science-building-conference-room",
    venueName: "Science Building Conference Room",
    capacity: 150,
    location: "Science Campus, Block C",
    latitude: -1.9445,
    longitude: 30.0625,
    googleMapsLink: "https://maps.google.com/?q=-1.9445,30.0625",
    managerId: "mgr_002",
    isAvailable: true,
    isBooked: false,
    amenities: "Projector,Whiteboard,Video Conferencing,Wi-Fi,Air Conditioning",
    venueType: "Conference Room",
    contactPerson: "Marie Mukamana",
    contactEmail: "science.venues@ur.ac.rw",
    contactPhone: "+250 788 123 457",
    websiteURL: "https://ur.ac.rw/venues/science-conference",
    description:
      "Modern conference room located in the Science Building. Equipped with the latest video conferencing technology, making it ideal for meetings, presentations, and small conferences.",
    availability: [
      { date: "May 15, 2025", timeSlots: ["9:00 AM - 12:00 PM", "1:00 PM - 5:00 PM"] },
      { date: "May 16, 2025", timeSlots: ["9:00 AM - 12:00 PM", "1:00 PM - 5:00 PM"] },
      { date: "May 17, 2025", timeSlots: ["9:00 AM - 12:00 PM", "1:00 PM - 5:00 PM"] },
    ],
    imageSrc: "/placeholder.svg?height=500&width=1000",
  },
  {
    venueId: "university-grounds",
    venueName: "University Grounds",
    capacity: 2000,
    location: "Main Campus",
    latitude: -1.944,
    longitude: 30.0615,
    googleMapsLink: "https://maps.google.com/?q=-1.9440,30.0615",
    managerId: "mgr_003",
    isAvailable: true,
    isBooked: false,
    amenities: "Open Space,Power Supply,Parking,Restrooms",
    venueType: "Outdoor",
    contactPerson: "Paul Nkurunziza",
    contactEmail: "grounds@ur.ac.rw",
    contactPhone: "+250 788 123 458",
    description:
      "Spacious outdoor area perfect for large gatherings, festivals, and outdoor activities. The grounds can accommodate up to 2000 people and offer beautiful green spaces.",
    availability: [
      { date: "May 15, 2025", timeSlots: ["8:00 AM - 8:00 PM"] },
      { date: "May 16, 2025", timeSlots: ["8:00 AM - 8:00 PM"] },
      { date: "May 17, 2025", timeSlots: ["8:00 AM - 8:00 PM"] },
    ],
    imageSrc: "/placeholder.svg?height=500&width=1000",
  },
  {
    venueId: "business-school-lecture-hall",
    venueName: "Business School Lecture Hall",
    capacity: 200,
    location: "Business Campus, Block B",
    latitude: -1.945,
    longitude: 30.063,
    googleMapsLink: "https://maps.google.com/?q=-1.9450,30.0630",
    managerId: "mgr_004",
    isAvailable: true,
    isBooked: false,
    amenities: "Projector,Sound System,Air Conditioning,Tiered Seating",
    venueType: "Lecture Hall",
    contactPerson: "Grace Uwimana",
    contactEmail: "business.venues@ur.ac.rw",
    contactPhone: "+250 788 123 459",
    websiteURL: "https://ur.ac.rw/venues/business-hall",
    description:
      "Professional lecture hall designed for business presentations, workshops, and executive training sessions with tiered seating for optimal viewing.",
    availability: [
      { date: "May 15, 2025", timeSlots: ["9:00 AM - 12:00 PM", "1:00 PM - 5:00 PM"] },
      { date: "May 16, 2025", timeSlots: ["9:00 AM - 12:00 PM", "1:00 PM - 5:00 PM"] },
      { date: "May 17, 2025", timeSlots: ["9:00 AM - 12:00 PM", "1:00 PM - 5:00 PM"] },
    ],
    imageSrc: "/placeholder.svg?height=500&width=1000",
  },
  {
    venueId: "sports-complex",
    venueName: "Sports Complex",
    capacity: 1000,
    location: "Sports Campus",
    latitude: -1.9435,
    longitude: 30.061,
    googleMapsLink: "https://maps.google.com/?q=-1.9435,30.0610",
    managerId: "mgr_005",
    isAvailable: true,
    isBooked: false,
    amenities: "Indoor Courts,Changing Rooms,Sound System,Scoreboard,First Aid Station",
    venueType: "Sports Facility",
    contactPerson: "Eric Habimana",
    contactEmail: "sports@ur.ac.rw",
    contactPhone: "+250 788 123 460",
    description:
      "Multi-purpose sports facility suitable for athletic events, tournaments, exhibitions, and large indoor gatherings with professional sports equipment.",
    availability: [
      { date: "May 15, 2025", timeSlots: ["8:00 AM - 12:00 PM", "1:00 PM - 6:00 PM"] },
      { date: "May 16, 2025", timeSlots: ["8:00 AM - 12:00 PM", "1:00 PM - 6:00 PM"] },
      { date: "May 17, 2025", timeSlots: ["8:00 AM - 12:00 PM", "1:00 PM - 6:00 PM"] },
    ],
    imageSrc: "/placeholder.svg?height=500&width=1000",
  },
  {
    venueId: "library-seminar-room",
    venueName: "Library Seminar Room",
    capacity: 50,
    location: "Main Campus, Library Building",
    latitude: -1.9442,
    longitude: 30.062,
    googleMapsLink: "https://maps.google.com/?q=-1.9442,30.0620",
    managerId: "mgr_006",
    isAvailable: true,
    isBooked: false,
    amenities: "Projector,Whiteboard,Computers,Wi-Fi,Quiet Environment",
    venueType: "Seminar Room",
    contactPerson: "Alice Nyirahabimana",
    contactEmail: "library@ur.ac.rw",
    contactPhone: "+250 788 123 461",
    description:
      "Intimate seminar room perfect for small group discussions, workshops, training sessions, and academic meetings in a quiet library environment.",
    availability: [
      { date: "May 15, 2025", timeSlots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"] },
      { date: "May 16, 2025", timeSlots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"] },
      { date: "May 17, 2025", timeSlots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"] },
    ],
    imageSrc: "/placeholder.svg?height=500&width=1000",
  },
]

// Helper functions
export const getVenueById = (id: string) => venues.find((venue) => venue.venueId === id)

export const getAvailableVenues = () => venues.filter((venue) => venue.isAvailable && !venue.isBooked)

export const getVenuesByType = (type: string) => venues.filter((venue) => venue.venueType === type)

export const getVenuesByCapacity = (minCapacity: number, maxCapacity?: number) => {
  return venues.filter((venue) => {
    if (maxCapacity) {
      return venue.capacity >= minCapacity && venue.capacity <= maxCapacity
    }
    return venue.capacity >= minCapacity
  })
}

export const getVenuesByLocation = (location: string) =>
  venues.filter((venue) => venue.location.toLowerCase().includes(location.toLowerCase()))

export const getVenuesByAmenity = (amenity: string) =>
  venues.filter((venue) => venue.amenities.toLowerCase().includes(amenity.toLowerCase()))
