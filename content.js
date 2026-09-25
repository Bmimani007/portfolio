/* =====================================================================
   CONTENT FILE — this is the ONLY file you need to edit to update the site.
   ---------------------------------------------------------------------
   Rules (read once):
   • Text goes inside "double quotes".
   • Every item in a list ends with a comma  ,
   • Anything still written like "[ ... ]" shows on the site as a dashed
     placeholder box. Replace it with your real text.
   • Lines starting with // are notes for you. The site ignores them.
   See README.md for step-by-step instructions with examples.
   ===================================================================== */

window.CONTENT = {

  /* ---------- YOU ---------- */
  profile: {
    firstName: "Bharat",
    lastName: "Mimani",
    tagline: "An aspiring professional with a strong interest in business and strategy. Passionate about analysing real-world problems, building insights, and continuously learning.",
    email: "bharatmimani@imthyderabad.edu.in",
    linkedin: "https://www.linkedin.com/in/bharat-mimani-03b239250/",
    whatsapp: "918240073060",                       // country code + number, no + or spaces
    whatsappMessage: "Hi Bharat, I came across your portfolio and would like to connect.",
    cv: "assets/CV.pdf",                            // replace the PDF in /assets to update your CV
  },

  // Scrolling strip under the hero
  tools: ["Microsoft Excel", "PowerPoint", "Adobe Illustrator", "CorelDRAW", "Canva"],

  /* ---------- 01 · MBA ---------- */
  mba: {
    institute: "IMT Hydereabd",
    programme: "PGDM",
    specialisation: "Marketing",
    cgpa: "9.25",
    batch: "2025–27",
    summary: "Transformative journey of learning, leadership, and real-world business exposure.",
  },

  /* ---------- 02 · SUMMER INTERNSHIP ---------- */
  internship: {
    company: "Tata Steel",
    role: "SPA intern",
    duration: "Apr–Jun 2026",
    project: "HRC Price Intelligence",
    summary: "Analysis of Global Steel Price Dynamics and Inter-Nation Interdependence along with Investigation of Key Variables Influencing International Steel Market Price Movements",
    highlights: [],                                 // optional bullet points, e.g. ["Built a live dashboard", "..."]
    deck: { folder: "assets/decks/tata-steel", count: 14 },
    dashboard: "https://hrcpipeline-tata-bharat.streamlit.app/",
  },

  /* ---------- 03 · WORK EXPERIENCE ---------- */
  workex: {
    company: "SKPPL",
    industry: "Printing & Packaging",
    role: "Designer & Business Development Trainee",
    duration: "2022–2025",
    summary: "Worked across sales, customer relationship management, design, and digital initiatives, contributing to ₹15L+ in sales while improving operational efficiency through automation.",
    highlights: [
      "Business & Customer Understanding",
      "Technology & Efficiency",
    ],
    // Work samples: add image paths here when ready, e.g. "assets/work/1.webp",
    // The gallery stays hidden while this list is empty.
    gallery: [],
  },

  /* ---------- 04 · CASE COMPETITIONS ----------
     Each deck lives in assets/decks/<folder>/ as cover.webp, 1.webp, 2.webp …
     count = number of slides. result is optional — leave "" to hide it. */
  caseComps: [
    { title: "Chings Winning in Korean Noodles", org: "Tata Consumer Products Ltd.",       result: "", folder: "assets/decks/tcpl",       count: 5 },
    { title: "HOCCO's Entry into Goa",           org: "Goa Institute of Management × HOCCO", result: "", folder: "assets/decks/gim",        count: 4 },
    { title: "Run.io",                            org: "Great Lakes Annual Management Fest",   result: "", folder: "assets/decks/greatlakes", count: 4 },
    { title: "Qurkle × Mira",                     org: "Markagaon, IMI Delhi",                 result: "", folder: "assets/decks/imi",        count: 5 },
  ],

  /* ---------- 05 · CLUBS & COMMITTEES ---------- */
  clubs: [
    { club: "CommWing",          role: "Design Head", note: "Communications Club", image: "assets/img/hoodie-commwing.webp", accent: "#E8A317" },
    { club: "TEDxIMTHyderabad",  role: "Design Head", note: "",                    image: "assets/img/hoodie-tedx.webp",     accent: "#E62B1E" },
    { club: "Mercatus",          role: "Member",      note: "Marketing Club",      image: "assets/img/hoodie-mercatus.webp", accent: "#E8A317" },
  ],

  /* ---------- 06 · CERTIFICATIONS ----------
     verify = the "Verify at" link printed on the certificate ("" if none). */
  certifications: [
    { title: "Product Management: An Introduction",                     issuer: "IBM · Coursera",                 date: "May 2026", image: "assets/certs/6.webp", verify: "https://coursera.org/verify/TPEENSMX4B0D" },
    { title: "Product Management: Foundations & Stakeholder Collaboration", issuer: "SkillUp · Coursera",          date: "Jun 2026", image: "assets/certs/5.webp", verify: "https://coursera.org/verify/GUT88WXZIAP4" },
    { title: "Sharpening Your Business Acumen",                         issuer: "Harvard ManageMentor",           date: "Jun 2025", image: "assets/certs/4.webp", verify: "" },
    { title: "Optimization for Decision Making",                        issuer: "University of Minnesota · Coursera", date: "Nov 2025", image: "assets/certs/3.webp", verify: "https://coursera.org/verify/0B9AC9T6NZZ4" },
    { title: "Brand Management: Strategies for a Strong Brand",         issuer: "Coursera Instructor Network",    date: "Oct 2025", image: "assets/certs/1.webp", verify: "https://coursera.org/verify/5DO8CKGMIEHE" },
    { title: "Google Ads for Beginners",                                issuer: "Coursera Project Network",       date: "Oct 2025", image: "assets/certs/2.webp", verify: "https://coursera.org/verify/IBM6COL3X7RU" },
  ],

  /* ---------- 07 · LINKEDIN POSTS ----------
     On LinkedIn: post ⋯ menu → "Embed this post" → Copy code.
     Paste it below between backticks ` ` — newest post at the TOP.
     A normal post link also works. Example:
       `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7123456789012345678" height="600" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`,
  */
  linkedinPosts: [<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7404031587824123904?collapsed=1" height="670" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>,<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7469739576736243712?collapsed=1" height="549" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
  ],
};
