"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CopyIcon, UploadIcon, CheckCircle2Icon, EyeOffIcon, EyeIcon, CheckIcon } from "lucide-react"

export function ImageToPassword() {
  const [password, setPassword] = useState("")
  const [fingerprint, setFingerprint] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file")
      return
    }

    if (file.type === "image/gif") {
      setError("GIF images are not supported")
      return
    }

    setLoading(true)
    setError("")
    setPassword("")
    setFingerprint("")

    try {
      const formData = new FormData()
      formData.append("image", file)

      const res = await fetch("/api/v1/generate", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (!data.success) {
        setError(data.error)
        setLoading(false)
        return
      }

      setPassword(data.password)
      setFingerprint(data.fingerprint)
    } catch {
      setError("Failed to generate password from image")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="image-upload">Upload Image</Label>
        <div className="relative">
          <Input
            id="image-upload"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={handleImageUpload}
            disabled={loading}
          />
          <UploadIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
        </div>
      </div>

       {loading && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border">
          <div className="size-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Generating password...</span>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {password && !loading && (
        <div className="space-y-4 animate-in fade-in duration-500">
          <div className="space-y-3">
            <Label htmlFor="generated-password" className="text-base font-medium text-card-foreground">
              Generated Password
            </Label>
            <div className="relative">
              <div className="p-4 bg-secondary/50 rounded-lg border border-border font-mono text-sm break-all">
                {showPassword ? password : '•'.repeat(password.length)}
              </div>
              <div className="absolute top-2 right-2 flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                </Button>
                <Button size="sm" variant="ghost" onClick={copyToClipboard}>
                  {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
                </Button>
              </div>
            </div>
            {copied && (
              <p className="text-sm text-green-500 flex items-center gap-2">
                <CheckCircle2Icon className="size-4" />
                Copied to clipboard!
              </p>
            )}
          </div>

          {fingerprint && (
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Image Fingerprint</Label>
              <div className="p-3 bg-muted/30 rounded-lg border border-border/50 font-mono text-xs break-all text-muted-foreground">
                {fingerprint}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Same image → same fingerprint
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
