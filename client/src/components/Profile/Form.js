import { useState } from "react";
import styled from "styled-components"
import Input from "./Input"

/// renders the form component
const Form = ({ handleSubmit }) => {
    const [formData, setFormData] = useState();

/// registers what is inputted in the input fields 
    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }

    return (
        /// onSubmit, sends the formData to OrderPage component with handleSubmit function
        <StyledForm onSubmit={(e) => handleSubmit(e, formData)}>
            <InstDiv>
                <DivDet>Enter travel details</DivDet> <DivDet>All fields are mandatory</DivDet>
            </InstDiv>
            <Div>
                {/* defines the attributes and functions of the input fields */}
                <Input 
                    type="text" 
                    placeholder="DD/MM/YYY"
                    name={"date"}
                    required={true}
                    handleChange={handleChange} 
                />
                <Input 
                    type="text" 
                    placeholder="Location or comment"
                    name={"venue"}
                    required={true}
                    handleChange={handleChange} 
                />
            </Div>
            <Div>
                <Input 
                    type="text" 
                    placeholder="City"
                    name={"city"}
                    required={true}
                    handleChange={handleChange} 
                />
                <Input 
                    type="text" 
                    placeholder="Country"
                    name={"country"}
                    required={true}
                    handleChange={handleChange} 
                />
            </Div>
            {/* the Submit button fires the handleSubmit function */}
            <Submit type="submit" >Add Travel</Submit>
        </StyledForm>
    )
};

const DivDet = styled.div`
    justify-content: space-between;
`
const Div = styled.div `
    display: flex;
    justify-content: space-between;
    padding: 0px 60px;
`
const InstDiv = styled.div `
    font-size: 10px;
    display: flex;
    justify-content: space-between;
    padding: 0px 80px;
`

const Submit = styled.button`
    width: 200px;
    margin-top: 15px;
    border-radius: 5px;
    align-self: center;
    font-size: 12px;
    height: 40px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    &:hover{
        cursor: pointer;
    }
    &:disabled{
        color: grey;
    }
`
const StyledForm = styled.form`
    max-width: 700px;
    margin: 0px 0px 0px 34px;
    padding: 24px 0px;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    border-radius: 5px;
    gap: 5px;
    font-size: 12px;
`

export default Form