import Card from "./Card"
import ImageSlider from "./ImageSlider"
import ProgressBar from "./ProgressBar"
import { AnimateOnScroll } from "./AnimateonScroll"

const Projects = () => {
    return (
        <div className="w-full px-4 md:px-6 lg:px-8">
            <AnimateOnScroll animation="slideIn">
                <div className='flex py-4 w-64'>
                    <div className='flex justify-start items-start w-full'>
                        <Card backgroundColor="bg-[#3BDE3B]" textColor="text-black">
                            <div className='py-2 px-4 text-2xl md:text-3xl lg:text-4xl font-bold'>Our Projects</div>
                        </Card>
                    </div>
                </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeUp">
                <div className="flex flex-col w-full">
                    <div className="w-[100%] py-4">
                        <Card backgroundColor="bg-white" textColor="text-black">
                            <div className="flex w-full justify-center items-start mx-auto p-2 md:p-4 lg:p-6">
                                <div className="w-full flex flex-col justify-start items-start">
                                    <div className="text-2xl md:text-3xl font-bold p-2 md:p-4">Project Rewild (2020)</div>
                                    <div className="w-[85%] flex justify-start items-start">
                                        <ProgressBar items={[
                                            { label: "Animals Rescued", value: 5000, progress: 85 },
                                            { label: "Trees Planted", value: 10000, progress: 90 },
                                            { label: "Trees Maintained", value: 5000, progress: 60 },
                                            { label: "Jungle Saved", value: 50, progress: 100 }
                                        ]}/>
                                    </div>
                                    <div className="px-4 text-3xl font-semibold">Details:</div>
                                </div>
                                <div className="w-full mt-4">
                                    <ImageSlider images={[
                                        "/gallery/IMG-20240709-WA0001.jpg",
                                        "/gallery/IMG-20240709-WA0002.jpg",
                                        "/gallery/IMG-20240709-WA0003.jpg",
                                        "/gallery/IMG-20240709-WA0004.jpg",
                                    ]} />
                                </div>
                            </div>
                            <div className="py-2 px-8 text-lg leading-relaxed">
                                <pre className="whitespace-pre-wrap font-sans">
Project Rewild is a cornerstone initiative of Vansaarthi, established in 2020 by Yash Chaudhary and co-founders Vrund Chaudhary and Raj Prajapati. This project embodies a heartfelt commitment to wildlife preservation and environmental restoration, with a primary focus on the rehabilitation of lost and displaced animals.
<br /><br />
How It Began
<br /><br />
Project Rewild started humbly, offering free rescue services for birds, snakes, and various other animals in distress. With no financial barriers, the project quickly became a lifeline for wildlife in and around Shikha Dhansura, covering nearby cities such as Modasa, Bayad, and Demai.
<br /><br />
Core Mission
<br /><br />
The mission of Project Rewild is to restore balance to ecosystems by:<br />
    •    Rescuing animals in need, including those injured or displaced.<br />
    •    Providing temporary care for their rehabilitation.<br />
    •    Releasing animals safely back into their natural habitats, ensuring they thrive in environments suited to their needs.<br />
    <br /><br />
Achievements<br />
    •    Over 1,000 animals rescued and rehabilitated since 2020.<br />
    •    Free rescue services have supported diverse species, including endangered and vulnerable ones.<br />
    •    Partnerships with local communities to raise awareness about wildlife conservation and ethical practices.<br />
    <br /><br />
Future Vision<br /><br />

The ultimate goal of Project Rewild is to expand its reach, offering structured rehabilitation facilities for a greater number of species and integrating large-scale reforestation efforts to enhance natural habitats.<br /><br />

This project stands as a testament to Vansaarthi's unwavering dedication to creating a world where every animal, no matter how small or vulnerable, finds a safe haven. 🌱🦅🐍</pre>
                            </div>
                        </Card>
                    </div>
                </div>
            </AnimateOnScroll>
        </div>
    )
}

export default Projects