import React from 'react';
import { TradingCard } from '../types/tradingCard';
import { Music, MapPin, Disc, Calendar, Music2 } from 'lucide-react';

type CardProps = {
  card: TradingCard;
  onEdit: (card: TradingCard) => void;
};

const Card: React.FC<CardProps> = ({ card, onEdit }) => {
  const randomRotation = Math.random() * 4 - 2; // Random rotation between -2 and 2 degrees
  
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(card);
  };
  
  return (
    <div 
      className="relative bg-white h-full rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      style={{ 
        transform: `rotate(${randomRotation}deg)`,
      }}
    >
      {/* Trading card styled container */}
      <div className="border-4 border-black relative h-full flex flex-col">
        {/* Image section */}
        <div className="relative h-56 overflow-hidden">
          <img 
            src={card.imageUrl} 
            alt={card.bandName} 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback image if the provided URL is broken
              (e.target as HTMLImageElement).src = "https://images.pexels.com/photos/534283/pexels-photo-534283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
            }}
          />
          
          {/* Spray paint style overlay for band name */}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
            <h3 className="text-xl font-black text-pink-500 tracking-tighter uppercase">
              {card.bandName}
            </h3>
          </div>
          
          {/* Edit button with anarchy symbol */}
          <button
            onClick={handleEdit}
            className="absolute top-2 right-2 bg-black bg-opacity-70 p-2 rounded-full hover:bg-opacity-90 transition-opacity cursor-pointer z-10 group"
            aria-label="Edit card"
          >
            <div className="w-4 h-4 relative">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold transform group-hover:scale-110 transition-transform">
                Ⓐ
              </div>
            </div>
          </button>
          
          {/* Baroque decorative corner */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-200 opacity-70" 
               style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}>
          </div>
        </div>
        
        {/* Card info section */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="mb-2 flex items-center">
            <Music size={16} className="text-pink-600 mr-2" />
            <span className="font-medium">Style:</span>
            <span className="ml-2">{card.style}</span>
          </div>
          
          <div className="mb-2 flex items-center">
            <Disc size={16} className="text-pink-600 mr-2" />
            <span className="font-medium">Album:</span>
            <span className="ml-2">{card.influentialAlbum}</span>
          </div>
          
          <div className="mb-2 flex items-center">
            <MapPin size={16} className="text-pink-600 mr-2" />
            <span className="font-medium">Origin:</span>
            <span className="ml-2">{card.countryOfOrigin}</span>
          </div>
          
          <div className="flex items-center">
            <Calendar size={16} className="text-pink-600 mr-2" />
            <span className="font-medium">Active:</span>
            <span className="ml-2">{card.yearsActive}</span>
          </div>

          {/* Spotify embed section */}
          {card.song?.spotifyEmbedUrl && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center mb-2">
                <Music2 size={16} className="text-pink-600 mr-2" />
                <span className="font-medium">{card.song.title}</span>
                <span className="mx-2">by</span>
                <span>{card.song.artist}</span>
              </div>
              <div className="relative w-full pt-[152px]">
                <iframe
                  src={card.song.spotifyEmbedUrl}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="encrypted-media"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          )}
        </div>
        
        {/* Punk rock torn edge effect */}
        <div className="absolute top-0 right-0 left-0 h-3 bg-pink-600"
             style={{ clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)' }}>
        </div>
        
        {/* Trading card number stamp */}
        <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded opacity-70">
          #{card.id.slice(-4)}
        </div>
      </div>
    </div>
  );
};

export default Card;