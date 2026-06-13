import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = ({ scrolled }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        navigate(`/shop?search=${encodeURIComponent(query)}`);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, navigate]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="hidden lg:flex ml-2 w-[200px] items-center relative group-searchbar">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="absolute left-3 fill-current w-[0.9rem] h-[0.9rem] pointer-events-none z-10 opacity-50">
        <g>
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
        </g>
      </svg>
      <input
        type="search"
        value={query}
        onChange={handleSearchChange}
        className={`font-sans w-full h-[38px] pl-[2.2rem] border-[1.5px] rounded-full outline-none text-[0.85rem] transition-all duration-300 cursor-text focus:bg-white/20 focus:border-white/50 ${
          scrolled
            ? "border-border bg-bg-alt text-text placeholder:text-text-muted group-hover:border-border group-hover:bg-bg-alt group-hover:text-text group-hover:placeholder:text-text-muted"
            : "border-white/30 bg-white/10 text-inherit placeholder:text-inherit placeholder:opacity-50 group-hover:border-border group-hover:bg-bg-alt group-hover:text-text group-hover:placeholder:text-text-muted"
        }`}
        placeholder="Search..."
        name="searchbar"
        id="query"
      />
    </div>
  );
};

export default Searchbar;