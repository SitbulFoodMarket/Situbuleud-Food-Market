import React, { useState, useEffect } from 'react';
import { ChevronLeft, Home, Search, ShoppingBag, ArrowLeft, Instagram } from 'lucide-react';

// --- DATA DUMMY 40 OUTLET ---
const outletData = Array.from({ length: 40 }, (_, i) => {
  const categories = ['Takoyaki', 'Sushi', 'Dimsum', 'Minuman', 'Kebab', 'Bakso', 'Sate', 'Kopi'];
  const category = categories[i % categories.length];
  const id = i + 1;
  
  // GENERATE KODE OUTLET (A, B, C, D)
  const blockChar = String.fromCharCode(65 + Math.floor(i / 10)); // A, B, C, D
  const blockNum = (i % 10) + 1;
  const code = `${blockChar}${blockNum}`; 

  // TENTUKAN WARNA BADGE SESUAI DENAH
  let badgeColor = 'bg-gray-500 text-white'; 
  if (blockChar === 'A') badgeColor = 'bg-yellow-500 text-white';      // Kuning
  if (blockChar === 'B') badgeColor = 'bg-blue-600 text-white';        // Biru
  if (blockChar === 'C') badgeColor = 'bg-orange-500 text-white';      // Oranye
  if (blockChar === 'D') badgeColor = 'bg-emerald-600 text-white';     // Hijau

  return {
    id: id,
    code: code, 
    badgeColor: badgeColor, 
    name: `${category} Enak ${id}`,
    category: category,
    imageLocal: `/images/outlet-${id}.jpg`,
    imageOnline: `https://source.unsplash.com/400x300/?${category},food&sig=${id}` 
  };
});

// --- DATA DUMMY MENU ---
const generateMenu = (category) => Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Paket ${category} ${String.fromCharCode(65 + i)}`, 
  price: 15000 + (i * 2000), 
  imageLocal: `/images/menu-${category.toLowerCase()}-${i+1}.jpg`,
  imageOnline: `https://source.unsplash.com/300x300/?${category},meal&sig=${i+100}`
}));

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedOutlet, setSelectedOutlet] = useState(null);

  const handleOpenMenu = (outlet) => {
    setSelectedOutlet(outlet);
    setCurrentPage('menu');
    window.scrollTo(0, 0); 
  };

  const handleBack = () => {
    if (currentPage === 'menu') setCurrentPage('list');
    else if (currentPage === 'list') setCurrentPage('landing');
  };

  // --- KOMPONEN GAMBAR PINTAR (Helper) ---
  const SmartImage = ({ srcLocal, srcOnline, alt, className }) => {
    const [imgSrc, setImgSrc] = useState(srcLocal);

    return (
      <img 
        src={imgSrc}
        alt={alt}
        className={className}
        onError={() => setImgSrc(srcOnline)} 
      />
    );
  };

  // --- HALAMAN 1: LANDING PAGE ---
  const LandingPage = () => (
    <div className="min-h-screen bg-[#0B2545] flex flex-col items-center justify-between relative overflow-hidden font-lato transition-opacity duration-500">
      <div className="h-10 w-full"></div>
      
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="w-48 h-48 mb-4 relative text-white animate-fade-in-up">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M130 50 L80 130" stroke="white" strokeWidth="8" strokeLinecap="round" />
            <path d="M130 50 L145 30 M135 45 L150 25 M140 40 L155 20" stroke="white" strokeWidth="6" strokeLinecap="round" />
            <path d="M70 50 L120 130" stroke="white" strokeWidth="8" strokeLinecap="round" />
            <ellipse cx="70" cy="50" rx="15" ry="25" transform="rotate(-45 70 50)" fill="white" />
            <path d="M40 130 L100 80 L160 130" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="85" y="110" width="30" height="30" stroke="white" strokeWidth="4" />
            <line x1="100" y1="110" x2="100" y2="140" stroke="white" strokeWidth="4" />
            <line x1="85" y1="125" x2="115" y2="125" stroke="white" strokeWidth="4" />
            <path d="M60 150 Q100 130 150 150" stroke="white" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>
        <div className="text-center">
          <h1 className="text-5xl text-white font-pacifico mb-2 tracking-wide">Situ Buleud</h1>
          <p className="text-white text-sm tracking-[0.3em] font-bold uppercase">Food Market</p>
        </div>
      </div>

      <div onClick={() => setCurrentPage('list')} className="w-full cursor-pointer group z-10">
        <div className="bg-white rounded-t-[3rem] pb-12 pt-8 px-8 w-full max-w-md mx-auto relative transition-transform hover:-translate-y-2 duration-300 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
          <p className="text-[#0B2545] text-center font-bold text-lg mb-6 tracking-wide">KLIK UNTUK LIHAT MENU</p>
          <div className="flex justify-center gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`transform transition-all duration-500 animate-bounce`} style={{ animationDelay: `${i * 100}ms` }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#4B6584" className="group-hover:fill-[#0B2545]">
                   <path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z"/>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // --- HALAMAN 2: LIST OUTLET ---
  const OutletListPage = () => (
    <div className="min-h-screen bg-slate-50 font-lato pb-10 animate-fade-in">
      <div className="bg-white sticky top-0 z-20 shadow-sm">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <button onClick={() => setCurrentPage('landing')} className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors">
                <ArrowLeft className="w-6 h-6 text-[#0B2545]" />
             </button>
             <h2 className="text-xl font-bold text-[#0B2545]">Situ Buleud</h2>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        
        {/* DENAH LOKASI */}
        <div className="bg-[#0B2545] rounded-2xl p-6 shadow-lg relative overflow-hidden">
          <h3 className="text-white font-bold mb-4 text-center tracking-wide border-b border-white/20 pb-2">DENAH LOKASI OUTLET</h3>
          <div className="bg-slate-100 rounded-lg p-2 h-64 relative overflow-hidden border-2 border-slate-300">
             <svg viewBox="0 0 320 280" className="w-full h-full font-bold">
                <rect width="320" height="280" fill="#F3F4F6" />
                
                {/* --- BLOK C (Oranye - Label Putih, Angka Hitam) --- */}
                <g fill="#F97316" stroke="#C2410C" strokeWidth="0.5">
                    {[1, 2, 3, 4, 5, 6].map((num, i) => (
                      <g key={i}>
                        <rect x={10 + (i*17)} y={10} width="17" height="25" />
                        <text x={18.5 + (i*17)} y={27} fontSize="9" textAnchor="middle" fill="black">{num}</text>
                      </g>
                    ))}
                </g>
                <rect x={112} y={10} width="17" height="25" fill="#F97316" stroke="#C2410C" strokeWidth="0.5" />
                <text x={120.5} y={27} fontSize="12" textAnchor="middle" fill="white" fontWeight="900">C</text>
                <g fill="#F97316" stroke="#C2410C" strokeWidth="0.5">
                    {[7, 8, 9, 10, 11, 12].map((num, i) => (
                      <g key={i}>
                        <rect x={129 + (i*17)} y={10} width="17" height="25" />
                        <text x={137.5 + (i*17)} y={27} fontSize="9" textAnchor="middle" fill="black">{num}</text>
                      </g>
                    ))}
                </g>
                {/* Toilet */}
                <rect x={240} y={10} width="70" height="25" fill="#A3E635" stroke="#365314" strokeWidth="0.5" />
                <text x={275} y={26} fontSize="10" textAnchor="middle" fill="#1A2E05" fontWeight="bold">TOILET</text>

                {/* --- BLOK B (Biru - Label Putih, Angka Hitam) --- */}
                <g fill="#2563EB" stroke="#1E3A8A" strokeWidth="0.5">
                     {[12, 11, 10, 9, 8, 7].map((num, i) => (
                       <g key={i}>
                         <rect x={20} y={50 + (i*18)} width="25" height="18" />
                         <text x={32.5} y={62 + (i*18)} fontSize="9" textAnchor="middle" fill="black">{num}</text>
                       </g>
                     ))}
                </g>
                <rect x={45} y={50} width="20" height="108" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="0.5" />
                <text x={55} y={108} fontSize="14" textAnchor="middle" fill="white" fontWeight="900">B</text>
                <g fill="#2563EB" stroke="#1E3A8A" strokeWidth="0.5">
                     {[6, 5, 4, 3, 2, 1].map((num, i) => (
                       <g key={i}>
                         <rect x={65} y={50 + (i*18)} width="25" height="18" />
                         <text x={77.5} y={62 + (i*18)} fontSize="9" textAnchor="middle" fill="black">{num}</text>
                       </g>
                     ))}
                </g>

                {/* --- BLOK D (Hijau - Label Putih, Angka Hitam) --- */}
                <g fill="#059669" stroke="#064E3B" strokeWidth="0.5">
                     {[3, 2, 1].map((num, i) => (
                       <g key={i}>
                          <rect x={110} y={50 + (i*36)} width="25" height="36" />
                          <text x={122.5} y={70 + (i*36)} fontSize="10" textAnchor="middle" fill="black">{num}</text>
                       </g>
                     ))}
                </g>
                <rect x={135} y={50} width="20" height="108" fill="#10B981" stroke="#064E3B" strokeWidth="0.5" />
                <text x={145} y={108} fontSize="14" textAnchor="middle" fill="white" fontWeight="900">D</text>
                <g fill="#059669" stroke="#064E3B" strokeWidth="0.5">
                     {[6, 5, 4].map((num, i) => (
                       <g key={i}>
                          <rect x={155} y={50 + (i*36)} width="25" height="36" />
                          <text x={167.5} y={70 + (i*36)} fontSize="10" textAnchor="middle" fill="black">{num}</text>
                       </g>
                     ))}
                </g>

                {/* --- MASJID --- */}
                <rect x={240} y={50} width="70" height="70" fill="#D9F99D" stroke="#365314" strokeWidth="0.5" />
                <text x={275} y={90} fontSize="10" textAnchor="middle" fill="#365314" fontWeight="bold">MASJID</text>

                {/* --- BLOK A (Kuning - Label Putih, Angka Hitam) --- */}
                <g fill="#EAB308" stroke="#713F12" strokeWidth="0.5">
                     {[6, 5, 4, 3, 2, 1].map((num, i) => (
                       <g key={i}>
                         <rect x={20} y={170 + (i*15)} width="25" height="15" />
                         <text x={32.5} y={181 + (i*15)} fontSize="8" textAnchor="middle" fill="black">{num}</text>
                       </g>
                     ))}
                </g>
                <rect x={45} y={170} width="20" height="90" fill="#FACC15" stroke="#713F12" strokeWidth="0.5" />
                <text x={55} y={215} fontSize="12" textAnchor="middle" fill="white" fontWeight="900">A</text>
                <g fill="#EAB308" stroke="#713F12" strokeWidth="0.5">
                     {[12, 11, 10, 9, 8, 7].map((num, i) => (
                       <g key={i}>
                         <rect x={65} y={170 + (i*15)} width="25" height="15" />
                         <text x={77.5} y={181 + (i*15)} fontSize="8" textAnchor="middle" fill="black">{num}</text>
                       </g>
                     ))}
                </g>

                {/* --- JALAN & PARKIR --- */}
                <rect x={110} y={170} width="70" height="90" fill="#64748B" />
                <line x1="145" y1="180" x2="145" y2="200" stroke="white" strokeWidth="2" />
                <line x1="145" y1="210" x2="145" y2="230" stroke="white" strokeWidth="2" />
                <line x1="145" y1="240" x2="145" y2="260" stroke="white" strokeWidth="2" />
                <rect x={180} y={170} width="130" height="90" fill="#BFDBFE" />
                <text x={245} y={215} fontSize="10" textAnchor="middle" fill="#1E3A8A" fontWeight="bold">AREA PARKIR</text>
             </svg>
          </div>
        </div>

        {/* LIST OUTLET */}
        <div>
          <h3 className="text-[#0B2545] font-bold text-lg mb-4">List Outlet ({outletData.length})</h3>
          <div className="grid grid-cols-2 gap-4">
            {outletData.map((outlet) => (
              <div key={outlet.id} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col">
                <div className="h-28 rounded-xl w-full mb-3 overflow-hidden group bg-slate-100">
                    <SmartImage 
                        srcLocal={outlet.imageLocal}
                        srcOnline={outlet.imageOnline}
                        alt={outlet.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
                
                {/* NAMA & KODE BERWARNA */}
                <div className="flex justify-between items-start mb-1 w-full">
                    <h4 className="font-bold text-[#0B2545] text-sm leading-tight truncate pr-1">
                        {outlet.name}
                    </h4>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold flex-shrink-0 ${outlet.badgeColor}`}>
                        {outlet.code}
                    </span>
                </div>

                <p className="text-slate-400 text-xs mb-3">{outlet.category}</p>
                <button 
                  onClick={() => handleOpenMenu(outlet)}
                  className="mt-auto w-full bg-[#0B2545] text-white text-xs font-bold py-2 rounded-lg hover:bg-[#163A66] transition-colors"
                >
                  Lihat Menu
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // --- HALAMAN 3: DETAIL MENU ---
  const MenuPage = () => {
    const menus = generateMenu(selectedOutlet?.category || 'Makanan');

    return (
      <div className="min-h-screen bg-slate-50 font-lato pb-20 animate-slide-in-right">
        <div className="bg-white sticky top-0 z-20 shadow-sm py-4">
            <div className="px-4 flex items-center gap-4">
                <button onClick={handleBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors">
                    <ArrowLeft className="w-6 h-6 text-[#0B2545]" />
                </button>
                <h2 className="text-xl font-bold text-[#0B2545]">{selectedOutlet?.name}</h2>
            </div>
        </div>
        <div className="p-4 space-y-6">
            
            {/* HERO IMAGE OUTLET */}
            <div className="w-full h-56 rounded-2xl overflow-hidden shadow-lg relative bg-slate-200">
                <SmartImage 
                    srcLocal={`/images/outlet-hero-${selectedOutlet?.id}.jpg`}
                    srcOnline={selectedOutlet?.imageOnline} 
                    alt={selectedOutlet?.name}
                    className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-white px-4 py-1 rounded shadow-lg border border-white/20 -rotate-2">
                     <span className="text-xs font-bold tracking-widest uppercase">Jawaranya {selectedOutlet?.category}</span>
                </div>
                
                {/* LOGO KODE OUTLET (BERWARNA) */}
                <div className="absolute bottom-4 left-4 bg-white p-1 rounded-full shadow-lg border-2 border-[#0B2545]">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${selectedOutlet?.badgeColor}`}>
                         {selectedOutlet?.code}
                     </div>
                </div>
            </div>
            
            {/* List Menu */}
            <div>
                <h3 className="font-bold text-lg mb-4 text-black">Menu Spesial</h3>
                <div className="grid grid-cols-2 gap-4">
                    {menus.map((menu) => (
                        <div key={menu.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all">
                            <div className="h-32 w-full relative bg-slate-100">
                                <SmartImage 
                                    srcLocal={menu.imageLocal}
                                    srcOnline={menu.imageOnline}
                                    alt={menu.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent h-12"></div>
                            </div>
                            <div className="p-3">
                                <h4 className="font-bold text-slate-800 text-sm mb-1 leading-tight">{menu.name}</h4>
                                <p className="text-[#0B2545] font-bold text-xs mb-2">Rp {menu.price.toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- FOOTER KONTAK --- */}
            <div className="mt-8 border-t border-slate-200 pt-6">
                <h3 className="font-bold text-lg mb-4 text-[#0B2545]">Info & Pemesanan</h3>
                <div className="space-y-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    
                    {/* Instagram */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center text-white shrink-0">
                             <Instagram className="w-5 h-5" />
                        </div>
                        <div>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Instagram</p>
                             <p className="text-sm font-bold text-slate-700">@{selectedOutlet?.name.replace(/\s+/g, '').toLowerCase()}_sb</p>
                        </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
                             <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                             </svg>
                         </div>
                         <div>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">WhatsApp</p>
                             <p className="text-sm font-bold text-slate-700">+62 812-9900-{selectedOutlet?.id.toString().padStart(4, '0')}</p>
                         </div>
                    </div>

                    <div className="h-px bg-slate-100 my-2"></div>

                    {/* GoFood */}
                    <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center shrink-0 p-1">
                             <svg viewBox="0 0 24 24" className="w-full h-full text-green-600 fill-current">
                                <circle cx="12" cy="12" r="10" />
                                <circle cx="12" cy="12" r="4" fill="white" />
                             </svg>
                         </div>
                         <div>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">GoFood</p>
                             <p className="text-sm font-bold text-slate-700">{selectedOutlet?.name}</p>
                         </div>
                    </div>

                    {/* ShopeeFood */}
                    <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white shrink-0 p-1.5">
                              <ShoppingBag className="w-full h-full fill-current" />
                         </div>
                         <div>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ShopeeFood</p>
                             <p className="text-sm font-bold text-slate-700">{selectedOutlet?.name}</p>
                         </div>
                    </div>

                    {/* GrabFood */}
                    <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white shrink-0 p-1">
                             <span className="font-bold text-[10px] italic">Grab</span>
                         </div>
                         <div>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">GrabFood</p>
                             <p className="text-sm font-bold text-slate-700">{selectedOutlet?.name}</p>
                         </div>
                    </div>

                </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentPage === 'landing' && <LandingPage />}
      {currentPage === 'list' && <OutletListPage />}
      {currentPage === 'menu' && <MenuPage />}
    </>
  );
}