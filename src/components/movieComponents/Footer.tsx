import { Mail, Phone, Film } from "lucide-react";
const Footer = () => {
  return (
    <div className="flex w-full h-[280px] bg-[#4338CA] py-[40px] justify-around gap-12  text-[#FAFAFA]">
      <div className="w-[280px] h-full flex flex-col gap-2 items-start ">
        <div className="flex items-center w-fit gap-1.5">
          <Film className="w-18px h-18px" />
          <span className="text-[16px] font-bold">Movie Z</span>
        </div>
        <p>© 2024 Movie Z. All Rights Reserved.</p>
      </div>
      <div>
        <div className="flex flex-col justify-end w-[560px]">
          <div>
            <p className="flex justify-end">Contact Information</p>
          </div>
          <div className="flex justify-end items-center gap-2 mt-[12px]">
            <Mail className="w-[18px] h-[18px]" />
            <span className="">Email: support@movieZ.com</span>
          </div>
          <div className="flex justify-end items-center gap-2 mt-[24px]">
            <Phone className="w-[18px] h-[18px]" />
            <span className="mp-[12px]">Phone: +976 (11) 123-4567</span>
          </div>
        </div>
      </div>
      <div className="">
        <p>Follow us</p>
        <div className="flex gap-3">
          <span>Facebook</span>
          <span>Instagram</span> <span>Twitter</span> <span>Youtube</span>
        </div>
      </div>
    </div>
  );
};
export default Footer;
