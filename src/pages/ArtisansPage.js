import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import leelaDeviImage from '../assets/featured-artisan-weave.png';
import potterArtisan from '../assets/artisan-potter.png'
import rugWeaver from '../assets/artisan-rug-weaver.png'
import woodCarver from '../assets/artisan-wood-carver.png'
import wheatStemArt from '../assets/artisan-wheat-stem-art.png'
/**
 * ArtisansPage Component - Showcases the talented artisans behind Indikaara products
 * Features: Artisan profiles with stories, images, and craft specializations
 */
const ArtisansPage = () => {
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const openDialog = (artisan) => {
    setSelectedArtisan(artisan);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedArtisan(null);
  };
  // Artisan data
  const artisans = React.useMemo(() => [
    {
      id: 1,
      name: "Rajendra Sharma",
      title: "Traditional Potter",
      image: potterArtisan,
      story: "Rajendra's hands are a testament to generations of skill, shaping stories from simple clay. Each pot, vase, and bowl is not just an object, but a piece of his family's heritage passed down through his father and grandfather. He believes that the earth itself speaks through his work, and he listens patiently to every curve and line.",
      craft: "Pottery",
      fullDescription: "Born into a family of potters in the historic city of Jaipur, Rajendra Sharma learned the art of pottery at the tender age of seven, watching his grandfather's weathered hands transform lumps of clay into vessels of extraordinary beauty. For over three decades, Rajendra has dedicated his life to preserving the traditional techniques of Rajasthani pottery while infusing his work with contemporary aesthetics.\n\nHis workshop, nestled in the narrow lanes of the old city, is filled with the earthy aroma of wet clay and the gentle hum of the potter's wheel. Rajendra sources his clay from the banks of the nearby river, following a ritual his family has practiced for generations. Each piece begins its journey as raw earth, which Rajendra carefully prepares, kneading and working until it reaches the perfect consistency.\n\nWhat sets Rajendra apart is his deep spiritual connection to his craft. He believes that pottery is not just about creating functional objects, but about channeling the essence of the earth itself. His pieces reflect this philosophy – from elegant water pitchers adorned with intricate geometric patterns to decorative vases that seem to capture the very soul of the desert landscape.\n\nRajendra's work has been featured in numerous exhibitions across India and has found its way into homes around the world. Yet, he remains humble, often saying that he is merely a vessel through which ancient wisdom flows. He takes great pride in teaching young apprentices, ensuring that the traditions of his forefathers will continue to flourish for generations to come."
    },
    {
      id: 2,
      name: "Leela Devi",
      title: "Textile Weaver",
      image: leelaDeviImage,
      story: "The rhythmic click of Leela's loom is a song her village has known for decades. She transforms threads into vibrant tapestries, each one a canvas of intricate patterns and bold colors. Leela uses only natural dyes, a skill she learned from her grandmother, ensuring every piece is as kind to the earth as it is beautiful to behold.",
      craft: "Textile Weaving",
      fullDescription: "In the sun-drenched village of Bhuj in Gujarat, Leela Devi sits at her handloom every morning as the first rays of sunlight filter through her courtyard. For forty years, she has been weaving magic into fabric, creating textiles that tell the stories of her land, her people, and her dreams. Her journey began as a young bride when her mother-in-law, recognizing her artistic potential, taught her the ancient art of traditional Gujarati weaving.\n\nLeela's expertise lies in creating the famous Ajrakh and Bandhani textiles, techniques that have been practiced in Gujarat for over 4,000 years. She uses only natural dyes derived from plants, flowers, and minerals that she and her family collect from the surrounding countryside. Indigo for deep blues, madder root for rich reds, turmeric for golden yellows – each color tells a story of the region's natural bounty.\n\nHer loom, passed down through generations, bears the marks of countless hours of patient work. Each textile takes weeks, sometimes months to complete, as Leela meticulously creates patterns that have been handed down through oral tradition. Her designs often feature motifs inspired by nature – flowing rivers, blooming flowers, soaring birds – each symbolizing different aspects of life and spirituality.\n\nLeela's work has gained recognition far beyond her village. Her textiles have been showcased in museums and cultural centers, and she has trained dozens of young women in her community, providing them with a source of income and a connection to their cultural heritage. Despite her success, Leela remains rooted in her village, believing that her art draws its power from the land where it was born.\n\nWhat makes Leela's work truly special is the love and intention she weaves into every thread. She often says that textiles carry the energy of their creator, and she ensures that every piece she makes is infused with positive thoughts and blessings for whoever will eventually wear or use it."
    },
    {
      id: 3,
      name: "Sarita Patel",
      title: "Traditional Rug Weaver",
      image: rugWeaver,
      story: "Sarita weaves comfort and beauty into every thread of her handmade rugs. Using a blend of ancient techniques and her own artistic vision, she creates stunning patterns that tell stories of her community and the natural world. Each rug is a labor of love, meant to bring warmth and art into every home it enters.",
      craft: "Rug Weaving",
      fullDescription: "Sarita Patel's story begins in the vibrant city of Jaipur, where she was born into a family of renowned carpet weavers. From childhood, she was surrounded by the intricate beauty of hand-knotted rugs, each one a masterpiece of patience, skill, and artistic vision. Under the guidance of her master weaver father, Sarita learned the complex art of rug making, starting with simple patterns and gradually mastering the most intricate designs.\n\nHer specialty lies in creating traditional Rajasthani rugs using techniques that date back centuries. Working with the finest wool and silk, Sarita employs the Persian knot technique, where each knot is tied by hand around the warp threads. A single rug can contain hundreds of thousands of knots, and depending on its size and complexity, can take anywhere from six months to two years to complete.\n\nSarita's designs are inspired by the rich cultural heritage of Rajasthan – from the geometric patterns found in ancient palaces to the flowing motifs seen in Mughal gardens. Her color palette reflects the vibrant hues of her homeland: the deep blues of twilight skies, the warm oranges of desert sunsets, the rich greens of oasis palms, and the golden yellows of marigold flowers.\n\nWhat sets Sarita apart is her commitment to sustainable practices. She sources her wool from local shepherds who practice ethical animal husbandry, and her dyes are made from natural sources – pomegranate skins for yellows, indigo plants for blues, and lac insects for deep reds. This not only ensures the environmental friendliness of her work but also gives her rugs their distinctive, rich coloration that improves with age.\n\nSarita has trained numerous young women in her community, providing them with a skill that offers both cultural connection and economic independence. Her workshop has become a gathering place where traditional songs are sung, stories are shared, and the ancient art of rug weaving continues to thrive. Each rug that emerges from her workshop carries with it the hopes, dreams, and cultural memory of generations of weavers.\n\nHer work has been featured in luxury hotels and homes around the world, but Sarita takes greatest pride in knowing that her rugs provide comfort and beauty to families, creating spaces where memories are made and traditions are passed down."
    },
    {
      id: 4,
      name: "Mohan Lal",
      title: "Master Woodcarver",
      image: woodCarver,
      story: "Mohan's workshop smells of freshly cut wood and old secrets. With his chisel, he breathes life into fallen trees, creating graceful statues and ornate furniture that tell ancient fables. His work is a meditation on nature's beauty and the patience required to reveal the hidden art within a simple block of wood.",
      craft: "Woodcarving",
      fullDescription: "High in the valleys of Kashmir, where ancient cedar and walnut trees reach toward snow-capped peaks, Mohan Lal practices an art form that has defined his region for over a thousand years. Born into a family of woodcarvers in Srinagar, Mohan began his apprenticeship at the age of twelve, learning to read the grain of wood like others read books, understanding how each tree's unique journey shapes its potential for transformation.\n\nMohan specializes in the traditional Kashmiri style of woodcarving, known for its intricate floral patterns and delicate latticework. His tools – chisels, gouges, and knives – some inherited from his grandfather, others crafted by his own hands, are extensions of his artistic vision. He works primarily with walnut wood, prized for its fine grain and warm, honey-colored hue that deepens with age.\n\nEach piece begins with careful selection of the wood. Mohan can tell by touch and sight whether a piece of timber will yield to his vision or resist it. He often spends hours simply studying a block of wood, understanding its natural patterns and planning how to work with, rather than against, its inherent character.\n\nHis signature pieces include intricately carved screens featuring the chinar leaf motif – a symbol of Kashmir's natural beauty and cultural identity. These screens, with their delicate perforations and flowing patterns, filter light in ways that create ever-changing shadow plays on walls and floors. He also creates ornate furniture pieces, jewelry boxes, and decorative panels that showcase the sophisticated aesthetic sensibility of Kashmiri craftsmanship.\n\nMohan's work process is meditative and unhurried. He believes that good carving cannot be rushed, that each cut must be made with intention and respect for the material. His workshop, filled with the sweet scent of walnut shavings and the soft sounds of chisel meeting wood, is a sanctuary where time seems to slow down, allowing for the patient revelation of beauty hidden within each piece of timber.\n\nDespite the challenges faced by artisans in Kashmir, Mohan remains committed to preserving and passing on his craft. He has trained dozens of young carvers, and his work has found appreciation in museums and private collections worldwide. Yet he remains humble about his achievements, often saying that he is merely helping the wood reveal its own inherent beauty.\n\nFor Mohan, woodcarving is not just a livelihood but a spiritual practice, a way of connecting with the natural world and honoring the trees that give their lives for his art. Each finished piece carries with it the essence of the Kashmir valley – its patience, its beauty, and its enduring spirit."
    },
    {
      id: 5,
      name: "Kiran Kumar",
      title: "Wheat Stem Artist",
      image: wheatStemArt,
      story: "Kiran sees potential in the simplest of materials. He meticulously cuts, flattens, and arranges wheat stems to create intricate, textured portraits and landscapes. His unique art form is a beautiful reminder of the rural life he grew up in, transforming agricultural byproducts into stunning works of natural art.",
      craft: "Wheat Stem Art",
      fullDescription: "In the fertile plains of Uttar Pradesh, where golden wheat fields stretch to the horizon, Kiran Kumar has elevated what many consider agricultural waste into a sophisticated art form. Born into a farming family in a small village near Agra, Kiran grew up surrounded by the rhythms of agricultural life – the planting, the growing, the harvesting, and the celebration that follows a good crop.\n\nKiran's journey into wheat stem art began during a particularly abundant harvest season when he was struck by the beauty of the discarded wheat stems. Instead of seeing waste, he saw potential – the natural golden color, the delicate texture, the way light played across the surface of the dried stems. What started as a childhood fascination gradually evolved into a unique artistic practice that has gained recognition across India and beyond.\n\nHis technique involves carefully selecting wheat stems at the perfect stage of dryness, then using traditional tools to split, flatten, and shape them into delicate strips. These strips become his 'paint' – different shades ranging from pale gold to deep amber, each carrying the essence of the Uttar Pradesh countryside. Using a technique similar to marquetry, Kiran arranges these stems to create detailed portraits, landscapes, and abstract compositions.\n\nWhat makes Kiran's work extraordinary is the level of detail he achieves with such humble materials. His portraits capture not just the likeness of his subjects but their emotional essence, using the natural variations in the wheat stems to create depth, shadow, and texture. His landscapes often depict scenes from rural Uttar Pradesh – farmers in their fields, festivals, and the changing seasons that mark the agricultural calendar.\n\nEach artwork takes months to complete. Kiran works with the patience of a farmer, understanding that good things cannot be rushed. He prepares his materials with the same care his ancestors used to prepare the land, sorting and treating each stem until it's ready to contribute to his artistic vision.\n\nKiran's work serves multiple purposes: it creates beautiful art, provides an additional source of income for farming communities, and offers an environmentally sustainable way to use agricultural byproducts. He has trained other farmers in his technique, creating a network of wheat stem artists across Uttar Pradesh who find in this craft both economic opportunity and artistic expression.\n\nHis pieces have been displayed in galleries in Delhi, Mumbai, and even internationally, where viewers are amazed to discover that these intricate, glowing artworks are created entirely from wheat stems. For Kiran, each piece is a celebration of rural life, a reminder that beauty can be found in the most unexpected places, and that art can grow from the very soil that feeds us.\n\nKiran often says that his art is his way of honoring the wheat plant that has sustained his family and community for generations. Through his work, he transforms the humble wheat stem into something precious, creating art that carries within it the golden light of Uttar Pradesh's fields and the enduring spirit of its farming communities."
    }
  ], []);

  // Effect to handle opening dialog from URL parameter
  useEffect(() => {
    const openDialogParam = searchParams.get('openDialog');
    if (openDialogParam) {
      const artisanId = parseInt(openDialogParam);
      const artisan = artisans.find(a => a.id === artisanId);
      if (artisan) {
        openDialog(artisan);
      }
      // Clean up the URL parameter after opening the dialog
      setSearchParams({});
    }
  }, [searchParams, setSearchParams, artisans]);

  return (
    <main className="bg-[#F8F4E1] min-h-screen">
      {/* Header Section */}
      <header className="bg-[#A4604F] text-white py-12 px-6">
        <div className="container mx-auto text-center max-w-6xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">The Artisans of Indikaara</h1>
          <p className="text-lg opacity-90">Celebrating the heart and soul behind every creation.</p>
        </div>
      </header>

      {/* Main Content - Artisans Grid */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artisans.map((artisan) => (
            <div 
              key={artisan.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              {/* Artisan Image */}
              <div className="relative">
                <img 
                  src={artisan.image} 
                  alt={`${artisan.name}, ${artisan.title}`}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-[#A4604F] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {artisan.craft}
                </div>
              </div>

              {/* Artisan Details */}
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-[#A4604F] mb-1">
                  {artisan.name}
                </h2>
                <p className="text-gray-500 mb-4 font-medium">
                  {artisan.title}
                </p>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                  {artisan.story}
                </p>
                
                {/* Read Story Button */}
                <button 
                  onClick={() => openDialog(artisan)}
                  className="inline-block bg-[#A4604F] text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:bg-[#8D5245] focus:outline-none focus:ring-2 focus:ring-[#A4604F] focus:ring-offset-2 transform hover:scale-105"
                  aria-label={`Read more about ${artisan.name}'s story`}
                >
                  Read Story
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Content Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-[#A4604F] mb-4">
              Preserving Traditional Arts
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              At Indikaara, we believe that every product tells a story. Our artisans are not just creators; 
              they are custodians of ancient traditions, passing down skills through generations. When you 
              purchase from us, you're not just buying a product – you're supporting a legacy, a family, 
              and the continuation of India's rich cultural heritage.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="bg-[#A4604F] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#A4604F] mb-2">50+ Artisans</h3>
                <p className="text-gray-600 text-sm">
                  Skilled craftspeople from across India
                </p>
              </div>
              <div className="text-center">
                <div className="bg-[#A4604F] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#A4604F] mb-2">Fair Trade</h3>
                <p className="text-gray-600 text-sm">
                  Ensuring fair wages and working conditions
                </p>
              </div>
              <div className="text-center">
                <div className="bg-[#A4604F] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#A4604F] mb-2">Heritage</h3>
                <p className="text-gray-600 text-sm">
                  Preserving centuries-old traditional techniques
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Dialog Modal */}
      {isDialogOpen && selectedArtisan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Dialog Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#A4604F] text-white">
              <div>
                <h2 className="text-2xl font-bold">{selectedArtisan.name}</h2>
                <p className="text-[#F8F4E1] opacity-90">{selectedArtisan.title}</p>
              </div>
              <button
                onClick={closeDialog}
                className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white hover:bg-opacity-20 rounded-full"
                aria-label="Close dialog"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Dialog Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Artisan Image */}
                <div className="lg:col-span-1">
                  <img 
                    src={selectedArtisan.image} 
                    alt={`${selectedArtisan.name}, ${selectedArtisan.title}`}
                    className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-md"
                  />
                  <div className="mt-4 text-center">
                    <span className="inline-block bg-[#A4604F] text-white px-4 py-2 rounded-full text-sm font-medium">
                      {selectedArtisan.craft}
                    </span>
                  </div>
                </div>

                {/* Full Story */}
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-semibold text-[#A4604F] mb-4">The Complete Story</h3>
                  <div className="prose prose-gray max-w-none">
                    {selectedArtisan.fullDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed mb-4 text-sm">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Dialog Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
              <button
                onClick={closeDialog}
                className="bg-[#A4604F] text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:bg-[#8D5245] focus:outline-none focus:ring-2 focus:ring-[#A4604F] focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ArtisansPage;
