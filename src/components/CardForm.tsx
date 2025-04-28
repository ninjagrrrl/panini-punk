import React, { useState, useEffect } from "react";
import { TradingCard } from "../types/tradingCard";
import { Music, MapPin, Disc, Calendar, Camera, Music2 } from "lucide-react";

type CardFormProps = {
  onAddCard: (card: TradingCard) => void;
  onUpdateCard: (card: TradingCard) => void;
  onDeleteCard: (cardId: string) => void;
  editingCard: TradingCard | null;
};

const CardForm: React.FC<CardFormProps> = ({
  onAddCard,
  onUpdateCard,
  onDeleteCard,
  editingCard,
}) => {
  const [formData, setFormData] = useState<Omit<TradingCard, "id">>({
    bandName: "",
    style: "",
    influentialAlbum: "",
    countryOfOrigin: "",
    yearsActive: "",
    imageUrl: "",
    song: {
      title: "",
      artist: "",
      spotifyEmbedUrl: "",
    },
  });

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (editingCard) {
      setFormData({
        bandName: editingCard.bandName,
        style: editingCard.style,
        influentialAlbum: editingCard.influentialAlbum,
        countryOfOrigin: editingCard.countryOfOrigin,
        yearsActive: editingCard.yearsActive,
        imageUrl: editingCard.imageUrl,
        song: editingCard.song || {
          title: "",
          artist: "",
          spotifyEmbedUrl: "",
        },
      });
    }
  }, [editingCard]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("song.")) {
      const songField = name.split(".")[1];
      setFormData({
        ...formData,
        song: {
          ...formData.song!,
          [songField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation to ensure all fields are filled
    for (const [key, value] of Object.entries(formData)) {
      if (key === "song") continue; // Skip song validation as it's optional
      if (typeof value === "string" && !value.trim()) {
        setError(
          `Please fill in the ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`
        );
        return;
      }
    }

    // Validate Spotify URL format if provided
    if (
      formData.song?.spotifyEmbedUrl &&
      !formData.song.spotifyEmbedUrl.includes("spotify.com/embed")
    ) {
      setError("Please provide a valid Spotify embed URL");
      return;
    }

    if (editingCard) {
      onUpdateCard({ ...formData, id: editingCard.id });
    } else {
      const newCard: TradingCard = {
        ...formData,
        id: Date.now().toString(),
      };
      onAddCard(newCard);
    }

    // Reset form
    setFormData({
      bandName: "",
      style: "",
      influentialAlbum: "",
      countryOfOrigin: "",
      yearsActive: "",
      imageUrl: "",
      song: {
        title: "",
        artist: "",
        spotifyEmbedUrl: "",
      },
    });

    setError("");
  };

  return (
    <div className="w-full mb-10 relative">
      <div className="z-10 relative">
        <h2 className="text-3xl font-black mb-6 text-pink-600 uppercase tracking-tighter">
          {editingCard ? "Edit Card" : "Add a Punk Band Card"}
        </h2>

        {error && (
          <div className="bg-black text-pink-500 p-3 mb-4 border-l-4 border-pink-600">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg relative overflow-hidden backdrop-blur-sm"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-pink-600/10 rounded-full -mt-20 -mr-20 z-0"></div>

          <div className="grid md:grid-cols-2 gap-4 z-10 relative">
            <div className="form-group">
              <label className="flex items-center text-gray-800 font-medium mb-1">
                <Music size={16} className="mr-2" /> Band Name
              </label>
              <input
                type="text"
                name="bandName"
                value={formData.bandName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                placeholder="e.g. Bikini Kill"
              />
            </div>
            <div className="form-group">
              <label className="flex items-center text-gray-800 font-medium mb-1">
                <Music size={16} className="mr-2" /> Style
              </label>
              <input
                type="text"
                name="style"
                value={formData.style}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                placeholder="e.g. Riot Grrrl"
              />
            </div>
            <div className="form-group">
              <label className="flex items-center text-gray-800 font-medium mb-1">
                <Disc size={16} className="mr-2" /> Influential Album
              </label>
              <input
                type="text"
                name="influentialAlbum"
                value={formData.influentialAlbum}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                placeholder="e.g. Pussy Whipped"
              />
            </div>
            <div className="form-group">
              <label className="flex items-center text-gray-800 font-medium mb-1">
                <MapPin size={16} className="mr-2" /> Country of Origin
              </label>
              <input
                type="text"
                name="countryOfOrigin"
                value={formData.countryOfOrigin}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                placeholder="e.g. USA"
              />
            </div>
            <div className="form-group">
              <label className="flex items-center text-gray-800 font-medium mb-1">
                <Calendar size={16} className="mr-2" /> Years Active
              </label>
              <input
                type="text"
                name="yearsActive"
                value={formData.yearsActive}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                placeholder="e.g. 1990-1997, 2017-present"
              />
            </div>
            <div className="form-group">
              <label className="flex items-center text-gray-800 font-medium mb-1">
                <Camera size={16} className="mr-2" /> Image URL
              </label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                placeholder="e.g. https://example.com/band.jpg"
              />
            </div>
            //FIXME - funktioniert noch nicht
            <div className="col-span-2 border-t border-gray-200 mt-4 pt-4">
              <h3 className="text-lg font-bold mb-4 text-pink-600">
                Featured Song (Optional)
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="flex items-center text-gray-800 font-medium mb-1">
                    <Music2 size={16} className="mr-2" /> Song Title
                  </label>
                  <input
                    type="text"
                    name="song.title"
                    value={formData.song?.title}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                    placeholder="e.g. Rebel Girl"
                  />
                </div>

                <div className="form-group">
                  <label className="flex items-center text-gray-800 font-medium mb-1">
                    <Music2 size={16} className="mr-2" /> Artist
                  </label>
                  <input
                    type="text"
                    name="song.artist"
                    value={formData.song?.artist}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                    placeholder="e.g. Bikini Kill"
                  />
                </div>

                <div className="form-group md:col-span-2">
                  <label className="flex items-center text-gray-800 font-medium mb-1">
                    <Music2 size={16} className="mr-2" /> Spotify Embed URL
                  </label>
                  <input
                    type="text"
                    name="song.spotifyEmbedUrl"
                    value={formData.song?.spotifyEmbedUrl}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
                    placeholder="e.g. https://open.spotify.com/embed/track/..."
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 bg-pink-600 text-white py-2 px-6 rounded hover:bg-pink-700 transition-colors duration-300 uppercase font-bold tracking-widest"
          >
            {editingCard ? "Update Card" : "Create Card"}
          </button>
          {editingCard && (
            <button
              type="button"
              onClick={() => onDeleteCard(editingCard.id)}
              className="mt-2 ml-2 bg-pink-600 text-white py-2 px-6 rounded hover:bg-red-700 transition-colors duration-300 uppercase font-bold tracking-widest"
            >
              Delete
            </button>
          )}
        </form>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-7 left-5 w-20 h-20 bg-red-400 rounded-full opacity-10 z-0"></div>
      <div className="absolute bottom-5 right-10 w-32 h-32 bg-blue-300 rounded-full opacity-20 z-0"></div>
    </div>
  );
};

export default CardForm;
