import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = e => {
    setSearchText(e.target.value);
  };

  const handleAlert = () => {
    if (searchText.length === 0)
      toast.success('Please input some text for search!');
  };

  return (
    <div>
      <div className=" my-5 w-full">
        <div className="flex flex-col lg:flex-row gap-5 w-full items-center ">
          <div className="relative w-full">
            <label htmlFor="search"></label>
            <input
              onChange={e => handleSearch(e)}
              type="text"
              name="search"
              id="search"
              value={searchText}
              className="py-3 pl-3 md:pl-10 w-[200px] text-black border mx-auto md:w-[300px] lg:w-[400px] bg-[#EFEFEF] rounded-3xl"
              placeholder="Search By Location (USA)"
            />
            <FaMagnifyingGlass
              className={
                searchText.length === 0
                  ? 'absolute hidden md:block left-5 md:left-3  top-4 text-gray-400'
                  : 'absolute hidden left-5 md:left-3 top-4 text-gray-500'
              }
            />
          </div>
          <button
            onClick={handleAlert}
            className={
              searchText.length === 0
                ? 'btn relative  w-[95%] mx-auto mb-3 md:mb-0  md:w-32 py-[10px] px-4 rounded-3xl bg-blue-600 font-bold text-white  hover:bg-gray-900'
                : 'hidden'
            }
          >
            Search
          </button>

          <Link to={`/search-properties/${searchText}`} className="w-full">
            <button
              className={
                searchText.length > 0
                  ? 'btn  w-[95%] relative mx-auto mb-3 md:mb-0  md:w-32 py-[10px] px-4 rounded-3xl bg-blue-600 font-bold text-white  hover:bg-gray-900'
                  : 'hidden'
              }
            >
              Search
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
