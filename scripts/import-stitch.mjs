import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials. Make sure to run with --env-file=.env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const posts = [
  {
    lang: "en",
    title: "The Architectural About Page",
    slug: "architectural-about-page",
    category: "Space Optimization",
    date: "April 17, 2026",
    excerpt: "Exploring the intersections of digital organization and physical sanctuary. A deep dive into the 'No-Line' Scandi-minimalist philosophy.",
    content: `
      <img src="/images/academy/about-page.png" alt="Architectural About Page" class="w-full rounded-DEFAULT mb-12 shadow-premium" />
      <h2>The Digital Sanctuary</h2>
      <p>Moving away from the cluttered, high-frequency layouts typical of video platforms, our design system embraces a Scandi-minimalist philosophy. It treats the interface as a physical room—airy, intentional, and quiet.</p>
      <p>We break the "template" look by using generous white space (macro-margins), intentional asymmetry in content blocks, and an editorial approach to typography that prioritizes "breathing room" over information density.</p>
      <blockquote>"Luxury is not about having more, but about finding the space for what truly matters."</blockquote>
      <h3>The "No-Line" Rule</h3>
      <p>Prohibit 1px solid borders for sectioning. To separate a video grid from a sidebar, do not draw a line. Instead, shift the background color. Use surface for the main canvas and surface-container-low for secondary utility areas. Boundaries are felt, not seen.</p>
    `
  },
  {
    lang: "en",
    title: "Dynamic Residential Landing Systems",
    slug: "residential-landing-systems",
    category: "Digital Sanctuaries",
    date: "April 17, 2026",
    excerpt: "Applying residential organization principles to promotional web design. Creating air and intention in high-traffic interfaces.",
    content: `
      <img src="/images/academy/landing-page.png" alt="Dynamic Residential Landing Systems" class="w-full rounded-DEFAULT mb-12 shadow-premium" />
      <h2>Atmospheric Depth</h2>
      <p>Our palette moves away from digital pure-blacks and stark-whites. We use organic, earthy pigments that mimic natural light on wood and foliage.</p>
      <h3>Surface Hierarchy & Nesting</h3>
      <p>Treat the UI as a series of stacked, tactile materials.</p>
      <ul>
        <li><strong>Base:</strong> Organic tinted surfaces</li>
        <li><strong>Nested Elements:</strong> Tiered containers creating soft depth</li>
        <li><strong>Finish:</strong> Suble gradients and glassmorphism for a premium touch</li>
      </ul>
      <p>The goal is to inspire the user to organize their own life by presenting them with a digital environment that is already perfectly ordered.</p>
    `
  },
  {
    lang: "en",
    title: "Curating the Digital Canvas: Channel Home",
    slug: "curating-digital-canvas",
    category: "Design Systems",
    date: "April 17, 2026",
    excerpt: "How the Manrope and Plus Jakarta Sans typefaces combine to create an authoritative yet humanistic digital environment.",
    content: `
      <img src="/images/academy/channel-home.png" alt="Curating the Digital Canvas" class="w-full rounded-DEFAULT mb-12 shadow-premium" />
      <h2>Typography: The Editorial Voice</h2>
      <p>We utilize two distinct sans-serifs to balance authority with approachability. This approach ensures the content feels invited and easy to digest, mirroring the physical sensation of a well-organized closet.</p>
      <p><strong>Display & Headlines (Manrope):</strong> Our "Architectural" face. High-end editorial feel, like a premium interior design magazine.</p>
      <p><strong>Body & UI (Plus Jakarta Sans):</strong> Our "Humanist" face. Highly legible and friendly.</p>
      <p>Always maintain a significant scale contrast. Avoiding middle-ground sizes prevents the "generic" look common in modern web design.</p>
    `
  },
  {
    lang: "en",
    title: "The Ritual of Watching: Video Integration",
    slug: "ritual-of-watching",
    category: "Sanctuary Design",
    date: "April 17, 2026",
    excerpt: "Optimizing the viewing experience through tactile minimalism and ambient light principles.",
    content: `
      <img src="/images/academy/watch-page.png" alt="The Ritual of Watching" class="w-full rounded-DEFAULT mb-12 shadow-premium" />
      <h2>Tactile Minimalism</h2>
      <p>Traditional shadows are too heavy for a Scandi-minimalist aesthetic. We use light. The eye perceives importance through subtle shifts in material brightness.</p>
      <h3>Ambient Light Principles</h3>
      <p>For high-priority floating elements, we use "Sunlight Shadows"—barely perceptible tints that mimic natural light falling on a surface.</p>
      <p>The interface should feel alive but calm, encouraging a deep focus on the content without digital distraction.</p>
    `
  }
];

const langs = ["en", "fr", "de", "ru"];

async function run() {
  console.log("Starting import for all languages...");
  
  for (const lang of langs) {
    const langPosts = posts.map(p => ({ ...p, lang }));
    const { error } = await supabase.from("blog").upsert(langPosts, { onConflict: "slug,lang" });
    if (error) {
      console.error(`Error importing posts for ${lang}:`, error.message);
    } else {
      console.log(`Successfully imported 4 articles for ${lang}.`);
    }
  }
}

run();
