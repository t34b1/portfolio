import './App.css';
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import parse from 'html-react-parser';


import ProjectBar from './ProjectBar';


export const thumbnails = [
  {
    path: "/",
    src: `/assets/thumbnails/home.png`,
  },
  {
    path: "/wnrs",
    src: "/assets/thumbnails/core-hand.gif",
  },

  {
    path: "/health-app",
    src: "/assets/thumbnails/health.jpg",
  },

  {
    path: "/naturepass",
    src: "/assets/thumbnails/5.png",
  },

  {
    path: "/mutesix",
    src: "/assets/thumbnails/2.png",
  },



  {
    path: "/piggy",
    src: "/assets/thumbnails/piggy-2.jpg",
  },

  {
    path: "/mutesix",
    src: "/assets/thumbnails/echo.gif",
  },

  {
    path: "/mutesix",
    src: "/assets/thumbnails/misc-cover.jpeg",
  },
  

];

const naturePassContent = [
  {
    type: "img",
    src: "/assets/naturepass/slide-1.jpg",
    info: `<p>Naturepass is a social app for people who love the outdoors.</p>
    <p>Users can share photos, leave trail notes and reviews, and connect with others who care about nature in the same way.</p>
    <p>The wordmark uses rounded, organic shapes and balanced spacing to feel natural, friendly, and versatile.</p>`,
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

const wnrsBrandGrid = [
  "/assets/wnrs/brand-grid/self-love-ad.gif",
  "/assets/wnrs/brand-grid/sale.gif",
  "/assets/wnrs/brand-grid/core-hand.gif",
  "/assets/wnrs/brand-grid/happy-we-met.gif",
  "/assets/wnrs/brand-grid/couples-cropped.gif",
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

const wnrsContent = [
  {
    type: "img",
    src: "/assets/wnrs/slide-1.jpg",
    info: `<p>We’re Not Really Strangers is a card game designed to create meaningful connections.</p>`,
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
    We experimented with sending one-word messages, turned links into punchlines, and pushed the format of 
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
    <p>While this was a marketing channel, we treated each email like a micro-product with a clear 
    moment, goal, and designed experience. Our job was to create something people wanted to open, 
    understand, and feel.</p>
    <p>We asked:</p>
    <p>"What emotional need are we addressing?"</p>
    <p>"What story will make the user feel seen and leads naturally into the product?"</p>
    <p>"How does the visual format support that message?"</p>
    <p>We tracked clicks—but more importantly, we tracked who stayed and who converted. We wanted real 
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
    <p>The results were simple and fun experiences that rewarded interaction, and made the brand memorable.</p>
    <p>This email brought in 9K new signups.</p>
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
    info: `<p>It was rewarding to build something people responded to.`,
  },

];


const m6Content = [
  {
    type: "img",
    src: "/assets/mutesix/slide-1.jpg",
    info: `<p>I joined MuteSix as a Marketing Designer and eventually led the design team, 
    focused on producing high-volume B2B marketing work.</h3>
    <p>Early on, I contributed to a brand refresh that included updating our color palette.</p>`,
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

const healthAppContent = [
  {
    type: "img",
    src: "/assets/health-app/slide-1.jpg",
    alt: "Onboarding flow for a health app thay shows screens titled: progress tracker, habit builder, milestones, and start your journey",
    info: `
    <p>I designed a health dashboard for a telehealth company focused on weight loss.<p>
    <p>This concept explores the onboarding flow and key features that support habit-building and ongoing progress.</p>
    <p>These features help users stay consistent, because that’s where most weight loss efforts fall off.</p>`,
  },
  {
    type: "img",
    src: "/assets/health-app/slide-2A.jpg",
    alt: "Persona of a woman who wants to lose weight named Joanna",
    info:`<h3>Meet Joanna</h3>
    <p>She’s driven by love, strength, and the hope for lasting change.</p>
    `,
  },
  {
    type: "img",
    src: "/assets/health-app/slide-2B.jpg",
    alt: "Problem statement describing Joanna's motivations and frustrations",
    info: `
    <h3>The Problem</h3>
    <p>Joanna wants to feel better in her body, but past failures and a busy life make it hard to stay motivated.</p>`,
  },
  {
    type: "img",
    alt: "",
    src: "/assets/health-app/slide-2C.jpg",
    info: `
    <h3>The Solution</h3>
    <p>This design builds trust by feeling gentle, and hopeful, helping users feel safe to try again.</p>`,
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
    <p>I studied health and fitness apps to see what drives engagement and where there’s room to improve.
    <p>Hers feels playful, Nike gamifies progress well, and most use timelines, graphs, 
    and streaks. But many apps felt cluttered or visually overwhelming, especially for women.</p>
    `,
  },
  {
    type: "img",
    src: "/assets/health-app/slide-4.jpg",
    alt: "Current competitior solutions and alternatives",
    info: `<p>I took screenshots from existing apps and explored alternative solutions that might feel more intuitive.</p>
    <p>Swapping sliders for checkmarks to mimic the satisfaction of checking off a to-do list, adding sound to create a rewarding feeling, and 
    using more white space and larger graphs to make key information easier to scan and understand.</p>`,
    
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
    src: "/assets/health-app/slide-7.jpg",
    alt: "Dashboard feature wireframes",
    info: `<h3>Dashboard Features</h3>
    <p>I focused on features that reinforce small wins, like habit tracking and streaks, to help users build momentum over time.</p>
    `,
  },
  {
    type: "img",
    src: "/assets/health-app/slide-8.jpg",
    alt: "Wireframes of onboarding flow",
    info: `<h3>Onboarding Wireframes</h3>
    <p>I began wireframing with the onboarding flow to set a clear narrative for the user and lay the groundwork for the dashboard experience.</p>
    <p>I focused on creating clean, clear layouts with strong visual hierarchy. I wanted the experience to feel engaging and visual, something users 
    would enjoy coming back to. My goal was to design a space that feels exciting, not overwhelming.</p>`,
  },
  {
    type: "img",
    src: "/assets/health-app/slide-9.jpg",
    alt: "Dashboard features before and after refinement",
    info: `<h3>Feature Refinement</h3>
    <p>I refined each feature to help users focus on their progress, not how far they still have to go.</p>
    <p>Cards now show trends, streaks, and progress adding up in a way that feels encouraging and easy to understand. </p>
    <p>I also introduced consistent patterns and deeper views to gently guide the experience.</p>`,
  },
  {
    type: "img",
    src: "/assets/health-app/slide-10.jpg",
    info: `<h3>Final Onboarding Flow</h3>
    <p>I applied brand colors, added progress indicators, and refined the layout to create a more engaging experience.</p>
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

const piggyContent = [
  {
    type: "img",
    src: "/assets/piggy/slide-1.jpg",
    alt: "Preface for case study",
    info: `<h3>Key Focuses</h3>
    <ul>
    <li>Conducting user research, usability testing</li>
    <li>Mapping information architecture and user flows</li>
    <li>Applying component-driven design to support scalable, modular systems</li>
    <li>Building a reusable component library</li>
    </ul>`,
  },
  {
    type: "img",
    src: "/assets/piggy/slide-2.jpg",
    alt: "Case study problem",
    info: `<h3>The Problem</h3>
    `,
  },
 
  {
    type: "img",
    src: "/assets/piggy/slide-3.jpg",
    alt: "Understanding the user",
    info: `<h3>User Research</h3>`,
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
    spending while saving for a home.</p>
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
    <p>The goal was to keep the flow clear and easy to navigate.</p>`,
  },

  {
    type: "component",
    src: 
      <CenteredElement background="/assets/piggy/light-green-bg.jpg">
        <div className="top-element">
        <Phone src={`${process.env.PUBLIC_URL}/assets/piggy/new-group-with-audio.mp4`}
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
    <p>In the poll flow, users can vote anonymously to reduce tension around conflicting preferences.</p>`,
  },

  {
    type: "img",
    src: "/assets/piggy/slide-8.jpg",
    alt: "Usability study key findings",
    info: `<p>I ran an unmoderated usability test to see how easily users could create a group.</p>
    <p>The feedback showed confusion in the flow and form length. Based on these findings, I focused on making the setup process more guided and flexible.</p>
    
    `,
  },
  {
    type: "img",
    src: "/assets/piggy/slide-9.jpg",
    alt: "Group flow revision",
    info: `
    <h3>Refining Group Flow</h3>
    <p>I split the form into steps, added progress indicators, and gave users feedback to make setup feel easier and more engaging.</p>
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
        <Phone src={`${process.env.PUBLIC_URL}/assets/piggy/new-group-prototype-with-audio.mp4`}
        />
        </div>
    </CenteredElement>,
    alt: "High fidelity prototype: create new group",
    info: `<h3>High Fidelity Prototype</h3>
    <p>The group creation flow guides users through small, clear steps and offers flexible ways to split costs. It helps ease users into 
    group budgeting and makes collaboration feel simple.</p>
     <p>Ashley is able to create a new group for each trip she goes on.</p>
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
    <p>The poll flow lets users create anonymous polls to help groups align on spending decisions and avoid tension.</p>
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
    layout structure, and clearer button labels.</p>
   `,
  },
  
];

const homeContent = [

  {
    type: "text",
    src: "<h1>Work</h1>",
    info:"",
  },

  {
    type: "component",
    src:
        <Link to="/wnrs">
        <div className="home-project">
        <div className="thumbnail">
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
    src:
    <Link to="/health-app">
    <div className="home-project">
      <div className="thumbnail">
        <img src={`${process.env.PUBLIC_URL}//assets/thumbnails/health-app-thumbnail-big.jpg`}alt="health app"/>
        </div>
    </div>
    </Link> ,
    info: `
    <h2>TeleHealth App Health Dashboard</h2>
    <p>Designed brand-led digital experiences that helped people discover and love the products</p><br>
    `,
  },

  {
    type: "component",
    src:
    <Link to="/naturepass">
    <div className="home-project">
       <div className="thumbnail">
        <img src={`${process.env.PUBLIC_URL}/assets/thumbnails/naturepass-thumbnail-big.jpg`} alt="Nature pass branding project"/>
        </div>
    </div>
    </Link> ,
    info: ` <h2>Nature Pass</h2>
          <p>Designed brand-led digital experiences that helped people discover and love the products</p><br>`,
  },
  {
    type: "component",
    src:
    <Link to="/mutesix">
    <div className="home-project">
       <div className="thumbnail">
       <img src={`${process.env.PUBLIC_URL}/assets/thumbnails/mutesix-thumbnail-big.jpg`}alt="mutesix project"/>
       </div>
    </div>
    </Link> ,
    info: `
     <h2>MuteSix</h2>
      <p>Designed brand-led digital experiences that helped people discover and love the products</p><br>
    `,
  },

  {
    type: "component",
    src:
    <Link to="/piggy">
    <div className="home-project">
      <div className="thumbnail">
      <img src={`${process.env.PUBLIC_URL}/assets/thumbnails/piggy-thumbnail-big.jpg`} alt="piggy"/>
       </div>

    </div>
    </Link> ,
    info: `
     <h2>Piggy</h2>
      <p>Designed brand-led digital experiences that helped people discover and love the products</p><br>
    `,
  },

  {
    type: "component",
    src:
    <Link to="/echo">
    <div className="home-project">
      <div className="thumbnail">
      <img src={`${process.env.PUBLIC_URL}/assets/thumbnails/echo-thumbnail-big.gif`}alt="echo"/>
       </div>
       
    </div>
    </Link>,
    info: `
      <h2>Echo</h2>
      <p>Designed brand-led digital experiences that helped people discover and love the products</p><br>
    `,
  },

  {
    type: "component",
    src:
    <Link to="/misc">
    <div className="home-project">
      <div className="thumbnail">
      <img src={`${process.env.PUBLIC_URL}/assets/thumbnails/misc-thumbnail-big.jpg`}alt="misc"/>
       </div>
    </div>
    </Link> ,
    info: `
     <h2>Misc</h2>
     <p>Designed brand-led digital experiences that helped people discover and love the products</p><br>
    `,
  },
 
];

const pages = {
  home: {
    info: "Welcome",
    content: homeContent,
    path: "/",
  },

  about: {
    info: "About",
  },
  naturePass: {
    info: "naturePass",
    content: naturePassContent,
    path: "/naturepass",
    role: ["B","r","a","n","d"," ","D","e","s","i","g","n","e","r"],
    year: ["2","0","2","5"],
  },

  wnrs: {
    info: "wnrs",
    content: wnrsContent,
    path: "/wnrs",
    role: ["S","e","n","i","o","r"," ","D","i","g","i","t","a","l"," ","D","e","s","i","g","n","e","r"],
    year: ["2","0","2","2"," ","-"," ","2","0","2","5"],
  },
  m6: {
    info: "m6",
    content: m6Content,
    path: "/mutesix",
    role: ["S","e","n","i","o","r"," ","D","i","g","i","t","a","l"," ","D","e","s","i","g","n"," ","M","a","n","a","g","e","r"],
    year: ["2","0","2","0"," ","-"," ","2","0","2","2"],  
  },

  healthApp: {
    info: "m6",
    content: healthAppContent,
    path: "/health-app",
    role: ["P","r","o","d","u","c","t"," ","D","e","s","i","g","n","e","r"],
    year: ["2","0","2","5"],
  },
  piggy: {
    info: "m6",
    content: piggyContent,
    path: "/piggy",
    role: ["P","r","o","d","u","c","t"," ","D","e","s","i","g","n","e","r"],
    year: ["2","0","2","4"],
  },
};


function ScrollToTop() {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
  
}

function ContentBlock({ content }) {
  return <div className="content">{parse(content)}</div>;
}

function ImageGrid({content}) {
  return (
    <div className="brand-grid">
    {content.map((image, index) => (
      <img src={`${process.env.PUBLIC_URL}/${image}`} alt="placeholder" key={index}/>
    ))}
    </div>
  );
}

const icons ={
  arena: "/assets/nav/arena.png",
  linkedin: "/assets/nav/linkedin.png",
  ig: "/assets/nav/ig.png",
  github: "/assets/nav/github.png",
  mail: "/assets/nav/mail.png",
}

function Sidebar() {

  
  return <div className="sidebar">
    <div>
    </div>
  
  <div className="nav-links">
        <Link to="https://www.are.na/taylor-tran/"><img className="icon" src={`${process.env.PUBLIC_URL}/${icons.arena}`} alt="link to Are.na"/>
        </Link>
        <Link to="https://www.linkedin.com/in/taylor-tran/"><img className="icon "src={`${process.env.PUBLIC_URL}/${icons.linkedin}`} alt="Link to Linkedin"/>
        </Link>
        <Link to="https://www.instagram.com/teapi/"><img className="icon "src={`${process.env.PUBLIC_URL}/${icons.ig}`}alt="Link to instagram"/>
        </Link>
        <Link to="https://github.com/t34b1"><img className="icon "src={`${process.env.PUBLIC_URL}/${icons.github}`}alt="Link to github"/>
        </Link>
        <Link to="mailto:trantaylorm@gmail.com"><img className="icon "src={`${process.env.PUBLIC_URL}/${icons.mail}`}alt="Link to email"/>
        </Link>
  </div>
  <div><p>Site design and build by Taylor Tran, 2025. Built with React.</p>
  </div>
  </div>
}

function Slide({type, src, alt}) {
  if (type==="text") {
   return <ContentBlock content={src}/>;
  }

  if (type==="img") {
    return (
      <div className = "slide">
          <img 
          src={`${process.env.PUBLIC_URL}/${src}`}
          alt ={alt ? alt : "design by Taylor Tran"}
          />
        </div>
    );
  }

  if (type==="component") {
    return (
      <div className = "slide">
        {src}
        </div>
    );
  }
  
  
}

function Section({visual, text}) {
  const sectionRef = useRef();
  const {ref, inView} = useInView({
    threshold: .01,         
    triggerOnce: false, 
    rootMargin: "0px 0px -50% 0px ",
   }
  );

  const setRefs = (node) => {
    ref(node);    
    sectionRef.current = node; 
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    const textEl = sectionRef.current.querySelector(".text");
    if (!textEl) return;

    if (inView) {
      textEl.classList.remove("hidden");      
      const link = visual.props.src.props.to;
     
    }

    else {
      textEl.classList.add("hidden");
    }
  }, [inView]);



  return (
    <div className = "section" ref={setRefs}>
        <div className="visual">{visual}</div>
        {
        text.props.content==="" ? <div></div> :  <div className="text hidden">{text}
        </div> }
       
      </div>
  );
}



function CenteredElement({background, children}) {
  return (
  <>
    <img src={`${process.env.PUBLIC_URL}/${background}`} alt="background" className="bg-image"/>
    {children}
  </>);
}

function About() {
  function Main() {
    return (
      <>
      <h1>About Me</h1>
      <p>This is a new page in my React project.</p>
      </>
    );
  }
  return (
    <>
      <Section 
          visual={<Main />}
          text={pages.about.info}
          />
      
    </>
  );
}

function Home() {
  return (
    <>
    <Section 
              visual={<Slide type="component" src={
                <div className="home-project">
                <img src={`${process.env.PUBLIC_URL}/assets/thumbnails/banana.png`} alt="banana illustration"/>
               </div>
              } /> } 
              text={<ContentBlock content={
                `
                  <h3>Hi, I'm Taylor</h3>
                  <p>My work spans both consumer and B2B projects, designing thoughtful digital experiences across brand, UX, marketing, and go-to-market.</p>
                  <p>I’m currently exploring how interactive web tech can foster human connection. I’m learning React and other front-end frameworks with the 
                    goal of bridging design and engineering to build with care.</p>
                  <p>Offline, I’m reading The Secret History and have been practicing ceramics for two years!</p>
                  `
              }/>}
              />


      <Page content={<Project content={pages.home.content} className="home"/> } />
    </>
  );
}

function Page({content, className}) {
  const scrollRef = useRef(null);
  const  location = useLocation();
  const shouldHide = location.pathname === "/";
  let role = null;
  let year = null;

  for (let page in pages){
    if (pages[page].path===location.pathname) {
      role = pages[page].role;
      year = pages[page].year;
    }
  }
  
if (role) {
  role = role.map((letter, index) => {
    if (letter === " ") {
      return <span className="float-up" key={index}>&nbsp;</span>
    }
    if (index % 2 ===0) {
      return <span className="float-up" key={index}>{letter}</span>
    }
    else {
      return <span className="float-down" key={index}>{letter}</span>
    }
  });
}

if (year) {
  year = year.map((letter, index) => {
    if (index % 2 ===0) {
      return <span className="float-up" key={index}>{letter}</span>
    }
    else {
      return <span className="float-down" key={index}>{letter}</span>
    }
  });
}
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [location]);

  return (
    <>
    <div className={`page ${className}`} ref={scrollRef}  key={location.pathname}>
      {shouldHide ? null : 
       <div className="role-overlay">
        <div>{role ? role : null}</div>
        <div>{year}</div>
      </div> 
      }
      {content}
      </div>
    </>
  );
}

function Video({src}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      video.play().catch((err) => {
        console.warn("Autoplay blocked:", err);
      });
    };

    play();

    video.addEventListener("ended", () => {
      video.currentTime = 0;
      video.play();
    });

    const retry = () => {
      play();
      window.removeEventListener("scroll", retry);
      window.removeEventListener("click", retry);
    };

    window.addEventListener("scroll", retry);
    window.addEventListener("click", retry);

    return () => {
      window.removeEventListener("scroll", retry);
      window.removeEventListener("click", retry);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={`${process.env.PUBLIC_URL}/${src}`}
      muted
      autoPlay
      playsInline
      style={{ width: "100%", display: "block" }}
    />
  );
}

function Phone({src}) {
  return (
    <div className="phone-wrapper">
      <div className="frame">
        <img src={`${process.env.PUBLIC_URL}/assets/frame.png`} alt="phone frame"/>
      </div>
      <div className="screen">
      <Video src={src}/>
      </div>
    </div>
  );
}

function Project({content, className}) {
  return (
    <div className={className ? className : "project-page"}>
      {
       content.map((slide, index) => (
        <Section key={index} 
          visual={<Slide type={slide.type} src={slide.src} alt={slide.alt} /> } 
          text={<ContentBlock content={slide.info}/>}
          />
       ))
    }
    </div>
  );
}

function App() {
  const [current, setCurrent] = useState(null);
  console.log(current);

  return (
    <>
   <ScrollToTop/>
    <ProjectBar />
    <Routes>
      <Route path="/" element={<Page content={<Home />} />}/>
      <Route path="/about" element={<Page content={<About />} />}/>

      <Route path="/naturepass" element={
        <Page content={<Project content={pages.naturePass.content} /> } />} />
        <Route path="/wnrs" element={
        <Page content={<Project content={pages.wnrs.content} /> } />} />
         <Route path="/mutesix" element={
        <Page content={<Project content={pages.m6.content} /> } />} />
        <Route path="/health-app" element={
        <Page content={<Project content={pages.healthApp.content} /> } />} />
        <Route path="/piggy" element={
        <Page content={<Project content={pages.piggy.content} /> } />} />
      
    </Routes>
    <Sidebar />

  
   
   </> 
  );
}


export default App;
