import React, { useEffect, useState } from "react";
import { WiDaySunny, WiDayCloudy, WiCloudy, WiFog, WiRain, WiShowers, WiThunderstorm, WiNightClear, WiStrongWind } from "react-icons/wi";
import { FaWater } from "react-icons/fa";
import { site } from "../config/site";
import "../styles/Weather.css";

// Códigos WMO do Open-Meteo → ícone
const iconFor = (code, isDay) => {
  if (code === 0) return isDay ? WiDaySunny : WiNightClear;
  if (code <= 2) return WiDayCloudy;
  if (code === 3) return WiCloudy;
  if (code <= 48) return WiFog;
  if (code <= 67) return WiRain;
  if (code <= 82) return WiShowers;
  return WiThunderstorm;
};

const [lat, lng] = site.coords;

// Meteorologia em direto (Open-Meteo, gratuito e sem chave). Se falhar, não mostra nada.
const Weather = ({ label, seaLabel, windLabel }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    const weather = fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,is_day,wind_speed_10m&timezone=Atlantic%2FAzores`,
      { signal: ctrl.signal }
    ).then((r) => r.json());
    const marine = fetch(
      `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lng}&current=sea_surface_temperature`,
      { signal: ctrl.signal }
    ).then((r) => r.json()).catch(() => null);

    Promise.all([weather, marine])
      .then(([w, m]) => {
        if (!w?.current) return;
        setData({
          temp: Math.round(w.current.temperature_2m),
          code: w.current.weather_code,
          isDay: w.current.is_day === 1,
          wind: Math.round(w.current.wind_speed_10m),
          sea: m?.current?.sea_surface_temperature != null ? Math.round(m.current.sea_surface_temperature) : null,
        });
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  if (!data) return null;
  const Icon = iconFor(data.code, data.isDay);

  return (
    <div className="weather" aria-live="polite">
      <span className="weather__label">{label}</span>
      <div className="weather__row">
        <span className="weather__main"><Icon className="weather__icon" />{data.temp}°</span>
        {data.sea !== null && <span className="weather__item"><FaWater /> {seaLabel} {data.sea}°</span>}
        <span className="weather__item"><WiStrongWind /> {windLabel} {data.wind} km/h</span>
      </div>
    </div>
  );
};

export default Weather;
