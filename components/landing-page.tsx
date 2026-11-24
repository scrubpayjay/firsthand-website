import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ArrowUpRight, Phone, MapPin, Layers, Leaf, Dog, Sun, Droplets, Sparkles } from "lucide-react";
import { COMPANYCAM_GALLERIES, NAP, SITE_URL, SITE_NAME, SOCIAL } from "@/lib/site-config";
import { landingServices, TURF_FAQS, OUTDOOR_FAQS, TURF_INCLUSIONS, LANDING_AREAS, type LandingKind } from "@/lib/landing-pages";
import { EstimateForm, LandingLink, LandingSticky } from "@/components/landing-interactions";
import "@/app/landing.css";

const turfSteps = [
  ["Free Consultation & Estimate", "We evaluate your property, discuss your goals, and recommend suitable turf options."],
  ["Site Preparation", "We remove existing vegetation, prepare the surface, and address grading and drainage requirements."],
  ["Professional Installation", "Our installation team prepares the base, installs the artificial turf, and secures the edges and seams."],
  ["Final Inspection & Cleanup", "We groom the turf, inspect the installation, and leave your outdoor space ready to enjoy."],
];
const outdoorSteps = [
  ["Tell us your vision", "Share how you want to live outdoors, your priorities, budget, and timing."],
  ["Walk the property", "Review the space, access, drainage, materials, and the possibilities together."],
  ["Define the details", "Agree on your design, installation scope, estimate, and any applicable approvals."],
  ["Bring it to life", "Complete the agreed installation and review the finished space together."],
];
const benefits = [
  ["No Regular Mowing", "Eliminate routine grass cutting.", Leaf],
  ["Less Irrigation", "Reduce landscape watering needs; cleaning may still require water.", Droplets],
  ["Year-Round Green", "Enjoy a consistent lawn appearance.", Sun],
  ["Pet-Friendly Options", "Choose turf designed for active pets, with drainage and routine cleaning.", Dog],
  ["Low Maintenance", "Less traditional lawn upkeep, with occasional rinsing, brushing, and debris removal.", Sparkles],
  ["Beautiful Outdoor Spaces", "Bring a finished look to your landscape design.", Layers],
] as const;
function Heading({eyebrow,title,copy}:{eyebrow:string;title:string;copy?:string}) {
  return <div className="landing-section-heading"><p className="landing-eyebrow">{eyebrow}</p><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}
export function LandingPage({kind}:{kind:LandingKind}) {
  const turf=kind==="artificial-turf"; const faqs=turf?TURF_FAQS:OUTDOOR_FAQS;
  const cta=turf?"Get a Free Artificial Turf Estimate":"Request Your Free Estimate";
  const schema={"@context":"https://schema.org","@graph":[
    {"@type":"LocalBusiness","@id":`${SITE_URL}/#business`,name:SITE_NAME,alternateName:"Firsthand Lawn and Landscape",url:SITE_URL,telephone:NAP.phoneTel,email:NAP.email,address:{"@type":"PostalAddress",streetAddress:NAP.street,addressLocality:NAP.city,addressRegion:NAP.state,postalCode:NAP.zip,addressCountry:"US"}},
    {"@type":"Service","@id":`${SITE_URL}/${kind}#service`,name:turf?"Artificial Turf Installation":"Outdoor Living Design & Installation",url:`${SITE_URL}/${kind}`,provider:{"@id":`${SITE_URL}/#business`},areaServed:LANDING_AREAS.map(name=>({"@type":"City",name})),hasOfferCatalog:{"@type":"OfferCatalog",name:"Installation services",itemListElement:landingServices(kind).map(s=>({"@type":"Offer",itemOffered:{"@type":"Service",name:s.title}}))}},
    {"@type":"FAQPage",mainEntity:faqs.map(f=>({"@type":"Question",name:f.question,acceptedAnswer:{"@type":"Answer",text:f.answer}}))},
    {"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:SITE_URL},{"@type":"ListItem",position:2,name:turf?"Artificial Turf":"Outdoor Living",item:`${SITE_URL}/${kind}`} ]},
  ]};
  return <article className={`landing-page ${turf?"landing-turf":"landing-outdoor"}`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/>
    <section className="landing-hero">
      <div className="landing-hero-photo"><Image src={`/photos/${turf?"lawn-landscape-card-1.jpg":"hardscape-ryan-1.jpg"}`} alt={turf?"Firsthand backyard landscape with natural lawn, bamboo privacy hedge, and travertine walkway; landscape project, not artificial turf":"Completed Firsthand paver patio with topiary boxwoods and outdoor seating"} fill priority fetchPriority="high" quality={60} sizes="100vw" className="object-cover"/></div>
      <div className="landing-hero-shade"/>
      <div className="container-wide landing-hero-content">
        <nav aria-label="Breadcrumb" className="landing-breadcrumb"><Link href="/">Home</Link><span>/</span><span>{turf?"Artificial Turf":"Outdoor Living"}</span></nav>
        <div className="landing-hero-grid"><div>
          <p className="landing-eyebrow">FIRSTHAND LAWN AND LANDSCAPE · ORLANDO, FL</p>
          <h1>{turf?<>Artificial Turf Installation <em>in Orlando, FL</em></>:<>Transform Your Backyard Into a <em>Luxury Outdoor Living Space</em></>}</h1>
          <p className="landing-hero-subtitle">{turf?"Transform your lawn into a beautiful, low-maintenance outdoor space with professionally installed artificial grass.":"Custom Outdoor Living Design & Installation in Orlando, FL"}</p>
          <p className="landing-hero-description">{turf?"From residential lawns and backyards to pet-friendly turf and custom outdoor living spaces, we handle every step of the installation process.":"From beautiful paver patios to complete backyard transformations, Firsthand Lawn and Landscape brings your outdoor vision to life."}</p>
          <div className="landing-hero-actions"><LandingLink kind={kind} href="#estimate" placement="hero" className="cta-pill landing-primary">{cta}<ArrowRight size={18}/></LandingLink><LandingLink kind={kind} href={`tel:${NAP.phoneTel}`} placement="hero" className="landing-phone"><Phone size={17}/><span>Call Now <strong>{NAP.phone}</strong></span></LandingLink></div>
          <div className="landing-hero-details"><span><Check size={15}/> Property-specific estimates</span><span><Check size={15}/> Design through installation</span></div>
        </div><a className="landing-photo-note" href={turf?COMPANYCAM_GALLERIES.lawnLandscape.url:COMPANYCAM_GALLERIES.hardscape.url} target="_blank" rel="noopener noreferrer"><span>FROM THE FIRSTHAND PROJECT ARCHIVE</span><strong>{turf?"Thoughtful spaces. Everyday living.":"Built for the way you live outdoors."}</strong><span>{turf?"Natural lawn shown · Landscape project":"Paver patio · Central Florida"}<ArrowUpRight size={18}/></span></a></div>
      </div>
    </section>
    <div className="landing-intro-strip"><div className="container-wide"><span>YOUR BACKYARD. MORE POSSIBILITY.</span><a href="#services">{turf?"Residential · Backyard · Pet-friendly":"Complete transformations · Paver patios · Landscape design"}</a><a href="#projects">Explore our work <ArrowRight size={16}/></a></div></div>

    <section className="landing-section container-wide" id="projects">
      <div className="landing-heading-row"><Heading eyebrow="A CLOSER LOOK" title={turf?"A foundation in beautiful outdoor spaces.":"Real properties. Thoughtful transformations."} copy={turf?"Explore Firsthand’s landscape work and discuss the right turf solution for your property. The photos below show landscape projects with natural grass, not artificial turf installations.":"Authentic Firsthand landscape and hardscape projects, selected from our project archive."}/><a href={turf?COMPANYCAM_GALLERIES.lawnLandscape.url:COMPANYCAM_GALLERIES.hardscape.url} target="_blank" rel="noopener noreferrer" className="landing-text-link">View project archive <ArrowUpRight size={17}/></a></div>
      <div className="landing-projects"><figure className="landing-project-main"><div><Image src={`/photos/${turf?"lawn-landscape-card-1.jpg":"hardscape-ryan-1.jpg"}`} alt={turf?"Firsthand backyard landscape project with natural lawn and travertine walkway":"Firsthand completed paver patio with landscaped edges"} fill quality={60} sizes="(min-width:768px) 60vw,100vw" className="object-cover"/></div><figcaption><span>{turf?"Backyard landscape · Natural grass":"Paver patio & outdoor gathering space"}</span><span>FIRSTHAND PROJECT</span></figcaption></figure><figure className="landing-project-side"><div><Image src="/photos/portfolio-before-after-1.jpg" alt="Existing Firsthand property-cleanup before-and-after pair showing the same landscape around a paver driveway; not a turf installation" fill quality={60} sizes="(min-width:768px) 35vw,100vw" className="object-contain"/></div><figcaption><span>Before & after · Property cleanup</span><span>FIRSTHAND PROJECT</span></figcaption></figure></div>
      <p className="landing-caption">{turf?"Ask to see artificial turf installation examples during your consultation. Project-specific turf photography will be added once verified.":"Before-and-after imagery shows an existing property-cleanup project. Project scope and materials vary by property."}</p>
    </section>

    <section className="landing-services-section" id="services"><div className="container-wide landing-section"><Heading eyebrow={turf?"A LAWN THAT FITS YOUR LIFE":"DESIGNED AROUND YOU"} title={turf?"Your space. Your kind of green.":"One backyard. Endless ways to enjoy it."} copy={turf?"Start with residential, backyard, or pet-friendly synthetic grass. We’ll help match materials and preparation to how you use your outdoor space.":"Start with the whole space, then choose the details. A paver patio for gathering, a connected walkway, and landscaping that brings it all together."}/><div className="landing-service-grid">{landingServices(kind).map((s,i)=><div className="landing-service-card" key={s.title}>{s.photo?<div className="landing-service-photo"><Image src={`/photos/${s.photo}`} alt={`Firsthand project: ${s.title}`} fill quality={60} sizes="(min-width:1024px) 30vw,(min-width:768px) 45vw,100vw" className="object-cover"/></div>:<div className="landing-service-number"><span>0{i+1}</span>{i===2?<Dog/>:<Leaf/>}</div>}<div className="landing-service-copy"><h3>{s.title}</h3><p>{s.copy}</p><LandingLink kind={kind} href="#estimate" placement={`service_${i}`} className="landing-text-link">Let’s plan your project <ArrowUpRight size={16}/></LandingLink></div></div>)}</div></div></section>

    <section className="landing-section container-wide landing-why"><div><Heading eyebrow="WHY FIRSTHAND" title="Good outdoor spaces start with listening." copy="Your project starts with a conversation about the property and the way you want to use it. We turn those priorities into a clear installation plan."/><LandingLink kind={kind} href="#estimate" placement="why_firsthand" className="landing-text-link">Tell us what you have in mind <ArrowRight size={18}/></LandingLink></div><div className="landing-why-list">{[["The whole space in view",turf?"Consider turf alongside your patios, pavers, landscaping, and the way water moves across the property.":"Connect patios, walkways, and plantings with a cohesive plan for your backyard."],["Preparation matters",turf?"Discuss base preparation, drainage, seams, edges, and the right maintenance for your selected product.":"Review site conditions, material choices, drainage, and access before installation."],["Clear project details","A property-specific estimate gives you an agreed scope to review before work begins."]].map(([h,p],i)=><div key={h}><span>0{i+1}</span><div><h3>{h}</h3><p>{p}</p></div></div>)}</div></section>

    {turf && <>
      <section className="landing-benefits"><div className="container-wide landing-section"><Heading eyebrow="LESS LAWN WORK. MORE OUTDOOR LIVING." title="Make more room for the everyday."/><div className="landing-benefit-grid">{benefits.map(([h,p,Icon])=><div key={h}><Icon size={25}/><h3>{h}</h3><p>{p}</p></div>)}</div></div></section>
      <section className="landing-section container-wide landing-inclusions"><Heading eyebrow="BUILT FROM THE GROUND UP" title="What is included in installation?" copy="From the existing surface to the finishing touches, your estimate sets out the preparation and installation your property needs."/><ul>{TURF_INCLUSIONS.map(t=><li key={t}><Check size={18}/>{t}</li>)}</ul></section>
    </>}

    <section className="landing-process"><div className="container-wide landing-section"><Heading eyebrow="FROM FIRST CONVERSATION TO FINAL DETAILS" title={turf?"A better lawn starts below the surface.":"Your vision, brought to life step by step."}/><div className="landing-process-grid">{(turf?turfSteps:outdoorSteps).map(([h,p],i)=><div key={h}><span>0{i+1}</span><h3>{h}</h3><p>{p}</p></div>)}</div></div></section>

    <section className="landing-section container-wide landing-reviews"><div><p className="landing-eyebrow">HEAR FROM HOMEOWNERS</p><h2>Get to know Firsthand.</h2><p>Read customer feedback on Google and explore our project archive as you plan your outdoor space.</p></div><a href={SOCIAL.google} target="_blank" rel="noopener noreferrer" className="landing-review-link">Read customer reviews on Google <ArrowUpRight size={22}/></a></section>

    <section className="landing-areas"><div className="container-wide landing-section"><Heading eyebrow="LOCAL SPACES. LOCAL KNOWLEDGE." title="Orlando & surrounding communities." copy="Planning an outdoor upgrade in Central Florida? Share your ZIP code so we can confirm availability for your property."/><div className="landing-area-list">{LANDING_AREAS.map(a=><span key={a}><MapPin size={16}/>{a}</span>)}</div><p className="landing-caption">Project availability and scheduling are confirmed during your estimate.</p></div></section>

    <section className="landing-section container-wide landing-faq"><Heading eyebrow="BEFORE WE BEGIN" title={turf?"Your artificial turf questions, answered.":"A little clarity for your next big idea."}/><div>{faqs.map(f=><details key={f.question}><summary>{f.question}<span aria-hidden="true">+</span></summary><p>{f.answer}</p></details>)}</div></section>

    <section className="landing-estimate" id="estimate"><div className="container-wide landing-section landing-estimate-grid"><div><p className="landing-eyebrow">LET’S MAKE IT HAPPEN</p><h2>{turf?"Your greener backyard starts here.":"Your favorite room could be outside."}</h2><p>Tell us a little about your property and what you have in mind. We’ll follow up to discuss your project and a free estimate.</p><LandingLink kind={kind} href={`tel:${NAP.phoneTel}`} placement="estimate_section" className="landing-estimate-phone"><Phone size={23}/><span>Prefer a conversation?<strong>Call Now · {NAP.phone}</strong></span></LandingLink><div className="landing-estimate-related"><span>Explore more possibilities</span><Link href={turf?"/outdoor-living":"/artificial-turf"}>{turf?"Custom outdoor living":"Artificial turf installation"}<ArrowRight size={17}/></Link><Link href="/services/landscape-design">Landscape design & installation<ArrowRight size={17}/></Link></div></div><div className="landing-form-card"><h3>{cta}</h3><p>No obligation. A plan for your property.</p><EstimateForm kind={kind}/></div></div></section>
    <LandingSticky kind={kind}/>
  </article>;
}
