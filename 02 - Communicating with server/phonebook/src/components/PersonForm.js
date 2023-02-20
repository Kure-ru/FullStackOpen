import React from "react";

const PersonForm = ({formSubmit, newName, formNewName, newNum, formNewNum}) => {

    return (
        <form onSubmit={formSubmit}>
            <div>
                <label>name: </label>
                <input value={newName} onChange={formNewName}/>
            </div>
            <div>
                <label>number: </label>
                <input value={newNum} onChange={formNewNum}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )

}


export default PersonForm;
