import React from 'react';
import Card from './Card';

const About = () => {
    const members = [
        { name: "Committee Member 1", position: "Position 1" },
        { name: "Committee Member 2", position: "Position 2" },
        { name: "Committee Member 3", position: "Position 3" },
        { name: "Committee Member 4", position: "Position 4" },
        { name: "Committee Member 5", position: "Position 5" },
        { name: "Committee Member 6", position: "Position 6" },
        { name: "Committee Member 7", position: "Position 7" },
        { name: "Committee Member 8", position: "Position 8" },
        // Add more members as needed
    ];

  return (
    <div className="w-full min-h-screen">
        <div className="container mx-auto py-10">
            <div className="flex w-full">
                <div className="flex justify-start items-start px-4">
                <Card backgroundColor="bg-[#3BDE3B]" textColor="text-black">
                    <div className="text-4xl font-bold px-6 py-2 text-black">About Vansaarthi</div>
                </Card>
                </div>
            </div>
        
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
        </div>
        {/* <div className="grid grid-cols-2 md:grid-cols-2 gap-12 px-4 mb-20">
            <div className="h-full">
                <Card backgroundColor="bg-white" textColor="text-black">
                    <div className="p-6">
                        <div className="text-2xl font-bold mb-4">Our Story</div>
                        <div className="text-base mb-4">
                            Vansaarthi was officially established on 22 November 2024, but its story began with
                            the "Project Rewild" program in 2020. Founded by Yash Chaudhary, with co-founders
                            Vrund Chaudhary and Raj Prajapati, we've grown into a beacon of hope for the
                            environment and wildlife.
                        </div>
                        <div className="text-base">
                            Based in Shikha Dhansura, Aravalli District, we actively operate in nearby cities like
                            Modasa, Bayad, and Demai, expanding our reach as we evolve.
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex w-full">
                <div className='flex flex-col justify-start items-start'>
                    <Card backgroundColor="bg-white" textColor="text-black min-w-[685px] min-h-[256px] sm:min-w"> 
                        <div className="flex flex-col p-6 w-full">
                            <div className=" text-2xl font-bold mb-4">Our Impact</div>
                                <div className="space-y-4">
                                    {[
                                    'Rescued over 1,000 animals',
                                    'Planted more than 5,000 trees',
                                    'Active in multiple cities',
                                    'Growing community of volunteers'
                                    ].map((impact, index) => (
                                        <div key={index} className="flex items-center">
                                        <div className="text-black mr-2">✓</div>
                                    <div>{impact}</div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
                
            </div>
        </div> */}
        <div className='bg-slate-100'>
        <div className=" px-4 mx-20 py-20">
            <div className='flex'>
                <div className="flex justify-start mb-12">
                    <Card backgroundColor="bg-[#F97316]" textColor="text-black">
                        <div className="text-4xl font-bold px-6 py-2">Meet Our Committee</div>
                    </Card>
                </div>
            </div>
          
            <div className='grid grid-cols-4 gap-10 mx-10 px-10 py-10'>
                {members.map((item, index) => (
                    <div className="flex justify-start" key={index}>
                        <Card backgroundColor="bg-white" textColor="text-black">
                            <div className="p-6">
                                <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full" />
                                <div className="text-xl font-bold text-center">{item.name}</div>
                                <div className="text-center text-gray-600">{item.position}</div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
        </div>
    </div>
  );
};

export default About;