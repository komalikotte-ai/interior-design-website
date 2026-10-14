import { useEffect, useMemo, useState } from "react";

function GallerySection({ galleryImages, onImageClick }) {
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(galleryImages.map((image) => image.category))];
  const filteredImages = category === "All"
    ? galleryImages
    : galleryImages.filter((image) => image.category === category);

  return (
    <>
      <div className="gallery-filters">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "gallery-filter active" : "gallery-filter"}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filteredImages.map((image) => (
          <button
            className="gallery-card"
            key={image.id}
            onClick={() => onImageClick(image)}
            aria-label={`Open ${image.title}`}
          >
            <img src={image.image} alt={image.title} loading="lazy" />
            <div className="gallery-card-overlay">
              <span>{image.category}</span>
              <h3>{image.title}</h3>
              <small>Open Image ↗</small>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

function App() {
  const [projectType, setProjectType] = useState("all");
  const [projectStyle, setProjectStyle] = useState("all");
  const [projectSearch, setProjectSearch] = useState("");
  const [projectSort, setProjectSort] = useState("featured");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);
  const [beforeAfterPosition, setBeforeAfterPosition] = useState(50);
  const [materialFilter, setMaterialFilter] = useState("All");
  const [propertyArea, setPropertyArea] = useState("");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [finishLevel, setFinishLevel] = useState("Standard");
  const [costEstimate, setCostEstimate] = useState(null);
  const [savedProjectIds, setSavedProjectIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("casaforma-saved-projects") || "[]");
    } catch {
      return [];
    }
  });
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  const [consultationData, setConsultationData] = useState({
    fullName: "", email: "", phone: "", city: "", propertyType: "Apartment",
    area: "", service: "Residential", preferredDate: "", budget: "",
    timeline: "", message: ""
  });
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);
  const [enquiryStep, setEnquiryStep] = useState(1);
  const [enquiryData, setEnquiryData] = useState({
    propertyType: "Apartment", area: "", location: "", rooms: "", services: "",
    style: "Modern", budget: "Under ₹5 lakh", timeline: "Immediately", additional: ""
  });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "CasaForma Interiors | Interior Design Studio";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "CasaForma Interiors is a fictional interior design studio demo showcasing residential, commercial, renovation, modular kitchen, and visualization services."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = "CasaForma Interiors is a fictional interior design studio demo showcasing residential, commercial, renovation, modular kitchen, and visualization services.";
      document.head.appendChild(meta);
    }

    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      const meta = document.createElement("meta");
      meta.name = "viewport";
      meta.content = "width=device-width, initial-scale=1.0";
      document.head.appendChild(meta);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSelectedProject(null);
        setSelectedService(null);
        setSelectedGalleryImage(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedProject || selectedService || selectedGalleryImage ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject, selectedService, selectedGalleryImage]);

  const projects = [
    {
      id: 1,
      featured: true,
      name: "Modern Residence",
      location: "Hyderabad",
      type: "Residential",
      style: "Contemporary",
      area: "2,400 sq. ft.",
      scope: "Full Home Interior",
      status: "Demo Project",
      description:
        "A contemporary home planned with warm textures, clean lines, natural light, and comfortable living spaces.",
      challenge:
        "Create an elegant family home while keeping the spaces practical and visually connected.",
      concept:
        "Warm contemporary interiors with natural materials, soft neutrals, and functional furniture.",
      image:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90",
    },
    {
      id: 2,
      featured: true,
      name: "Minimal Living",
      location: "Bengaluru",
      type: "Residential",
      style: "Minimalist",
      area: "1,850 sq. ft.",
      scope: "Apartment Interior",
      status: "Demo Project",
      description:
        "A calm minimalist home focused on simplicity, functionality, neutral tones, and carefully selected furniture.",
      challenge:
        "Make a compact apartment feel open, organized, and comfortable without visual clutter.",
      concept:
        "A restrained palette, integrated storage, and simple forms create a calm everyday environment.",
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=90",
    },
    {
      id: 3,
      featured: false,
      name: "Modern Workspace",
      location: "Hyderabad",
      type: "Office",
      style: "Modern",
      area: "3,200 sq. ft.",
      scope: "Office Interior",
      status: "Demo Project",
      description:
        "A modern workspace designed to support collaboration, productivity, comfort, and a professional identity.",
      challenge:
        "Balance focused work areas with collaborative spaces in one flexible office.",
      concept:
        "Clean planning, practical circulation, and a restrained material palette support a productive workplace.",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=90",
    },
    {
      id: 4,
      featured: true,
      name: "Luxury Kitchen",
      location: "Hyderabad",
      type: "Renovation",
      style: "Luxury",
      area: "220 sq. ft.",
      scope: "Modular Kitchen",
      status: "Demo Project",
      description:
        "A sophisticated modular kitchen combining practical storage, premium finishes, modern appliances, and elegant lighting.",
      challenge:
        "Improve storage and movement while creating a refined focal point for the home.",
      concept:
        "A balanced kitchen layout with layered lighting, efficient storage, and durable finishes.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=90",
    },
    {
      id: 5,
      featured: false,
      name: "Creative Office",
      location: "Bengaluru",
      type: "Office",
      style: "Industrial",
      area: "2,700 sq. ft.",
      scope: "Workspace Design",
      status: "Demo Project",
      description:
        "A creative office with flexible work areas, comfortable meeting spaces, and a contemporary visual identity.",
      challenge:
        "Create a flexible environment that supports individual work, meetings, and informal interaction.",
      concept:
        "Industrial-inspired details are softened with warm wood, comfortable furniture, and natural light.",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=90",
    },
    {
      id: 6,
      featured: false,
      name: "Elegant Kitchen",
      location: "Bengaluru",
      type: "Residential",
      style: "Modern",
      area: "180 sq. ft.",
      scope: "Kitchen Interior",
      status: "Demo Project",
      description:
        "A contemporary kitchen designed around efficient movement, organized storage, elegant materials, and everyday usability.",
      challenge:
        "Use a limited footprint efficiently while keeping the kitchen visually light.",
      concept:
        "Vertical storage, clean cabinetry, and a simple neutral finish create an efficient daily workspace.",
      image:
        "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1400&q=90",
    },
  ];

  const services = [
    {
      id: 1,
      number: "01",
      title: "Residential Interiors",
      description:
        "Personalized homes designed around lifestyle, comfort, functionality, and individual taste.",
      details:
        "Residential design can cover apartments, villas, independent homes, bedrooms, living rooms, dining spaces, and complete home interiors.",
    },
    {
      id: 2,
      number: "02",
      title: "Modular Kitchens",
      description:
        "Smart kitchen layouts that combine storage, efficient movement, durable materials, and elegant finishes.",
      details:
        "Kitchen planning considers layout, storage, work zones, materials, finishes, appliances, lighting, and everyday usability.",
    },
    {
      id: 3,
      number: "03",
      title: "Commercial Interiors",
      description:
        "Professional environments planned for productivity, customer experience, comfort, and brand identity.",
      details:
        "Commercial interiors can include offices, studios, retail spaces, hospitality areas, and other business environments.",
    },
    {
      id: 4,
      number: "04",
      title: "Turnkey Interiors",
      description:
        "A coordinated approach from design planning and material selection through execution and handover.",
      details:
        "The turnkey approach brings design decisions and execution planning together so the project can be managed as one coordinated experience.",
    },
    {
      id: 5,
      number: "05",
      title: "Renovation",
      description:
        "Thoughtful upgrades for existing spaces with a focus on usability, layout, finishes, and visual refresh.",
      details:
        "Renovation planning can focus on selected rooms or broader interior updates while respecting the existing structure and requirements.",
    },
    {
      id: 6,
      number: "06",
      title: "3D Visualization",
      description:
        "Visual representations that help clients understand proposed spaces before execution.",
      details:
        "3D visualization can communicate furniture placement, materials, colors, lighting, and overall design direction before execution begins.",
    },
  ];


  const galleryImages = [
    { id: 1, category: "Living Room", title: "Warm Contemporary Living", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90" },
    { id: 2, category: "Bedroom", title: "Calm Minimal Bedroom", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=90" },
    { id: 3, category: "Kitchen", title: "Modern Kitchen Detail", image: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1400&q=90" },
    { id: 4, category: "Office", title: "Contemporary Workspace", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=90" },
    { id: 5, category: "Dining", title: "Elegant Dining Space", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=90" },
    { id: 6, category: "Living Room", title: "Neutral Living Space", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90" },
  ];

  
  const materials = [
    {id:1,category:"Wood",name:"Natural Oak",finish:"Warm matte finish",image:"https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=85"},
    {id:2,category:"Stone",name:"Light Marble",finish:"Polished surface",image:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85"},
    {id:3,category:"Tiles",name:"Porcelain Tile",finish:"Soft neutral texture",image:"https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=900&q=85"},
    {id:4,category:"Fabric",name:"Linen Texture",finish:"Natural woven finish",image:"https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85"},
    {id:5,category:"Laminates",name:"Oak Laminate",finish:"Wood-look matte finish",image:"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=85"},
    {id:6,category:"Lighting",name:"Warm Ambient Light",finish:"Soft architectural lighting",image:"https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=900&q=85"}
  ];
  const costRates={Apartment:{Standard:[1600,2200],Premium:[2200,3000],Luxury:[3000,4200]},Villa:{Standard:[1800,2400],Premium:[2400,3300],Luxury:[3300,4500]},Office:{Standard:[1400,1900],Premium:[1900,2700],Luxury:[2700,3600]},Renovation:{Standard:[1200,1800],Premium:[1800,2500],Luxury:[2500,3400]}};
  const calculateEstimate=(e)=>{e.preventDefault();const area=Number(propertyArea);if(area>0){const r=costRates[propertyType][finishLevel];setCostEstimate([Math.round(area*r[0]),Math.round(area*r[1])]);}};
  const processSteps = [
    ["01", "Consultation", "Understand your requirements, lifestyle, preferences, and project goals."],
    ["02", "Site Assessment", "Review the space, dimensions, existing conditions, and practical requirements."],
    ["03", "Concept Development", "Develop the design direction, layout ideas, mood, and overall concept."],
    ["04", "3D Visualization", "Present visual representations to communicate the proposed interior."],
    ["05", "Material Selection", "Select suitable materials, finishes, colors, fixtures, and details."],
    ["06", "Cost Estimation", "Prepare a demo estimate based on project requirements and selected specifications."],
    ["07", "Execution", "Coordinate the planned design decisions during the execution stage."],
    ["08", "Quality Check", "Review completed work against the planned design and requirements."],
    ["09", "Handover", "Complete the project and hand over the finished interior."],
  ];

  const designStyles = [
    {id:1,name:"Modern",description:"Clean lines, practical layouts, balanced materials, and a refined contemporary feel.",image:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85"},
    {id:2,name:"Contemporary",description:"Current design ideas combined with comfortable furniture, layered lighting, and elegant details.",image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85"},
    {id:3,name:"Minimalist",description:"A calm visual language using simplicity, functional planning, neutral tones, and less visual clutter.",image:"https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85"},
    {id:4,name:"Scandinavian",description:"Light interiors, natural textures, simple forms, and a warm functional atmosphere.",image:"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85"},
    {id:5,name:"Industrial",description:"Raw textures, practical furniture, darker accents, and architectural character.",image:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85"},
    {id:6,name:"Traditional",description:"Classic proportions, richer materials, decorative details, and a timeless residential character.",image:"https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=1000&q=85"},
    {id:7,name:"Luxury",description:"Premium-looking finishes, layered lighting, sophisticated furniture, and carefully composed details.",image:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85"},
    {id:8,name:"Bohemian",description:"Relaxed spaces combining patterns, natural textures, plants, color, and collected decorative elements.",image:"https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=85"},
    {id:9,name:"Japandi",description:"A calm blend of Japanese simplicity and Scandinavian warmth with natural materials and quiet forms.",image:"https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1000&q=85"},
    {id:10,name:"Classic",description:"Balanced layouts, elegant furniture, traditional details, and a polished timeless atmosphere.",image:"https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1000&q=85"},
  ];

  const teamMembers = [
    {id:1,name:"Ananya Rao",role:"Lead Interior Designer",description:"Focuses on residential concepts, spatial planning, materials, and visual direction.",image:"https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=85"},
    {id:2,name:"Arjun Mehta",role:"Design Consultant",description:"Works on project requirements, layouts, client discussions, and design coordination.",image:"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=85"},
    {id:3,name:"Maya Kapoor",role:"3D Visualization Designer",description:"Creates visual concepts that help communicate furniture, materials, lighting, and spatial ideas.",image:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85"},
    {id:4,name:"Rohan Shah",role:"Project Coordinator",description:"Supports planning, execution coordination, quality checks, and project handover.",image:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85"},
  ];

  const blogArticles = [
    {id:1,title:"How to Plan a 2BHK Interior",category:"Interior Design Ideas",date:"October 2026",reading:"6 min read",author:"CasaForma Design Team",image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",excerpt:"A practical guide to planning rooms, storage, lighting, materials, and movement before starting an interior project."},
    {id:2,title:"Modern Kitchen Design Ideas",category:"Kitchen Design",date:"September 2026",reading:"5 min read",author:"CasaForma Design Team",image:"https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",excerpt:"Explore planning ideas for functional modern kitchens, including work zones, storage, finishes, and lighting."},
    {id:3,title:"How to Select Interior Materials",category:"Materials",date:"September 2026",reading:"7 min read",author:"CasaForma Design Team",image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",excerpt:"Understand how durability, maintenance, finish, texture, and application can guide material selection."},
    {id:4,title:"How Much Does Interior Design Cost?",category:"Budget Planning",date:"August 2026",reading:"8 min read",author:"CasaForma Design Team",image:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",excerpt:"A simple introduction to the factors that influence interior project budgets and finish levels."},
    {id:5,title:"Small Bedroom Design Ideas",category:"Bedroom Design",date:"August 2026",reading:"5 min read",author:"CasaForma Design Team",image:"https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",excerpt:"Use layout, storage, lighting, and visual simplicity to make smaller bedrooms feel comfortable and useful."},
  ];
  const blogCategories = ["All","Interior Design Ideas","Home Decor","Kitchen Design","Bedroom Design","Living Room","Office Design","Materials","Renovation","Design Trends","Budget Planning"];
  const [blogFilter, setBlogFilter] = useState("All");
  const filteredBlogs = blogFilter === "All" ? blogArticles : blogArticles.filter((article) => article.category === blogFilter);

  const faqs = [
    {
      question: "What is the interior design process?",
      answer: "The process can include consultation, site assessment, concept development, 3D visualization, material selection, cost estimation, execution, quality checks, and handover."
    },
    {
      question: "Do you provide 3D visualization?",
      answer: "Yes. 3D visualization helps clients understand the proposed layout, materials, finishes, and overall design direction before execution."
    },
    {
      question: "Can I customize the design?",
      answer: "Yes. Designs can be adapted to the space, lifestyle, functional requirements, preferred style, materials, and budget."
    },
    {
      question: "How long does an interior project take?",
      answer: "Project timelines vary based on property size, scope, design complexity, material availability, and execution requirements. A detailed timeline can be discussed during consultation."
    },
    {
      question: "Do you design modular kitchens?",
      answer: "Yes. Modular kitchen planning can cover layouts, storage, materials, finishes, appliances, lighting, and practical work zones."
    },
    {
      question: "How are interior design costs estimated?",
      answer: "Costs depend on factors such as property type, area, scope, finish level, materials, customization, and execution requirements. The calculator on this demo site provides fictional planning ranges only."
    },
    {
      question: "Can you work on renovation projects?",
      answer: "Yes. Renovation can focus on selected rooms or broader interior updates depending on the project requirements."
    },
    {
      question: "Can I choose my own materials and finishes?",
      answer: "Yes. Material and finish selections can be discussed based on design style, durability, maintenance, availability, and budget."
    },
    {
      question: "Do you provide online consultations?",
      answer: "An online consultation can be used to discuss initial requirements, design preferences, project scope, and next steps before a detailed assessment."
    },
    {
      question: "How can I request a consultation?",
      answer: "Use the consultation form on this website and provide your basic project details. This frontend demo simulates submission and does not send data to a backend."
    },
  ];

  const filteredProjects = useMemo(() => {
    const search = projectSearch.trim().toLowerCase();

    const result = projects.filter((project) => {
      const matchesType =
        projectType === "all" ||
        project.type.toLowerCase() === projectType.toLowerCase();

      const matchesStyle =
        projectStyle === "all" ||
        project.style.toLowerCase() === projectStyle.toLowerCase();

      const searchableText = [
        project.name,
        project.location,
        project.type,
        project.style,
        project.scope,
        project.description,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !search || searchableText.includes(search);

      return matchesType && matchesStyle && matchesSearch;
    });

    return [...result].sort((a, b) => {
      if (projectSort === "alphabetical") {
        return a.name.localeCompare(b.name);
      }

      if (projectSort === "project-size") {
        const areaA = parseInt(a.area.replace(/,/g, ""), 10);
        const areaB = parseInt(b.area.replace(/,/g, ""), 10);
        return areaB - areaA;
      }

      if (projectSort === "location") {
        return a.location.localeCompare(b.location);
      }

      if (projectSort === "latest") {
        return b.id - a.id;
      }

      return Number(b.featured) - Number(a.featured);
    });
  }, [projectSearch, projectSort, projectStyle, projectType]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 500);

      const sections = [
        "home",
        "projects",
        "services",
        "styles",
        "process",
        "gallery",
        "about",
        "faq",
        "contact",
      ];

      let currentSection = "home";

      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);

        if (section && window.scrollY >= section.offsetTop - 150) {
          currentSection = sectionId;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
        setSelectedService(null);
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    localStorage.setItem("casaforma-saved-projects", JSON.stringify(savedProjectIds));
  }, [savedProjectIds]);

  const toggleSavedProject = (projectId) => {
    setSavedProjectIds((previousIds) =>
      previousIds.includes(projectId)
        ? previousIds.filter((id) => id !== projectId)
        : [...previousIds, projectId]
    );
  };

  const quizQuestions = [
    {
      id: "mood",
      question: "What mood should your space have?",
      options: [
        ["Calm and uncluttered", "Minimalist"],
        ["Warm and natural", "Scandinavian"],
        ["Bold and architectural", "Industrial"],
        ["Elegant and refined", "Luxury"],
      ],
    },
    {
      id: "materials",
      question: "Which materials attract you most?",
      options: [
        ["Clean wood and glass", "Modern"],
        ["Natural wood and soft textiles", "Scandinavian"],
        ["Metal, concrete and exposed textures", "Industrial"],
        ["Stone, premium fabrics and brass accents", "Luxury"],
      ],
    },
    {
      id: "look",
      question: "Which overall look feels most like you?",
      options: [
        ["Simple and practical", "Minimalist"],
        ["Fresh and comfortable", "Contemporary"],
        ["Classic and detailed", "Traditional"],
        ["Relaxed and expressive", "Bohemian"],
      ],
    },
  ];

  const calculateQuizResult = () => {
    const scores = {};
    Object.values(quizAnswers).forEach((style) => {
      scores[style] = (scores[style] || 0) + 1;
    });

    const result = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
    setQuizResult(result ? result[0] : null);
  };

  const closeMenu = () => setMenuOpen(false);

  const closeModals = () => {
    setSelectedProject(null);
    setSelectedService(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setFormSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormSubmitted(false);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
      });
    }, 1000);
  };

  const handleConsultationChange = (event) => {
    const { name, value } = event.target;
    setConsultationData((current) => ({ ...current, [name]: value }));
    setConsultationSubmitted(false);
  };

  const handleConsultationSubmit = (event) => {
    event.preventDefault();
    const selectedDate = new Date(consultationData.preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      alert("Please choose today or a future consultation date.");
      return;
    }
    setConsultationSubmitted(true);
  };

  const handleEnquiryChange = (event) => {
    const { name, value } = event.target;
    setEnquiryData((current) => ({ ...current, [name]: value }));
    setEnquirySubmitted(false);
  };

  const nextEnquiryStep = () => {
    if (enquiryStep < 5) setEnquiryStep((step) => step + 1);
  };

  const previousEnquiryStep = () => {
    if (enquiryStep > 1) setEnquiryStep((step) => step - 1);
  };

  const submitEnquiry = (event) => {
    event.preventDefault();
    setEnquirySubmitted(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <header>
        <div className="brand">
          <div>
            <h1>CASAFORMA INTERIORS</h1>
            <p>INTERIOR DESIGN STUDIO</p>
          </div>
        </div>

        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav
          id="primary-navigation"
          className={menuOpen ? "nav-open" : ""}
          aria-label="Primary navigation"
        >
          {[
            ["projects", "Projects"],
            ["services", "Services"],
            ["styles", "Styles"],
            ["process", "Process"],
            ["gallery", "Gallery"],
            ["about", "About"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? "active-nav" : ""}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
          <a href="#consultation" className="nav-cta" onClick={closeMenu}>
            Book a Consultation
          </a>
        </nav>
      </header>

      <main id="main-content" tabIndex="-1">
        <section id="home">
          <div className="hero-content">
            <p className="hero-label">CASAFORMA INTERIORS</p>

            <h2>
              Spaces Designed
              <br />
              Around You.
            </h2>

            <p className="hero-description">
              Thoughtful interior design for homes, workspaces, kitchens,
              renovations, and spaces shaped around the people who use them.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="hero-button">
                Explore Projects
              </a>

              <a href="#contact" className="hero-secondary-button">
                Book a Consultation
              </a>
            </div>
          </div>

          <a
            href="#about"
            className="scroll-indicator"
            aria-label="Scroll to about section"
          >
            <span>SCROLL</span>
            <span>↓</span>
          </a>
        </section>

        <section id="about">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
              alt="Contemporary interior designed with neutral materials"
              loading="lazy"
            />
          </div>

          <div className="about-content">
            <p className="section-label">ABOUT CASAFORMA</p>

            <h2>Designing spaces around the way you live.</h2>

            <p>
              CasaForma Interiors is a fictional interior design studio created
              for this website project. The concept focuses on residential and
              commercial interiors that balance beauty, comfort, and function.
            </p>

            <p>
              From early planning and material choices to visualizing the final
              space, the design approach is centered on clear communication,
              thoughtful details, and practical solutions.
            </p>

            <div className="about-points">
              <div>
                <strong>01</strong>
                <span>Personalized Design</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Detailed Planning</span>
              </div>

              <div>
                <strong>03</strong>
                <span>End-to-End Support</span>
              </div>
            </div>
          </div>
        </section>

        <section id="services">
          <div className="section-heading">
            <p className="section-label">WHAT WE DO</p>

            <h2>Services built around your space.</h2>

            <p>
              Explore the core design services planned for the CasaForma
              Interiors portfolio.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <button
                className="service-card"
                key={service.id}
                onClick={() => setSelectedService(service)}
              >
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-more">View Details →</div>
              </button>
            ))}
          </div>
        </section>

        <section id="styles" className="styles-section">
          <div className="styles-header"><div><p className="section-label">DESIGN STYLES</p><h2>Find a style that feels like you.</h2></div><p>Explore the design styles listed in the project brief. All content below is fictional demo content for CasaForma Interiors.</p></div>
          <div className="styles-grid">{designStyles.map((style)=><article className="style-card" key={style.id}><div className="style-image-wrap"><img src={style.image} alt={`${style.name} interior style`} loading="lazy"/><span className="style-number">{String(style.id).padStart(2,"0")}</span></div><div className="style-card-content"><h3>{style.name}</h3><p>{style.description}</p><a href="#projects" className="style-link">Explore Projects →</a></div></article>)}</div>
          <p className="demo-caption">Fictional demo style descriptions and imagery.</p>
        </section>

        <section id="team" className="team-section">
          <div className="team-header"><div><p className="section-label">OUR TEAM</p><h2>People behind the design.</h2></div><p>Meet the fictional CasaForma team created for this frontend assignment. These profiles are demo content only.</p></div>
          <div className="team-grid">{teamMembers.map((member)=><article className="team-card" key={member.id}><div className="team-image-wrap"><img src={member.image} alt={member.name} loading="lazy"/></div><div className="team-card-content"><span>{member.role}</span><h3>{member.name}</h3><p>{member.description}</p></div></article>)}</div>
          <p className="demo-caption">Fictional demo team profiles. No real employee information is represented.</p>
        </section>

        <section id="blog" className="blog-section">
          <div className="blog-header">
            <div><p className="section-label">JOURNAL</p><h2>Ideas for better spaces.</h2></div>
            <p>Design-focused articles covering planning, decor, kitchens, bedrooms, materials, renovation, trends, and budget planning.</p>
          </div>
          <div className="blog-filters">
            {blogCategories.map((category) => (
              <button key={category} className={blogFilter === category ? "filter-btn active" : "filter-btn"} onClick={() => setBlogFilter(category)}>
                {category}
              </button>
            ))}
          </div>
          <div className="blog-grid">
            {filteredBlogs.map((article) => (
              <article className="blog-card" key={article.id}>
                <div className="blog-image-wrap"><img src={article.image} alt={article.title} loading="lazy"/><span>{article.category}</span></div>
                <div className="blog-card-content">
                  <p className="blog-meta">{article.date} · {article.reading}</p>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <button className="text-button" onClick={() => setActiveProject({title:article.title,image:article.image,location:"CasaForma Journal",type:"Article",style:article.category,area:"Demo article",scope:"Design article",brief:article.excerpt,challenge:"This is fictional demo article content created for the frontend assignment.",concept:"The article explores practical interior design decisions in a simple editorial format."})}>Read Article →</button>
                </div>
              </article>
            ))}
          </div>
          <p className="demo-caption">All articles, dates, authors, and editorial content are fictional demo content.</p>
        </section>

        <section id="why-us">
          <div className="why-us-header">
            <p className="section-label">OUR APPROACH</p>

            <h2>Thoughtful design, from idea to space.</h2>

            <p>
              These are the design principles highlighted by the project brief.
            </p>
          </div>

          <div className="why-us-grid">
            {[
              [
                "01",
                "Personalized Design",
                "Interiors are planned around the client's lifestyle, requirements, and preferences.",
              ],
              [
                "02",
                "Detailed Planning",
                "Clear planning helps connect layouts, materials, furniture, lighting, and execution.",
              ],
              [
                "03",
                "Quality Materials",
                "Materials and finishes are considered for appearance, usability, and durability.",
              ],
              [
                "04",
                "Professional Execution",
                "The design process is structured to support organized execution and quality checks.",
              ],
              [
                "05",
                "3D Visualization",
                "Visual representations help communicate the proposed space before execution.",
              ],
              [
                "06",
                "End-to-End Support",
                "The experience can cover consultation, design decisions, material selection, and handover.",
              ],
            ].map(([number, title, text]) => (
              <div className="why-card" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects">
          <div className="projects-header">
            <p className="section-label">SELECTED WORK</p>

            <h2>Projects that tell the design story.</h2>

            <p>
              Search, filter, and sort the fictional demo portfolio below.
            </p>
          </div>

          <div className="project-controls">
            <label className="project-search">
              <span>Search projects</span>
              <input
                type="search"
                value={projectSearch}
                onChange={(event) => setProjectSearch(event.target.value)}
                placeholder="Name, location, style..."
                aria-label="Search projects"
              />
            </label>

            <label>
              <span>Project Type</span>
              <select
                value={projectType}
                onChange={(event) => setProjectType(event.target.value)}
                aria-label="Filter by project type"
              >
                <option value="all">All Types</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Office">Office</option>
                <option value="Retail">Retail</option>
                <option value="Renovation">Renovation</option>
              </select>
            </label>

            <label>
              <span>Design Style</span>
              <select
                value={projectStyle}
                onChange={(event) => setProjectStyle(event.target.value)}
                aria-label="Filter by design style"
              >
                <option value="all">All Styles</option>
                <option value="Modern">Modern</option>
                <option value="Minimalist">Minimalist</option>
                <option value="Contemporary">Contemporary</option>
                <option value="Traditional">Traditional</option>
                <option value="Luxury">Luxury</option>
                <option value="Industrial">Industrial</option>
              </select>
            </label>

            <label>
              <span>Sort By</span>
              <select
                value={projectSort}
                onChange={(event) => setProjectSort(event.target.value)}
                aria-label="Sort projects"
              >
                <option value="featured">Featured</option>
                <option value="latest">Latest</option>
                <option value="project-size">Project Size</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="location">Location</option>
              </select>
            </label>
          </div>

          <div className="project-filter-summary">
            <p>
              Showing <strong>{filteredProjects.length}</strong> demo project
              {filteredProjects.length === 1 ? "" : "s"}
            </p>

            {(projectSearch || projectType !== "all" || projectStyle !== "all") && (
              <button
                className="clear-filters"
                onClick={() => {
                  setProjectSearch("");
                  setProjectType("all");
                  setProjectStyle("all");
                  setProjectSort("featured");
                }}
              >
                Clear Filters
              </button>
            )}
          </div>

          {filteredProjects.length > 0 ? (
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <button
                  className="project-card"
                  key={project.id}
                  style={{ backgroundImage: `url("${project.image}")` }}
                  onClick={() => setSelectedProject(project)}
                  aria-label={`View ${project.name}`}
                >
                  <div className="project-info">
                    <p>
                      {project.type} • {project.location}
                    </p>

                    <h3>{project.name}</h3>

                    <span>{project.style} • {project.area}</span>

                    <small>View Project →</small>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="no-projects">
              <h3>No projects found.</h3>
              <p>Try another search term or clear the filters.</p>
            </div>
          )}
        </section>

        <section id="saved-projects" className="saved-projects-section">
          <div className="saved-projects-header">
            <div>
              <p className="section-label">YOUR SHORTLIST</p>
              <h2>Save spaces that inspire you.</h2>
            </div>
            <p>
              Your saved projects are stored only in this browser, so you can
              return to your favourites while exploring the demo website.
            </p>
          </div>

          {savedProjectIds.length === 0 ? (
            <div className="saved-empty">
              <span>♡</span>
              <div>
                <h3>No saved projects yet.</h3>
                <p>Open a project and choose “Save Project” to build your shortlist.</p>
              </div>
            </div>
          ) : (
            <div className="saved-projects-list">
              {projects.filter((project) => savedProjectIds.includes(project.id)).map((project) => (
                <div className="saved-project-card" key={project.id}>
                  <img src={project.image} alt={project.name} loading="lazy" />
                  <div>
                    <span>{project.type} • {project.location}</span>
                    <h3>{project.name}</h3>
                    <p>{project.style} • {project.area}</p>
                    <div className="saved-actions">
                      <button type="button" onClick={() => setSelectedProject(project)}>View Project</button>
                      <button
                        type="button"
                        className="text-button"
                        onClick={() => toggleSavedProject(project.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="testimonials">
          <div className="testimonials-header">
            <p className="section-label">DEMO TESTIMONIALS</p>

            <h2>Client stories, presented as demo content.</h2>

            <p>
              The following testimonials are fictional examples included for
              the website project and are not claims from real clients.
            </p>
          </div>

          <div className="testimonials-grid">
            {[
              [
                "Ananya Reddy",
                "Residential Project",
                "The design direction made the space feel more organized, comfortable, and connected to our everyday routine.",
              ],
              [
                "Rahul Sharma",
                "Commercial Project",
                "The concept brought together a professional look with practical work areas and a clear design language.",
              ],
              [
                "Priya Mehta",
                "Villa Project",
                "The process helped turn our ideas into a clear interior concept with thoughtful details throughout.",
              ],
            ].map(([name, project, text]) => (
              <div className="testimonial-card" key={name}>
                <div className="quote">“</div>
                <p>{text}</p>

                <div className="client">
                  <strong>{name}</strong>
                  <span>{project} • Fictional demo</span>
                </div>
              </div>
            ))}
          </div>
        </section>


        <section id="gallery">
          <div className="gallery-header">
            <div>
              <p className="section-label">VISUAL STORIES</p>
              <h2>Explore our design gallery.</h2>
            </div>
            <p>A visual collection of fictional demo interiors created to demonstrate the CasaForma portfolio experience.</p>
          </div>
          <GallerySection galleryImages={galleryImages} onImageClick={setSelectedGalleryImage} />
        </section>

        <section id="before-after">
          <div className="before-after-header">
            <p className="section-label">BEFORE & AFTER</p>
            <h2>See the transformation.</h2>
            <p>Drag the divider to compare a fictional before-and-after renovation example.</p>
          </div>

          <div className="before-after-wrapper">
            <div className="before-after-slider">
              <img
                src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=90"
                alt="After renovation interior"
                className="after-image"
              />
              <div className="before-image-container" style={{ width: `${beforeAfterPosition}%` }}>
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=90"
                  alt="Before renovation interior"
                  className="before-image"
                />
              </div>
              <div className="slider-line" style={{ left: `${beforeAfterPosition}%` }}>
                <div className="slider-handle">↔</div>
              </div>
              <span className="before-label">BEFORE</span>
              <span className="after-label">AFTER</span>
              <input
                type="range"
                min="0"
                max="100"
                value={beforeAfterPosition}
                onChange={(event) => setBeforeAfterPosition(Number(event.target.value))}
                aria-label="Before and after comparison slider"
              />
            </div>
            <p className="demo-caption">Fictional demo transformation for the frontend assignment.</p>
          </div>
        </section>

        <section id="process">
          <div className="process-header">
            <p className="section-label">OUR PROCESS</p>
            <h2>From first idea to finished space.</h2>
            <p>A clear design journey based on the stages described in the project brief.</p>
          </div>

          <div className="process-grid">
            {processSteps.map(([number, title, description]) => (
              <div className="process-card" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        
        <section id="materials"><div className="materials-header"><div><p className="section-label">MATERIALS & FINISHES</p><h2>Details that shape the space.</h2></div><p>Explore fictional demo material selections for the CasaForma materials library.</p></div><div className="material-filters">{["All","Wood","Stone","Tiles","Fabric","Laminates","Lighting"].map(x=><button key={x} className={materialFilter===x?"material-filter active":"material-filter"} onClick={()=>setMaterialFilter(x)}>{x}</button>)}</div><div className="materials-grid">{materials.filter(m=>materialFilter==="All"||m.category===materialFilter).map(m=><article className="material-card" key={m.id}><img src={m.image} alt={m.name}/><div className="material-card-content"><span>{m.category}</span><h3>{m.name}</h3><p>{m.finish}</p></div></article>)}</div><p className="demo-caption">Fictional demo material content.</p></section>
        <section id="cost-guide"><div className="cost-guide-header"><p className="section-label">PRICING GUIDE</p><h2>Plan your interior investment.</h2><p>These are fictional demo estimates, not quotations. Actual costs depend on project scope and specifications.</p></div><div className="pricing-table"><div className="pricing-row pricing-head"><span>Property</span><span>Standard</span><span>Premium</span><span>Luxury</span></div>{Object.entries(costRates).map(([t,r])=><div className="pricing-row" key={t}><strong>{t}</strong><span>₹{r.Standard[0]}–₹{r.Standard[1]}/sq.ft</span><span>₹{r.Premium[0]}–₹{r.Premium[1]}/sq.ft</span><span>₹{r.Luxury[0]}–₹{r.Luxury[1]}/sq.ft</span></div>)}</div></section>
        <section id="calculator"><div className="calculator-layout"><div className="calculator-intro"><p className="section-label">DEMO COST CALCULATOR</p><h2>Get a quick project estimate.</h2><p>Generate a fictional planning range from your property details.</p></div><form className="calculator-form" onSubmit={calculateEstimate}><label>Property Type<select value={propertyType} onChange={e=>setPropertyType(e.target.value)}><option>Apartment</option><option>Villa</option><option>Office</option><option>Renovation</option></select></label><label>Area (sq.ft)<input type="number" min="1" value={propertyArea} onChange={e=>setPropertyArea(e.target.value)} placeholder="Example: 1200" required/></label><label>Finish Level<select value={finishLevel} onChange={e=>setFinishLevel(e.target.value)}><option>Standard</option><option>Premium</option><option>Luxury</option></select></label><button className="primary-button calculator-button">Calculate Demo Estimate</button>{costEstimate&&<div className="estimate-result"><span>DEMO ESTIMATED RANGE</span><strong>₹{costEstimate[0].toLocaleString("en-IN")} – ₹{costEstimate[1].toLocaleString("en-IN")}</strong><p>Fictional demo estimate, not a quotation.</p></div>}</form></div></section>
        <section id="design-quiz" className="design-quiz-section">
          <div className="quiz-header">
            <p className="section-label">STYLE QUIZ</p>
            <h2>Not sure which style fits you?</h2>
            <p>
              Answer three quick questions and get a simple design-style
              recommendation. This is a fictional demo feature.
            </p>
          </div>

          <div className="quiz-grid">
            {quizQuestions.map((question, index) => (
              <fieldset className="quiz-card" key={question.id}>
                <legend>{index + 1}. {question.question}</legend>
                <div className="quiz-options">
                  {question.options.map(([label, style]) => (
                    <label
                      className={quizAnswers[question.id] === style ? "quiz-option selected" : "quiz-option"}
                      key={style}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={style}
                        checked={quizAnswers[question.id] === style}
                        onChange={(event) =>
                          setQuizAnswers((previous) => ({
                            ...previous,
                            [question.id]: event.target.value,
                          }))
                        }
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="quiz-actions">
            <button
              type="button"
              className="primary-button"
              onClick={calculateQuizResult}
              disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
            >
              Find My Style →
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setQuizAnswers({});
                setQuizResult(null);
              }}
            >
              Reset
            </button>
          </div>

          {quizResult && (
            <div className="quiz-result" role="status" aria-live="polite">
              <span className="section-label">YOUR DEMO RESULT</span>
              <h3>{quizResult}</h3>
              <p>
                Based on your answers, <strong>{quizResult}</strong> may be a
                good starting point for your interior concept.
              </p>
              <a href="#styles" className="modal-button">Explore {quizResult} Style →</a>
            </div>
          )}
        </section>

        <section id="faq">
          <div className="faq-layout">
            <div className="faq-intro">
              <p className="section-label">FAQ</p>

              <h2>Frequently asked questions.</h2>

              <p>
                Quick answers covering the design process, services,
                visualization, customization, and enquiries.
              </p>

              <a href="#contact" className="faq-button">
                Request a Consultation
              </a>
            </div>

            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div
                  className={
                    openFaq === index ? "faq-item open" : "faq-item"
                  }
                  key={faq.question}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(openFaq === index ? null : index)
                    }
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-icon">
                      {openFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  {openFaq === index && (
                    <div id={`faq-answer-${index}`} className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="consultation" className="consultation-section">
          <div className="consultation-header">
            <p className="section-label">DESIGN CONSULTATION</p>
            <h2>Let's discuss your project.</h2>
            <p>Complete the form below to request a fictional demo consultation. No information is sent to a server.</p>
          </div>

          <form className="consultation-form" onSubmit={handleConsultationSubmit}>
            <div className="form-section-title"><span>01</span><h3>Your Details</h3></div>
            <div className="form-grid-2">
              <label>Full Name<input name="fullName" value={consultationData.fullName} onChange={handleConsultationChange} required placeholder="Your full name" /></label>
              <label>Email<input type="email" name="email" value={consultationData.email} onChange={handleConsultationChange} required placeholder="you@example.com" /></label>
              <label>Phone<input type="tel" name="phone" value={consultationData.phone} onChange={handleConsultationChange} required placeholder="Phone number" /></label>
              <label>City<input name="city" value={consultationData.city} onChange={handleConsultationChange} required placeholder="City" /></label>
            </div>

            <div className="form-section-title"><span>02</span><h3>Project Details</h3></div>
            <div className="form-grid-2">
              <label>Property Type<select name="propertyType" value={consultationData.propertyType} onChange={handleConsultationChange}><option>Apartment</option><option>Villa</option><option>Independent House</option><option>Office</option><option>Commercial</option><option>Renovation</option></select></label>
              <label>Property Area (sq.ft)<input type="number" min="1" name="area" value={consultationData.area} onChange={handleConsultationChange} required placeholder="Example: 1500" /></label>
              <label>Preferred Service<select name="service" value={consultationData.service} onChange={handleConsultationChange}><option>Residential</option><option>Modular Kitchen</option><option>Commercial</option><option>Turnkey</option><option>Renovation</option><option>3D Visualization</option></select></label>
              <label>Preferred Date<input type="date" name="preferredDate" min={new Date().toISOString().split("T")[0]} value={consultationData.preferredDate} onChange={handleConsultationChange} required /></label>
              <label>Budget Range<select name="budget" value={consultationData.budget} onChange={handleConsultationChange} required><option value="">Select budget</option><option>Under ₹5 lakh</option><option>₹5–10 lakh</option><option>₹10–20 lakh</option><option>₹20–50 lakh</option><option>₹50 lakh+</option></select></label>
              <label>Project Start Timeline<select name="timeline" value={consultationData.timeline} onChange={handleConsultationChange} required><option value="">Select timeline</option><option>Immediately</option><option>Within 1 month</option><option>1–3 months</option><option>3–6 months</option><option>Planning stage</option></select></label>
            </div>
            <label>Message<textarea name="message" rows="5" value={consultationData.message} onChange={handleConsultationChange} required placeholder="Tell us about your design requirements..."></textarea></label>
            <button type="submit" className="form-submit-button">Request Consultation →</button>
            {consultationSubmitted && <div className="success-message" role="status"><strong>Demo consultation request submitted.</strong><p>No data was sent to a server. This is a frontend-only simulation.</p></div>}
          </form>
        </section>

        <section id="enquiry" className="enquiry-section">
          <div className="consultation-header">
            <p className="section-label">PROJECT ENQUIRY</p>
            <h2>Build your project brief.</h2>
            <p>Complete the five steps to describe your property, requirements, budget, timeline, and additional needs.</p>
          </div>

          <div className="step-indicator">
            {[1,2,3,4,5].map((step) => <div key={step} className={enquiryStep === step ? "step active" : enquiryStep > step ? "step complete" : "step"}><span>{step}</span><small>{["Property","Requirements","Budget","Timeline","Additional"][step-1]}</small></div>)}
          </div>

          <form className="enquiry-form" onSubmit={submitEnquiry}>
            {enquiryStep === 1 && <div className="enquiry-panel"><h3>Step 1 — Property Information</h3><div className="form-grid-2"><label>Property Type<select name="propertyType" value={enquiryData.propertyType} onChange={handleEnquiryChange}><option>Apartment</option><option>Villa</option><option>Independent House</option><option>Office</option><option>Commercial</option><option>Renovation</option></select></label><label>Area (sq.ft)<input type="number" min="1" name="area" value={enquiryData.area} onChange={handleEnquiryChange} required placeholder="Example: 1500" /></label><label>Location<input name="location" value={enquiryData.location} onChange={handleEnquiryChange} required placeholder="City / locality" /></label></div></div>}
            {enquiryStep === 2 && <div className="enquiry-panel"><h3>Step 2 — Requirements</h3><div className="form-grid-2"><label>Rooms<input name="rooms" value={enquiryData.rooms} onChange={handleEnquiryChange} required placeholder="Living room, 2 bedrooms, kitchen..." /></label><label>Services<input name="services" value={enquiryData.services} onChange={handleEnquiryChange} required placeholder="Interior, kitchen, renovation..." /></label><label>Design Style<select name="style" value={enquiryData.style} onChange={handleEnquiryChange}><option>Modern</option><option>Contemporary</option><option>Minimalist</option><option>Scandinavian</option><option>Industrial</option><option>Traditional</option><option>Luxury</option><option>Bohemian</option><option>Japandi</option><option>Classic</option></select></label></div></div>}
            {enquiryStep === 3 && <div className="enquiry-panel"><h3>Step 3 — Budget</h3><div className="budget-options">{["Under ₹5 lakh","₹5–10 lakh","₹10–20 lakh","₹20–50 lakh","₹50 lakh+"].map((item)=><label key={item} className={enquiryData.budget===item ? "budget-option selected" : "budget-option"}><input type="radio" name="budget" value={item} checked={enquiryData.budget===item} onChange={handleEnquiryChange} />{item}</label>)}</div></div>}
            {enquiryStep === 4 && <div className="enquiry-panel"><h3>Step 4 — Timeline</h3><div className="budget-options">{["Immediately","Within 1 month","1–3 months","3–6 months","Planning stage"].map((item)=><label key={item} className={enquiryData.timeline===item ? "budget-option selected" : "budget-option"}><input type="radio" name="timeline" value={item} checked={enquiryData.timeline===item} onChange={handleEnquiryChange} />{item}</label>)}</div></div>}
            {enquiryStep === 5 && <div className="enquiry-panel"><h3>Step 5 — Additional Requirements</h3><label>Additional Requirements<textarea name="additional" rows="8" value={enquiryData.additional} onChange={handleEnquiryChange} required placeholder="Tell us anything else we should know about your project..."></textarea></label></div>}
            <div className="enquiry-actions">
              {enquiryStep > 1 && <button type="button" className="secondary-form-button" onClick={previousEnquiryStep}>← Previous</button>}
              {enquiryStep < 5 ? <button type="button" className="form-submit-button" onClick={nextEnquiryStep}>Next Step →</button> : <button type="submit" className="form-submit-button">Send Project Brief →</button>}
            </div>
            {enquirySubmitted && <div className="success-message" role="status"><strong>Demo project brief submitted.</strong><p>No data was sent to a server. This is a frontend-only simulation.</p></div>}
          </form>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <p className="section-label">READY TO BEGIN?</p>

            <h2>
              Let's create a space
              <br />
              around you.
            </h2>

            <p>
              Share your project requirements and start a conversation about
              your interior design ideas.
            </p>

            <a href="#contact" className="cta-button">
              Request Consultation →
            </a>
          </div>
        </section>

        <section id="contact" className="contact-section">
  <div className="section-heading">
    <p className="section-label">GET IN TOUCH</p>
    <h2>Let’s create something beautiful.</h2>
    <p>
      Tell us about your space and the fictional CasaForma Interiors team
      will help you take the next step.
    </p>
  </div>

  <div className="contact-layout">
    <div className="contact-info-panel">
      <div className="contact-info-card">
        <div className="contact-icon">⌖</div>
        <div>
          <h3>Office</h3>
          <p>CasaForma Interiors<br />12 Design Avenue, Hyderabad</p>
        </div>
      </div>

      <div className="contact-info-card">
        <div className="contact-icon">☎</div>
        <div>
          <h3>Phone</h3>
          <a href="tel:+919000000000">+91 90000 00000</a>
        </div>
      </div>

      <div className="contact-info-card">
        <div className="contact-icon">✉</div>
        <div>
          <h3>Email</h3>
          <a href="mailto:hello@casaforma.example">hello@casaforma.example</a>
        </div>
      </div>

      <div className="contact-info-card">
        <div className="contact-icon">◷</div>
        <div>
          <h3>Working Hours</h3>
          <p>Mon – Sat: 9:00 AM – 6:00 PM<br />Sunday: By appointment</p>
        </div>
      </div>

      <a
        className="whatsapp-cta"
        href="https://wa.me/919000000000"
        target="_blank"
        rel="noreferrer"
      >
        <span className="whatsapp-symbol">◉</span>
        <span>
          <strong>Chat on WhatsApp</strong>
          <small>Quick project enquiries</small>
        </span>
        <span className="cta-arrow">→</span>
      </a>

      <div className="social-links">
        <h3>Follow CasaForma</h3>
        <div className="social-link-row">
          <a href="#" onClick={(e) => e.preventDefault()}>Instagram</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Facebook</a>
          <a href="#" onClick={(e) => e.preventDefault()}>LinkedIn</a>
        </div>
        <small>Social profiles are fictional demo links.</small>
      </div>
    </div>

    <div className="contact-form-card">
      <div className="contact-card-heading">
        <span>PROJECT ENQUIRY</span>
        <h3>Start a conversation</h3>
        <p>Share the basics and we’ll have a better idea of how to help.</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Thank you! This is a fictional demo enquiry for CasaForma Interiors.");
        }}
      >
        <div className="form-grid">
          <label>
            Name
            <input type="text" name="name" placeholder="Your name" required />
          </label>

          <label>
            Phone
            <input type="tel" name="phone" placeholder="+91 90000 00000" required />
          </label>

          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" required />
          </label>

          <label>
            Service
            <select name="service" defaultValue="" required>
              <option value="" disabled>Select a service</option>
              <option>Residential Interiors</option>
              <option>Modular Kitchens</option>
              <option>Commercial Interiors</option>
              <option>Turnkey Interiors</option>
              <option>Renovation</option>
              <option>3D Visualization</option>
            </select>
          </label>
        </div>

        <label>
          Message
          <textarea
            name="message"
            rows="5"
            placeholder="Tell us about your space, requirements and timeline..."
            required
          />
        </label>

        <button type="submit" className="primary-btn contact-submit">
          Send Enquiry <span>→</span>
        </button>
      </form>
    </div>
  </div>

  <div className="map-card">
    <div className="map-placeholder">
      <div className="map-grid-lines"></div>
      <div className="map-pin">⌖</div>
      <div className="map-label">
        <strong>CasaForma Interiors</strong>
        <span>12 Design Avenue, Hyderabad</span>
        <small>Fictional demo location</small>
      </div>
    </div>
  </div>
</section>
      </main>

      <footer>
        <div className="footer-content">
          <div>
            <h3>CASAFORMA INTERIORS</h3>
            <p>Interior Design Studio • Fictional Demo Brand</p>
          </div>

          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#gallery">Gallery</a>
            <a href="#process">Process</a>
            <a href="#design-quiz">Style Quiz</a>
            <a href="#saved-projects">Saved Projects</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 CasaForma Interiors. Fictional demo website.</p>
          <p>Designed with purpose.</p>
        </div>
      </footer>

      {selectedProject && (
        <div className="modal-overlay" onClick={closeModals}>
          <div
            className="project-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={closeModals}
              aria-label="Close project details"
            >
              ✕
            </button>

            <button
              type="button"
              className={savedProjectIds.includes(selectedProject.id) ? "save-project-button saved" : "save-project-button"}
              onClick={() => toggleSavedProject(selectedProject.id)}
              aria-pressed={savedProjectIds.includes(selectedProject.id)}
            >
              {savedProjectIds.includes(selectedProject.id) ? "♥ Saved" : "♡ Save Project"}
            </button>

            <div
              className="modal-image"
              style={{ backgroundImage: `url("${selectedProject.image}")` }}
            />

            <div className="modal-content">
              <p className="section-label">
                {selectedProject.type} • {selectedProject.location}
              </p>

              <h2>{selectedProject.name}</h2>

              <p className="modal-subtitle">
                {selectedProject.style} • {selectedProject.area}
              </p>

              <div className="project-meta">
                <div>
                  <span>PROPERTY / PROJECT TYPE</span>
                  <strong>{selectedProject.type}</strong>
                </div>
                <div>
                  <span>DESIGN STYLE</span>
                  <strong>{selectedProject.style}</strong>
                </div>
                <div>
                  <span>AREA</span>
                  <strong>{selectedProject.area}</strong>
                </div>
                <div>
                  <span>SCOPE</span>
                  <strong>{selectedProject.scope}</strong>
                </div>
              </div>

              <h4>Project Brief</h4>
              <p>{selectedProject.description}</p>

              <h4>Design Challenge</h4>
              <p>{selectedProject.challenge}</p>

              <h4>Design Concept</h4>
              <p>{selectedProject.concept}</p>

              <p className="demo-note">
                {selectedProject.status}: content and project information are
                fictional examples for this frontend assignment.
              </p>

              <a
                href="#contact"
                className="modal-button"
                onClick={closeModals}
              >
                Discuss a Similar Project →
              </a>
            </div>
          </div>
        </div>
      )}

      {selectedService && (
        <div className="modal-overlay" onClick={closeModals}>
          <div
            className="service-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={closeModals}
              aria-label="Close service details"
            >
              ✕
            </button>

            <span className="modal-number">{selectedService.number}</span>

            <p className="section-label">OUR SERVICE</p>

            <h2>{selectedService.title}</h2>

            <p>{selectedService.details}</p>

            <a
              href="#contact"
              className="modal-button"
              onClick={closeModals}
            >
              Enquire About This Service →
            </a>
          </div>
        </div>
      )}


      {selectedGalleryImage && (
        <div className="gallery-lightbox" onClick={() => setSelectedGalleryImage(null)}>
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button
              className="lightbox-close"
              onClick={() => setSelectedGalleryImage(null)}
              aria-label="Close image"
            >
              ✕
            </button>
            <img src={selectedGalleryImage.image} alt={selectedGalleryImage.title} />
            <div className="lightbox-caption">
              <div>
                <span>{selectedGalleryImage.category}</span>
                <h3>{selectedGalleryImage.title}</h3>
              </div>
              <span>
                {galleryImages.findIndex((image) => image.id === selectedGalleryImage.id) + 1} / {galleryImages.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {showTopButton && (
        <button
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default App;
