import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="px-6 md:px-8 py-20 md:py-28 text-center">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          AI Powered
          <br />
          Smart Parking
          <br />
          For UAE Cities
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Find parking faster, predict availability, and optimize parking spaces using artificial intelligence.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" asChild>
            <a href="/dashboard">Explore Parking</a>
          </Button>

          <Button size="lg" variant="outline">
            View Demo
          </Button>
        </div>
      </div>
    </section>
  );
}