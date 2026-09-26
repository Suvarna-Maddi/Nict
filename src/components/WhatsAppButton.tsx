import whatsappLogo from '../assets/whatsapplogo.webp';

export function WhatsAppButton() {
  return (
    <a 
      href="https://wa.me/918247419292?text=Hi%2C%20I%27m%20interested%20in%20learning%20more%20about%20the%20courses%20at%20NICT." 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all duration-300 drop-shadow-[0_10px_25px_rgba(37,211,102,0.6)]"
      aria-label="Chat on WhatsApp"
    >
      <img src={whatsappLogo} alt="WhatsApp" className="w-full h-full object-contain" />
    </a>
  );
}
