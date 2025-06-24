export interface User {
  userId: string
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
  phoneNumber: string
  roleId: string
  organizationId: string
  bio: string
  profilePictureURL: string
  preferredLanguage: string
  timezone: string
  emailNotificationsEnabled: boolean
  smsNotificationsEnabled: boolean
  socialMediaLinks: {
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
  }
  dateOfBirth: string
  gender: string
  addressLine1: string
  addressLine2?: string
  city: string
  stateProvince: string
  postalCode: string
  country: string
}

export const users: User[] = [
  {
    userId: "user_admin_001",
    username: "admin.uwimana",
    firstName: "Jean",
    lastName: "Uwimana",
    email: "jean.uwimana@ur.ac.rw",
    password: "hashed_password_123", // In real app, this would be properly hashed
    phoneNumber: "+250 788 123 456",
    roleId: "role_admin",
    organizationId: "org_university_rwanda",
    bio: "System Administrator with over 8 years of experience in educational technology and event management systems. Passionate about streamlining processes and improving user experiences.",
    profilePictureURL: "/placeholder.svg?height=150&width=150&text=JU",
    preferredLanguage: "en",
    timezone: "Africa/Kigali",
    emailNotificationsEnabled: true,
    smsNotificationsEnabled: true,
    socialMediaLinks: {
      linkedin: "https://linkedin.com/in/jean-uwimana",
      twitter: "https://twitter.com/jean_uwimana",
    },
    dateOfBirth: "1985-03-15",
    gender: "Male",
    addressLine1: "KG 15 Ave, Nyarutarama",
    addressLine2: "Apartment 12B",
    city: "Kigali",
    stateProvince: "Kigali City",
    postalCode: "00001",
    country: "Rwanda",
  },
  {
    userId: "user_student_001",
    username: "marie.mukamana",
    firstName: "Marie",
    lastName: "Mukamana",
    email: "marie.mukamana@student.ur.ac.rw",
    password: "hashed_password_456",
    phoneNumber: "+250 788 234 567",
    roleId: "role_user",
    organizationId: "org_computer_science_dept",
    bio: "Computer Science student passionate about software development and artificial intelligence. Active member of the university's tech club and event organizing committee.",
    profilePictureURL: "/placeholder.svg?height=150&width=150&text=MM",
    preferredLanguage: "en",
    timezone: "Africa/Kigali",
    emailNotificationsEnabled: true,
    smsNotificationsEnabled: false,
    socialMediaLinks: {
      linkedin: "https://linkedin.com/in/marie-mukamana",
      instagram: "https://instagram.com/marie_mukamana",
      twitter: "https://twitter.com/marie_codes",
    },
    dateOfBirth: "2001-07-22",
    gender: "Female",
    addressLine1: "KG 25 St, Remera",
    city: "Kigali",
    stateProvince: "Kigali City",
    postalCode: "00002",
    country: "Rwanda",
  },
  {
    userId: "user_faculty_001",
    username: "paul.nkurunziza",
    firstName: "Paul",
    lastName: "Nkurunziza",
    email: "paul.nkurunziza@ur.ac.rw",
    password: "hashed_password_789",
    phoneNumber: "+250 788 345 678",
    roleId: "role_user",
    organizationId: "org_business_school",
    bio: "Associate Professor of Business Administration with expertise in organizational management and strategic planning. Regular speaker at academic conferences and business seminars.",
    profilePictureURL: "/placeholder.svg?height=150&width=150&text=PN",
    preferredLanguage: "en",
    timezone: "Africa/Kigali",
    emailNotificationsEnabled: true,
    smsNotificationsEnabled: true,
    socialMediaLinks: {
      linkedin: "https://linkedin.com/in/paul-nkurunziza-phd",
      facebook: "https://facebook.com/paul.nkurunziza",
    },
    dateOfBirth: "1978-11-08",
    gender: "Male",
    addressLine1: "KG 45 Ave, Kimihurura",
    addressLine2: "House No. 78",
    city: "Kigali",
    stateProvince: "Kigali City",
    postalCode: "00003",
    country: "Rwanda",
  },
]

// Helper functions
export const getUserById = (id: string) => users.find((user) => user.userId === id)

export const getUserByEmail = (email: string) => users.find((user) => user.email === email)

export const getUserByUsername = (username: string) => users.find((user) => user.username === username)

export const getUsersByRole = (roleId: string) => users.filter((user) => user.roleId === roleId)

export const getUsersByOrganization = (organizationId: string) =>
  users.filter((user) => user.organizationId === organizationId)

export const getAdminUsers = () => users.filter((user) => user.roleId === "role_admin")

export const getRegularUsers = () => users.filter((user) => user.roleId === "role_user")

export const getUsersByCountry = (country: string) =>
  users.filter((user) => user.country.toLowerCase() === country.toLowerCase())

export const getUsersByCity = (city: string) => users.filter((user) => user.city.toLowerCase() === city.toLowerCase())

export const getUsersWithNotificationsEnabled = (type: "email" | "sms") => {
  if (type === "email") {
    return users.filter((user) => user.emailNotificationsEnabled)
  }
  return users.filter((user) => user.smsNotificationsEnabled)
}

export const searchUsers = (query: string) => {
  const lowercaseQuery = query.toLowerCase()
  return users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(lowercaseQuery) ||
      user.lastName.toLowerCase().includes(lowercaseQuery) ||
      user.username.toLowerCase().includes(lowercaseQuery) ||
      user.email.toLowerCase().includes(lowercaseQuery) ||
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(lowercaseQuery),
  )
}

// User statistics
export const getUserStats = () => {
  const totalUsers = users.length
  const adminUsers = getAdminUsers().length
  const regularUsers = getRegularUsers().length
  const usersWithEmailNotifications = getUsersWithNotificationsEnabled("email").length
  const usersWithSmsNotifications = getUsersWithNotificationsEnabled("sms").length

  return {
    totalUsers,
    adminUsers,
    regularUsers,
    usersWithEmailNotifications,
    usersWithSmsNotifications,
  }
}

// Role definitions for reference
export const roles = {
  role_admin: {
    id: "role_admin",
    name: "Administrator",
    description: "Full system access with administrative privileges",
    permissions: [
      "create_events",
      "edit_events",
      "delete_events",
      "manage_users",
      "manage_venues",
      "view_reports",
      "system_settings",
    ],
  },
  role_user: {
    id: "role_user",
    name: "User",
    description: "Standard user with basic event management capabilities",
    permissions: ["create_events", "edit_own_events", "register_for_events", "view_events"],
  },
}

// Organization definitions for reference
export const organizations = {
  org_university_rwanda: {
    id: "org_university_rwanda",
    name: "University of Rwanda",
    type: "Educational Institution",
    description: "Main university organization",
  },
  org_computer_science_dept: {
    id: "org_computer_science_dept",
    name: "Computer Science Department",
    type: "Academic Department",
    description: "Computer Science and IT Department",
    parentOrganization: "org_university_rwanda",
  },
  org_business_school: {
    id: "org_business_school",
    name: "Business School",
    type: "Academic School",
    description: "School of Business and Economics",
    parentOrganization: "org_university_rwanda",
  },
}
