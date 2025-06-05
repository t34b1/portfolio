import './App.css';
import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import parse from 'html-react-parser';
import ProjectBar from './ProjectBar';
import { icons, thumbnails } from "./Content";
import { pages } from "./Pages";

function App() {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <>
   <ScrollToTop/>
   <ProjectBar activeSection={activeSection} thumbnails={thumbnails} className="desktop"/>
   <ProjectBar activeSection={activeSection} thumbnails={thumbnails} className="mobile-menu"/>
   
  
    <Routes>
      <Route path={pages.home.path} element={<Page content={<Home setActiveSection={setActiveSection}/>} />}/>
      <Route path={pages.about.path} element={<Page content={<About />} />}/>
      <Route path={pages.naturePass.path} element={
        <Page content={<Project content={pages.naturePass.content} setActiveSection={setActiveSection}/> } />} />
        <Route path={pages.wnrs.path} element={
        <Page content={<Project content={pages.wnrs.content}setActiveSection={setActiveSection}/> } />} />
         <Route path="/mutesix" element={
        <Page content={<Project content={pages.m6.content} setActiveSection={setActiveSection}/> } />} />
        <Route path={pages.healthApp.path} element={
        <Page content={<Project content={pages.healthApp.content} setActiveSection={setActiveSection}/> } />} />
        <Route path={pages.piggy.path} element={
        <Page content={<Project content={pages.piggy.content} setActiveSection={setActiveSection} /> } />} />
         <Route path={pages.misc.path} element={
        <Page content={<Project content={pages.misc.content} setActiveSection={setActiveSection} /> } />} />
        <Route path={pages.echo.path} element={
        <Page content={<Project content={pages.echo.content} setActiveSection={setActiveSection} /> } />} />
        <Route path={pages.motion.path} element={
        <Page content={<Project content={pages.motion.content} setActiveSection={setActiveSection} /> } />} />
         <Route path={pages.projectBar.path} element={
           <ProjectBar activeSection={activeSection} thumbnails={thumbnails} className="mobile"/> } />

    </Routes>
    <Sidebar />
   </> 
  );
}


function ScrollToTop() {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
  
}

export function ContentBlock({ content }) {
  return <div className={`content`}>{parse(content)}</div>;
}

export function ImageGrid({content}) {
  return (
    <div className="brand-grid">
    {content.map((image, index) => (
      <img src={`${process.env.PUBLIC_URL}/${image}`} alt="placeholder" key={index}/>
    ))}
    </div>
  );
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
  <div><span className="small">Site design and build by Taylor Tran, 2025. Built with React.</span>
  </div>
  </div>
}

export function Slide({type, src, alt}) {
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

export function Section({path, visual, text, onInView}) {
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
     
      if (path && typeof onInView === "function") {
        onInView(path); 
      }
    }

    else {
      textEl.classList.add("hidden");
      onInView((prev) => (prev === path ? null : prev));

    }
  }, [inView, path, onInView]);

  return (
    <div className = "section" ref={setRefs}>
        <div className="visual">{visual}</div>
        {text.props.content==="" ? <div></div> :  <div className="text hidden">{text}</div> }
      </div>
  );
}


export function CenteredElement({background, children}) {
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

function Home({setActiveSection}) {
  return (
    <>
    <Section 
              visual={<Slide type="component" src={
                <div className="home-project" >
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
              onInView={setActiveSection}
              path="/hero"
              />


      <Page content={<Project content={pages.home.content} className="home" setActiveSection={setActiveSection}/> } />
    </>
  );
}

export function Page({content, className}) {
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

export function Video({src}) {
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
      className="video"
    />
  );
}

export function Phone({src}) {
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

export function Project({content, className, setActiveSection}) {
  return (
    <div className={className ? className : "project-page"}>
      {
       content.map((slide, index) => (
        <Section key={index} 
          visual={<Slide type={slide.type} src={slide.src} alt={slide.alt} /> } 
          text={<ContentBlock content={slide.info}/>}
          path={slide.path}
          onInView={setActiveSection}
          />
       ))
    }
    </div>
  );
}



export default App;
