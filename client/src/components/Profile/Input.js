import styled from "styled-components"

// renders the input field for the form
const Input = ({type, placeholder, name, required, handleChange, data}) => {
    
    return (
        <StyledInput 
            type={type} 
            placeholder={placeholder} 
            required={required} 
            value={data}
            // send the text to parent Form with handleChange
            onChange={(e) => handleChange(name, e.target.value)}
        />
    )
};

const StyledInput = styled.input`
    font-size: 12px;
    border-radius: 5px;
    width: 300px;
    border: 2px solid #EEEFF4;
    padding: 8px;
    margin: 5px 10px;
`

export default Input