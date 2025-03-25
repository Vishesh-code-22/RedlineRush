import React from "react";

const AboutPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-10 text-gray-800 font-jura">
            <h1 className="text-6xl font-bold mb-6 text-center">
                About Redline Rush
            </h1>

            <p className="text-lg text-center mb-8">
                Welcome to <span className="font-semibold">Redline Rush</span>,
                the ultimate hub for car and motorcycle enthusiasts! Whether
                you're a gearhead, an adventurer, or someone who simply
                appreciates the beauty of machines, our platform is designed to
                fuel your passion.
            </p>

            <h2 className="text-3xl font-bold mb-4">
                🏁 What is Redline Rush?
            </h2>
            <p className="mb-6 text-lg">
                Redline Rush is more than just a blog—it’s a thriving community
                where automotive and motorcycle culture comes to life. We bring
                you in-depth{" "}
                <span className="font-semibold">
                    reviews, guides, comparisons, travel stories, and
                    experiences
                </span>
                . Our mission is to deliver high-quality content in a fresh,
                engaging way that keeps you informed and entertained.
            </p>

            <h2 className="text-3xl font-bold mb-4">🔥 What We Offer</h2>
            <ul className="list-disc pl-6 mb-6 text-lg">
                <li>
                    <span className="font-semibold">Expert Reviews</span> –
                    Honest insights on the latest cars and bikes.
                </li>
                <li>
                    <span className="font-semibold">Guides & How-Tos</span> –
                    Essential tips for maintenance, riding, and driving.
                </li>
                <li>
                    <span className="font-semibold">Travel & Adventure</span> –
                    Explore the world on two or four wheels.
                </li>
                <li>
                    <span className="font-semibold">
                        Comparisons & Opinions
                    </span>{" "}
                    – In-depth analysis to help you choose the best.
                </li>
                <li>
                    <span className="font-semibold">Community & Forums</span> –
                    Connect with fellow enthusiasts, share experiences, and get
                    advice.
                </li>
                <li>
                    <span className="font-semibold">Group Rides & Events</span>{" "}
                    – Join exciting rides and meet like-minded riders.
                </li>
            </ul>

            <h2 className="text-3xl font-bold mb-4">🚗🏍️ Join the Ride!</h2>
            <p className="mb-6">
                At <span className="font-semibold">Redline Rush</span>, we don’t
                just talk about cars and bikes—we live them. Whether you're here
                for the latest reviews, looking for riding buddies, or seeking
                expert advice, our community is here to welcome you.
            </p>

            <p className="text-center text-xl font-bold">
                Buckle up, start your engines, and let’s hit the road together!
                🚦🏁
            </p>
        </div>
    );
};

export default AboutPage;
