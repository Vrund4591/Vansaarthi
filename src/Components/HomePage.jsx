import { TreePine, Heart, UsersRound, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Card from "./Card";

const HomePage = () => {
return (
    <div className='w-full overflow-x-hidden overflow-hidden'>
        <div className="flex gap-10 bg-[url('/bg.png')] bg-cover bg-center h-screen pl-20 pt-56 pb-40"> 
            <div className="flex flex-col justify-normal items-start">
                <div className="p-4">
                    <Card backgroundColor="bg-[#3BDE3B]" textColor="text-black">
                        <div className="text-7xl font-bold px-6 py-7 w-[700px]">अशक्यं प्रकृते ऋते जीवनम्</div></Card>
                </div>
                <div className="px-4 mt-2">
                    <Card backgroundColor="bg-white" textColor="text-black">
                        <div className="py-5 px-4 w-[700px] text-xl">Life is impossible without nature. Join us in preserving our planet for future generations.</div>
                    </Card>
                </div>
                <div className="px-4 mt-5">
                    <Card backgroundColor="bg-[#ff615e]" textColor="text-black">
                        <button className="py-4 px-10 text-xl">Join Our Mission</button>
                    </Card>
                </div>
            </div>
            <div className="">
                <Card backgroundColor="bg-white" textColor="text-white">
                    <img className="p-4" src="/plant.jpeg" height={2} width={720} alt="" />
                </Card>
            </div>
        </div>
        <div className="flex bg-white py-20 px-4">
            <div className="flex justify-start items-start">
                <Card backgroundColor="bg-[#ff615e]" textColor="text-black">
                    <div className='py-2 px-4 text-4xl font-bold'>Our Focus Areas</div>
                </Card>
            </div>
        </div>
        <div className='flex justify-between gap-6 px-4 mb-20'>
            <div className="">
                <Card backgroundColor="bg-white" textColor="text-black">
                    <div className="p-6">
                        <div className=''><TreePine size={50} color="#00c700" strokeWidth={3.5} absoluteStrokeWidth/></div>
                        <div className='text-2xl font-semibold py-4'>Environment Preservation</div>
                        <div className=''>Protecting and restoring natural habitats through sustainable practices.</div>
                    </div>
                </Card>
            </div>
            <div className="">
                <Card backgroundColor="bg-white" textColor="text-black">
                    <div className="p-6">
                        <div className=''><Heart size={50} color="#ff0000" strokeWidth={3.5} absoluteStrokeWidth/></div>
                        <div className='text-2xl font-semibold py-4'>Animal Rescue</div>
                        <div className=''>Providing care and protection to wildlife and domestic animals in need.</div>
                    </div>
                </Card>
            </div>
            <div className="">
                <Card backgroundColor="bg-white" textColor="text-black">
                    <div className="p-6">
                        <div className=''><UsersRound size={50} color="#4268ff" strokeWidth={3.5} absoluteStrokeWidth/></div>
                        <div className='text-2xl font-semibold py-4'>Community Empowerment</div>
                        <div className=''>Building stronger communities through education and sustainable development.</div>
                    </div>
                </Card>
            </div>
        </div>
        <div className='bg-slate-100 h-[440px]'>
            <div className='flex bg-slate-100 py-20 px-4'>
                <div className='flex justify-start items-start'>
                    <Card backgroundColor="bg-[#ff615e]" textColor="text-black">
                        <div className='py-2 px-4 text-4xl font-bold'>Achievable Goals</div>
                    </Card>
                </div>
            </div>
            <div className='flex justify-between text-center gap-6 mx-4'>
                <div className='flex flex-col justify-center bg-white w-full h-32 rounded-xl border-dashed border-green-400 border-2'>
                    <div className='text-2xl font-bold p-2'>10000 Trees</div>
                    <div className='text-sm p-2'>Target Trees to be Planted</div>
                </div>
                <div className='flex flex-col justify-center bg-white w-full h-32 rounded-xl border-dashed border-green-400 border-2'>
                    <div className='text-2xl font-bold p-2'>500 Animals</div>
                    <div className='text-sm p-2'>Target Animals to be Rescued</div>
                </div>
                <div className='flex flex-col justify-center bg-white w-full h-32 rounded-xl border-dashed  border-green-400 border-2'>
                    <div className='text-2xl font-bold p-2'>50 Communities</div>
                    <div className='text-sm p-2'>Target Communities to Empower</div>
                </div>
            </div>
        </div>
        <div className='h-[400px]'>
            <div className='flex py-20 px-4'>
                <div className='flex justify-start items-start'>
                    <Card backgroundColor="bg-[#ff615e]" textColor="text-black">
                        <div className='py-2 px-4 text-4xl font-bold'>Our Impact</div>
                    </Card>
                </div>
            </div>
            <div className='flex justify-between gap-4'>
                <div className='w-full'>
                    <Card backgroundColor="bg-white" textColor="text-black">
                        <div className='flex flex-col justify-center items-center h-28 w-80'>
                            <div className='text-4xl font-semibold text-[#3BDE3B]'>10000</div>
                            <div className=''>Trees Planted</div>
                        </div>
                    </Card>
                </div>
                <div className='w-full'>
                    <Card backgroundColor="bg-white" textColor="text-black">
                        <div className='flex flex-col justify-center items-center h-28 w-80'>
                            <div className='text-4xl font-semibold text-blue-500'>500</div>
                            <div className=''>Animals Rescued</div>
                        </div>
                    </Card>
                </div>
                <div className='w-full'>
                    <Card backgroundColor="bg-white" textColor="text-black">
                        <div className='flex flex-col justify-center items-center h-28 w-80'>
                            <div className='text-4xl font-semibold text-[#3BDE3B]'>50</div>
                            <div className=''>Communities Served</div>
                        </div>
                    </Card>
                </div>
                <div className='w-full'>
                    <Card backgroundColor="bg-white" textColor="text-black">
                        <div className='flex flex-col justify-center items-center h-28 w-80'>
                            <div className='text-4xl font-semibold text-blue-500'>1000</div>
                            <div className=''>Volunteers</div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
        <div className='h-[300px]'>
            <div className='flex w-full'>
                <Card backgroundColor="bg-[#3BDE3B]" textColor="text-black">
                    <div className='px-[510px] py-4 flex flex-col justify-between text-center'>
                        <div className='text-3xl font-semibold w-full p-4'>Join Our Newsletter</div>
                        <div className='py-2'>
                            <Card backgroundColor="bg-white" textColor="text-black">
                                <input className='w-[450px] h-12 px-2' placeholder='Enter your email'></input>
                            </Card>
                        </div>
                        <div className='py-2'>
                            <Card backgroundColor="bg-black" textColor="text-white">
                                <div className='w-[450px] h-12 py-2'>Subscribe</div>
                            </Card>
                        </div>
                    </div>
                    
                </Card>
            </div>
        </div>
        <div className='bg-black text-white'>
            <div className='flex justify-between px-4 py-10 h-56'>
                <div className='w-full'>
                    <div className='text-xl font-semibold'>Vansaarthi</div>
                    <div className='py-4'>Working towards a sustainable future.</div>
                </div>
                <div className='w-full'>
                    <div className='text-md font-semibold'>Quick Links</div>
                    <div className='py-4'>
                        <div className='my-2'>About Us</div>
                        <div className='my-2'>Projects</div>
                        <div className='my-2'>Contact</div>
                    </div>
                </div>
                <div className='w-full'>
                    <div id='contact-section' className='text-md font-semibold'>Connect</div>
                    <div className='py-4 flex gap-4'>
                        <div className=''><Facebook /></div>
                        <div className=''><Twitter /></div>
                        <div className=''><a  href="https://www.instagram.com/vansarthi11/" target="_blank" rel="noopener noreferrer"> <Instagram /> </a></div>
                        <div className=''><Linkedin /></div>
                    </div>
                </div>
                <div className='w-full'>
                    <div className='text-md font-semibold'>Contact</div>
                    <div className='py-4'>
                        <div className='my-2'>Email: vansaarthi.ngo@gmail.com</div>
                        <div className='my-2'>Phone: +91 7990651308</div>
                    </div>
                </div>
            </div>
            <div className='mx-4 py-8 border-t border-slate-100/30 text-center'>&copy; 2024 Vansaarthi. All rights reserved.</div>
        </div>
    </div>
  );
}

export default HomePage;