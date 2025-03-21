import React from "react";
import {
    HomeCard,
    CategoryBox,
    Community,
    GallaryBox,
    NewsletterBox,
} from "../components";

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="w-full px-8">
                <div className="flex flex-col md:flex-row">
                    {/* Left side - HomeCard components */}
                    <div className="w-full md:w-1/2 pr-0 md:pr-6 mb-8 md:mb-0 border-r border-gray-900">
                        <div className="py-8">
                            <h2 className="text-6xl font-semibold tracking-wider font-jura">
                                Latest
                            </h2>
                            <p className="text-2xl font-semibold text-gray-400 mb-6">
                                Read the latest blogs
                            </p>
                            <div className="space-y-12">
                                <HomeCard
                                    image={
                                        "https://images.unsplash.com/photo-1614826200205-67aebc84190c?q=80&w=2645&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    }
                                    title="The best of all time"
                                />
                                <HomeCard
                                    image={
                                        "https://images.unsplash.com/photo-1610643134499-b481d37ded10?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    }
                                    title="The 650 for india"
                                />
                                <HomeCard
                                    image={
                                        "https://images.unsplash.com/photo-1707561525935-035e68b9e17b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    }
                                    title={"Please go Offroad"}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right side - Various components */}
                    <div className="w-full md:w-1/2 pl-0 md:pl-6">
                        <div className="py-8">
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
