import React from "react";
import {
    HomeCard,
    CategoryBox,
    Community,
    GallaryBox,
    NewsletterBox,
} from "../components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Pagination, Navigation } from "swiper/modules";
import dataService from "../appwrite/dataService";
import { setShowNav } from "../store/utilitySlice";

const Home = () => {
    const blogData = useSelector((state) => state.blog.blogData);
    const filteredBlogs = blogData.slice(-5).reverse();
    const { isLoading } = useSelector((state) => state.utility);

    const dispatch = useDispatch();
    dispatch(setShowNav(true));
    return (
        <div className="flex flex-col w-full font-jura px-16 gap-12">
            {!filteredBlogs || filteredBlogs.length === 0 ? null : (
                <div className="flex w-full flex-col">
                    <div className="title-container">
                        <h2 className="title-main">Latest</h2>
                        <p className="subtitle-main">Read the latest blogs</p>
                    </div>
                    <Swiper
                        modules={[Pagination, Navigation, Autoplay, Parallax]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation
                        speed={1000}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        className="w-full rounded-2xl overflow-hidden"
                        parallax={true}
                        loop={true}
                    >
                        {filteredBlogs.map((blog) => (
                            <SwiperSlide key={blog.$id}>
                                <Link
                                    to={`/blog/${blog.$id}`}
                                    className="block"
                                >
                                    <HomeCard
                                        title={blog.title}
                                        image={dataService.getArticleImagePreview(
                                            blog.featuredImage
                                        )}
                                        content={blog.content}
                                        category={blog.category}
                                    />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
            <CategoryBox />

            <Community />

            <GallaryBox />

            <NewsletterBox />
        </div>
    );
};

export default Home;
