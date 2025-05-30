import React from 'react'; // Remove useState as it's not needed anymore
import Card from './Card';
import { AnimateOnScroll } from "./AnimateonScroll";
import { motion } from "framer-motion";

const About = () => {
    // Committee members with standardized image paths
    const members = [
        { 
            name: "Yash Chaudhary", 
            position: "Founder", 
            image: "/members/yash Chaudhary.jpeg"  // Fixed filename format
        },
        { 
            name: "Vrund Chaudhary", 
            position: "Co-Founder", 
            image: "/members/Vrund Chaudharu.jpeg"  // Standardized path
        },
        { 
            name: "Raj Prajapati", 
            position: "Co-Founder", 
            image: "/members/Raj Prajapati.jpeg"  // Standardized path
        },
        { 
            name: "Kush Chaudhary", 
            position: "Trust Member", 
            image: "/members/Kush Chaudhary.jpeg"  // Standardized path
        },
        { 
            name: "Varshil Patel", 
            position: "Trust Member", 
            image: "/members/Varshil Patel.jpeg"  // Standardized path
        },
        { 
            name: "Nisarg Chaudhary", 
            position: "Trust Member", 
            image: "/members/Nisarg Chaudhary.jpeg"  // Standardized path
        },
        { 
            name: "Hariom Tarar", 
            position: "Trust Member", 
            image: "/members/Hariom Tarar.jpeg"  // Standardized path
        },
        { 
            name: "Gautam Rajpurohit", 
            position: "Trust Member", 
            image: "/members/Gautam Rajpurohit.jpeg"
        },
        { 
            name: "Kalyan Purohit", 
            position: "Trust Member", 
            image: "/members/Kalyan Purohit.jpeg"
        },
        { 
            name: "Avadh Chaudhary", 
            position: "Trust Member", 
            image: "/members/Avadh Chaudhary.jpeg"
        },
        { 
            name: "Dev Chaudhary", 
            position: "Trust Member", 
            image: "/members/Dev Chaudhary.jpeg"
        },
    ];

  return (
    <div className="w-full min-h-screen">
        <div className="container mx-auto py-10">
            <div className="flex w-full">
                <div className="flex justify-start items-start px-4">
            <AnimateOnScroll animation="slideIn">
                <Card backgroundColor="bg-[#3BDE3B]" textColor="text-black">
                    <div className="text-4xl font-bold px-6 py-2 text-black">About Vansaarthi</div>
                </Card>
            </AnimateOnScroll>
                </div>
            </div>

            <AnimateOnScroll animation="slideIn">
            <div className="flex flex-col md:flex-row gap-6 py-4 px-4 w-full">
                <div className="flex-1">
                    <Card backgroundColor="bg-white" textColor="text-black">
                        <div className="p-4 flex flex-col h-full">
                        <div className="text-2xl font-bold mb-4 text-black">Our Story</div>
                        <div className="text-base mb-4 text-black">
                            Vansaarthi was officially established on 22 November 2024, but its story began with
                            the "Project Rewild" program in 2020. Founded by Yash Chaudhary, with co-founders
                            Vrund Chaudhary and Raj Prajapati, we've grown into a beacon of hope for the
                            environment and wildlife.
                        </div>
                        <div className="text-base text-black">
                            Based in Shikha Dhansura, Aravalli District, we actively operate in nearby cities like
                            Modasa, Bayad, and Demai, expanding our reach as we evolve.
                        </div>
                        </div>
                    </Card>
                </div>
                
                <div className="flex-1">
                    <Card backgroundColor="bg-white" textColor="text-black">
                        <div className="p-4 flex flex-col h-full">
                        <div className="text-2xl font-bold mb-4 text-black">Our Impact</div>
                        <div className="space-y-4">
                            {[
                            'Rescued over 1,000 animals',
                            'Planted more than 5,000 trees',
                            'Active in multiple cities',
                            'Growing community of volunteers'
                            ].map((impact, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <div className="text-black">✓</div>
                                <div className="text-black">{impact}</div>
                            </div>
                            ))}
                        </div>
                        </div>
                    </Card>
                </div>
            </div>
            </AnimateOnScroll>
        </div>
        <div className='bg-slate-100'>
          <div className="px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 mx-0 sm:mx-2 md:mx-4 lg:mx-8 xl:mx-20">
            <AnimateOnScroll animation="slideIn">
              <div className='flex'>
                <div className="flex justify-start mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                  <Card backgroundColor="bg-[#F97316]" textColor="text-black">
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 lg:px-6">Meet Our Committee</div>
                  </Card>
                </div>
              </div>
            </AnimateOnScroll>
          
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mx-1 sm:mx-2 md:mx-4 lg:mx-6 xl:mx-10 px-1 sm:px-2 md:px-4 lg:px-6 xl:px-10 py-4 sm:py-6 md:py-8 lg:py-10'>
              {members.map((item, index) => (
                <AnimateOnScroll 
                  key={index} 
                  animation="fadeUp"
                  style={{ 
                    animationDelay: `${index * 0.2}s` 
                  }}
                >
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    className="flex justify-start w-full"
                  >
                    <Card backgroundColor="bg-white" textColor="text-black" className="w-full">
                      <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                        <div className="mx-auto mb-2 md:mb-4">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full shadow-lg border-2 border-green-700 overflow-hidden bg-gradient-to-b from-green-100 to-green-200 relative">
                            <img
                              src={item.image}
                              alt={`${item.name}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="text-base sm:text-lg md:text-xl font-bold text-center">{item.name}</div>
                        <div className="text-xs sm:text-sm md:text-base text-center text-gray-600">{item.position}</div>
                      </div>
                    </Card>
                  </motion.div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
};

export default About;