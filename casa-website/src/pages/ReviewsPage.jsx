import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "../styles/ReviewsPage.css"; // Criar o CSS correspondente

const reviews = [
  {
    rating: 5,
    text: "It's got this homely vibe that you instantly fall for. But the real winner? The outdoors. Flinders is just incredible and staying at Bastion makes it even better. Can't wait to get back there!",
    author: "Amy, Hawthorn East"
  },
  {
    rating: 5,
    text: "An unforgettable experience! The property is stunning and the attention to detail is incredible. Highly recommend to anyone looking for a peaceful escape.",
    author: "James, Melbourne"
  },
  {
    rating: 4,
    text: "Beautiful place, great amenities. Only downside was that I wish I had booked a longer stay!",
    author: "Sophia, Sydney"
  }
];

const ReviewsPage = () => {
  const [index, setIndex] = useState(0);

  const nextReview = () => {
    setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  return (
    <div>
      <Navbar />

      {/* Header Section */}
      <section className="reviews-header">
        <h2>Reviews</h2>
        <p>Memorable experiences and cherished moments.</p>
      </section>

      {/* Review Section */}
      <section className="review-card">
        <div className="stars">
          {[...Array(reviews[index].rating)].map((_, i) => (
            <FaStar key={i} className="star" />
          ))}
        </div>
        <p className="review-text">“{reviews[index].text}”</p>
        <p className="review-author">{reviews[index].author}</p>

        {/* Navigation Buttons */}
        <div className="review-navigation">
          <button onClick={prevReview}><FaArrowLeft /></button>
          <button onClick={nextReview}><FaArrowRight /></button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReviewsPage;
