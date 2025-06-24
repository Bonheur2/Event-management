"use client"

import { useState } from "react"
import { X, CreditCard, Smartphone, Building, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  eventTitle: string
  ticketType: string
  price: number
  currency: string
  onPaymentSuccess: (paymentData: any) => void
}

export function PaymentModal({
  isOpen,
  onClose,
  eventTitle,
  ticketType,
  price,
  currency,
  onPaymentSuccess,
}: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStep, setPaymentStep] = useState<"method" | "details" | "processing" | "success">("method")
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    phoneNumber: "",
    bankAccount: "",
  })

  if (!isOpen) return null

  const formatPrice = (price: number, currency: string) => {
    if (price === 0) return "Free"
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price)
  }

  const paymentMethods = [
    {
      id: "mobile_money",
      name: "Mobile Money",
      description: "Pay with MTN Mobile Money or Airtel Money",
      icon: Smartphone,
      available: true,
    },
    {
      id: "credit_card",
      name: "Credit/Debit Card",
      description: "Pay with Visa, Mastercard, or local cards",
      icon: CreditCard,
      available: true,
    },
    {
      id: "bank_transfer",
      name: "Bank Transfer",
      description: "Direct bank transfer",
      icon: Building,
      available: true,
    },
  ]

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId)
    if (price === 0) {
      // Free registration
      handleFreeRegistration()
    } else {
      setPaymentStep("details")
    }
  }

  const handleFreeRegistration = () => {
    setPaymentStep("processing")
    setTimeout(() => {
      setPaymentStep("success")
      setTimeout(() => {
        onPaymentSuccess({
          ticketId: `TKT-${Date.now()}`,
          paymentMethod: "Free Registration",
          paymentStatus: "completed",
          amount: 0,
          currency: currency,
        })
        onClose()
        resetModal()
      }, 2000)
    }, 1000)
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    setPaymentStep("processing")

    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep("success")
      setTimeout(() => {
        onPaymentSuccess({
          ticketId: `TKT-${Date.now()}`,
          paymentMethod: paymentMethods.find((m) => m.id === selectedMethod)?.name,
          paymentStatus: "completed",
          amount: price,
          currency: currency,
        })
        onClose()
        resetModal()
      }, 2000)
    }, 3000)
  }

  const resetModal = () => {
    setSelectedMethod("")
    setPaymentStep("method")
    setIsProcessing(false)
    setFormData({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
      phoneNumber: "",
      bankAccount: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold">Complete Registration</h2>
            <p className="text-sm text-gray-600">{eventTitle}</p>
          </div>
          <button
            onClick={() => {
              onClose()
              resetModal()
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Order Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Event:</span>
                  <span className="font-medium">{eventTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ticket Type:</span>
                  <span className="font-medium">{ticketType}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>{formatPrice(price, currency)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Selection */}
          {paymentStep === "method" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <button
                      key={method.id}
                      onClick={() => handleMethodSelect(method.id)}
                      disabled={!method.available}
                      className={`w-full p-4 border rounded-lg text-left transition-colors ${
                        method.available ? "hover:bg-gray-50 border-gray-200" : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-6 w-6 text-gray-600" />
                        <div>
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Payment Details */}
          {paymentStep === "details" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Payment Details</h3>
                <button onClick={() => setPaymentStep("method")} className="text-blue-600 hover:text-blue-800 text-sm">
                  Change Method
                </button>
              </div>

              {selectedMethod === "credit_card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      value={formData.cardholderName}
                      onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === "mobile_money" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+250 788 123 456"
                    />
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      You will receive a payment prompt on your phone to complete the transaction.
                    </p>
                  </div>
                </div>
              )}

              {selectedMethod === "bank_transfer" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account Number</label>
                    <input
                      type="text"
                      value={formData.bankAccount}
                      onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Account number"
                    />
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      Bank transfer payments may take 1-3 business days to process.
                    </p>
                  </div>
                </div>
              )}

              <Button onClick={handlePayment} disabled={isProcessing} className="w-full mt-6">
                {isProcessing ? "Processing..." : `Pay ${formatPrice(price, currency)}`}
              </Button>
            </div>
          )}

          {/* Processing */}
          {paymentStep === "processing" && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
              <p className="text-gray-600">Please wait while we process your payment...</p>
            </div>
          )}

          {/* Success */}
          {paymentStep === "success" && (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Payment Successful!</h3>
              <p className="text-gray-600">
                Your registration has been confirmed. You will receive a confirmation email shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
