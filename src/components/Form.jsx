import React, { useState } from "react";

function FormSection({title, 
    fields, 
    formData, 
    handleChange, 
    handleReset, 
    handleSubmit,
    handleEdit, 
}) {    
    return (
        <div className="FormSectionContainer">
            <form onSubmit={handleSubmit}>
                <div className="FormSectionTitle">{title}</div>
                {fields.map((field) => (
                    <input
                        key={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleChange}
                    />
                ))}
                <button type="submit">Submit</button>
                <button type="button" onClick={() => handleReset(fields)}>Reset</button>
                <button type="button" onClick={handleEdit}>Edit</button>
            </form>
        </div>
    )
}

export default FormSection;
