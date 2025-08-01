export const siteConfig = {
  name: "Ilyas Budi Wahyu Jati",
  title: "Web Developer",
  description: "Passionate about Web development and always eager to learn new things in this field.",
  url: "https://ilyasbudi.vercel.app",
  email: "wjati145@gmail.com",
  phone: "+62 813 8251 9181",
  location: "Tangerang, Indonesia",
  
  social: {
    github: "https://github.com/IlyasBudi",
    linkedin: "https://www.linkedin.com/in/ilyas-budi/",
    facebook: "https://www.facebook.com/ilyasbudi.jati/",
    instagram: "https://www.instagram.com/hyuu.j_/",
  },
  
  navigation: [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  
  skills: [
    {
      category: "Frontend",
      items: ["HTML", "CSS", "Javascript", "React.js", "Tailwind CSS"]
    },
    {
      category: "Backend", 
      items: ["Laravel", "Node.js", "Express.js", "PostgreSQL", "MySQL"]
    },
    {
      category: "Tools",
      items: ["Git", "Github", "Postman", "Figma"]
    }
  ],
  
  experience: [
    {
      company: "PT. Bank Negara Indonesia (Persero) Tbk",
      position: "Archive Management Intern",
      duration: "Feb 2023 - Aug 2023",
      description: `- Organizing and managing active and inactive records.
                    - Retention and disposal of records.
                    - Maintenance and security of active and inactive records.
                    - Transfer of inactive records to the BNI Record Center.
                    - Storage and classification of records.
                    - Retrieval and re-archiving.`
    },
    {
      company: "Informatics Student Association (HMIF)",
      position: "Student Supervisory Board", 
      duration: "2023 - 2024",
      description: `- Supervise the organization’s operations.
                    - Evaluate the board’s performance.
                    - Prepare supervisory reports.
                    - Provide recommendations.
                    - Act as an internal mediator.`
    },
    {
      company: "Informatics Student Association (HMIF)",
      position: "Human Resource Development Division", 
      duration: "2022 - 2023",
      description: `- Design and implement member development programs.
                    - Manage recruitment and regeneration.
                    - Maintain internal cohesion and solidarity.
                    - Assist in evaluating member development.`
    }
  ],

  education: [
    {
      institution: " Indonesia Institute of Technology",
      degree: "Bachelor of Informatics Engineering",
      duration: "2020 - 2025",
      description: " Bachelor of Informatics Engineering with GPA 3.42"
    },
    {
      institution: "SMKN 5 Kota Tangerang",
      degree: "Network Engineering",
      duration: "2017 - 2020",
      description: "Studying and developing skills in computer assembly, computer network construction and management (both local and wide area networks), as well as network system administration."
    }
  ]
};

export type SiteConfig = typeof siteConfig;

