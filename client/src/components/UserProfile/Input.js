import styled from "styled-components"

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
    @media (max-width: 844px) {
        width: 240px;
        font-size: 11px;
    }
`

export default Input