import React from "react";

const Filter = ({ searchedName, handleSearch }) => 

<div>
    <label>filter shown with</label>
    <input value={searchedName} onChange={handleSearch}/>
</div>


export default Filter;
