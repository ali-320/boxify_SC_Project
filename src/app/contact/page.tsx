export default function ContactPage() {
  return (
    <div className="pt-20">
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">
              Contact Us
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              We're here to help. Reach out to us with any questions or concerns.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl prose prose-lg text-foreground">
            <h2>Our Address</h2>
            <p>123 Packaging Way, Boxwood City, BX 98765</p>

            <h2>Email</h2>
            <p>
              For general inquiries, please email us at:{" "}
              <a href="mailto:hello@boxify.com" className="text-primary hover:underline">
                hello@boxify.com
              </a>
            </p>
            <p>
              For support, contact:{" "}
              <a href="mailto:support@boxify.com" className="text-primary hover:underline">
                support@boxify.com
              </a>
            </p>

            <h2>Phone</h2>
            <p>(123) 456-7890</p>

            <h2>Business Hours</h2>
            <p>Monday - Friday: 9:00 AM - 5:00 PM</p>

            <h2>Looking for a quote?</h2>
            <p>
              For pricing information and to get a custom quote, please fill out our {" "}
              <a href="/quote" className="text-primary hover:underline">
                quote request form
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
