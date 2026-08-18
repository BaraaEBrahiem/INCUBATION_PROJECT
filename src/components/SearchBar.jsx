import React from "react"
import Input from "./Input"
const SearchBar = ({ placeholder = "ابحث...", onSearch }) => {
  const handleChange = (e) => {
    const value = e.target.value
    if (onSearch) onSearch(value.trim())
  }

 return (
    <div className="flex items-center gap-2 my-4 w-full">
      <Input
        type="text"
        onChange={handleChange}
        placeholder={placeholder}
        className="flex-grow w-full sm:w-64 md:w-80"
      />
    </div>
  )
}

export default SearchBar