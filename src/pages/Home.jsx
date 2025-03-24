import React from "react";
import {
    HomeCard,
    CategoryBox,
    Community,
    GallaryBox,
    NewsletterBox,
} from "../components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
    // const [blogData, setBlogData] = useState([]);
    // useEffect(() => {
    //     setBlogData([
    //         {
    //             id: 1,
    //             title: "The best of all time",
    //             image: "https://images.unsplash.com/photo-1614826200205-67aebc84190c?q=80&w=2645&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //             description: `
    //                 The Triumph Daytona 675R is one of the most iconic supersport
    //                 motorcycles ever built. With its aggressive styling, precision
    //                 handling, and exhilarating power delivery, it has earned a cult
    //                 following among riders and enthusiasts. Whether carving through
    //                 mountain roads, dominating track days, or simply turning heads
    //                 with its sleek British design, the Daytona 675R stands as a
    //                 masterpiece of engineering. In this blog, we'll explore what
    //                 makes the Daytona 675R special, from its performance to its
    //                 legacy in the motorcycle world.Triumph first introduced the
    //                 Daytona 675 in 2006, breaking away from the traditional 600cc
    //                 four-cylinder configuration seen in Japanese competitors like
    //                 the Yamaha R6 and Honda CBR600RR. Instead, Triumph opted for a
    //                 675cc inline-three engine, offering a perfect blend of
    //                 high-revving power and strong mid-range torque. The 675R
    //                 variant, introduced in 2011, took the Daytona 675 to the next
    //                 level with premium suspension, brakes, and lightweight
    //                 components, making it an even more track-focused beast.`,
    //         },
    //         {
    //             id: 2,
    //             title: "The 650 for India",
    //             image: "https://images.unsplash.com/photo-1610643134499-b481d37ded10?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //             description: `
    //                 The Royal Enfield Interceptor 650 has redefined modern-classic
    //                 motorcycling in India and beyond. As one of the most accessible
    //                 and affordable twin-cylinder bikes, it blends retro charm with
    //                 modern reliability. Featuring a 648cc parallel-twin engine,
    //                 smooth power delivery, and a comfortable riding posture,
    //                 the Interceptor 650 is perfect for both city commutes and
    //                 long highway cruises. Its timeless design, inspired by the
    //                 1960s roadsters, coupled with Enfield's legendary durability,
    //                 makes it an ideal choice for riders looking for a mix of
    //                 nostalgia and performance. Whether you're a beginner or an
    //                 experienced rider, the Interceptor 650 is a machine that
    //                 delivers smiles per mile.`,
    //         },
    //         {
    //             id: 3,
    //             title: "Please Go Offroad",
    //             image: "https://images.unsplash.com/photo-1707561525935-035e68b9e17b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //             description: `
    //                 Off-roading isn’t just about adventure—it’s about freedom.
    //                 When you leave paved roads behind, you escape traffic,
    //                 explore uncharted landscapes, and challenge yourself
    //                 in ways that regular road riding never will. Whether it's
    //                 conquering rough trails, river crossings, or sandy dunes,
    //                 off-roading teaches better bike control, improves reflexes,
    //                 and enhances confidence. Plus, it’s the perfect way to
    //                 reconnect with nature, far from the chaos of city life.
    //                 If you've never tried off-roading, it’s time to grab a
    //                 dirt bike, SUV, or even a 4x4 truck and experience the
    //                 thrill of the wild terrain!`,
    //         },
    //         {
    //             id: 4,
    //             title: "The Beastly Dodge Challenger",
    //             image: "https://images.unsplash.com/photo-1604940500627-d3f44d1d21c6?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //             description: `
    //                 The Dodge Challenger is a muscle car icon, blending retro
    //                 aesthetics with modern brute force. With engine options ranging
    //                 from a 3.6L V6 to the monstrous 6.2L Supercharged Hellcat V8,
    //                 it delivers unmatched power and a soundtrack that sends chills
    //                 down any gearhead’s spine. Its aggressive styling, wide stance,
    //                 and performance-focused interior make it one of the most desirable
    //                 muscle cars on the market. Whether you're launching it down a
    //                 quarter-mile strip or cruising through town, the Challenger's
    //                 raw power and presence make every drive unforgettable.`,
    //         },
    //         {
    //             id: 5,
    //             title: "The Ultimate Daily Sports Car - Porsche 911",
    //             image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //             description: `
    //                 The Porsche 911 has been the gold standard for sports cars for
    //                 decades. With its unmistakable silhouette, rear-engine layout,
    //                 and razor-sharp handling, the 911 is as thrilling on the track
    //                 as it is on a weekend road trip. Whether you opt for the base
    //                 Carrera, the turbocharged beast, or the GT3 track monster,
    //                 the 911 delivers a perfect balance of power, comfort, and luxury.
    //                 It’s one of the few sports cars that can be a daily driver,
    //                 a canyon carver, and a track weapon all in one. If there’s a
    //                 single car that defines automotive excellence, it’s the Porsche 911.`,
    //         },
    //     ]);
    // }, []);
    const blogData = useSelector((state) => state.blog.blogData);
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="w-full pl-8">
                <div className="flex flex-col md:flex-row">
                    {/* Left side - HomeCard components */}
                    <div className="w-full md:w-1/2 pr-0 md:pr-6 mb-8 md:mb-0 border-r border-gray-900">
                        <div className="py-8 font-jura">
                            <h2 className="text-6xl font-semibold tracking-wider">
                                Latest
                            </h2>
                            <p className="text-2xl font-semibold text-gray-400 mb-6">
                                Read the latest blogs
                            </p>
                            <div className="flex flex-col gap-8">
                                {blogData.map((blog) => (
                                    <Link
                                        to={`/blog/${blog.id}`}
                                        className="hover:shadow-2xl duration-300 transition-all ease-in-out rounded pb-6 hover:scale-101"
                                    >
                                        <HomeCard
                                            key={blog.id}
                                            title={blog.title}
                                            image={blog.image}
                                            description={blog.description}
                                            category={blog.category}
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right side - Various components */}
                    <div className="w-full md:w-1/2">
                        <div className="pt-8">
                            <div className="space-y-8">
                                <CategoryBox />

                                <Community />

                                <GallaryBox />

                                <NewsletterBox />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
