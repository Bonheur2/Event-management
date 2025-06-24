"use client"

import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/components/providers"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Calendar,
  Globe,
  Building,
  Shield,
  Bell,
  MessageSquare,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Clock,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  const { isLoggedIn, user } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Initialize form data with user data
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.bio || "",
    addressLine1: user?.addressLine1 || "",
    addressLine2: user?.addressLine2 || "",
    city: user?.city || "",
    stateProvince: user?.stateProvince || "",
    postalCode: user?.postalCode || "",
    country: user?.country || "",
    dateOfBirth: user?.dateOfBirth || "",
    gender: user?.gender || "",
    preferredLanguage: user?.preferredLanguage || "",
    timezone: user?.timezone || "",
    emailNotificationsEnabled: user?.emailNotificationsEnabled || false,
    smsNotificationsEnabled: user?.smsNotificationsEnabled || false,
    socialMediaLinks: {
      linkedin: user?.socialMediaLinks?.linkedin || "",
      twitter: user?.socialMediaLinks?.twitter || "",
      facebook: user?.socialMediaLinks?.facebook || "",
      instagram: user?.socialMediaLinks?.instagram || "",
    },
  })

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    } else {
      // Update form data when user data is available
      if (user) {
        setFormData({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          bio: user.bio,
          addressLine1: user.addressLine1,
          addressLine2: user.addressLine2 || "",
          city: user.city,
          stateProvince: user.stateProvince,
          postalCode: user.postalCode,
          country: user.country,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          preferredLanguage: user.preferredLanguage,
          timezone: user.timezone,
          emailNotificationsEnabled: user.emailNotificationsEnabled,
          smsNotificationsEnabled: user.smsNotificationsEnabled,
          socialMediaLinks: {
            linkedin: user.socialMediaLinks?.linkedin || "",
            twitter: user.socialMediaLinks?.twitter || "",
            facebook: user.socialMediaLinks?.facebook || "",
            instagram: user.socialMediaLinks?.instagram || "",
          },
        })
      }

      const timer = setTimeout(() => {
        setIsLoaded(true)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [isLoggedIn, user, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (name.startsWith("socialMediaLinks.")) {
      const socialField = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        socialMediaLinks: {
          ...prev.socialMediaLinks,
          [socialField]: value,
        },
      }))
    } else if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would update the user data via API
    console.log("Updated profile data:", formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset form data to current user data
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        bio: user.bio,
        addressLine1: user.addressLine1,
        addressLine2: user.addressLine2 || "",
        city: user.city,
        stateProvince: user.stateProvince,
        postalCode: user.postalCode,
        country: user.country,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        preferredLanguage: user.preferredLanguage,
        timezone: user.timezone,
        emailNotificationsEnabled: user.emailNotificationsEnabled,
        smsNotificationsEnabled: user.smsNotificationsEnabled,
        socialMediaLinks: {
          linkedin: user.socialMediaLinks?.linkedin || "",
          twitter: user.socialMediaLinks?.twitter || "",
          facebook: user.socialMediaLinks?.facebook || "",
          instagram: user.socialMediaLinks?.instagram || "",
        },
      })
    }
    setIsEditing(false)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not specified"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header activePage="profile" />

      <main className="flex-1">
        {/* Header Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 md:px-16 max-w-7xl">
            <div
              className={`transform transition-all duration-1000 ease-out ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <h1 className="text-4xl font-bold mb-4">My Profile</h1>
              <p className="text-gray-600">View and edit your personal information.</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="container mx-auto px-4 md:px-16 max-w-7xl py-8">
          <div
            className={`bg-white rounded-lg shadow overflow-hidden transform transition-all duration-1000 ease-out delay-200 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {/* Profile Header */}
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 border-b">
              <div className="relative">
                <div className="w-24 h-24 bg-blue-500 rounded-full overflow-hidden flex items-center justify-center text-white text-2xl font-bold">
                  {user.profilePictureURL ? (
                    <img
                      src={user.profilePictureURL || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    `${user.firstName[0]}${user.lastName[0]}`
                  )}
                </div>
                <button className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="text-center md:text-left">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">
                    {user.firstName} {user.lastName}
                  </h2>
                  {user.roleId === "role_admin" && (
                    <Badge variant="default" className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Admin
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 mb-1">{user.email}</p>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
              <div className="md:ml-auto">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-6 md:p-8">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                          Gender
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          name="bio"
                          rows={4}
                          value={formData.bio}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Tell us about yourself..."
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Address Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">
                          Address Line 1
                        </label>
                        <input
                          type="text"
                          id="addressLine1"
                          name="addressLine1"
                          value={formData.addressLine1}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1">
                          Address Line 2 (Optional)
                        </label>
                        <input
                          type="text"
                          id="addressLine2"
                          name="addressLine2"
                          value={formData.addressLine2}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="stateProvince" className="block text-sm font-medium text-gray-700 mb-1">
                          State/Province
                        </label>
                        <input
                          type="text"
                          id="stateProvince"
                          name="stateProvince"
                          value={formData.stateProvince}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Language
                        </label>
                        <select
                          id="preferredLanguage"
                          name="preferredLanguage"
                          value={formData.preferredLanguage}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="en">English</option>
                          <option value="fr">French</option>
                          <option value="rw">Kinyarwanda</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                          Timezone
                        </label>
                        <input
                          type="text"
                          id="timezone"
                          name="timezone"
                          value={formData.timezone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notification Settings */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="emailNotificationsEnabled"
                          name="emailNotificationsEnabled"
                          checked={formData.emailNotificationsEnabled}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="emailNotificationsEnabled" className="ml-2 block text-sm text-gray-700">
                          Enable email notifications
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="smsNotificationsEnabled"
                          name="smsNotificationsEnabled"
                          checked={formData.smsNotificationsEnabled}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="smsNotificationsEnabled" className="ml-2 block text-sm text-gray-700">
                          Enable SMS notifications
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Social Media Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="socialMediaLinks.linkedin"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          LinkedIn
                        </label>
                        <input
                          type="url"
                          id="socialMediaLinks.linkedin"
                          name="socialMediaLinks.linkedin"
                          value={formData.socialMediaLinks.linkedin}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="socialMediaLinks.twitter"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Twitter
                        </label>
                        <input
                          type="url"
                          id="socialMediaLinks.twitter"
                          name="socialMediaLinks.twitter"
                          value={formData.socialMediaLinks.twitter}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="https://twitter.com/username"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="socialMediaLinks.facebook"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Facebook
                        </label>
                        <input
                          type="url"
                          id="socialMediaLinks.facebook"
                          name="socialMediaLinks.facebook"
                          value={formData.socialMediaLinks.facebook}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="https://facebook.com/username"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="socialMediaLinks.instagram"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Instagram
                        </label>
                        <input
                          type="url"
                          id="socialMediaLinks.instagram"
                          name="socialMediaLinks.instagram"
                          value={formData.socialMediaLinks.instagram}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="https://instagram.com/username"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start">
                        <User className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium">
                            {user.firstName} {user.lastName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Email Address</p>
                          <p className="font-medium">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Phone Number</p>
                          <p className="font-medium">{user.phoneNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Date of Birth</p>
                          <p className="font-medium">{formatDate(user.dateOfBirth)}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <User className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Gender</p>
                          <p className="font-medium">{user.gender}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Building className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Organization</p>
                          <p className="font-medium">{user.organizationId}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Address Information</h3>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <div className="font-medium">
                          <p>{user.addressLine1}</p>
                          {user.addressLine2 && <p>{user.addressLine2}</p>}
                          <p>
                            {user.city}, {user.stateProvince} {user.postalCode}
                          </p>
                          <p>{user.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start">
                        <Globe className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Preferred Language</p>
                          <p className="font-medium">{user.preferredLanguage.toUpperCase()}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Timezone</p>
                          <p className="font-medium">{user.timezone}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notification Settings */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start">
                        <Bell className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Email Notifications</p>
                          <Badge variant={user.emailNotificationsEnabled ? "default" : "secondary"}>
                            {user.emailNotificationsEnabled ? "Enabled" : "Disabled"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MessageSquare className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">SMS Notifications</p>
                          <Badge variant={user.smsNotificationsEnabled ? "default" : "secondary"}>
                            {user.smsNotificationsEnabled ? "Enabled" : "Disabled"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  {(user.socialMediaLinks?.linkedin ||
                    user.socialMediaLinks?.twitter ||
                    user.socialMediaLinks?.facebook ||
                    user.socialMediaLinks?.instagram) && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Social Media</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {user.socialMediaLinks?.linkedin && (
                          <div className="flex items-center">
                            <Linkedin className="h-5 w-5 mr-3 text-blue-600" />
                            <a
                              href={user.socialMediaLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              LinkedIn Profile
                            </a>
                          </div>
                        )}
                        {user.socialMediaLinks?.twitter && (
                          <div className="flex items-center">
                            <Twitter className="h-5 w-5 mr-3 text-blue-400" />
                            <a
                              href={user.socialMediaLinks.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              Twitter Profile
                            </a>
                          </div>
                        )}
                        {user.socialMediaLinks?.facebook && (
                          <div className="flex items-center">
                            <Facebook className="h-5 w-5 mr-3 text-blue-700" />
                            <a
                              href={user.socialMediaLinks.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              Facebook Profile
                            </a>
                          </div>
                        )}
                        {user.socialMediaLinks?.instagram && (
                          <div className="flex items-center">
                            <Instagram className="h-5 w-5 mr-3 text-pink-600" />
                            <a
                              href={user.socialMediaLinks.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              Instagram Profile
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Bio */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Bio</h3>
                    <p className="text-gray-700">{user.bio}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
