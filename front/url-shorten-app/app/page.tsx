'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Link as LinkIcon } from "lucide-react"

export default function Home() {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleShorten = async () => {
    if (!longUrl.trim()) return

    setLoading(true)
    setError('')
    setShortUrl('')

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
      console.log(apiUrl);

      const res = await fetch(`${apiUrl}/url/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full: longUrl })
      })

      if (!res.ok) throw new Error('Failed to shorten URL')
      const data = await res.json()
      setShortUrl(`${apiUrl}/url/${data.minified}`)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-xl p-6 shadow-lg rounded-2xl">
        <CardContent className="space-y-4">
          <h1 className="text-2xl font-semibold text-center mb-2">🔗 URL Shortener</h1>
          <Input
            type="url"
            placeholder="Paste your long URL here..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
          <Button
            className="w-full"
            onClick={handleShorten}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <LinkIcon className="mr-2 h-4 w-4" />}
            Shorten It!
          </Button>

          {shortUrl && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">Your short URL:</p>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium hover:underline"
              >
                {shortUrl}
              </a>
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
