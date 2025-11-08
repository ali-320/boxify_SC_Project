import { QuoteForm } from "./quote-form";

export default function QuotePage() {
  return (
    <div className="pt-20">
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">
              Request a Quote
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Fill out the form below and one of our specialists will get back
              to you shortly.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <QuoteForm />
          </div>
        </div>
      </section>
    </div>
  );
}
