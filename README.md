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

## Part E: Adding a new case competition

1. Export the slides as images (PowerPoint: **File → Export → PNG**, All slides).
2. Rename them **`cover.png`** (the cover image), then **`1.png`, `2.png`, `3.png`…** in slide order.
3. Convert them to `.webp` so the site stays fast. Use **squoosh.app** (free, in your browser): drop the image in, choose **WebP**, set width to **1600** (cover: **1000**), then download.
   *Skipping this is fine too: keep the `.png` files and add `ext: "png"` in step 5.*
4. On your computer, put the images in a folder with a short name and no spaces, for example `newcase`. On GitHub, open **assets → decks**, click **Add file → Upload files**, drag the **whole `newcase` folder** in, and commit.
5. In `content.js`, add one line to `caseComps`:
```js
{ title: "My New Case", org: "Organiser Name", result: "Winner", folder: "assets/decks/newcase", count: 6 },
// if you kept PNG files instead of WebP, add  ext: "png"  like this:
{ title: "My New Case", org: "Organiser Name", result: "", folder: "assets/decks/newcase", count: 6, ext: "png" },
```
`count` = the number of slides (not counting the cover). `result` is optional; write `""` to hide it.

---

## Part F: Other common updates

| I want to… | Do this |
|---|---|
| Update my CV | Upload a new file named **`CV.pdf`** to the `assets` folder (it replaces the old one) |
| Add a certificate | Upload the image to `assets/certs/` (for example `7.webp`) and add a line to `certifications` with its title, issuer, date and verify link |
| Add work samples | Upload the images to `assets/work/` and list them in `workex → gallery`, e.g. `"assets/work/1.webp",`. The gallery appears automatically |
| Add a result to a case comp | Change `result: ""` to `result: "Finalist"` |
| Change my tagline or contact | Edit the `profile` section at the top |
| Change the dashboard link | Edit `dashboard:` in the `internship` section |

---

## Before every interview
- Open the **Streamlit dashboard** once, about 5 minutes before. Free apps go to sleep and take around 30 seconds to wake up.
- Open your site on your phone to check that everything loads.
