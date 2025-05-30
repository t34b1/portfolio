import React from 'react';
import { Link } from 'react-router-dom';
import { thumbnails } from './App';
import { useLocation } from 'react-router-dom';


function ProjectThumbnail({src}) {
return (
  <img src={`${process.env.PUBLIC_URL}/${src}`} className = "project-thumbnail" alt="thumbnail" />
);
}

function ProjectBar({thhumbnails}) {

  return (
   
   <div className= 
   {`project-bar
   
    `}
   >
    {thumbnails.map((thumbnail, index) => (
       <Link to={thumbnail.path} key={index}>
         <ProjectThumbnail key={index }src={thumbnail.src} />
       </Link>
    ))}


   </div>
  
   
  );
}

export default ProjectBar;