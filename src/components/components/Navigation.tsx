const Navigation = () => {
  return (
    <div className="w-screen flex justify-between items-center h-[60px] px-4">
      <div className="flex items-center justify-between gap-1">
        <img src="./film.svg" alt="film logo" className="w-[20px] h-[20px]" />
        <span className="text-[16px] font-bold text-indigo-700">Movie Z</span>
      </div>
      <div className="flex justify-between gap-2">
        <button className="border rounded-md border-[#E4E4E7] px-4 py-2">
          Genre
        </button>
        <input
          type="text"
          typeof="search"
          className="border rounded-md border-[#E4E4E7] px-4 py-2"
          placeholder="Search..."
        />
      </div>

      <div className="flex items-center justify-center w-[36px] h-[36px] border border-[#E4E4E7] rounded-md">
        <img src="./moon.svg" alt="moon logo" className="w-[20px] h-[20px]" />
      </div>
    </div>
  );
};
export default Navigation;
