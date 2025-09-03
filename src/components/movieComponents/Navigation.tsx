import { ArrowDown, Moon } from "lucide-react";
import SearchBar from "./SearchBar";

const Navigation = () => {
  return (
    <div className="w-screen flex flex-col md:flex-row justify-between items-center h-auto md:h-[60px] px-4 py-3 md:py-0 gap-3 md:gap-0">
      <div className="flex items-center justify-between gap-1">
        <img src="../film.svg" alt="film logo" className="w-[20px] h-[20px]" />
        <span className="text-[16px] font-bold text-indigo-700">Movie Z</span>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-2 w-full md:w-auto">
        <button className="flex border rounded-md border-[#E4E4E7] px-4 py-2 gap-1 justify-center">
          <ArrowDown /> Genre
        </button>
        <SearchBar />
      </div>

      <div className="flex items-center justify-center w-[36px] h-[36px] border border-[#E4E4E7] rounded-md">
        <Moon className="w-[18px] h-[18px]" />
      </div>
    </div>
  );
};
export default Navigation;
