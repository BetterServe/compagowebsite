# Compago Website: November 2026 Draft

The Compago site built from the November 2026 Website Direction Guide. Earlier rounds are untouched in their own folders.

Plain HTML, CSS, and a little JavaScript. No build step. Fonts are self-hosted in `assets/fonts/`, so no visitor data goes to a font provider. To preview, run a static server in this folder (`python -m http.server`) and open http://localhost:8000. Opening the files directly also works, but some browsers block local fonts that way.

The header, closing section, and footer are repeated in every page, so a change to any of them means editing each file.

## Pages

| File | Page |
|---|---|
| `index.html` | Home: hero with the animated three-step graphic, Programs that support human health and share kindness (six program types), We value human connection (human moments with systems before and after), Who we work with (drawn sector cards), Programs across the country (six-state dot map), results band, close |
| `how-we-work.html` | An extension of your team: where we fit (four example arrangements with who-runs-what strips), when we're the right fit (volume by human-touch 2x2), three functions as one system (anchors #enrollment, #fulfillment, #reporting), the bilingual band, and questions partners ask |
| `who-we-work-with.html` | Built for the programs you run: jump cards, then Healthcare, Government, and Community-based organizations (#healthcare, #government, #community), each with what we hear, what we take on, who we've worked with, and a typical arrangement strip; the bilingual band |
| `about.html` | Kindness deserves a system: a note from our founder (Brendan's story and card), how we got here (timeline), what we value (Care, Stewardship, Dignity), the name, and a pointer to the team |
| `team.html` | Leadership (Brendan, Chantelle, Daniela, Kerri as peers), Member services, Partnerships and systems (shown as final, no draft notes) |
| `contact.html` | Start a conversation: four-field form, what happens next, direct contact |
| `privacy.html`, `accessibility.html` | Legal drafts carried over from October, renamed to Compago |
| `404.html` | Not-found page, served by Netlify |

## Design system

Styled to the Compago design system (claude.ai artifact "Compago Group", design-system type). The site uses the system's look, not its name: the display name is "Compago".

- **Colors** are the design system's tokens, at the top of `assets/styles.css`. Paper (`#FAF7F2`) is the page, white for cards, graphite for text and primary buttons, slate for secondary text, mono labels and dashed connectors, and rule for hairlines and the dot grid. Marigold is the one human signal, used as fills only: the moving dot, active path nodes, accent bars, and the button on the dark closing section. `--marigold-line` draws the path and node borders, and `--marigold-text` is for the rare marigold word. Butter is the warm panel for the human part (the People section, the "people you serve" chips, callouts). There is no green: partner brands own it. The green draft notes are removed at launch.
- **Type:** Fraunces for headlines and the wordmark ("Compago" set in Fraunces until a final mark exists), IBM Plex Sans for body, and IBM Plex Mono for step numbers, labels, and results.
- **Shapes:** 4px corners on buttons, nodes, and inputs, 8px on cards and panels, round only for path dots. Borders instead of shadows.
- **The look follows a blueprint mock-up** (November 2026): technical but creative. Even dot grids, symmetrical lines, outlined boxes with mono labels, ruled columns, and highlighter marks across words.
- **The path** is the signature diagram: outlined boxes with mono labels ("01 enrollment"), a marigold square node on each box's top edge, marigold connector lines, and mirrored bracket leads at both ends. The active box fills with butter. It appears in the homepage hero, the About page, and the favicon. The same box-and-node language is used for the "What this includes" boxes, the contact form, and the lane chips.
- **Highlighter marks:** `.hl` is a marigold block behind one word in each page headline ("system.", "reach?"). `.mark` is a softer butter stroke across a key word in section headlines. Wrap the highlighted word and the word before it in `<span class="nw">` so they never break apart.
- **No eyebrow labels.** Headlines lead each section with nothing stacked above them. Mono labels appear only where they carry information: step numbers (01, 02, 03), sector names, "Our people" and "Our technology", diagram labels, and footer headings.
- **Mono (IBM Plex Mono)** is the system voice: navigation, buttons, text links, footer, contact details, step boxes, labels, and form labels. Fraunces stays for headlines and IBM Plex Sans for body copy.
- **Ruled columns** (`.cols`): a graphite rule over each column, marigold on the emphasized one, then mono number, Fraunces heading, and slate text. No icons.
- **The visible grid** is a dot grid on a 24px pitch behind the hero, page heads, and the closing section (`.grid-bg`).
- **Results** sit in a full-width butter band after the reach map, so reach and facts read together.
- **Homepage graphics:** the human connection diagram (three butter human-moment cards on a marigold line, with outlined system boxes above for preparation and below for follow-through, joined by flowing dashed connectors), sector cards with line drawings, and a dot-matrix US map where the six states Compago operates in (WA, OR, IL, IN, OH, NY) light up in marigold. The map is generated by a script from simplified US and state outlines; the numbered tags and legend are in `index.html`. Ask Claude to regenerate it when a state is added.
- **Homepage short text is mono** (`.home .lede`).

## Hero diagram

Three step boxes (01 enrollment, 02 fulfillment, 03 reporting) sit over a "screen" that plays one scene per step: an application that fills in, checks off, and gets an Approved stamp; a van carrying the box from a warehouse to a house, with Ordered, Tracked, and Delivered checkpoints lighting up along the route and a Confirmed stamp when the box reaches the door; and a program report that checks off, with a growing bar chart and a Ready for review stamp. A marigold drop line links the active step to the screen. The scenes are SVG drawn in `index.html` and animated in `assets/styles.css` (classes `a-grow`, `a-tick`, `a-van`, `a-track`, `a-drop`, `stamp`). Every element rests in its finished state, so the graphic reads correctly without JavaScript. `assets/loop.js` only switches scenes. Edit its `STOPS` list to change the captions. The animation has a Pause button, stops when scrolled out of view, and stays still for visitors with reduced motion turned on.

## Placeholders and open decisions

Each is marked on the page with a green draft note.

1. **Results.** Published: about $5.5M in benefits delivered, 15,000 families reached across all programs, and 38 sites supported today (confirmed by Brendan, 2026-11-12). Partner logos were removed for now.
2. **Platform name.** Whether to name it on How we work (draft note on that page).
3. **Origin story** on About, to confirm in Brendan's own words.
4. **Team** (`team.html`). Cards share one grid. A group smaller than a row puts its heading in the spare columns on desktop, and phones show compact one-per-line cards. Still needed: leader synopses (add a `<p class="bio">` under each leader's "Leads" line), Gabriel Moreta's headshot (he shows as a "G" monogram for now), and "Kim" or "Kimberly". To add someone, copy a `<li class="person">` block. For a group smaller than a full row, add `side-N` to its `div-grid`, where N is the number of people.
5. **Jotform.** Replace the placeholder form on `contact.html` (marked with a `JOTFORM` comment).
6. **Legal pages.** Counsel review. Fill in the analytics section of the privacy policy once a tool is chosen.
7. **Favicon.** `assets/favicon.svg` is a draft mark drawn from the motif. Swap it for an official one if one is made.
8. **Social share image.** Done: `assets/img/share.png` (1200x630) and `assets/apple-touch-icon.png`, referenced on every page.

## Launch checklist

- ~~Remove the draft bar~~ (done 2026-11-12). Remove the remaining `draft-note`s (Contact: Jotform; Privacy and Accessibility: counsel review) once those are resolved.
- Remove `<meta name="robots" content="noindex">` from each page.
- Update the footer copyright year if launching in 2027.
- In Netlify: connect the GitHub repo, set the publish directory to this folder, and add compagogroup.com and www with HTTPS.
- At HostGator: point the compagogroup.com DNS to Netlify.
- After launch: submit `https://compagogroup.com/sitemap.xml` in Google Search Console.
