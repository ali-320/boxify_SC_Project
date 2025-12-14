export default function PrivacyPolicyPage() {
  return (
    <div className="pt-20">
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl prose prose-lg text-foreground">
            <h2>1. Introduction</h2>
            <p>
              Welcome to Boxify. We are committed to protecting your personal
              information and your right to privacy. If you have any questions or
              concerns about our policy, or our practices with regards to your
              personal information, please contact us.
            </p>

            <h2>2. Information We Collect</h2>
            <p>
              We collect personal information that you voluntarily provide to us
              when you register on the website, express an interest in obtaining
              information about us or our products and services, when you
              participate in activities on the website or otherwise when you
              contact us. The personal information that we collect depends on the
              context of your interactions with us and the website, the choices
              you make and the products and features you use.
            </p>

            <h2>3. How We Use Your Information</h2>
            <p>
              We use personal information collected via our website for a variety
              of business purposes described below. We process your personal
              information for these purposes in reliance on our legitimate
              business interests, in order to enter into or perform a contract
              with you, with your consent, and/or for compliance with our legal
              obligations.
            </p>

            <h2>4. Will Your Information Be Shared With Anyone?</h2>
            <p>
              We only share information with your consent, to comply with laws, to
              provide you with services, to protect your rights, or to fulfill
              business obligations. We may process or share your data that we hold
              based on the following legal basis: Consent, Legitimate Interests,
              Performance of a Contract, Legal Obligations.
            </p>

            <h2>5. How Long Do We Keep Your Information?</h2>
            <p>
              We keep your information for as long as necessary to fulfill the
              purposes outlined in this privacy policy unless otherwise required
              by law.
            </p>

            <h2>6. How Do We Keep Your Information Safe?</h2>
            <p>
              We aim to protect your personal information through a system of
              organizational and technical security measures. We have implemented
              appropriate technical and organizational security measures designed
              to protect the security of any personal information we process.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              If you have questions or comments about this policy, you may email
              us at privacy@boxify.com.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
