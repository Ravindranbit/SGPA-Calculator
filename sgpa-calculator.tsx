"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SGPACalculator() {
  const [collegeName, setCollegeName] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [yourName, setYourName] = useState("")
  const [subjectMarks, setSubjectMarks] = useState<string[]>(["", "", ""]) // Start with 3 subject inputs

  const [minMark, setMinMark] = useState<number | null>(null)
  const [maxMark, setMaxMark] = useState<number | null>(null)
  const [medianMark, setMedianMark] = useState<number | null>(null)

  const handleMarkChange = (index: number, value: string) => {
    const newMarks = [...subjectMarks]
    newMarks[index] = value
    setSubjectMarks(newMarks)
  }

  const addSubjectInput = () => {
    setSubjectMarks([...subjectMarks, ""])
  }

  const getNumericMarks = () => {
    return subjectMarks.map((mark) => Number.parseFloat(mark)).filter((mark) => !isNaN(mark))
  }

  const handleShowMinimum = () => {
    const marks = getNumericMarks()
    if (marks.length === 0) {
      setMinMark(null)
      return
    }
    setMinMark(Math.min(...marks))
  }

  const handleShowMaximum = () => {
    const marks = getNumericMarks()
    if (marks.length === 0) {
      setMaxMark(null)
      return
    }
    setMaxMark(Math.max(...marks))
  }

  const handleShowMedian = () => {
    const marks = getNumericMarks()
    if (marks.length === 0) {
      setMedianMark(null)
      return
    }

    const sortedMarks = [...marks].sort((a, b) => a - b)
    const mid = Math.floor(sortedMarks.length / 2)

    if (sortedMarks.length % 2 === 0) {
      // Even number of elements
      setMedianMark((sortedMarks[mid - 1] + sortedMarks[mid]) / 2)
    } else {
      // Odd number of elements
      setMedianMark(sortedMarks[mid])
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 dark:bg-gray-950">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>SGPA Calculator</CardTitle>
          <CardDescription>Enter your details and subject marks to calculate statistics.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="college-name">College Name</Label>
              <Input
                id="college-name"
                placeholder="Enter college name"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Enter college address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone No. of College</Label>
              <Input
                id="phone"
                placeholder="Enter phone number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email ID of College</Label>
              <Input
                id="email"
                placeholder="Enter college email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="your-name">Your Name</Label>
              <Input
                id="your-name"
                placeholder="Enter your name"
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Subject Marks</h3>
            {subjectMarks.map((mark, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`subject-mark-${index + 1}`}>{`Subject ${index + 1} Mark`}</Label>
                <Input
                  id={`subject-mark-${index + 1}`}
                  placeholder="Enter mark"
                  type="number"
                  value={mark}
                  onChange={(e) => handleMarkChange(index, e.target.value)}
                />
              </div>
            ))}
            <Button variant="outline" onClick={addSubjectInput} className="w-full bg-transparent">
              Add Subject
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Button onClick={handleShowMinimum}>Show Minimum</Button>
            <Button onClick={handleShowMaximum}>Show Maximum</Button>
            <Button onClick={handleShowMedian}>Show Median</Button>
          </div>

          <div className="space-y-2 text-center">
            {minMark !== null && (
              <p className="text-lg font-medium">
                Minimum Mark: <span className="font-bold text-primary">{minMark}</span>
              </p>
            )}
            {maxMark !== null && (
              <p className="text-lg font-medium">
                Maximum Mark: <span className="font-bold text-primary">{maxMark}</span>
              </p>
            )}
            {medianMark !== null && (
              <p className="text-lg font-medium">
                Median Mark: <span className="font-bold text-primary">{medianMark}</span>
              </p>
            )}
            {minMark === null && maxMark === null && medianMark === null && getNumericMarks().length > 0 && (
              <p className="text-sm text-muted-foreground">Click a button to see results.</p>
            )}
            {getNumericMarks().length === 0 && (minMark !== null || maxMark !== null || medianMark !== null) && (
              <p className="text-sm text-destructive">Please enter valid subject marks to calculate.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
