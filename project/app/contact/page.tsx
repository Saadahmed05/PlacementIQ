export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#151320] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
          Contact Us
        </h1>

        <p className="mt-5 text-xl leading-relaxed text-[#aeb2d3]">
          Have a question? Send your queries to{" "}
          <a
            href="mailto:lokhainnovation@gmail.com"
            className="font-medium text-white hover:text-purple-300 transition"
          >
            lokhainnovation@gmail.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}