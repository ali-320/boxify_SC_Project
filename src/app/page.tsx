import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { Truck, Palette, Leaf } from "lucide-react";

const products = PlaceHolderImages.filter((p) => p.id.includes("-box"));
const heroImage = PlaceHolderImages.find(
  (p) => p.id === "hero"
) as ImagePlaceholder;

const benefits = [
  {
    icon: <Truck className="h-10 w-10 text-primary" />,
    title: "Free Shipping",
    description:
      "Enjoy complimentary shipping on all orders over $50. We deliver right to your doorstep, hassle-free.",
  },
  {
    icon: <Palette className="h-10 w-10 text-primary" />,
    title: "Custom Designs",
    description:
      "Bring your brand to life with fully customizable box designs. Our team is here to help you create the perfect look.",
  },
  {
    icon: <Leaf className="h-10 w-10 text-primary" />,
    title: "Eco-Friendly Options",
    description:
      "Choose from a range of sustainable materials to create packaging that's better for the planet.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex h-screen w-full items-center justify-center text-center">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="z-0 object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 z-10 bg-black/50" />
        <div className="container relative z-20 px-4 text-white md:px-6">
          <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Custom Boxes, Simplified.
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] text-lg text-gray-200 md:text-xl">
            High-quality, custom-branded packaging solutions for businesses of
            all sizes.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
              <Link href="/quote">Get Your Instant Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">
                Our Featured Products
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover our range of high-quality, customizable boxes perfect
                for any need.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <Image
                    src={product.imageUrl}
                    alt={product.description}
                    width={600}
                    height={400}
                    className="h-auto w-full rounded-md object-cover"
                    data-ai-hint={product.imageHint}
                  />
                  <CardHeader className="px-0 pb-0 pt-4">
                    <CardTitle className="font-headline text-xl">
                      {product.description}
                    </CardTitle>
                  </CardHeader>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="bg-card py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">
                Why Choose Boxify?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We're committed to providing the best service and quality in the
                industry.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-1 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex flex-col items-center gap-4 text-center"
              >
                {benefit.icon}
                <div className="space-y-2">
                  <h3 className="text-xl font-headline font-bold">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
