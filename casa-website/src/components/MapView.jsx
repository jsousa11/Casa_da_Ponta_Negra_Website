import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/MapView.css";

/**
 * Mapa Leaflet com a casa em destaque e pontos numerados.
 * points: [{ name, coords: [lat, lng], label? }]
 */
const MapView = ({ house, houseLabel, points = [], zoom = 12, className = "", activeIndex = null }) => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
      zoomControl: false,
      attributionControl: true,
    }).setView(house, zoom);
    L.control.zoom({ position: "topright" }).addTo(map);
    mapRef.current = map;

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
      className: "map-tiles",
    }).addTo(map);

    L.marker(house, {
      icon: L.divIcon({ className: "map-pin map-pin--house", html: "<span></span>", iconSize: [40, 40], iconAnchor: [20, 20] }),
      zIndexOffset: 1000,
    }).addTo(map).bindTooltip(houseLabel, { direction: "top", offset: [0, -18], permanent: points.length === 0 });

    markersRef.current = points.map((p, i) =>
      L.marker(p.coords, {
        icon: L.divIcon({ className: "map-pin", html: `<span>${p.label ?? i + 1}</span>`, iconSize: [30, 30], iconAnchor: [15, 15] }),
      }).addTo(map).bindTooltip(p.name, { direction: "top", offset: [0, -14] })
    );

    if (points.length) {
      map.fitBounds(L.latLngBounds([house, ...points.map((p) => p.coords)]), { padding: [44, 44] });
    }

    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points.map((p) => p.name).join("|"), houseLabel]);

  // Realça o ponto ativo (ex.: ao passar por cima de um cartão)
  useEffect(() => {
    markersRef.current.forEach((m, i) => {
      const el = m.getElement();
      if (!el) return;
      el.classList.toggle("map-pin--active", i === activeIndex);
      if (i === activeIndex) m.openTooltip(); else m.closeTooltip();
    });
  }, [activeIndex]);

  return <div ref={containerRef} className={`map-view ${className}`} />;
};

export default MapView;
