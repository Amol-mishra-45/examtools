import SEO from '../components/SEO';

export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 transition-colors duration-300">
      <SEO 
        title="About Us"
        description="Learn about our mission to make exam preparation & form filling easier, faster, and more accessible using our completely free suite of tools."
        keywords="free exam tools, reduce photo size to 50kb online, compress pdf for ssc form, online free tool"
        url="https://examtools.in/about"
      />
      {/* Header */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-4 transition-colors">
          About <span className="text-blue-600 dark:text-blue-400">ExamTools</span>.in
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed transition-colors">
          Making exam preparation & form filling easier, faster, and more accessible.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Mission Section */}
        <section className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-700 p-8 md:p-12 transition-colors duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight transition-colors">Our Mission</h2>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-3xl transition-colors">
            ExamTools.in was created to simplify the tedious process of filling out government and educational exam forms. We noticed that many applicants struggle with strict technical requirements like resizing signature photos to exactly 20KB or compressing PDFs below 100KB without losing readability.
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-3xl mt-4 transition-colors">
            Our mission is to provide fast, free, and secure web tools that empower students and job seekers around the world to complete applications confidently and without stress.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="bg-slate-800 dark:bg-slate-900 rounded-[2rem] shadow-md border border-slate-700 dark:border-slate-800 p-8 md:p-12 text-white relative overflow-hidden transition-colors duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-20 blur-[80px] rounded-full mix-blend-screen pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500 opacity-20 blur-[80px] rounded-full mix-blend-screen pointer-events-none"></div>

          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-slate-700/50 dark:bg-slate-800/50 text-green-400 flex items-center justify-center ring-1 ring-slate-600 dark:ring-slate-700">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Why Choose Us?</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 relative z-10">
            <div className="bg-slate-900/40 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-700 dark:border-slate-800 hover:bg-slate-900/60 dark:hover:bg-slate-800/60 transition-colors">
              <h3 className="font-bold text-lg mb-2 text-blue-400">100% Free</h3>
              <p className="text-slate-300 font-medium leading-relaxed">
                No hidden charges, trial delays, or premium subscriptions. Every tool is yours to use entirely for free.
              </p>
            </div>
            <div className="bg-slate-900/40 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-700 dark:border-slate-800 hover:bg-slate-900/60 dark:hover:bg-slate-800/60 transition-colors">
              <h3 className="font-bold text-lg mb-2 text-green-400">Secure & Private</h3>
              <p className="text-slate-300 font-medium leading-relaxed">
                We know exam documents are sensitive. Files are processed fast and instantly wiped from our temporary servers.
              </p>
            </div>
            <div className="bg-slate-900/40 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-700 dark:border-slate-800 hover:bg-slate-900/60 dark:hover:bg-slate-800/60 transition-colors">
              <h3 className="font-bold text-lg mb-2 text-purple-400">Fast & Easy</h3>
              <p className="text-slate-300 font-medium leading-relaxed">
                No complex interfaces or confusing dials. Built specifically with specific exam form configurations in mind.
              </p>
            </div>
            <div className="bg-slate-900/40 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-700 dark:border-slate-800 hover:bg-slate-900/60 dark:hover:bg-slate-800/60 transition-colors">
              <h3 className="font-bold text-lg mb-2 text-pink-400">Mobile Friendly</h3>
              <p className="text-slate-300 font-medium leading-relaxed">
                Use ExamTools directly from your phone browser without missing a deadline. Perfectly scaled for iOS and Android.
              </p>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="bg-blue-50 dark:bg-slate-800 rounded-[2rem] border border-blue-100 dark:border-slate-700 p-8 md:p-12 text-center transition-colors duration-300">
          <div className="w-16 h-16 rounded-full bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center mx-auto mb-6 shadow-md shadow-blue-600/20 dark:shadow-none transition-colors">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight mb-4 transition-colors">Need Help or Support?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto mb-8 transition-colors">
            Encountered an issue or want to request a new tool? Our community team is ready to read and address your feedback.
          </p>
          <a
            href="mailto:support@examtools.in"
            className="inline-flex items-center gap-2 bg-blue-600 dark:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300"
          >
            Email Support Team
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </section>
      </div>
    </main>
  );
}
