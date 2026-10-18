import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NImg from "../components/NImg";
import BookButton from "../components/BookButton";
import CountUp from "../components/CountUp";
import usePageMeta from "../hooks/usePageMeta";
import { FaBed, FaCalendarAlt, FaAirbnb, FaStar } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { useLanguage } from "../context/LanguageContext";
import { site } from "../config/site";
import "../styles/Home.css";

const reviews = [
  {
    country: "🇵🇹",
    name: "Cristina",
    location: "Portugal",
    text: "Casa muito bonita e os anfitriões levaram os detalhes ao máximo (desde os utensílios da cozinha aos do wc - escova e pasta de dentes... - até guarda-chuva! É notória a preocupação com o hóspede. Sentimo-nos mesmo bem recebidos :)",
  },
  {
    country: "🇦🇹",
    name: "Alexandra",
    location: "Austria",
    text: "Perfect house and location, private, spotless and equipped with everything you could possibly need. Lots of food provided, 2 minutes to the beach.",
  },
  {
    country: "🇪🇸",
    name: "Alejandra",
    location: "Spain",
    text: "Casa da Ponta Negra, la mejor casa donde hemos podido pasar el principio de nuestra luna de miel. No le falta un detalle, tiene todo lo que se necesita en el día a día en casa! El trato de Paulo espectacular!",
  },
  {
    country: "🇵🇹",
    name: "Maria",
    location: "Portugal",
    text: "Localizado numa Baía linda, este alojamento é perfeito para uma estadia em família ou com amigos. Perfeitamente equipado e com um anfitrião muito atencioso.",
  },
  {
    country: "🇫🇷",
    name: "Anne",
    location: "France",
    text: "Magnifique site. Niché dans un ancien cratère, il offre une vue à 180 degrés sur la mer. Un accès à la plage est aménagé.",
  },
  {
    country: "🇵🇹",
    name: "Claudio",
    location: "Portugal",
    text: "A casa estava excelente, com muito boas condições. Como tínhamos crianças de 2 anos e 5 anos, o proprietário deixou alguns brinquedos de praia. Excelente espaço exterior bem cuidado e muito agradável.",
  },
  {
    country: "🇨🇭", // Suíça
    name: "Gerda",
    location: "Switzerland",
    nights: 6,
    month: "July 2024",
    score: 10,
    text: "Secluded and surrounded by nature. Very nice sandy beach and perfect for snorkelers/freedivers to start right from the beach. Paul is the perfect host and his house was clean and very well equipped.",
  },
  {
    country: "🇩🇪", // Alemanha
    name: "Günter",
    location: "Germany",
    nights: 4,
    month: "September 2024",
    score: 10,
    text: "One of the best holiday homes we have ever had - at a most wonderful location with great hosts.",
  },
  {
    country: "🇺🇸", // EUA
    name: "Angela",
    location: "United States",
    nights: 3,
    month: "September 2024",
    score: 10,
    text: "Everything about this home and our stay was perfect.",
  },
  {
    country: "🇬🇧", // Reino Unido
    name: "Heather",
    location: "United Kingdom",
    nights: 5,
    month: "August 2024",
    score: 10,
    text: "Fabulously located house in the beautiful São Lourenço bay. The house had all the facilities we needed for our 5-night stay. Easy access to a lovely beach and warm sea. Absolutely perfect for our family.",
  },
  {
    country: "🇫🇷", // França
    name: "Sylvain",
    location: "France",
    nights: 3,
    month: "June 2024",
    score: 10,
    text: "Amazing location, you couldn't be closer to the ocean! Isolated, you will have the feeling of being alone on Earth while still being able to walk to some nice restaurants!",
  },
];

// Parallax suave nas imagens marcadas com .parallax
const useParallax = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll(".parallax"));
    let raf = null;
    const update = () => {
      raf = null;
      const vh = window.innerHeight;
      els.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const progress = (r.top + r.height / 2 - vh / 2) / vh; // -1..1
        el.style.transform = `translate3d(0, ${progress * -40}px, 0) scale(1.12)`;
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
};

const Home = () => {
  const { t } = useLanguage();
  const reviewsSliderRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  usePageMeta(null, t.home.metaDescription);
  useParallax();

  const scrollReviews = (dir) => {
    const el = reviewsSliderRef.current;
    if (el) el.scrollBy({ left: dir * 360, behavior: 'smooth' });
  };

  const onDragStart = (e) => {
    isDragging.current = true;
    dragStart.current = { x: e.pageX, scrollLeft: reviewsSliderRef.current.scrollLeft };
    reviewsSliderRef.current.style.cursor = 'grabbing';
  };

  const onDragMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    reviewsSliderRef.current.scrollLeft = dragStart.current.scrollLeft - (e.pageX - dragStart.current.x);
  };

  const onDragEnd = () => {
    isDragging.current = false;
    if (reviewsSliderRef.current) reviewsSliderRef.current.style.cursor = '';
  };

  const stats = [
    { value: site.bedrooms, label: t.home.stats.bedrooms },
    { value: site.bathrooms, label: t.home.stats.bathrooms },
    { value: site.maxGuests, label: t.home.stats.guests },
    { value: 1, label: t.home.stats.jacuzzi },
  ];

  const platforms = [
    { key: "booking", name: "Booking.com", url: site.platforms.booking, Icon: TbBrandBooking },
    { key: "airbnb", name: "Airbnb", url: site.platforms.airbnb, Icon: FaAirbnb },
  ];

  return (
    <div className="page">
      <Navbar />

      {/* Hero */}
      <section className="hero">
        <NImg src="/assets/view_jacuzzi.jpg" alt="Jacuzzi privado com vista para a Baía de São Lourenço" className="hero__img" fetchpriority="high" w={2400} q={85} />
        <div className="hero__overlay" />
        <div className="hero__text">
          <span className="eyebrow hero__eyebrow">{t.home.heroEyebrow}</span>
          <h1 key={t.home.heroTitle} aria-label={t.home.heroTitle}>
            {t.home.heroTitle.split(" ").map((word, i) => (
              <span key={i} className="hero__word" style={{ animationDelay: `${0.25 + i * 0.09}s` }} aria-hidden="true">
                {word}{" "}
              </span>
            ))}
          </h1>
          <p>{t.home.heroSubtitle}</p>
          <div className="hero__actions">
            <BookButton className="btn btn--primary">{t.home.heroCta}</BookButton>
            <Link to="/property" className="btn btn--light">{t.home.heroCtaSecondary}</Link>
          </div>
        </div>
        <button
          className="hero__scroll-btn"
          aria-label={t.home.scroll}
          onClick={() => {
            const el = document.querySelector('.stats');
            if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
          }}
        >
          <span>{t.home.scroll}</span>
          <span className="hero__scroll-line" />
        </button>
      </section>

      {/* Números */}
      <section className="stats reveal">
        <ul className="stats__list reveal-stagger">
          {stats.map((s) => (
            <li key={s.label} className="stats__item">
              <span className="stats__value"><CountUp to={s.value} /></span>
              <span className="stats__label">{s.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* A Casa */}
      <section className="split split--property">
        <div className="split__text reveal">
          <span className="eyebrow">{t.home.propertyEyebrow}</span>
          <h2 className="section-title">{t.home.propertyTitle}</h2>
          <p className="section-lead">{t.home.propertyText}</p>
          <Link to="/property" className="btn btn--ghost">{t.home.propertyBtn}</Link>
        </div>
        <div className="split__media reveal">
          <div className="split__img split__img--main">
            <NImg src="/assets/view.jpg" alt="Vista sobre a Baía de São Lourenço" loading="lazy" w={1200} className="parallax" />
          </div>
          <div className="split__img split__img--accent zoom-frame">
            <NImg src="/assets/bedroom_1.jpg" alt="Quarto principal" loading="lazy" w={700} />
          </div>
        </div>
      </section>

      {/* Região */}
      <section className="split split--locale">
        <div className="split__media reveal">
          <div className="split__img split__img--main">
            <NImg src="/assets/ribeira-de-maloas-6.jpg" alt="Colunas de basalto da Ribeira do Maloás" loading="lazy" w={1200} className="parallax" />
          </div>
          <div className="split__img split__img--accent zoom-frame">
            <NImg src="/assets/cuisine.jpeg" alt="Lapas grelhadas, gastronomia açoriana" loading="lazy" w={700} />
          </div>
        </div>
        <div className="split__text reveal">
          <span className="eyebrow">{t.home.localeEyebrow}</span>
          <h2 className="section-title">{t.home.localeTitle}</h2>
          <p className="section-lead">{t.home.localeText}</p>
          <Link to="/locale" className="btn btn--ghost">{t.home.localeBtn}</Link>
        </div>
      </section>

      {/* Reservar */}
      <section className="book-section">
        <div className="book-section__inner reveal">
          <span className="eyebrow">{t.home.bookEyebrow}</span>
          <h2 className="section-title">{t.home.bookTitle}</h2>
          <p className="section-lead">{t.home.bookSubtitle}</p>

          <div className="book-direct">
            <div>
              <h3>{t.home.bookDirectTitle}</h3>
              <p>{t.home.bookDirectText}</p>
            </div>
            <BookButton className="btn btn--primary">{t.home.bookDirectCta}</BookButton>
          </div>

          <p className="book-or">{t.home.bookOr}</p>
          <div className="book-links">
            {platforms.map(({ key, name, url, Icon }) => (
              <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="book-link">
                <Icon className="book-icon" />
                <span className="book-link__text">
                  <span className="book-platform-name">{name}</span>
                  {site.ratings[key] ? (
                    <span className="book-rating"><FaStar /> {site.ratings[key].score} · {site.ratings[key].count} {t.home.reviewsOn}</span>
                  ) : (
                    <span className="book-cta">{t.home.bookCta} →</span>
                  )}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Avaliações */}
      <section className="reviews-section">
        <div className="reviews-container">
          <div className="section-head reveal">
            <span className="eyebrow">{t.home.reviewsEyebrow}</span>
            <h2 className="section-title">{t.home.reviewsTitle}</h2>
            <p className="section-lead">{t.home.reviewsSubtitle}</p>
            <div className="reviews-badges">
              {site.ratings.booking && (
                <p className="reviews-badge">
                  <FaStar /> <strong>{site.ratings.booking.score}</strong> · {site.ratings.booking.count} {t.home.reviewsOn} {t.home.onBooking}
                </p>
              )}
              {site.ratings.airbnb && (
                <p className="reviews-badge">
                  <FaStar /> <strong>{site.ratings.airbnb.score}</strong> · {site.ratings.airbnb.count} {t.home.reviewsOn} {t.home.airbnbBadge}
                </p>
              )}
            </div>
          </div>

          <div className="reviews-carousel reveal">
            <button className="carousel-arrow" onClick={() => scrollReviews(-1)} aria-label={t.home.prev}>&#8249;</button>

            <div
              className="reviews-slider"
              ref={reviewsSliderRef}
              onMouseDown={onDragStart}
              onMouseMove={onDragMove}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}
            >
              {reviews.map((review, i) => (
                <article key={i} className="review-card">
                  {review.score ? (
                    <div className="review-score" aria-label={`${review.score}/10`}>
                      {review.score}<span>/10</span>
                    </div>
                  ) : (
                    <div className="review-quote" aria-hidden="true">“</div>
                  )}
                  <p className="review-text">“{review.text}”</p>
                  <div className="review-footer">
                    <span className="flag" aria-hidden="true">{review.country}</span>
                    <div>
                      <span className="review-name">{review.name}</span>
                      <span className="review-details">
                        {review.location}
                        {review.nights && <> · <FaBed className="review-icon" /> {review.nights} {t.home.nights}</>}
                        {review.month && <> · <FaCalendarAlt className="review-icon" /> {review.month}</>}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <button className="carousel-arrow" onClick={() => scrollReviews(1)} aria-label={t.home.next}>&#8250;</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
