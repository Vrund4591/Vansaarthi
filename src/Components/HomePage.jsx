import { TreePine, Heart, UsersRound, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import Card from "./Card";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion"; // Add AnimatePresence import
import { AnimateOnScroll } from "./AnimateonScroll";
import { useNavigate, Link } from 'react-router-dom';
import AnimatedCounter from './AnimatedCounter';
// import bg from '../../public/bg.jpg';
const bg = '/bg.jpg';
const impactData = [
  { number: '10000', text: 'Trees Planted', color: 'text-[#3BDE3B]' },
  { number: '3000', text: 'Animals Rescued', color: 'text-blue-500' },
  { number: '50', text: 'Communities Served', color: 'text-[#3BDE3B]' },
  { number: '1000', text: 'Volunteers', color: 'text-blue-500' }
];

// Add these animation variants outside the component
const slideVariants = {
  enter: (direction) => ({
    x: direction === "next" ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction === "next" ? -1000 : 1000,
    opacity: 0
  })
};

const HomePage = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [showCard1, setShowCard1] = useState(false);
  const [showCard2, setShowCard2] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [galleryData, setGalleryData] = useState([]);
  const navigate = useNavigate();
  const [hasAnimated, setHasAnimated] = useState(false);

  // Backend coldstart function
  const initializeBackend = async () => {
    try {
      // Send a request to backend health/ping endpoint
       // Using environment variable for backend URL
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ping`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Backend initialized:', response.ok);
    } catch (error) {
      // Silent fail - we don't want to interrupt user experience
      // if backend is down or unreachable
      console.log('Backend coldstart attempt:', error.message);
    }
  };

  // Send backend initialization request on component mount
  useEffect(() => {
    // Immediately trigger backend warmup
    initializeBackend();
    
    // You could also add a retry mechanism if needed
    // const retryTimer = setTimeout(() => {
    //   initializeBackend();
    // }, 5000);
    // return () => clearTimeout(retryTimer);
  }, []);

  useEffect(() => {
    const titleTimer = setTimeout(() => setShowTitle(true), 800);
    const card1Timer = setTimeout(() => setShowCard1(true), 900);
    const card2Timer = setTimeout(() => setShowCard2(true), 910);

    // Image slider auto-rotation with safety checks
    const interval = setInterval(() => {
      if (galleryData.length > 0) {  // Only rotate if we have images
        setCurrentImageIndex((prev) => (prev + 1) % galleryData.length);
      }
    }, 5000); // Increased to 5 seconds for smoother transitions

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(card1Timer);
      clearTimeout(card2Timer);
      clearInterval(interval);
    };
  }, [galleryData.length]); // Added dependency

  useEffect(() => {
    // Function to load images from public/gallery
    const loadGalleryImages = async () => {
      try {
        // Get list of files from public/gallery directory
        const images = await import.meta.glob('/public/gallery/*');
        
        // Transform the images into our gallery data format
        const galleryItems = Object.keys(images).map((path, index) => ({
          id: index + 1,
          src: path.replace('/public', ''), // Remove /public from path
          // title: `${index + 1}`,
        }));
        
        setGalleryData(galleryItems);
      } catch (error) {
        console.error('Error loading gallery images:', error);
        // Fallback to empty array if there's an error
        setGalleryData([]);
      }
    };

    loadGalleryImages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Get gallery section position
      const gallerySection = document.getElementById('gallery-section');
      if (gallerySection) {
        const rect = gallerySection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        // Reset animation when section is out of view
        if (!isVisible && hasAnimated) {
          setHasAnimated(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAnimated]);

  // Helper function to get image at index with wraparound
  const getImageAt = (index) => {
    if (!galleryData.length) return null;
    const wrappedIndex = ((index % galleryData.length) + galleryData.length) % galleryData.length;
    return galleryData[wrappedIndex];
  };

  const handleImageChange = (newIndex) => {
    setDirection(newIndex > currentImageIndex ? 'next' : 'prev');
    setCurrentImageIndex(newIndex);
  };

  const handleVolunteerClick = () => {
    navigate('/volunteer');
  };

  return (
    <div className='w-full overflow-x-hidden'>
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative flex justify-between items-center min-h-screen w-full"
      >
        <div style={{ backgroundImage: `url(${bg})` }} className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0" >


        <div className="relative flex flex-col justify-center items-center w-full max-w-[1200px] mx-auto px-4 z-10 pt-64">
            <div className={`transform transition-all duration-1000 opacity-0 ${showTitle ? 'opacity-100' : ''}`}>
                <div className="text-3xl md:text-5xl lg:text-7xl text-center text-black font-bold px-2 md:px-6 py-4 md:py-7">अशक्यं प्रकृते ऋते जीवनम्</div>
            </div>
            <div className={`px-4 transform transition-all duration-1000 opacity-0 ${showCard1 ? 'opacity-100' : ''}`}>
                <div className="py-3 md:py-5 text-black px-2 md:px-4 w-full md:w-[700px] text-base md:text-xl text-center">Life is impossible without nature. Join us in preserving our planet for future generations.</div>
            </div>
            <div className={`mt-3 md:mt-5 transform transition-all duration-1000 opacity-0 ${showCard2 ? 'opacity-100' : ''}`}>
                <Card backgroundColor="bg-[#F97316] hover:bg-orange-600 transition-colors" textColor="text-black">
                    <button 
                      onClick={handleVolunteerClick}
                      className="py-3 md:py-4 px-6 md:px-10 text-base md:text-lg"
                    >
                      Join Our Mission
                    </button>
                </Card>
            </div>
        </div>
        </div>
      </motion.div>

      {/* Focus Areas Section */}
      <div className="bg-white py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll animation="slideIn">
            <div className="inline-block mb-10">
              <Card backgroundColor="bg-[#F97316]" textColor="text-black">
                <div className='py-2 px-4 text-2xl md:text-4xl font-bold whitespace-nowrap'>Our Focus Areas</div>
              </Card>
            </div>
          </AnimateOnScroll>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <AnimateOnScroll animation="fadeUp">
              <div className="">
                <Card backgroundColor="bg-white" textColor="text-black">
                    <div className="p-6">
                        <div className=''><TreePine size={50} color="#00c700" strokeWidth={3.5} absoluteStrokeWidth/></div>
                        <div className='text-2xl font-semibold py-4'>Environment Preservation</div>
                        <div className=''>Protecting and restoring natural habitats through sustainable practices.</div>
                    </div>
                </Card>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeUp">
              <div className="">
                <Card backgroundColor="bg-white" textColor="text-black">
                    <div className="p-6">
                        <div className=''><Heart size={50} color="#ff0000" strokeWidth={3.5} absoluteStrokeWidth/></div>
                        <div className='text-2xl font-semibold py-4'>Animal Rescue</div>
                        <div className=''>Providing care and protection to wildlife and domestic animals in need.</div>
                    </div>
                </Card>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeUp">
              <div className="">
                <Card backgroundColor="bg-white" textColor="text-black">
                    <div className="p-6">
                        <div className=''><UsersRound size={50} color="#4268ff" strokeWidth={3.5} absoluteStrokeWidth/></div>
                        <div className='text-2xl font-semibold py-4'>Community Empowerment</div>
                        <div className=''>Building stronger communities through education and sustainable development.</div>
                    </div>
                </Card>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>

      {/* Goals Section */}
      <div className='bg-slate-100 py-12 md:py-20'>
        <div className='max-w-7xl mx-auto px-4'>
          <AnimateOnScroll animation="slideIn">
            <div className='inline-block mb-10'>
              <Card backgroundColor="bg-[#F97316]" textColor="text-black">
                <div className='py-2 px-4 text-2xl md:text-4xl font-bold whitespace-nowrap'>Achievable Goals</div>
              </Card>
            </div>
          </AnimateOnScroll>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <AnimateOnScroll animation="scale">
              <div className='flex flex-col justify-center items-center bg-white w-full h-32 rounded-xl border-dashed border-green-400 border-2 text-center'>
                  <div className='text-2xl font-bold p-2'>
                    <AnimatedCounter end={10000} /> Trees
                  </div>
                  <div className='text-sm p-2'>Target Trees to be Planted</div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="scale">
              <div className='flex flex-col justify-center items-center bg-white w-full h-32 rounded-xl border-dashed border-green-400 border-2 text-center'>
                  <div className='text-2xl font-bold p-2'>
                    <AnimatedCounter end={3000} /> Animals
                  </div>
                  <div className='text-sm p-2'>Target Animals to be Rescued</div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="scale">
              <div className='flex flex-col justify-center items-center bg-white w-full h-32 rounded-xl border-dashed  border-green-400 border-2 text-center'>
                  <div className='text-2xl font-bold p-2'>
                    <AnimatedCounter end={50} /> Communities
                  </div>
                  <div className='text-sm p-2'>Target Communities to Empower</div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className='py-12 md:py-20'>
        <div className='max-w-7xl mx-auto px-4'>
          <AnimateOnScroll animation="slideIn">
            <div className='inline-block mb-10'>
              <Card backgroundColor="bg-[#F97316]" textColor="text-black">
                <div className='py-2 px-4 text-2xl md:text-4xl font-bold whitespace-nowrap'>Our Impact</div>
              </Card>
            </div>
          </AnimateOnScroll>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {impactData.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className='w-full'>
                  <Card backgroundColor="bg-white hover:bg-gray-50 transition-colors" textColor="text-black">
                    <div className='flex flex-col justify-center items-center h-28 w-full'>
                      <div className={`text-4xl font-bold ${item.color}`}>
                        <AnimatedCounter end={parseInt(item.number)} />
                      </div>
                      <div className='text-gray-600 font-medium'>{item.text}</div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
    </div>

      {/* Gallery Section */}
      <div id="gallery-section" className='py-12 md:py-20 bg-gray-100'>
        <div className='max-w-7xl mx-auto px-4'>
          <AnimateOnScroll 
            animation="slideIn" 
            onAnimationComplete={() => setHasAnimated(true)}
            key={hasAnimated ? 'animated' : 'not-animated'} // Force re-render
          >
            <div className='inline-block mb-10'>
              <Card backgroundColor="bg-[#F97316]" textColor="text-black">
                <div className='py-2 px-4 text-2xl md:text-4xl font-bold whitespace-nowrap'>Gallery</div>
              </Card>
            </div>
          </AnimateOnScroll>
          
          <AnimateOnScroll animation="fadeIn">
            <div className='relative h-[500px] md:h-[700px] flex items-center justify-center overflow-hidden'>
              {galleryData.length > 0 ? (
                <div className='absolute w-full h-full flex items-center justify-center' style={{ perspective: '2500px' }}>
                  {/* Previous Image */}
                  {getImageAt(currentImageIndex - 1) && (
                    <div 
                      className="absolute w-2/5 h-[280px] md:h-[420px] transition-all duration-500 ease-in-out
                          hover:opacity-60 cursor-pointer"
                      style={{
                        left: '5%',
                        transform: 'perspective(2500px) rotateY(45deg) translateX(-120px) translateZ(-350px) scale(0.8)',
                        transformOrigin: 'right center',
                        opacity: 0.35,
                        zIndex: 1
                      }}
                      onClick={() => handleImageChange((currentImageIndex - 1 + galleryData.length) % galleryData.length)}
                    >
                      <img 
                        src={getImageAt(currentImageIndex - 1)?.src} 
                        alt={getImageAt(currentImageIndex - 1)?.title || 'Previous image'} 
                        className='w-full h-full object-cover rounded-lg shadow-2xl brightness-75'
                        draggable="false"
                        loading="eager"
                      />
                    </div>
                  )}

                  {/* Current Image */}
                  <AnimatePresence initial={false} custom={direction}>
                    {getImageAt(currentImageIndex) && (
                      <motion.div
                        key={currentImageIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          x: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 }
                        }}
                        className="absolute w-[70%] h-[320px] md:h-[480px] bg-black rounded-lg"
                        style={{
                          transformOrigin: 'center center',
                          zIndex: 999,
                          boxShadow: '0 0 50px 20px rgba(0,0,0,0.5)',
                          overflow: 'hidden'
                        }}
                      >
                        <div className='relative h-full w-full rounded-lg overflow-hidden shadow-2xl bg-black'>
                          <img 
                            src={getImageAt(currentImageIndex)?.src}
                            alt={getImageAt(currentImageIndex)?.title || 'Current image'}
                            className='w-full h-full object-cover transition-transform duration-700 hover:scale-105'
                            draggable="false"
                            loading="eager"
                            style={{ zIndex: 998 }}
                          />
                          <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6' style={{ zIndex: 999 }}>
                            <h3 className='text-xl font-semibold text-white'>
                              {getImageAt(currentImageIndex)?.title}
                            </h3>
                            <p className='text-sm mt-2 text-white/90'>
                              {getImageAt(currentImageIndex)?.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Next Image */}
                  {getImageAt(currentImageIndex + 1) && (
                    <div 
                      className="absolute w-2/5 h-[280px] md:h-[420px] transition-all duration-700 ease-out
                          hover:opacity-60 cursor-pointer"
                      style={{
                        right: '5%',
                        transform: 'perspective(2500px) rotateY(-45deg) translateX(120px) translateZ(-350px) scale(0.8)',
                        transformOrigin: 'left center',
                        opacity: 0.35,
                        zIndex: 1
                      }}
                      onClick={() => handleImageChange((currentImageIndex + 1) % galleryData.length)}
                    >
                      <img 
                        src={getImageAt(currentImageIndex + 1)?.src} 
                        alt={getImageAt(currentImageIndex + 1)?.title || 'Next image'} 
                        className='w-full h-full object-cover rounded-lg shadow-2xl brightness-75'
                        draggable="false"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center bg-gray-100 rounded-lg w-full h-full">
                  <p className="text-gray-500">Loading gallery...</p>
                </div>
              )}

              {/* Navigation Dots */}
              {galleryData.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1'
                >
                  {galleryData.length > 5 ? (
                    // Show limited dots with current group
                    Array.from({ length: 5 }, (_, i) => {
                      const startIndex = Math.max(0, Math.min(
                        currentImageIndex - 2,
                        galleryData.length - 5
                      ));
                      const dotIndex = startIndex + i;
                      
                      return (
                        <button
                          key={dotIndex}
                          onClick={() => handleImageChange(dotIndex)}
                          className={`transition-all duration-300 rounded-full
                            ${dotIndex === currentImageIndex 
                              ? 'w-4 h-1.5 bg-green-500' 
                              : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/70'}`}
                          aria-label={`Go to image ${dotIndex + 1}`}
                        />
                      );
                    })
                  ) : (
                    // Show all dots if total images are 5 or less
                    galleryData.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleImageChange(index)}
                        className={`transition-all duration-300 rounded-full
                          ${index === currentImageIndex 
                            ? 'w-4 h-1.5 bg-green-500' 
                            : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/70'}`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))
                  )}
                </motion.div>
              )}
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className='bg-black text-white'
      >
        <div className='max-w-7xl mx-auto px-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12'>
                <div>
                    <div className='text-xl font-semibold mb-4'>Vansaarthi</div>
                    <div>Working towards a sustainable future.</div>
                </div>
                <div>
                    <div className='text-md font-semibold mb-4'>Quick Links</div>
                    <div className='space-y-2'>
                        <Link to="/about" className='block hover:text-gray-300 cursor-pointer transition-colors'>
                            About Us
                        </Link>
                        <Link to="/projects" className='block hover:text-gray-300 cursor-pointer transition-colors'>
                            Projects
                        </Link>
                        <Link to="/volunteer" className='block hover:text-gray-300 cursor-pointer transition-colors'>
                            Volunteer
                        </Link>
                        <a href="#contact-section" 
                           className='block hover:text-gray-300 cursor-pointer transition-colors'
                           onClick={(e) => {
                             e.preventDefault();
                             document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                           }}>
                            Contact
                        </a>
                    </div>
                </div>
                <div>
                    <div id='contact-section' className='text-md font-semibold mb-4'>Connect</div>
                    <div className='flex gap-4'>
                        <div className='hover:text-gray-300 cursor-pointer'>
                            <a href="https://www.facebook.com/p/Vansaarthi-Ngo-61572960507082/?hr=1&_rdr" target="_blank" rel="noopener noreferrer">
                                <Facebook />
                            </a>
                        </div>
                        <div className='hover:text-gray-300 cursor-pointer'>
                            <a href="https://x.com/vansaarthi11?t=5z4OAS65azg4uo0X3AQ-IA&s=09" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 50 50" fill="currentColor">
                                    <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z" />
                                </svg>
                            </a>
                        </div>
                        <div className='hover:text-gray-300 cursor-pointer'>
                            <a href="https://www.instagram.com/vansaarthi11/" target="_blank" rel="noopener noreferrer">
                                <Instagram />
                            </a>
                        </div>
                        <div className='hover:text-gray-300 cursor-pointer'>
                            <a href="https://youtube.com/@vansarthi?si=Str6cB3kDyglow7T" target="_blank" rel="noopener noreferrer">
                                <Youtube />
                            </a>
                        </div>
                        {/* <div className='hover:text-gray-300 cursor-pointer'><Linkedin /></div> */}
                    </div>
                </div>
                <div>
                    <div className='text-md font-semibold mb-4'>Contact</div>
                    <div className='space-y-2'>
                        <div>Email: vansaarthi.ngo@gmail.com</div>
                        <div>Phone: +91 7990651308</div>
                    </div>
                </div>
            </div>
            <div className='py-6 border-t border-slate-100/30 text-center text-sm'>
                &copy; 2025 Vansaarthi. All rights reserved.
            </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default HomePage;