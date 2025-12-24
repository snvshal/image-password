import Link from "next/link"
import { Button } from "@/components/ui/button"
import { KeyIcon, ImageIcon, ArrowRightIcon, CopyrightIcon, CircleCheckBigIcon, ZapIcon, LockKeyholeIcon } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-primary flex items-center justify-center">
              <KeyIcon className="size-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">ImagePass</h1>
          </div>
        </div>
      </header>


      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full size-2 bg-primary"></span>
              </span>
              ImagePass
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-balance mb-6 text-foreground">
              Derive <span className="text-primary">Secure Passwords</span> from Images
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground text-balance leading-relaxed">
              Upload a supported image and generate a deterministic, cryptographically
              derived password based on its contents. No randomness. No storage.
            </p>
          </div>

          {/* Main Action */}
          <div className="flex justify-center max-w-2xl mx-auto">
            <Link href="/image-to-password" className="group block w-full">
              <div className="relative h-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-30 rounded-2xl blur transition duration-500"></div>
                <div className="relative bg-card border border-border rounded-2xl p-8 shadow-lg h-full flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <ImageIcon className="size-8 text-primary" />
                  </div>

                  <h3 className="text-2xl font-bold text-card-foreground mb-3">
                    Image to Password
                  </h3>

                  <p className="text-muted-foreground mb-6 flex-grow">
                    Generate the same secure password every time from the same image,
                    using cryptographic hashing on the server
                  </p>

                  <Button className="w-full group-hover:bg-primary/90">
                    Get Started
                    <ArrowRightIcon className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Link>
          </div>

          {/* Features */}
          <div className="mt-16 grid sm:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-muted/50 border border-border">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CircleCheckBigIcon className="size-6 text-primary"/>
              </div>
              <h4 className="font-semibold text-card-foreground mb-2">
                Server-Side Processing
              </h4>
              <p className="text-sm text-muted-foreground text-balance">
                Images are processed securely on the server and never stored
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-muted/50 border border-border">
              <div className="size-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <ZapIcon className="size-6 text-primary" />
              </div>
              <h4 className="font-semibold text-card-foreground mb-2">
                Deterministic Output
              </h4>
              <p className="text-sm text-muted-foreground text-balance">
                The same image always produces the same password
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-muted/50 border border-border">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <LockKeyholeIcon className="size-6 text-primary" />
              </div>
              <h4 className="font-semibold text-card-foreground mb-2">
                Cryptographic Hashing
              </h4>
              <p className="text-sm text-muted-foreground text-balance">
                Passwords are derived from SHA-256 hashes of image data
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-2"><CopyrightIcon className="h-4 w-4" /> {new Date().getFullYear()} ImagePass. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
