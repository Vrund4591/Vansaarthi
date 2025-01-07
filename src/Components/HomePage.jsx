import { TreePine, Heart, UsersRound, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Card from "./Card";
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { AnimateOnScroll } from "./AnimateOnScroll";
import { useNavigate } from 'react-router-dom';
// import bg from '../../public/bg.jpg';
const galleryData = [
  {
    id: 1,
    src: '/bg.png',
    title: 'Tree Plantation Drive',
    description: 'Community effort in planting trees',
  },
  {
    id: 2,
    src: '/plant.jpeg',
    title: 'Animal Rescue',
    description: 'Helping animals in need',
  },
  {
    id: 3,
    src: '/bg.png',
    title: 'Community Service',
    description: 'Working with local communities',
  },
  {
    id: 4,
    src: '/plant.jpeg',
    title: 'Environmental Clean-up',
    description: 'Cleaning our surroundings',
  },
  // Add more images easily with this structure
];
const bg = '/bg.jpg';
const impactData = [
  { number: '10000', text: 'Trees Planted', color: 'text-[#3BDE3B]' },
  { number: '500', text: 'Animals Rescued', color: 'text-blue-500' },
  { number: '50', text: 'Communities Served', color: 'text-[#3BDE3B]' },
  { number: '1000', text: 'Volunteers', color: 'text-blue-500' }
];

const HomePage = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [showCard1, setShowCard1] = useState(false);
  const [showCard2, setShowCard2] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const navigate = useNavigate();

  useEffect(() => {
    const titleTimer = setTimeout(() => setShowTitle(true), 800);
    const card1Timer = setTimeout(() => setShowCard1(true), 900);
    const card2Timer = setTimeout(() => setShowCard2(true), 910);

    // Image slider auto-rotation
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryData.length);
    }, 3000);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(card1Timer);
      clearTimeout(card2Timer);
      clearInterval(interval);
    };
  }, []);

  // Helper function to get image at index with wraparound
  const getImageAt = (index) => {
    const wrappedIndex = (index + galleryData.length) % galleryData.length;
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
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
                <Card backgroundColor="bg-[#ff615e] hover:bg-[#ff4744] transition-colors" textColor="text-black">
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
              <Card backgroundColor="bg-[#ff615e]" textColor="text-black">
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
              <Card backgroundColor="bg-[#ff615e]" textColor="text-black">
                <div className='py-2 px-4 text-2xl md:text-4xl font-bold whitespace-nowrap'>Achievable Goals</div>
              </Card>
            </div>
          </AnimateOnScroll>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <AnimateOnScroll animation="scale">
              <div className='flex flex-col justify-center items-center bg-white w-full h-32 rounded-xl border-dashed border-green-400 border-2 text-center'>
                  <div className='text-2xl font-bold p-2'>10000 Trees</div>
                  <div className='text-sm p-2'>Target Trees to be Planted</div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="scale">
              <div className='flex flex-col justify-center items-center bg-white w-full h-32 rounded-xl border-dashed border-green-400 border-2 text-center'>
                  <div className='text-2xl font-bold p-2'>500 Animals</div>
                  <div className='text-sm p-2'>Target Animals to be Rescued</div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="scale">
              <div className='flex flex-col justify-center items-center bg-white w-full h-32 rounded-xl border-dashed  border-green-400 border-2 text-center'>
                  <div className='text-2xl font-bold p-2'>50 Communities</div>
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
              <Card backgroundColor="bg-[#ff615e]" textColor="text-black">
                <div className='py-2 px-4 text-2xl md:text-4xl font-bold whitespace-nowrap'>Our Impact</div>
              </Card>
            </div>
          </AnimateOnScroll>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {impactData.map((item, i) => (
              <AnimateOnScroll key={i} animation="fadeUp">
                <div className='w-full'>
                  <Card backgroundColor="bg-white hover:bg-gray-50 transition-colors" textColor="text-black">
                    <div className='flex flex-col justify-center items-center h-28 w-full'>
                      <div className={`text-4xl font-bold ${item.color}`}>{item.number}</div>
                      <div className='text-gray-600 font-medium'>{item.text}</div>
                    </div>
                  </Card>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className='py-12 md:py-20 bg-gray-100'>
        <div className='max-w-7xl mx-auto px-4'>
          <AnimateOnScroll animation="slideIn">
            <div className='inline-block mb-10'>
              <Card backgroundColor="bg-[#ff615e]" textColor="text-black">
                <div className='py-2 px-4 text-2xl md:text-4xl font-bold whitespace-nowrap'>Gallery</div>
              </Card>
            </div>
          </AnimateOnScroll>
          
          <AnimateOnScroll animation="fadeIn">
            <div className='relative h-[500px] md:h-[700px] flex items-center justify-center overflow-hidden'>
                <div className='absolute w-full h-full flex items-center justify-center'>
                    {/* Previous Image */}
                    <div 
                        className={`absolute w-2/5 h-[280px] md:h-[420px] transition-all duration-700 ease-out
                            hover:opacity-75 cursor-pointer`}
                        style={{
                            left: '5%',
                            transform: 'perspective(2000px) rotateY(45deg) translateX(-100px) translateZ(-150px) scale(0.85)',
                            transformOrigin: 'right center',
                            opacity: 0.6,
                            zIndex: 1
                        }}
                        onClick={() => handleImageChange((currentImageIndex - 1 + galleryData.length) % galleryData.length)}
                    >
                        <img 
                            src={getImageAt(currentImageIndex - 1).src} 
                            alt={getImageAt(currentImageIndex - 1).title} 
                            className='w-full h-full object-cover rounded-lg shadow-2xl'
                            draggable="false"
                        />
                    </div>

                    {/* Current Image */}
                    <div 
                        className={`absolute w-3/5 h-[320px] md:h-[480px] transition-all duration-700 ease-out transform
                            ${direction === 'next' ? 'animate-slideIn' : 'animate-slideOut'}`}
                        style={{
                            transform: 'perspective(2000px) scale(1)',
                            transformOrigin: 'center center',
                            zIndex: 2
                        }}
                    >
                        <div className='relative h-full rounded-lg overflow-hidden shadow-2xl'>
                            <img 
                                src={getImageAt(currentImageIndex).src}
                                alt={getImageAt(currentImageIndex).title}
                                className='w-full h-full object-cover transition-transform duration-700 hover:scale-105'
                                draggable="false"
                            />
                            <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6'>
                                <h3 className='text-xl font-semibold text-white'>
                                    {getImageAt(currentImageIndex).title}
                                </h3>
                                <p className='text-sm mt-2 text-white/90'>
                                    {getImageAt(currentImageIndex).description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Next Image */}
                    <div 
                        className={`absolute w-2/5 h-[280px] md:h-[420px] transition-all duration-700 ease-out
                            hover:opacity-75 cursor-pointer`}
                        style={{
                            right: '5%',
                            transform: 'perspective(2000px) rotateY(-45deg) translateX(100px) translateZ(-150px) scale(0.85)',
                            transformOrigin: 'left center',
                            opacity: 0.6,
                            zIndex: 1
                        }}
                        onClick={() => handleImageChange((currentImageIndex + 1) % galleryData.length)}
                    >
                        <img 
                            src={getImageAt(currentImageIndex + 1).src} 
                            alt={getImageAt(currentImageIndex + 1).title} 
                            className='w-full h-full object-cover rounded-lg shadow-2xl'
                            draggable="false"
                        />
                    </div>
                </div>

                {/* Navigation Dots */}
                <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
                    {galleryData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleImageChange(index)}
                            className={`transition-all duration-300 rounded-full
                                ${index === currentImageIndex 
                                    ? 'w-8 h-2 bg-red-500' 
                                    : 'w-2 h-2 bg-red-500/50 hover:bg-white/70'}`}
                        />
                    ))}
                </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
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
                        <div className='hover:text-gray-300 cursor-pointer'>About Us</div>
                        <div className='hover:text-gray-300 cursor-pointer'>Projects</div>
                        <div className='hover:text-gray-300 cursor-pointer'>Contact</div>
                    </div>
                </div>
                <div>
                    <div id='contact-section' className='text-md font-semibold mb-4'>Connect</div>
                    <div className='flex gap-4'>
                        <div className='hover:text-gray-300 cursor-pointer'><Facebook /></div>
                        <div className='hover:text-gray-300 cursor-pointer'><Twitter /></div>
                        <div className='hover:text-gray-300 cursor-pointer'>
                            <a href="https://www.instagram.com/vansarthi11/" target="_blank" rel="noopener noreferrer">
                                <Instagram />
                            </a>
                        </div>
                        <div className='hover:text-gray-300 cursor-pointer'><Linkedin /></div>
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
                &copy; 2024 Vansaarthi. All rights reserved.
            </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default HomePage;