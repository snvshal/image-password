import { ImageToPassword } from "@/components/image-to-password"
import { KeyIcon, ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Image to Password | ImagePass",
  description: "Convert images into deterministic, cryptographically derived passwords",
}

export default function ImageToPasswordPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="size-10 rounded-lg bg-primary flex items-center justify-center">
              <KeyIcon className="size-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">ImagePass</h1>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeftIcon className="size-4" />
              Back
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Image to Password
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4 text-foreground">
            Convert Image to Secure Password
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Upload an image to deterministically generate a secure password derived from its cryptographic hash
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg">
          <ImageToPassword />
        </div>

        {/* Info Section */}
        <div className="mt-8 p-6 rounded-xl bg-muted/50 border border-border">
          <h3 className="font-semibold text-card-foreground mb-3">How it works</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Upload a supported image file (PNG, JPG, WEBP, SVG)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>The image is processed securely on the server</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>The image bytes are normalized and hashed using SHA-256</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>A deterministic password is derived from the cryptographic hash</span>
            </li>
          </ul>
        </div>
      </section>
    </main>
  )
}
