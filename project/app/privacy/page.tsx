export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: July 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">Data We Display</h2>
          <p>
            All college information shown on this portal — placement
            percentages, packages, rankings, and contact details — is sourced
            directly from an institutional dataset and public research notes.
            We do not fabricate or estimate missing values; fields without
            data are labeled &ldquo;Data Not Available.&rdquo;
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">Personal Data</h2>
          <p>
            This site does not require account creation. The contact form on
            this demo does not transmit or store submitted information.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">Cookies</h2>
          <p>
            We use minimal local storage only to remember your light/dark
            theme preference. No tracking or advertising cookies are used.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">Contact</h2>
          <p>
            For data corrections or removal requests, reach out via the
            Contact page.
          </p>
        </section>
      </div>
    </div>
  );
}
