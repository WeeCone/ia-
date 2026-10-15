---
name: Scanzivo
description: Your chart, annotated like a game of chess, ending on one evaluation symbol.
colors:
  board-green: "#1d5a3d"
  board-green-pressed: "#143f2b"
  board-deep: "#184d34"
  board-rule: "#5e8b73"
  board-muted: "#d3dfd6"
  board-ink: "#f6f7f2"
  board-bull: "#c7ecd2"
  board-bear: "#ffc2c8"
  paper: "#f4f5f0"
  paper-surface: "#e8eae3"
  paper-card: "#fbfbf8"
  paper-rule: "#c3c8bd"
  ink: "#141613"
  ink-muted: "#50574e"
  bull-green: "#17703f"
  annotation-red: "#b81f2e"
typography:
  display:
    fontFamily: "Bodoni Moda, Didot, 'Bodoni 72', serif"
    fontSize: "clamp(2.6rem, 4.6vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bodoni Moda, Didot, 'Bodoni 72', serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bodoni Moda, Didot, 'Bodoni 72', serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.33
  body:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body-small:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  button:
    fontFamily: "Libre Franklin, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    letterSpacing: "0.01em"
  notation:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.375
    fontFeature: "tnum"
rounded:
  diagram: "0px"
  control: "3px"
  sheet: "4px"
  mark: "6px"
spacing:
  gutter: "16px"
  move: "24px"
  block: "40px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.board-green}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.board-green-pressed}"
    textColor: "{colors.paper}"
  button-primary-on-board:
    backgroundColor: "{colors.board-ink}"
    textColor: "{colors.board-green}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "14px 24px"
  input-field:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
  diagram-frame:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.diagram}"
    padding: "16px"
  verdict-symbol:
    textColor: "{colors.bull-green}"
    size: "64px"
  header-band:
    backgroundColor: "{colors.board-green}"
    textColor: "{colors.board-ink}"
    padding: "12px 16px"
---

# Design System: Scanzivo

## Overview

**Creative North Star: "The Annotated Game"**

Scanzivo's public site reads like a page from a chess analysis book. The trader's chart becomes a numbered diagram, the reading becomes a line of moves in notation, and the whole commentary closes on one evaluation symbol (± ∓ = ∞) with a printed legend. The world is built from a club roll-up board green field, paper-white sheets laid on it, true-black ink, and an annotation red reserved for doubtful and bearish marks. A high-contrast Bodoni titles the page, a sturdy Libre Franklin carries the reading, and JetBrains Mono sets every price and move number.

Density is that of a well-set book: generous section margins, hairline rules between entries, heavy two-point rules above lists that matter (verdicts, offers, FAQ, moves). Depth is printed, not lit: frames, rules and tonal sheets, with the only soft shadow reserved for a sheet resting on the green. The world was built against the dark neon AI-SaaS page; glow, gradient words, glass, icon tiles and the pill-shaped capsule do not exist in it.

The world lives in two CSS scopes that re-point the shared tokens: `.paper` (light sheet) and `.board` (green field). Every public surface (homepage, pricing, auth, legal, header, footer) sits inside one of them. The `:root` tokens still hold the previous dark fintech look, used only by the client area (`/dashboard`, `/admin`); that area is out of scope for this system and keeps its old look until it is migrated. New public work must never fall through to `:root`.

**Key Characteristics:**
- Board green field (30 to 60% of a page) alternating with paper sheets, never with a dark theme.
- One evaluation symbol per verdict, drawn as SVG strokes, always paired with its written title.
- Bodoni display with an italic regular rejoinder line ("Un graphique. / *Un verdict.*").
- Prices, move numbers and probabilities in tabular mono.
- Hairline diagram frames, corner ticks and a time-edge ruler as the frame language.
- Near-square corners (0 to 4px); no glow, no gradients, no blur.

## Colors

A two-field palette, green board and paper sheet, each with its own ink, plus one bull green and one annotation red that change value per field to keep their contrast.

### Primary
- **Club Board Green** (board-green): the field. Background of the header band, hero, "Ce qui est lu" section, closing call, footer, and the auth side panel; also the primary button fill on paper and the logo tile. On paper it is the brand ink (7.4:1).
- **Pressed Board Green** (board-green-pressed): hover state of the primary button on paper only.
- **Deep Board** (board-deep): the board's surface step, for a recessed area inside the green.

### Secondary
- **Bull Green** (bull-green): the bullish side on paper: rising candles, support levels, the ± symbol, the "!" move mark, check marks in the offer list (5.6:1 on paper).
- **Board Bull** (board-bull): the same role when the bull mark sits directly on the green field (6.3:1).

### Tertiary
- **Annotation Red** (annotation-red): the commentator's red pen on paper: bearish candles and resistances, the ∓ symbol, the "?!" variation mark, error messages (5.9:1 on paper).
- **Board Bear** (board-bear): annotation red's role on the green field (5.4:1).

### Neutral
- **True Ink** (ink): text, rules above important lists, diagram frames and focus outlines on paper (16.6:1).
- **Ink Grey** (ink-muted): secondary text, captions, move numbers on paper (6.8:1).
- **Paper** (paper): the sheet; page background of every `.paper` scope.
- **Paper Surface** (paper-surface): hover fill for menu rows and other quiet states on paper.
- **Card White** (paper-card): the inner sheet: diagram interiors, input fields, panels.
- **Paper Rule** (paper-rule): hairline dividers between entries on paper. Decorative only (1.6:1), never text.
- **Board Chalk** (board-ink): text and button fill on the green field (7.6:1).
- **Board Muted** (board-muted): secondary text on green (5.9:1).
- **Board Rule** (board-rule): hairline dividers on green. Decorative only (2.1:1), never text.

### Named Rules
**The Two Fields Rule.** Every public surface sits inside `.paper` or `.board`; components read `--background`, `--foreground`, `--muted`, `--border`, `--bull`, `--bear` and never hard-code a field's hex. A component moved from paper to board must re-color itself through the scope alone.

**The Red Pen Rule.** Annotation red marks only what a commentator would mark in red: bearish levels and candles, the ∓ verdict, "?!" doubtful moves, and errors. It is never decoration, never a call to action.

**The Label Beside the Colour Rule.** Bull and bear are never carried by colour alone: every coloured level has its price, every verdict symbol has its title, every probability has its number.

## Typography

**Display Font:** Bodoni Moda (with Didot, Bodoni 72, serif)
**Body Font:** Libre Franklin (with ui-sans-serif, system-ui, sans-serif)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace), tabular figures

**Character:** a chess book's titling over a newspaper's text face: Bodoni's hairline contrast makes headings feel printed and authoritative, Franklin keeps the reading sturdy at small sizes, and mono gives prices the exactness of notation.

### Hierarchy
- **Display** (700, clamp(2.6rem, 4.6vw, 4.25rem), 1.02): the hero H1 only. Two short lines, the second in italic regular.
- **Headline** (700, 2.25rem rising to 3rem / 3.75rem at sm, 1.02, -0.02em): section titles; the closing call scales up to 4.5rem.
- **Title** (700, 1.5rem): verdict names, reading-list entries, offer names (1.875rem), footer column heads (1.125rem). Italic Bodoni titles caption figures ("Diagramme 1") and small sub-heads ("En trois coups", "Inclus dans les deux formules").
- **Body** (400, 1.125rem lead / 1rem running, 1.625): section leads and descriptions; FAQ answers capped at 65ch, legal text at 68ch with 1.75 leading.
- **Notation** (400 to 600, 13px to 18px, tabular): prices, asset and timeframe, move numbers ("1."), probabilities, kbd keys.
- **Button** (700, 1rem, 0.01em): Franklin, sentence case.

### Named Rules
**The Rejoinder Rule.** A headline may answer itself on a second line in Bodoni italic at regular weight ("Quatre verdicts. / *Jamais « peut-être ».*"). One rejoinder per headline, and only in Bodoni.

**The Notation Rule.** Any number a trader would act on (price, stop, target, probability, ratio, move number) is set in tabular mono with non-breaking spaces inside thousands ("65 400"). Running prose numbers stay in Franklin.

## Layout

A 12-column grid inside a 72rem (1152px) container with a 16px side gutter. Sections are full-bleed bands of either field with 80px vertical padding; the hero uses 48px top (64px at sm) and 80px to 96px bottom. Columns split asymmetrically: a 5/7 hero (text left, diagram right), 4/8 for demo, pricing and FAQ (title column left, material right), 7/5 for headline and lead. Gaps are 40px, rising to 48px at lg. Single column below lg (1024px); two-column lists from md (768px); three from lg.

Lists are laid as ruled tables, not cards: entries separated by hairline rules, the list opened by a 2px ink rule. On phones the hero states the verdict in one line under the H1 before the diagram arrives. Anchored sections carry an 80px scroll margin under the sticky header band.

## Elevation & Depth

Printed, not lit. Depth comes from the two fields (a paper sheet laid on green), from hairline frames and from the inner card-white sheet inside a frame. Shadows are rare and always soft and ink-coloured; there is no glow, no blur and no backdrop filter.

### Shadow Vocabulary
- **Sheet on the board** (`box-shadow: 0 2px 0 rgb(20 22 19 / 0.08), 0 40px 60px -40px rgb(0 0 0 / 0.75)`): the hero diagram resting on the green field.
- **Panel** (`box-shadow: 0 1px 0 rgb(20 22 19 / 0.06), 0 18px 30px -24px rgb(20 22 19 / 0.45)`): a `.panel` inside either field.
- **Dropdown** (`box-shadow: 0 18px 30px -20px rgb(20 22 19 / 0.6)`): the mobile menu sheet under the header band.

### Named Rules
**The Paper Has No Glow Rule.** Buttons, fields and frames carry no shadow at rest or on hover; state is shown by fill, rule colour or an ink outline (2px, 3px offset) on focus.

## Shapes

Near-square: 3px on controls (buttons, inputs, inline alerts), 4px on panels, 0 on diagrams and frames, 6px only on the logo tile. Frames are 1px ink hairlines; important lists open with a 2px ink rule. Distinctive geometry: L-shaped 2px corner ticks on the drop zone (an empty diagram), a time-edge ruler of ticks under framed media (long tick every fifth), dashed level lines with a filled price tag at the right edge of charts, and the stroked evaluation marks (4.5px square-capped strokes on a 48-unit grid).

## Components

### Buttons
Squared and printed, like a stamp on a scoresheet.
- **Shape:** near-square corners (3px).
- **Primary:** board green fill with paper text on a paper field; on the board the colours invert (chalk fill, green text). 14px 24px padding, Franklin 700.
- **Hover / Focus:** fill deepens to pressed green on paper, brightens to pure white on board; focus is a 2px ink outline at 3px offset. No shadow, no lift, no scale.
- **Secondary:** transparent with a 1px rule at 45% ink, turning full ink on hover. Used for the monthly offer beside the primary lifetime offer and for Google sign-in.
- **Text link:** Franklin semibold, underlined with a 50% ink decoration at 4px offset, full ink on hover ("Voir les offres").

### Inputs / Fields
- **Style:** card-white fill, 1px rule border, 3px corners, 12px 14px padding, Franklin 1rem, label above in Franklin medium muted.
- **Focus:** border turns ink plus a 2px ring of the field's brand at 35%.
- **Error:** inline alert below: annotation-red text on a 10% red tint, 40% red border, 3px corners, with `role="alert"`.

### Navigation
- **Header band:** sticky board-green strip across every public page ("a book's cover strip"), logo left, Franklin ghost links in board muted turning chalk on hover, a compact primary CTA always visible. Below lg, a square-capped three-line toggle opens a paper dropdown sheet with full-width rows that fill with paper surface on hover.
- **Footer:** board-green, Bodoni column heads, muted underline-on-hover links, the investment disclaimer always present in the bottom strip.

### Evaluation Symbol (signature)
The verdict mark: ± acheter sur confirmation, ∓ vendre sur confirmation, = attendre, ∞ ne pas trader. Drawn as SVG strokes (never typeset) so it keeps one weight in every face; 64px in the printed legend, 48px in the diagram, 28px inline on phones. ± takes bull, ∓ takes annotation red, = and ∞ take ink. Always accompanied by the Bodoni title.

### Diagram Frame (signature)
A paper sheet with a Bodoni italic figure number ("Diagramme 1"), asset and timeframe in mono, and an "Exemple illustratif" note in a caption row over a 1px ink rule; inside, the chart in a card-white frame with price coordinates on the right edge, an evaluation bar beside it, the line of analysis as numbered mono moves (with "!" and "?!" marks), and the verdict with its "Change d'avis" level. Closes on the investment disclaimer over a hairline.

### Evaluation Bar (signature)
A 12px-wide ink-framed column, annotation red above and bull green below, with a 50% tick crossing it and the two probabilities in mono at its ends. On load it settles from 50/50 to the verdict split (1.4s, cubic-bezier(0.16, 1, 0.3, 1), 0.5s delay), then the symbol is set by a left-to-right reveal (0.5s ease-out, 1.9s delay). Both animations rest on their final state and are removed under reduced motion.

### Drop Zone
An empty diagram: dashed 1px border at 55% ink with 2px corner ticks, upload glyph, Franklin semibold prompt and muted format line; hover and drag solidify the border and add a faint white wash. Pointer-coarse devices swap the drag copy for a gallery prompt.

### Ruled Lists
Verdict legend, reading list, offers and FAQ are tables of rules, not cards: a 2px ink rule opens the list, 1px rules separate entries, two-column variants split with a vertical rule. FAQ rows are `details` with a square-capped plus that rotates 45 degrees when open.

### Price Note
"Dès 40 €/mois · 45 analyses par mois · sans engagement" in 14px Franklin, muted, directly under every call to action.

## Do's and Don'ts

### Do:
- **Do** wrap every public surface in `.paper` or `.board`, and alternate the two fields by section.
- **Do** close any verdict with the drawn evaluation symbol and its written title, together.
- **Do** set prices, probabilities and move numbers in tabular JetBrains Mono with non-breaking thousands.
- **Do** frame product material as a numbered diagram: 1px ink frame, figure caption in Bodoni italic, coordinates on the edge.
- **Do** put the price note under every call to action and keep the investment disclaimer visible near any verdict.
- **Do** keep corners at 0 to 4px and express state with fill, rule colour and the 2px ink focus outline.

### Don't:
- **Don't** use glow, gradient text, glassmorphism or backdrop blur anywhere in the public world.
- **Don't** use rounded-full pills or icon tiles; badges and buttons stay near-square.
- **Don't** add uppercase mono eyebrows or kickers above headings; the Bodoni headline stands alone.
- **Don't** carry bull or bear by colour alone; pair it with a price, a symbol title or a number.
- **Don't** use annotation red for calls to action or ornament.
- **Don't** let public pages fall through to the `:root` dark tokens; those belong to the client area until it is migrated.
