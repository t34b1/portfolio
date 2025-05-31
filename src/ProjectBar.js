import React from 'react';
import { Link } from 'react-router-dom';


function ProjectThumbnail({src, path, isActive}) {
return (
  <img src={`${process.env.PUBLIC_URL}/${src}`} 
  className={`project-thumbnail ${isActive && path!=="/"? "active" : ""}`}
  alt="thumbnail" />
);
}

function ProjectBar({thumbnails, activeSection, className}) {

  return (
   
   <div className={`project-bar ${className}`}>
    {thumbnails.map((thumbnail, index) => (
       <Link to={thumbnail.path} key={index}>
         <ProjectThumbnail key={index }src={thumbnail.src} path={thumbnail.path} isActive={activeSection === thumbnail.path} />
       </Link>
    ))}
   </div>
  
  );
}

export default ProjectBar;