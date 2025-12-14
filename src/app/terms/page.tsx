export default function TermsOfServicePage() {
  return (
    <div className="pt-20">
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">
              Terms of Service
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl prose prose-lg text-foreground">
            <h2>1. Agreement to Terms</h2>
            <p>
              By using our services, you agree to be bound by these Terms. If
              you do not agree to be bound by these Terms, do not use the
              services.
            </p>
            <h2>2. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality
              are and will remain the exclusive property of Boxify and its
              licensors.
            </p>
            <h2>3. User Conduct</h2>
            <p>
              You agree not to use the services for any purpose that is illegal
              or prohibited by these Terms. You agree not to use the services in
              any manner that could damage, disable, overburden, or impair any
              Boxify server, or the network(s) connected to any Boxify server, or
              interfere with any other party's use and enjoyment of any services.
            </p>
            <h2>4. Termination</h2>
            <p>
              We may terminate or suspend your access to our service immediately,
              without prior notice or liability, for any reason whatsoever,
              including without limitation if you breach the Terms.
            </p>
            <h2>5. Limitation of Liability</h2>
            <p>
              In no event shall Boxify, nor its directors, employees, partners,
              agents, suppliers, or affiliates, be liable for any indirect,
              incidental, special, consequential or punitive damages, including
              without limitation, loss of profits, data, use, goodwill, or other
              intangible losses, resulting from your access to or use of or
              inability to access or use the service.
            </p>
            <h2>6. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. What constitutes a material change will be
              determined at our sole discretion.
            </p>
            <h2>7. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at
              legal@boxify.com.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
