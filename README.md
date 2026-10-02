# Bharat Mimani — Portfolio

Live site: **https://bharatmimani.vercel.app** (change this line if Vercel gives you a different address)

This page is your instruction manual. **You only ever edit one file: `content.js`.**
Everything else (`index.html`, `style.css`, `main.js`, `fonts.css`) runs the site. Leave those alone.

---

## Part A: Put the site online (one time only, about 15 minutes)

### 1. Create a GitHub account and upload the site
1. Go to **github.com**, click **Sign up** and create an account.
2. At the top right, click **+** and then **New repository**.
3. Name it `portfolio`, keep it **Public**, and click **Create repository**.
4. On the next page, click the link **"uploading an existing file"**.
5. Open the `portfolio-site` folder (inside your `Website` folder on the Desktop). Select **everything inside it** (the `assets` folder, `index.html`, `content.js`, `main.js`, `style.css`, `fonts.css`, `README.md`) and drag it all into the browser.
   *Drag the contents of the folder, not the folder itself.*
6. Wait until every file has finished uploading, then click **Commit changes**.

### 2. Publish it with Vercel
1. Go to **vercel.com**, click **Sign Up** and choose **Continue with GitHub**.
2. Click **Add New… → Project**, find `portfolio` in the list and click **Import**.
3. Under **Project Name**, type `bharatmimani`. That name becomes your web address.
4. Leave every other setting as it is and click **Deploy**.
5. After about a minute you'll see your live link: `bharatmimani.vercel.app`.

> If that name is already taken, Vercel adds something to the end (for example `bharatmimani-xyz.vercel.app`). If that happens, open `index.html` on GitHub and replace `bharatmimani.vercel.app` in the `og:image` line with your actual address. That line controls the preview image people see when your link is shared on WhatsApp or LinkedIn.

### 3. Turn on visitor analytics (free)
In Vercel, open your project, go to the **Analytics** tab and click **Enable**. After that you can see how many people opened your site and from which country.

---

## Part B: How to edit anything (the basic move)

1. Open your repository on github.com and click **`content.js`**.
2. Click the **pencil icon ✏️** (top right of the file).
3. Make your change.
4. Click **Commit changes…** and then **Commit changes** again.
5. The live site updates in **about one minute**. Refresh your site to see it.

This also works from your phone's browser.

### Three rules that keep the site from breaking
- Text stays inside **"double quotes"**.
- Every item in a list ends with a **comma** `,`
- Anything still written like `"[Institute name]"` shows on the site as a **dashed placeholder box**. Replace the whole thing, brackets included:
  `institute: "[Institute name]",` → `institute: "IMT Hyderabad",`

> **If the site ever shows a blank page after an edit**, you've most likely lost a quote or a comma. On GitHub, open `content.js`, click **History**, look at your last change, and fix it. Or go back to the previous version.

---

## Part C: Filling in the placeholders (do this first)

In `content.js`, replace every `[ ... ]` in these sections: `mba`, `internship`, `workex`.

To add or remove a highlight bullet, add or delete a line:
```js
highlights: [
  "Your first highlight",
  "Your second highlight",
],
```

---

## Part D: Adding a LinkedIn post (about 60 seconds)

1. On LinkedIn, make sure the post is set to **Anyone** (public).
2. Click the **⋯** on the post, choose **Embed this post** and then **Copy code**.
3. On GitHub, open `content.js` and scroll to `linkedinPosts`.
4. Paste the code **between backticks** `` ` `` with a comma at the end. **The newest post goes at the top.**

```js
linkedinPosts: [
  `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:71234..." height="600" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`,
  `<iframe src="...an older post..."></iframe>`,
],
```
5. Commit. The post appears in the horizontal slider, and the "Follow my journey" card always stays as the last slide.

*If you can't find "Embed this post", copy the post's normal link (⋯ → Copy link to post) and paste that inside the backticks instead. It usually works too.*

---

## Part E: Projects (brief + PDF deck popup)

Each project card opens a popup: **the brief on the left, the PDF deck on the right** (on phones: Brief / Deck tabs).

**To edit a brief:** in `content.js`, find the project under `projects` and edit its `brief` list:
```js
brief: [
  { heading: "The Challenge",   text: "Your text here" },
  { heading: "Why It Mattered", text: "Your text here" },
  { heading: "My Approach",     text: ["Bullet one", "Bullet two"] },   // a list = bullet points
  { heading: "Outcome",         text: "Your text here" },
],
```
Add a line to add a heading, delete a line to remove one. Headings can be anything.

**To add a new project:**
1. Export the deck from PowerPoint as PDF (**File → Export → PDF**), keep it under ~10 MB (ilovepdf.com to compress).
2. Make a folder in `assets/decks/` with a short name (e.g. `newcase`) and put in it: **`deck.pdf`** and a cover image **`cover.webp`** (or `cover.png`).
3. Copy one existing project block in `content.js` and change `id`, `title`, `org`, `cover`, `pdf` and the `brief`.

Each project also has a direct link, e.g. `bharatmimani.vercel.app/#p-chings` — handy to send an interviewer straight to one project.

> **Note:** when you open `index.html` straight from your computer, the deck shows a message instead of slides (browsers block PDFs from local files). It works on the live site.

---

## Part F: Other common updates

| I want to… | Do this |
|---|---|
| Update my CV | Upload a new file named **`CV.pdf`** to the `assets` folder (it replaces the old one) |
| Add a certificate | Upload the image to `assets/certs/` (for example `7.webp`) and add a line to `certifications` with its title, issuer, date and verify link |
| Add work samples | Upload the images to `assets/work/` and list them in `workex → gallery`, e.g. `"assets/work/1.webp",`. The gallery appears automatically |
| Add a result badge to a project | Change `result: ""` to `result: "Finalist"` |
| Change my tagline or contact | Edit the `profile` section at the top |
| Change the dashboard link | Edit `dashboard:` in the `internship` section |

---

## Before every interview
- Open the **Streamlit dashboard** once, about 5 minutes before. Free apps go to sleep and take around 30 seconds to wake up.
- Open your site on your phone to check that everything loads.
