import mailLogo from '../assets/mailpng.png';

export function MailButton() {
  return (
    <a 
      href="mailto:kumar.sweety2590@gmail.com" 
      className="fixed bottom-[11.5rem] right-4 md:bottom-[14.5rem] md:right-6 z-50 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all duration-300 drop-shadow-[0_10px_25px_rgba(220,38,38,0.4)]"
      aria-label="Send an Email"
    >
      <img src={mailLogo} alt="Mail" className="w-full h-full object-contain" />
    </a>
  );
}
