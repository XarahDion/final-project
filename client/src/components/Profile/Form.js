import { useEffect, useState } from "react";
import styled from "styled-components"
import Input from "./Input"

/// renders the form component
const Form = ({ handleSubmit, handleUpdate, formData, setFormData, err }) => {
    const [state, setState]= useState("")

    useEffect (() => {
        if (formData) {
            setState(formData.date)
        }
    }, [formData])

    /// registers what is inputted in the input fields 
    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }

    return (
        /// onSubmit, sends the formData to Profile component with handleSubmit function
        <StyledForm onSubmit={(e) => handleSubmit(e, formData)}>
            <InstDiv>
                <DetDiv>Enter travel details</DetDiv> <DetDiv>All fields are mandatory</DetDiv>
            </InstDiv>
            <InDiv>
                {/* defines the attributes and functions of the input fields */}
                <Input 
                    type="text" 
                    placeholder="DD/MM/YYY"
                    name={"date"}
                    required={true}
                    data={formData && formData.date}
                    handleChange={handleChange} 
                />
                <Input 
                    type="text" 
                    placeholder="Places visited or comment"
                    name={"venue"}
                    required={true}
                    data={formData && formData.venue}
                    handleChange={handleChange} 
                />
            </InDiv>
            <InDiv>
                <Input 
                    type="text" 
                    placeholder="City (no blank spaces)"
                    name={"city"}
                    required={true}
                    data={formData && formData.city}
                    handleChange={handleChange} 
                />
                <Input 
                    type="text" 
                    placeholder="Country"
                    name={"country"}
                    required={true}
                    data={formData && formData.country}
                    handleChange={handleChange} 
                />
            </InDiv>
            {/* the Submit button fires the handleSubmit function */}
            <BtnDiv>
                <Button type="submit" > Add Travel </Button>
                <Button type="submit"
                    onClick={(e) => handleUpdate(e, formData)}
                    disabled={!formData ? true : false}> Modify Travel </Button>
            </BtnDiv>
            {err ? <Err>To modify a travel, please select a travel from the list below.</Err> : <Err></Err>}
        </StyledForm>
    )
};

const Err = styled.div`
    color: red;
    text-align: center;
    margin-top: 10px;
    height: 10px;
    font-size: 10px;
    margin-bottom: 6px;
`
const BtnDiv = styled.div`
    display: flex;
    justify-content: center;
    gap: 24px;
`
const DetDiv = styled.div`
    justify-content: space-between;
`
const InDiv = styled.div `
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
const Button = styled.button`
    width: 160px;
    margin-top: 15px;
    border-radius: 5px;
    align-self: center;
    font-size: 11px;
    height: 30px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    &:hover{
        cursor: pointer;
        background-color: white;
    }
`
const StyledForm = styled.form`
    max-width: 700px;
    margin: 0px 0px 0px 24px;
    padding: 22px 0px 5px 0px;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    border-radius: 5px;
    gap: 5px;
    font-size: 12px;
`

export default Form