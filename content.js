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
    tagline: "An aspiring professional with a strong interest in business and strategy. Passionate about product management, with a keen interest in solving real world problems through thoughtful product thinking.",
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
    highlights: ["Identified the issues currently faced by the pricing department through primary and secondary research", "Produced a self updating live dashboard with relevant KPIs to analyse steel price movements"],                                 // optional bullet points, e.g. ["Built a live dashboard", "..."]
    // Opens in the project popup: brief on the left, PDF deck on the right
    deck: { pdf: "assets/decks/tata-steel/deck.pdf", cover: "assets/decks/tata-steel/1.webp" },
    brief: [
      { heading: "Brief", text: "[Write the project brief here]" },
    ],
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
  /* Each project opens in a popup: brief on the left, PDF deck on the right.
     • id      = short name used in the project's direct link (yoursite/#p-chings)
     • result  = optional badge, e.g. "Finalist" — leave "" to hide
     • brief   = the headings + text on the left. Add or delete a { heading, text } line
                 to add or remove a heading. Each project can have different headings.
                 For bullet points, use a list:  text: ["Point one", "Point two"]  */
  projects: [
    {
      id: "chings",
      title: "Chings Winning in Korean Noodles",
      org: "Tata Consumer Products Ltd.",
      result: "",
      cover: "assets/decks/tcpl/cover.webp",
      pdf: "assets/decks/tcpl/deck.pdf",
      brief: [
      { heading: "Brief", text: "[Write the project brief here]" },
    ],
    },
    {
      id: "hocco",
      title: "HOCCO's Entry into Goa",
      org: "Goa Institute of Management × HOCCO",
      result: "",
      cover: "assets/decks/gim/cover.webp",
      pdf: "assets/decks/gim/deck.pdf",
      brief: [
      { heading: "Brief", text: "[Write the project brief here]" },
    ],
    },
    {
      id: "runio",
      title: "Run.io",
      org: "Great Lakes Annual Management Fest",
      result: "",
      cover: "assets/decks/greatlakes/cover.webp",
      pdf: "assets/decks/greatlakes/deck.pdf",
      brief: [
      { heading: "Brief", text: "[Write the project brief here]" },
    ],
    },
    {
      id: "qurkle",
      title: "Qurkle × Mira",
      org: "Markagaon, IMI Delhi",
      result: "",
      cover: "assets/decks/imi/cover.webp",
      pdf: "assets/decks/imi/deck.pdf",
      brief: [
      { heading: "Brief", text: "[Write the project brief here]" },
    ],
    },
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
  linkedinPosts: ['<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7493921736615403520?collapsed=1" height="670" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>',
  '<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7475401594663026688?collapsed=1" height="895" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>',
  '<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7470348080526290944?collapsed=1" height="549" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>',
  ],

  /* ---------- ROOM PAGE (room.html) ----------
     Everything you see when you click things in your room.
     Anything written like "[ ... ]" shows as a dashed placeholder.
     The clock and calendar on the desk update by themselves.
     The hoodies on the door use the "clubs" list above. */
  room: {

    // 🎧 Headphones → plays this song (paste any YouTube link). start = seconds to skip.
    song: { title: "MatKar Maya Ko Ahankar", youtube: "https://www.youtube.com/watch?v=vA86QFrXoho", start: 0 },

    // 🖼️ Radha Krishna frame on the desk → this quote pops up
    krishnaQuote: { text: "sarva-dharmān parityajya mām ekaṁ śharaṇaṁ vraja, ahaṁ tvāṁ sarva-pāpebhyo mokṣhayiṣhyāmi mā śhuchaḥ", by: "B.G. 18.66" },

    // 🗑️ Dustbin → crumpled paper of plans that didn't make it
    failedTitle: "Plans that didn't make it",
    failedPlans: ["Engineer", "Pilot", "Movie maker", "VFX artist"],
    failedNote: "Glad I kept looking",                                   // optional last line, e.g. "Glad I kept looking."

    // 💻 Laptop → two tabs
    laptop: {
      projects: [
        { title: "[Project name]", note: "[One line about what you're building]", status: "In progress" },
        { title: "[Project name]", note: "[One line about it]", status: "In progress" },
      ],
      courses: [
        { title: "[Course name]", provider: "[Platform — e.g. Coursera]", progress: 40 },   // progress = % done
        { title: "[Course name]", provider: "[Platform]", progress: 10 },
      ],
    },

    // 📚 Book stack on the side table → three tabs
    // cover = image path (e.g. "assets/Room/books/atomic-habits.webp") or "" for a plain cover
    // favourite: true puts a ★ on it. review can be long; leave an empty line between paragraphs.
    books: {
      reading: [
        { title: "[Book title]", author: "[Author]", cover: "" },
      ],
      read: [
        { title: "[Book title]", author: "[Author]", cover: "", favourite: true,
          review: `[Write your review here. It can be as long as you like.

A blank line like the one above starts a new paragraph.]` },
        { title: "[Book title]", author: "[Author]", cover: "", favourite: false, review: `[Your review]` },
      ],
      wishlist: [
        { title: "[Book title]", author: "[Author]", cover: "" },
      ],
    },

    // 🖼️ Photo with friends on the side table → photo on the left, quote on the right
    friends: { photo: "assets/Room/friends.webp", quote: `Agar biki teri dosti, toh pehle kharidar hum honge.
Tujhe pata na hogi teri kimmat, par tujhe paa kar sabse ameer hum honge.

Agar tum sath ho toh rone me bhi shaan hai.
Or tum na ho toh mehfill bhi shamshan hai.

Sara khel dosti ka hai, ae mere dost.
Varna janaja or baraat, dono ek hi smaan hai.`, by: "" },

    // 🚪 Door → hoodie popup (hoodies + designations come from "clubs"). One line at the bottom:
    hoodiesLine: "P.S. - I designed all 3",

    // 🏀 Basketball shoe → achievements
    basketball: {
      intro: "[One or two lines about you and basketball]",
      achievements: [
        { year: "[Year]", title: "[Achievement]", note: "[Optional detail]" },
        { year: "[Year]", title: "[Achievement]", note: "" },
      ],
    },
  },
};
