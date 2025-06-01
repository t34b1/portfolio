import React from 'react';
import { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function usePrevious(value) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

function ProjectThumbnail({src, path, isActive}) {
return (
  <img src={`${process.env.PUBLIC_URL}/${src}`} 
  className={`project-thumbnail ${isActive && path!=="/"? "active" : ""}`}
  alt="thumbnail" />
);
}

function ProjectBar({thumbnails, activeSection, className}) {
  console.log(activeSection);
  const shouldHide = activeSection === "/hero";
  const isMobile = className ==="mobile-menu";
  const location = useLocation();

  const prevLocation = usePrevious(location);


  return (
    <>
    {isMobile ? 
    <div className={className}>
      {location.pathname==="/projectBar" ? 
      <Link to={prevLocation.pathname}><h3>Exit</h3></Link>: 
      <Link to="/projectBar"><h3>Menu</h3></Link>
      }
    </div> 
    : 
    <div className={`project-bar ${className} ${shouldHide ? "collapsed": "" }`}>
        {thumbnails.map((thumbnail, index) => (
          <Link to={thumbnail.path} key={index}>
            <ProjectThumbnail src={thumbnail.src} path={thumbnail.path} isActive={activeSection === thumbnail.path} />
          </Link>
       ))}
     </div>
    }
    </>
   
  );
}

export default ProjectBar;