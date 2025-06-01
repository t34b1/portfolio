import React from 'react';
import { Link } from 'react-router-dom';
import { ImageGrid, CenteredElement, Phone, Video } from './App';

import { ROUTES } from "./ROUTES";

export const icons ={
  arena: "/assets/nav/arena.png",
  linkedin: "/assets/nav/linkedin.png",
  ig: "/assets/nav/ig.png",
  github: "/assets/nav/github.png",
  mail: "/assets/nav/mail.png",
}

export const thumbnails = [
  {
    path: ROUTES.home,
    src: `/assets/thumbnails/home.png`,
  },
  {
    path: ROUTES.wnrs,
    src: "/assets/thumbnails/core-hand.gif",
  },

  {
    path: ROUTES.healthApp,
    src: "/assets/thumbnails/health.jpg",
  },

  {
    path: ROUTES.naturePass,
    src: "/assets/thumbnails/5.png",
  },

  {
    path: ROUTES.m6,
    src: "/assets/thumbnails/2.png",
  },

  {
    path: ROUTES.piggy,
    src: "/assets/thumbnails/piggy-2.jpg",
  },

  {
    path: ROUTES.echo,
    src: "/assets/thumbnails/echo.gif",
  },

  {
    path: ROUTES.misc,
    src: "/assets/thumbnails/misc-cover.jpeg",
  },
  

];

export const naturePassContent = [
  {
    type: "img",
    src: "/assets/naturepass/slide-1.jpg",
    info: `<p>Naturepass is a social app for people who love the outdoors.</p>
    <p>Users can share photos, leave trail notes and reviews, and connect with others who care about nature in the same way.</p>
    <p>The wordmark uses rounded, organic shapes and balanced spacing to feel natural, friendly, and versatile.</p>`,
    path: ROUTES.naturePass,
  },
  {
    type: "img",
    src: "/assets/naturepass/slide-2.jpg",
    info: `<p>The logomark draws from nature-inspired forms, designed to feel at home on both trail signs and app icons.</p>
    `,
  },
  {
    type: "img",
    src: "/assets/naturepass/slide-3.jpg",
    info: `<p>The palette pulls from nature: earth, sky, and plants. Greens and browns ground the brand; blues and purples bring contrast and energy.</p>`,
  },
  {
    type: "img",
    src: "/assets/naturepass/slide-4.jpg",
    info: `<p>Alte Haas Grotesk balances friendliness and utility, echoing outdoor gear brands. It’s soft, clean, and flexible across sizes. 
    Helvetica Neue serves as the fallback.</p>`,
  },
  
  {
    type: "img",
    src: "/assets/naturepass/slide-6.jpg",
    info: "",
    alt: "Out of home mockups",
  },
  {
    type: "img",
    src: "/assets/naturepass/slide-7.jpg",
    info: "",
    alt: "Mobile website and app icon mockups",
  },
  {
    type: "img",
    src: "/assets/naturepass/slide-8.jpg",
    info: "",
    alt: "Presentation mockups",

  },
];

export const wnrsBrandGrid = [
  "/assets/wnrs/brand-grid/couples-cropped.gif",
  
  "/assets/wnrs/brand-grid/sale.gif",
  "/assets/wnrs/brand-grid/happy-we-met.gif",
  "/assets/wnrs/brand-grid/core-hand.gif",
  "/assets/wnrs/brand-grid/self-love-ad.gif",
  "/assets/wnrs/brand-grid/cards.gif",
  "/assets/wnrs/brand-grid/V2_1.gif",
  "/assets/wnrs/brand-grid/clock.jpg",
  "/assets/wnrs/brand-grid/lookingforlove.png",
  "/assets/wnrs/brand-grid/feed-2.jpg",
  "/assets/wnrs/brand-grid/xxx-box-small.gif",
  "/assets/wnrs/brand-grid/just-ask.gif",
  "/assets/wnrs/brand-grid/loving-somebody.jpg",
  "/assets/wnrs/brand-grid/1-1-100.jpg",
  "/assets/wnrs/brand-grid/give-to-a-stranger.gif",
  "/assets/wnrs/brand-grid/thoughts.jpg",
];

export const wnrsContent = [
  {
    type: "img",
    src: "/assets/wnrs/slide-1.jpg",
    info: `<p>We’re Not Really Strangers is a card game designed to create meaningful connections.</p>`,
    path: ROUTES.wnrs,
  },
  {
    type: "img",
    src: "/assets/wnrs/slide-2.jpg",
    info: `<p>Now, with 10M+ followers, it’s a lifestyle brand that embodies a generation coming of age in a digital 
    world: one that values real connection, empathy, and curiosity.</p>`,
  },

  {
    type: "component",
    src: <ImageGrid content={wnrsBrandGrid} />,
    info: `<h3>A brand grounded in care</h3>
    <p>WNRS draws from brands like Apple and Humans of New York, using simplicity to center the human experience.</p>
    <p>We built a visual world of limited color, open space, and clear type. The photography is raw and unfiltered, 
    like something anyone could capture on a smartphone.</p>
    <p>The brand voice is curious, wise, humorous, and a little confrontational, but always well-meaning. It speaks in plain language anyone can understand.</p>`,
  },

  {
    type: "img",
    src: "/assets/wnrs/slide-3.jpg",
    info: `<p>As a senior designer, I was responsible for acquiring, engaging, and converting email subscribers.<br><br>
    Key touchpoints included social, email, and web.</p>`,
  },
 
  {
    type: "component",
    src: 
      <CenteredElement background="/assets/wnrs/light-bg.jpg">
        <div className="top-element half-phone">
        <img src={`${process.env.PUBLIC_URL}/assets/wnrs/getthemback.gif`} alt="email"/>
        </div>
      </CenteredElement>,
    info: `<h3>Users expect polished brand emails</h3>
    <p>Our audience was mostly 18 - 24: extremely online, and quick to tune out brand content. The challenge 
    was: how do we flip that? How do we subvert the patterns they’ve learned to ignore?</p>
    <p>We experimented with sending one-word messages, turned links into punchlines, and pushed the format of 
    what a brand email could be. </p>
    <p>Our goal was to encourage curiosity and make every click feel like a discovery.</p>`,
  },

  {
    type: "img",
    src: "/assets/wnrs/slide-4.jpg",
    info: `<h3>For both loyal fans and strangers, content has to connect instantly</h3>
    <p>In a noisy, scrolling environment, we needed to make engaging with our brand feel effortless and worth the 
    detour.</p>
    <p>On the surface, it might have looked like we were just trying to get attention. But every visual choice was
     intentional, rooted in strategy.</p>
    <p>Our approach: content that was visually simple, immediately clear, and emotionally sharp.</p>`,
  },

  {
    type: "img",
    src: "/assets/wnrs/journey.jpg",
    info: `<h3>The full journey</h3>
    <p>While this was a marketing channel, we treated each email like a micro-product with a goal
    and designed experience. Our job was to create something people wanted to open, 
    understand, and feel.</p>
    <p>What story can we tell that will make the user feel seen and lead naturally into product? How does the visual format support that message?</p>
    <p>We tracked clicks, but more importantly, we tracked who stayed and who converted. We wanted real 
    engagement and connection, not just novelty. </p>`,
  },

  {
    type: "component",
    src: 
      <CenteredElement background="/assets/wnrs/light-bg.jpg">
        <div className="top-element">
        <Phone src="/assets/wnrs/vday-fixed-with-audio.mp4"
        />
        </div>
    </CenteredElement>,
    info: `<h3>Results</h3>
    <p>The results were simple, fun experiences that rewarded interaction and made the brand memorable.</p>
    <p>This Valentine's Day campaign brought in 9K new signups.</p>
    <p>Over 3 years, our email list grew to 900,000+ organic subscribers.</p>
    `,
  },

  {
    type: "component",
    src:  
      <CenteredElement background="/assets/wnrs/red-bg.jpg">
        <div className="top-element">
        <Phone src="/assets/wnrs/selfreflection-fixed-with-audio.mp4"
        />
       </div>
    </CenteredElement>,
    info: `
    <h3>Results</h3>
    <p>48:1 ROI / 40:1 Industry avg. [1]<br>
    13% CTR / 1.7% Industry avg. [2]</p>
    `,
  },

  {
    type: "img",
    src: "/assets/wnrs/slide-5.jpg",
    info: `<h3>Feedback</h3>
    <p>It was rewarding to build something people responded to and resonated with.`,
  },

];


export const m6Content = [
  {
    type: "img",
    src: "/assets/mutesix/slide-1.jpg",
    info: `<p>I joined MuteSix as a Marketing Designer and eventually led the team, 
    focused on producing high-volume B2B assets.</h3>
    <p>Early on, I contributed to a brand refresh that included updating our color palette.</p>`,
    path: ROUTES.m6,
  },
  {
    type: "img",
    src: "/assets/mutesix/slide-3.jpg",
    info: `We designed assets for everything from social and web to events and sales decks.`,
  },
 
  {
    type: "img",
    src: "/assets/mutesix/slide-4.jpg",
    info: ``,
  },

  {
    type: "img",
    src: "/assets/mutesix/slide-2.jpg",
    info: `<p>I designed a reusable component library, built it with developers, and led efforts to migrate case 
    studies and marketing content to the web.</p>`,
  },
 
  {
    type: "img",
    src: "/assets/mutesix/slide-5.jpg",
    info: `<p>Most decks followed a fast, systemized process, but we still designed custom presentations for key 
    productions.</p>`,
  },
];

export const miscContent = [
  {
    type: "img",
    src: "/assets/misc/slide-1.jpg",
    path: ROUTES.misc,
    info: ``,
   
  },
  {
    type: "img",
    src: "/assets/misc/slide-2.jpg",
    info: ``,
  },
 
  {
    type: "img",
    src: "/assets/misc/slide-3.jpg",
    info: ``,
  },
];

export const echoContent = [
  {
    type: "text",
    src: `<br>
    <h1>Under Construction</h1>`,
    info: ``,
    route: ROUTES.echo,
  },

];

export const healthAppContent = [
  {
    type: "img",
    src: "/assets/health-app/slide-1.jpg",
    alt: "Onboarding flow for a health app thay shows screens titled: progress tracker, habit builder, milestones, and start your journey",
    info: `
    <p>I designed a health dashboard for a telehealth startup focused on weight loss.<p>
    <p>This concept explores the onboarding flow and key features that support habit-building and ongoing progress.</p>
    <p>It’s built to help users stay consistent, the biggest challenge in most weight loss journeys.</p>`,
    path: ROUTES.healthApp,
  },
  {
    type: "img",
    src: "/assets/health-app/slide-2A.jpg",
    alt: "Persona of a woman who wants to lose weight named Joanna",
    info:`<h3>Meet Joanna, 32</h3>
    <p>She’s driven by love, strength, and the hope for lasting change.</p>
    `,
  },
  {
    type: "img",
    src: "/assets/health-app/slide-2B.jpg",
    alt: "Problem statement describing Joanna's motivations and frustrations",
    info: `
    <h3>The Problem</h3>
    <p>Joanna wants to feel better in her body. But past failures and a busy life make it hard to stay consistent.</p>`,
  },
  {
    type: "img",
    alt: "",
    src: "/assets/health-app/slide-2C.jpg",
    info: `
    <h3>The Solution</h3>
    <p>This design builds trust by feeling gentle and hopeful, helping users feel safe to try again.</p>`,
  },
  {
    type: "img",
    src: "/assets/health-app/slide-2.jpg",
    alt: "Articles about the success of weight loss programs WeightWatchers, JennyCraig, SlimFast",
    info: `<h3>Successful Analog Strategies</h3>
    <p>I looked at well-known weight loss programs like WeightWatchers, Jenny Craig, and SlimFast to understand what made them work and
     why users kept coming back.</p>
    <h3>Key Themes</h3>
    <ul>
    <li>Convenience</li>
    <li>Clear guidance</li>
    <li>Positive messaging</li>
    <li>Future-focused motivation</li>
    </ul>
     `,
  },
  {
    type: "img",
    src: "/assets/health-app/slide-3.jpg",
    alt: "Competitor health and fitness app features",
    info: `<h3>Competitor Landscape</h3>
    <p>I looked at health and fitness apps to understand what keeps users engaged and where they fall short.</p>
    <p>Hers feels playful, Nike gamifies progress well, and most use timelines, graphs, 
    and streaks. But many apps felt cluttered or visually unappealing, especially for women.</p>
    `,
  },
  {
    type: "img",
    src: "/assets/health-app/slide-4.jpg",
    alt: "Current competitior solutions and alternatives",
    info: `<p>I collected screenshots from various apps and highlighted where some handled key features better than others.</p>`,
    
  },
  {
    type: "img",
    src: "/assets/health-app/slide-5.jpg",
    alt: "User flow of onboarding process",
    info: `<h3>User Flow</h3>
    <p>I mapped out the onboarding flow to show how users set up their dashboard, enter goals, and choose habits. The flow gives users a clear 
    path while allowing changes along the way.</p>
    <p>I wanted the setup to feel easy and supportive.</p>`,
  },
  {
    type: "img",
    src: "/assets/health-app/slide-6.jpg",
    alt: "Moodboards for onboarding flow and dashboard",
    info: `<h3>Moodboards</h3>
    <p>I created moodboards to explore visual direction and interaction patterns for the onboarding flow and dashboard.</p>`,
  },
  {
    type: "img",
    src: "/assets/health-app/slide-8.jpg",
    alt: "Wireframes of onboarding flow",
    info: `<h3>Onboarding Wireframes</h3>
    <p>I began wireframing with the onboarding flow to set a clear narrative for the user and lay the groundwork for the dashboard experience.</p>
    <p>I wanted the experience to feel engaging and visual, something users would enjoy coming back to. My goal was to design a 
    space that feels exciting and motivating, not overwhelming.</p>`,
  },
  {
    type: "img",
    src: "/assets/health-app/slide-7.jpg",
    alt: "Dashboard feature wireframes",
    info: `<h3>Dashboard Wireframes</h3>
    <p>I brainstormed features that reinforce small wins, like habit tracking and streaks, to help users build momentum over time.</p>
    `,
  },
  {
    type: "img",
    src: "/assets/health-app/slide-9.jpg",
    alt: "Dashboard features before and after refinement",
    info: `<h3>Feature Refinement</h3>
    <p>I refined each feature to help users focus on their progress, not how far they still have to go.</p>
    <p>Each feature shows progress building up over time through trends, streaks, stacked bars and growing rings.</p>`,
  },
  {
    type: "img",
    src: "/assets/health-app/slide-10.jpg",
    info: `<h3>Final Onboarding Flow</h3>
    <p>I applied brand colors, added progress indicators, and refined the layout to help users feel excited and ready to begin their journey.</p>
    `,
  },
  {
    type: "component",
    src: 
      <CenteredElement background="/assets/health-app/blue-bg.jpg">
        <div className="top-element">
        <Phone src="/assets/health-app/dashboard-with-audio.mp4"
        />
        </div>
    </CenteredElement>,
    info: `<h3>Final Dashboard</h3>
    <p>The final dashboard helps users feel in control by making progress visible and manageable. 
    It’s designed to support steady habits without pressure by showing progress, celebrating milestones, and helping users track their healthy habits each week.    
    `,
  },
];

export const piggyContent = [
  {
    type: "img",
    src: "/assets/piggy/slide-1.jpg",
    alt: "Preface for case study",
    info: `<h3>Preface</h3>
    <p>I completed this project to help me practice translating user needs into product design while sharpening my technical workflow. </p>
    <p>Having a graphic design background, I also learned to balance visual clarity with functional hierarchy, especially when designing for 
    groups with different needs.</p>
    <p>I later redesigned the UI with the lessons I learned in mind.</p>`,
    path: ROUTES.piggy,
  },
  {
    type: "img",
    src: "/assets/piggy/slide-2.jpg",
    alt: "Case study problem",
    info: ``,
  },
 
  {
    type: "img",
    src: "/assets/piggy/slide-3.jpg",
    alt: "Understanding the user",
    info: ``,
  },
  {
    type: "img",
    src: "/assets/piggy/slide-3A.jpg",
    alt: "User research",
    info: `In my research, I uncovered challenges around habits, communication, and daily use.`,
  },
  {
    type: "img",
    src: "/assets/piggy/slide-3B.jpg",
    alt: "Value proposition",
    info: `
    <h3> Value Proposition</h3>
    <p>Research showed that shared budgeting works best when it adapts to different habits, schedules, and comfort levels.</p>`,
  },
  {
    type: "img",
    src: "/assets/piggy/slide-4.jpg",
    alt: "Persona: Ashley",
    info: `<h3>Meet Ashley, 27</h3>
    <p>Ashley is a young professional in San Francisco who splits household costs with her roommate and plans group trips with friends.</p>
    `,
  },
  {
    type: "img",
    src: "/assets/piggy/slide-5.jpg",
    alt: "Persona: Natalie",
    info: `<h3>Meet Natalie, 35</h3>
    <p>Natalie is a health administrator in LA who lives with her fiancé and pets, and tracks their budget to stay on top of 
    spending while they save for a home.</p>
    `,
  },
  {
    type: "img",
    src: "/assets/piggy/slide-6.jpg",
    alt: "Persona: Elliot",
    info: `<h3>Meet Elliot, 46</h3>
    <p>Elliot is a paramedic in Lakewood, CO who shares custody of his daughter, balances a rotating shift schedule, and prefers clear, 
    accessible tools due to his dyslexia.</p>
    `,
  },
  {
    type: "img",
    src: "/assets/piggy/slide-7.jpg",
    alt: "Information Architecture",
    info: `<h3>Information Architecture</h3>
    <p>I designed the group flow to support flexible dynamics by including features like shared expense management and polls.</p>
    <p>The goal was to create a clear, easy flow that reduces financial tension in group settings.</p>`,
  },

  {
    type: "component",
    src: 
      <CenteredElement background="/assets/piggy/light-green-bg.jpg">
        <div className="top-element">
        <Phone src={`/assets/piggy/new-group-with-audio.mp4`}
        />
        </div>
    </CenteredElement>,
    alt: "Wireframe: creating a new group",
    info: `<h3>Wireframe: Create Group</h3>
    <p>In the create group flow,  users can add an icon for fun, invite members, and log any initial expenses to get started quickly.</p>
    <p>After the group is created, any member can make changes, making collaboration simple and flexible with different schedules.</p>`,
  },

  {
    type: "img",
    src: "/assets/piggy/slide-7A.jpg",
    alt: "Wireframe: Anonymous poll",
    info: `<h3>Wireframe: Create Poll</h3>
    <p>In the poll flow, users can share preferences to build consensus and keep group dynamics positive.</p>`,
  },

  {
    type: "img",
    src: "/assets/piggy/slide-8.jpg",
    alt: "Usability study key findings",
    info: `<h3>Usability Study</h3>
    <p>I ran an unmoderated usability test to see how easily users could create a group.</p>
    <p>The feedback showed confusion in the flow and form length. Based on these findings, I focused on making the setup process more guided and flexible.</p>
    
    `,
  },
  {
    type: "img",
    src: "/assets/piggy/slide-9.jpg",
    alt: "Group flow revision",
    info: `
    <h3>Refining Group Flow</h3>
    <p>I split the form into steps, added progress indicators, and used visual feedback to make setup feel easier and more intuitive.</p>
    `,
  },
  {
    type: "img",
    src: "/assets/piggy/slide-10.jpg",
    alt: "Usability study round 2 key findings",
    info: `
    <p>In round 2 of testing, I found users needed clearer payment breakdowns, even for even splits.</p>
    `,
  },
  {
    type: "img",
    src: "/assets/piggy/slide-11.jpg",
    alt: "Expense splitting recision",
    info: `<h3>Refining Expense Splitting</h3>
    <p>To improve clarity, I added flexible split options and made breakdowns visible by default, even for even splits.</p>
    `,
  },
  {
    type: "component",
    src: 
      <CenteredElement background="/assets/piggy/light-green-bg.jpg">
        <div className="top-element">
        <Phone src={`/assets/piggy/new-group-prototype-with-audio.mp4`}
        />
        </div>
    </CenteredElement>,
    alt: "High fidelity prototype: create new group",
    info: `<h3>High Fidelity Prototype</h3>
    <p>The group creation flow guides users through small, clear steps and offers flexible ways to split costs. It helps ease users into 
    group budgeting and makes collaboration feel simple.</p>
    `,
  },
  {
    type: "component",
    src: 
      <CenteredElement background="/assets/piggy/dark-green-bg.jpg">
        <div className="top-element">
        <Phone src="/assets/piggy/new-poll-prototype.mp4"/>
        </div>
    </CenteredElement>,
    alt: "High fidelity prototype: create a poll",
    info: `<h3>High Fidelity Prototype</h3>
    <p>The poll flow helps groups align on spending decisions by making preferences visible without friction.</p>
    `,
  },

  {
    type: "img",
    src: "/assets/piggy/slide-12.jpg",
    alt: "Revisiting the UI",
    info: `<p>After the project ended, I returned to the UI to sharpen visual clarity and polish the layout.</p>`,
  },
  {
    type: "img",
    src: "/assets/piggy/slide-13.jpg",
    alt: "Revised UI",
    info: `<p>The updated UI improves clarity and usability through better hierarchy, larger touch targets, consistent 
    layout structure, and clearer calls to action.</p>
   `,
  },
  
];

export const homeContent = [

  {
    type: "text",
    src: "<h1>Work</h1>",
    info:"",

  },

  {
    type: "component",
    path: ROUTES.wnrs || null,
    src:
        <Link to="/wnrs">
        <div className="home-project">
        <div className="big-thumbnail">
        <CenteredElement background="/assets/wnrs/light-bg.jpg">
        <div className="top-element half-phone">
        <img src={`${process.env.PUBLIC_URL}/assets/wnrs/getthemback.gif`} alt="email"/>
        </div>
      </CenteredElement>
        </div>
        </div>
        </Link> ,
    info: `
        <h2>We're Not Really Strangers</h2>
        <p>Designed brand-led digital experiences that helped people discover and love the products</p><br>`,
   
  },

  {
    type: "component",
    path: ROUTES.healthApp || null,
    src:
    <Link to={ROUTES.healthApp}>
    <div className="home-project">
      <div className="big-thumbnail">
        <img src={`${process.env.PUBLIC_URL}//assets/thumbnails/health-app-thumbnail-big.jpg`}alt="health app"/>
        </div>
    </div>
    </Link> ,
    info: `
    <h2>TeleHealth App Health Dashboard</h2>
    <p>Designed an onboarding and dashboard flow for a telehealth startup focused on weight loss</p><br>
    `,
  },

  {
    type: "component",
    path: ROUTES.naturePass || null,
    src:
    <Link to={ROUTES.naturePass}>
    <div className="home-project">
       <div className="big-thumbnail">
        <img src={`${process.env.PUBLIC_URL}/assets/thumbnails/naturepass-thumbnail-big.jpg`} alt="Nature pass branding project"/>
        </div>
    </div>
    </Link> ,
    info: ` <h2>Nature Pass</h2>
<p>Created a brand identity for a social app for people who love the outdoors</p><br>`,
  },

  {
    type: "component",
    path: ROUTES.m6 || null,
    src:
    <Link to={ROUTES.m6}>
    <div className="home-project">
       <div className="big-thumbnail">
       <img src={`${process.env.PUBLIC_URL}/assets/thumbnails/mutesix-thumbnail-big.jpg`}alt="mutesix project"/>
       </div>
    </div>
    </Link> ,
    info: `
     <h2>MuteSix</h2>
      <p>Led a design team producing high-volume B2B assets at a performance agency</p><br>
    `,
  },

  {
    type: "component",
    path: ROUTES.piggy || null,
    src:
    <Link to={ROUTES.piggy}>
    <div className="home-project">
      <div className="big-thumbnail">
      <img src={`${process.env.PUBLIC_URL}/assets/thumbnails/piggy-thumbnail-big.jpg`} alt="piggy"/>
       </div>

    </div>
    </Link> ,
    info: `
     <h2>Piggy</h2>
      <p>Personal Project: Designed a collaborative budgeting app</p><br>
    `,
  },

  {
    type: "component",
    path: ROUTES.echo || null,
    src:
    <Link to={ROUTES.echo}>
    <div className="home-project">
      <div className="big-thumbnail">
      <Video src="/assets/thumbnails/echo-big.mp4" />
       </div>
       
    </div>
    </Link>,
    info: `
      <h2>Echo</h2>
      <p>Personal Project: Built an anonymous social app using Supabase and JavaScript</p><br>
    `,
  },

  {
    type: "component",
    path: ROUTES.misc || null,
    src:
    <Link to={ROUTES.misc}>
    <div className="home-project">
      <div className="big-thumbnail">
      <img src={`${process.env.PUBLIC_URL}/assets/thumbnails/misc-thumbnail-big.jpg`}alt="misc"/>
       </div>
    </div>
    </Link> ,
    info: `
     <h2>Misc</h2>
     <p>Select freelance, studies, and experiments</p><br>
    `,
  },
 
];






