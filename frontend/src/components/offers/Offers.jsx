import React, { useRef, useEffect, useState } from "react";
import "./Offers.css";

const offersData = [
  {
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800",
    title: "50% OFF On Salads",
    desc: "Use code SALAD50"
  },
  {
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=800",
    title: "Buy 1 Get 1 Free",
    desc: "Limited time offer"
  },
  {
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800",
    title: "Burger Combo",
    desc: "Only ₹99"
  },
  {
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=800",
    title: "20% OFF Rolls",
    desc: "Weekend special"
  },
];

const Offers = () => {
  const scrollRef = useRef();
  const [pause, setPause] = useState(false);

  // 🔥 Auto scroll
  useEffect(() => {
    if (pause) return;

    const interval = setInterval(() => {
      scrollRef.current.scrollBy({
        left: 280,
        behavior: "smooth"
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [pause]);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -280, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 280, behavior: "smooth" });
  };

  return (
    <div className="offers">

      <div className="offers-header">
        <h2>🔥 Latest Offers & New Launch</h2>
        <div className="controls">
          <button onClick={scrollLeft}>‹</button>
          <button onClick={scrollRight}>›</button>
        </div>
      </div>

      <div
        className="offers-row"
        ref={scrollRef}
        onMouseEnter={() => setPause(true)}
        onMouseLeave={() => setPause(false)}
      >
        {offersData.map((offer, i) => (
          <div className="offer-card" key={i}>
            <img src={offer.image} alt="" />

            <div className="glass">
              <h3>{offer.title}</h3>
              <p>{offer.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Offers;