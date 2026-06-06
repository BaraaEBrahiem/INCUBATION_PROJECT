import React from 'react'
import ProjectCard from '../ProjectCard';
import project1 from "../../assets/images/project1.png"
import project2 from '../../assets/images/project2.png';
import project3 from '../../assets/images/project3.png';
const projects = [
  {
    name: "موقع للتواصل الاجتماعي",
    category: "تكنولوجي",
    team: "Green Panda",
    members: ["نصوح شاهين", "علي احمد"],
    image: project1
  },
  {
    name: "موقع للتواصل الاجتماعي",
    category: "تكنولوجي",
    team: "Green Panda",
    members: ["نصوح شاهين", "علي احمد"],
    image: project2
  },
  {
    name: "موقع للتواصل الاجتماعي",
    category: "تكنولوجي",
    team: "Green Panda",
    members: ["نصوح شاهين", "علي احمد"],
    image: project3
  },

]
const Exhibition = ({id}) => {
  return (
    <div className='p-4 mb-40' id={id}>
      <div className="container">
        <h1 className='text-second-color font-semibold text-[40px] mb-10'>المعرض</h1>
        <div className='flex flex-col gap-5'>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} ShowImage={true}  details='general'/>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Exhibition