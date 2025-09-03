import { Mail, Phone, Film } from "lucide-react";

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-[280px] bg-[#4338CA] py-8 md:py-[40px] px-4 md:px-0 justify-around gap-8 md:gap-12 text-[#FAFAFA]">
      <div className="w-full md:w-[280px] h-full flex flex-col gap-2 items-start">
        <div className="flex items-center w-fit gap-1.5">
          <Film className="w-[18px] h-[18px]" />
          <span className="text-[16px] font-bold">Movie Z</span>
        </div>
        <p className="text-sm md:text-base">© 2024 Movie Z. All Rights Reserved.</p>
      </div>
      
      <div className="w-full md:w-auto">
        <div className="flex flex-col justify-end w-full md:w-[560px]">
          <div>
            <p className="flex justify-start md:justify-end text-lg font-semibold mb-3">Contact Information</p>
          </div>
          <div className="flex justify-start md:justify-end items-center gap-2 mt-[12px]">
            <Mail className="w-[18px] h-[18px]" />
            <span className="text-sm md:text-base">Email: support@movieZ.com</span>
          </div>
          <div className="flex justify-start md:justify-end items-center gap-2 mt-[24px]">
            <Phone className="w-[18px] h-[18px]" />
            <span className="text-sm md:text-base">Phone: +976 (11) 123-4567</span>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-auto">
        <p className="text-lg font-semibold mb-3">Follow us</p>
        <div className="flex flex-wrap gap-3 text-sm md:text-base">
          <span className="cursor-pointer hover:text-blue-200">Facebook</span>
          <span className="cursor-pointer hover:text-blue-200">Instagram</span>
          <span className="cursor-pointer hover:text-blue-200">Twitter</span>
          <span className="cursor-pointer hover:text-blue-200">Youtube</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
