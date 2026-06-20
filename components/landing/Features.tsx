import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "AI Prediction",
    description: "Predict parking availability before you arrive.",
  },
  {
    title: "Live Map",
    description: "Find nearby parking with real-time location.",
  },
  {
    title: "Smart Analytics",
    description: "Help businesses optimize parking usage.",
  },
];

export default function Features() {
  return (
    <section className="px-6 md:px-8 py-16 md:py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Powerful Features</h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Everything you need for smarter parking
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((item) => (
            <Card key={item.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}