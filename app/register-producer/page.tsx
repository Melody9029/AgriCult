"use client"
import { useState } from "react"

export default function RegisterProducer() {
  const [producerName, setProducerName] = useState("")
  const [producerDescription, setProducerDescription] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically send the producerName and producerDescription
    // to your backend to create a new producer record.
    console.log("Producer Name:", producerName)
    console.log("Producer Description:", producerDescription)

    // Reset the form after submission
    setProducerName("")
    setProducerDescription("")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register as a Producer</h1>

      <div>
        <form onSubmit={handleSubmit} className="max-w-lg">
          <div className="mb-4">
            <label htmlFor="producerName" className="block text-gray-700 text-sm font-bold mb-2">
              Producer Name:
            </label>
            <input
              type="text"
              id="producerName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={producerName}
              onChange={(e) => setProducerName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="producerDescription" className="block text-gray-700 text-sm font-bold mb-2">
              Producer Description:
            </label>
            <textarea
              id="producerDescription"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={producerDescription}
              onChange={(e) => setProducerDescription(e.target.value)}
              rows={4}
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
