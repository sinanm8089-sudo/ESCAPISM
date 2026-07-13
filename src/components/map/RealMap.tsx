"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FiNavigation } from "react-icons/fi";

// Fix for default Leaflet icon in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function RealMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Real Himalayan coordinates for the photos
  const pois = [
    { id: 1, lat: 32.2396, lng: 77.1887, label: "Base Camp (Manali)", image: "IMG_4149.jpg" },
    { id: 2, lat: 32.3242, lng: 77.1881, label: "Summit View", image: "IMG_4152.jpg" },
    { id: 3, lat: 32.2514, lng: 77.1895, label: "Misty Pine Lodge", image: "IMG_4153.jpg" },
    { id: 4, lat: 32.1950, lng: 77.1690, label: "Valley Start", image: "IMG_4167.jpg" },
  ];

  return (
    <div className="w-full h-full relative z-10">
      <MapContainer
        center={[32.2396, 77.1887]}
        zoom={11}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ background: "#0f141d" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {pois.map((poi) => (
          <Marker key={poi.id} position={[poi.lat, poi.lng]}>
            <Popup className="custom-popup">
              <div className="p-2 w-48 bg-dark-card border border-gold/20 rounded-xl overflow-hidden">
                <div className="w-full h-24 bg-dark-surface rounded-lg mb-2 overflow-hidden relative">
                  <img 
                    src={`/images/drive/${poi.image}`} 
                    alt={poi.label} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h4 className="text-cream text-sm font-medium px-1 mb-2">{poi.label}</h4>
                <button className="w-full py-2 bg-gold/10 hover:bg-gold/20 border border-gold/30 rounded-lg text-gold text-xs font-medium flex items-center justify-center gap-2 transition-colors">
                  <FiNavigation /> View Memories
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <style jsx global>{`
        .leaflet-container {
          background-color: transparent !important;
        }
        .leaflet-popup-content-wrapper {
          background: #1C2333 !important;
          color: #F5F0E6 !important;
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 12px;
          padding: 0;
        }
        .leaflet-popup-tip {
          background: #1C2333 !important;
          border: 1px solid rgba(212, 175, 55, 0.2);
        }
        .leaflet-popup-content {
          margin: 0;
        }
        .leaflet-container a.leaflet-popup-close-button {
          color: #D4AF37 !important;
          padding: 8px;
        }
      `}</style>
    </div>
  );
}
