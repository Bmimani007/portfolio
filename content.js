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
    tagline: "I designed a process for that reduced the work flow time by 90%. Thus, contributing towards operational efficiency",
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
    institute: "IMT Hyderabad",
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
      { heading: "Brief", text: "Worked on a data driven product aimed at helping stakeholders better understand and monitor global steel price movements. Defined the problem by identifying key business variables influencing HRC prices, translated complex market data into actionable insights, and analyzed user relevant metrics across pricing, raw materials, freight, and macroeconomic indicators. Built a Streamlit based interactive dashboard that brought multiple data sources and analytical models into a single decision support interface. Applied forecasting and statistical models to identify trends, dependencies, and potential price movements, with a focus on improving usability, monitoring, and data backed decision making for business stakeholders." },
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
    gallery: ["assets/work/1.webp","assets/work/2.webp","assets/work/3.webp","assets/work/4.webp","assets/work/5.webp"],
  },

  /* ---------- 04 · CASE COMPETITIONS ----------
     Each deck lives in assets/decks/<folder>/ as cover.webp, 1.webp, 2.webp …
     count = number of slides. result is optional — leave "" to hide it. */
  /* Each project opens in a popup: brief on the left, PDF deck on the right.
     • category = which TAB the project sits under, e.g. "Case Competitions" or "Passion Projects".
                  A new category name creates a new tab by itself; when no project uses a
                  category any more, its tab disappears. Tabs appear in the order their first
                  project appears in this list. Spell a category EXACTLY the same every time
                  ("Passion Project" and "Passion Projects" would become two tabs).
     • id      = short name used in the project's direct link (yoursite/#p-chings)
     • result  = optional badge, e.g. "Finalist" — leave "" to hide
     • cover   = optional card image. Leave "" and the card shows the title's first letter.
     • pdf     = optional deck. Leave "" (or delete the line) and the popup shows only the brief.
     • links   = optional buttons, e.g.  links: [{ label: "Visit website", url: "https://..." }],
     • gallery = optional images, e.g.  gallery: ["assets/projects/myapp/1.webp", "assets/projects/myapp/2.webp"],
     • brief   = the headings + text on the left. Add or delete a { heading, text } line
                 to add or remove a heading. Each project can have different headings.
                 For bullet points, use a list:  text: ["Point one", "Point two"]  */
  projects: [
    {
      id: "chings",
      category: "Case Competitions",
      title: "Chings Winning in Korean Noodles",
      org: "Tata Consumer Products Ltd.",
      result: "",
      cover: "assets/decks/tcpl/cover.webp",
      pdf: "assets/decks/tcpl/deck.pdf",
      brief: [
      { heading: "Brief", text: "Ching’s Secret aims to disrupt India’s ₹300cr+ Korean noodle market dominated by imported brands by blending authentic Korean elements with Indian taste and pricing. The case focuses on identifying consumer triggers and market gaps to build a scalable, differentiated GTM strategy in the growing instant noodle segment." },
    ],
    },
    {
      id: "room",
      category: "Room",
      title: "Welcome to my room!",
      org: "H2,209",
      result: "",
      cover: "assets/decks/room/room.webp",
      pdf: "",
      brief: [
      { heading: "", text: "Here is something beyound my resume" },
    ],
    },
    {
      id: "hocco",
      category: "Case Competitions",
      title: "HOCCO's Entry into Goa",
      org: "Goa Institute of Management × HOCCO",
      result: "",
      cover: "assets/decks/gim/cover.webp",
      pdf: "assets/decks/gim/deck.pdf",
      brief: [
      { heading: "Brief", text: "The case focuses on building a Goa-specific market entry and visibility strategy for HOCCO Ice Cream during its first full summer, leveraging brand equity in a tourism driven market." },
    ],
    },
    {
      id: "runio",
      category: "Case Competitions",
      title: "Run.io",
      org: "Great Lakes Annual Management Fest",
      result: "",
      cover: "assets/decks/greatlakes/cover.webp",
      pdf: "assets/decks/greatlakes/deck.pdf",
      brief: [
      { heading: "Brief", text: "The pitch introduces Run.io, a gamified running platform designed to bridge the community gap for runners in India through social engagement and gameplay. It outlines a full strategy from market insights to GTM, leveraging “territory capture” and multi channel marketing to drive user consistency." },
    ],
    },
    {
      id: "qurkle",
      category: "Case Competitions",
      title: "Qurkle × Mira",
      org: "Markagaon, IMI Delhi",
      result: "",
      cover: "assets/decks/imi/cover.webp",
      pdf: "assets/decks/imi/deck.pdf",
      brief: [
      { heading: "Brief", text: "The case presents a GTM and monetisation strategy for Qurkle, positioning its AI concierge Mira as a “digital wingwoman” while maintaining premium exclusivity. It outlines a 90-day Delhi NCR launch combining subscription revenue with curated offline events to blend digital matchmaking and real world experiences." },
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
    song: { title: "Mera Safar", youtube: "https://www.youtube.com/watch?v=aYLJnasivzI&list=RDvA86QFrXoho&index=24", start: 15 },

    // 🖼️ Radha Krishna frame on the desk → this quote pops up
    krishnaQuote: { text: "sarva-dharmān parityajya mām ekaṁ śharaṇaṁ vraja, ahaṁ tvāṁ sarva-pāpebhyo mokṣhayiṣhyāmi mā śhuchaḥ", by: "B.G. 18.66" },

    // 🗑️ Dustbin → crumpled paper of plans that didn't make it
    failedTitle: "Plans that didn't make it",
    failedPlans: ["Pilot", "Engineer", "Movie director", "VFX artist"],
    failedNote: "Glad I kept looking",                                   // optional last line, e.g. "Glad I kept looking."

    // 💻 Laptop → two tabs
    laptop: {
      projects: [
        { title: "Portfolio", note: "Building this portfolio", status: "In progress" },
      ],
      courses: [
        { title: "Claude Code for Marketing", provider: "Youtube", progress: 5 },   // progress = % done
        { title: "Product Management", provider: "IBM | Skillup", progress: 30 },
      ],
    },

    // 📚 Book stack on the side table → three tabs
    // cover = image path (e.g. "assets/Room/books/atomic-habits.webp") or "" for a plain cover
    // favourite: true puts a ★ on it. review can be long; leave an empty line between paragraphs.
    books: {
      reading: [
        { title: "Sales Mind", author: "Helen Kensett", cover: "assets/Room/books/Sales_mind.webp" },
      ],
      read: [
        { title: "The Journey Home: Autobiography of an American Swami", author: "Radhanath Swami", cover: "assets/Room/books/Journey_home.webp", favourite: true,
          review: `The Journey Home is the first book in a sequel; the second being The Journey Within. The Journey Home is written by and about Rhadanath Swami’s spiritual journey from the United States to India. On little to no money, he backpacked through Europe, Turkey, the Middle-East, and finally into India and the Himalayas. He talks about his experiences and lessons he learned on the way. He meets many famous yogis and studies under a variety of different people. On his journey through India he meets the Dalai Lama, Mother Theresa, and very prominent swamis and mystics who founded different yoga or meditation institutions throughout India. To me the most impactful and humbling aspect is that he managed to get by traveling with almost zero possessions, let alone money. Not only could he get by, but he consistently expressed gratitude for everything going on, even in the most dismal of times.` },
        { title: "Why Fonts Matter", author: "Sarah Hyndman", cover: "assets/Room/books/WFM.webp", favourite: false, review: `This book opens up the science and the art behind how fonts influence you. It explains why certain fonts or styles evoke particular experiences and associations. Fonts have different personalities that can create trust, mistrust, give you confidence, make things seem easier to do or make a product taste better. They're hidden in plain sight, they trigger memories, associations and multisensory experiences in your imagination.` },
      ],
      wishlist: [
        { title: "Never Split the Difference", author: "Chris Voss", cover: "assets/Room/books/NSTD.webp" },
      ],
    },

    // 🖼️ Photo with friends on the side table → photo on the left, quote on the right
    friends: { photo: "assets/Room/friends.webp", quote: `Agar biki teri dosti, toh pehle kharidar hum honge.
Tujhe pata na hogi teri kimmat, par tujhe paa kar sabse ameer hum honge.

Agar tum sath ho toh rone me bhi shaan hai.
Or tum na ho toh mehfill bhi shamshan hai.

Sara khel dosti ka hai, ae mere dost.
Varna janaja or baraat, dono ek hi samaan hai.`, by: "" },

    // 🚪 Door → hoodie popup (hoodies + designations come from "clubs"). One line at the bottom:
    hoodiesLine: "P.S. - I designed all 3",

    // 🏀 Basketball shoe → achievements
    basketball: {
      intro: "Fast break to glory",
      avatar: "assets/Room/avatar.webp",   // the rotating player on the left
      name: "Bharat",                       // name on the TV-style tag under the player
      number: "16",                         // jersey number on the tag ("" to hide it)
      achievements: [
        { year: "2025", title: "IMT Hyderabad team", note: "" },
        { year: "2020", title: "School basketball team captain", note: "" },
        { year: "2020", title: "1st position, intra school tournament", note: "" }
      ],
    },
  },
};
