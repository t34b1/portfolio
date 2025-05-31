import React from 'react';
import { homeContent, naturePassContent, wnrsContent, m6Content, healthAppContent, piggyContent, miscContent, echoContent} from "./Content.js";
import { ROUTES } from "./ROUTES";

export const pages = {
  home: {
    info: "Welcome",
    content: homeContent,
    path: ROUTES.home,
  },

  about: {
    info: "About",
  },

  projectBar: {
    path: ROUTES.projectBar
  },

  naturePass: {
    info: "naturePass",
    content: naturePassContent,
    path: ROUTES.naturePass,
    role: ["B","r","a","n","d"," ","D","e","s","i","g","n","e","r"],
    year: ["2","0","2","5"],
  },

  wnrs: {
    info: "wnrs",
    content: wnrsContent,
    path: ROUTES.wnrs,
    role: ["S","e","n","i","o","r"," ","D","i","g","i","t","a","l"," ","D","e","s","i","g","n","e","r"],
    year: ["2","0","2","2"," ","-"," ","2","0","2","5"],
  },
  m6: {
    info: "m6",
    content: m6Content,
    path: ROUTES.m6,
    role: ["S","e","n","i","o","r"," ","D","i","g","i","t","a","l"," ","D","e","s","i","g","n"," ","M","a","n","a","g","e","r"],
    year: ["2","0","2","0"," ","-"," ","2","0","2","2"],  
  },

  healthApp: {
    info: "healthApp",
    content: healthAppContent,
    path: ROUTES.healthApp,
    role: ["P","r","o","d","u","c","t"," ","D","e","s","i","g","n","e","r"],
    year: ["2","0","2","5"],
  },
  piggy: {
    info: "piggy",
    content: piggyContent,
    path: ROUTES.piggy,
    role: ["P","r","o","d","u","c","t"," ","D","e","s","i","g","n","e","r"],
    year: ["2","0","2","4"],
  },

  misc: {
    info: "misc",
    content: miscContent,
    path: ROUTES.misc,
    role: ["D","e","s","i","g","n","e","r"],
    year: ["2","0","2","8"," ","-"," ","N","o","w"],
  },

  echo: {
    info: "echo",
    content: echoContent,
    path: ROUTES.echo,
    role: ["D","e","s","i","g","n","e","r", " ","&"," ","D","e","v","e","l","o","p","e","r"],
    year: ["2","0","2","8"," ","-"," ","N","o","w"],
  },
};