import styled from "styled-components"
import Input from "./Input"

const Form = ({
    handleSubmit,
    handleUpdate,
    formData,
    setFormData,
    updateErr,
    updateId,
    postErr,
    setPostErr
    }) => {

    /// registers what is inputted in the input fields and stores it in state as formData
    const handleChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        });
        setPostErr(null);
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
                    data={formData && formData.date} // passes down data to the child component Input
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
                    placeholder="Country (no blank spaces)"
                    name={"country"}
                    required={true}
                    data={formData && formData.country}
                    handleChange={handleChange} 
                />
            </InDiv>
            {/* if there's an error on inputting for post or patch fetches, display error */}
            {postErr ? <Err>{postErr}</Err> : <Err></Err>}
            <BtnDiv>
                <Button type="submit" //disable button when user wants to update a travel and vice versa
                    disabled={updateId ? true : false}> Add Travel </Button> 
                <Button type="submit"
                    onClick={(e) => handleUpdate(e, formData)} // fires the handleUpdate function in ProfilePage, fires the patch fetch
                    disabled={!updateId ? true : false}> Modify Travel </Button>
            </BtnDiv>
            {/* user has to click on modify button in travels' list to populate the form before being able to modify from Form */}
            {updateErr || !updateId ? <Err>To modify a travel, please select a travel from the list below.</Err> : <Err></Err>}
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
    align-items: center;
    padding: 0px 60px;
    @media (max-width: 844px) {
        padding: 0px;
        flex-direction: column;
    }
`
const InstDiv = styled.div `
    font-size: 10px;
    display: flex;
    justify-content: space-between;
    padding: 0px 80px;
    @media (max-width: 844px) {
        padding: 0px 10px 5px 10px;
    }
`
const Button = styled.button`
    width: 160px;
    border-radius: 5px;
    align-self: center;
    font-size: 11px;
    height: 30px;
    color: black;
    font-weight: 200;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    &:hover:enabled{
        cursor: pointer;
        background-color: white;
        transition: 0.5s;
    }
    &:disabled:hover {
        background-color: none;
    }
    @media (max-width: 844px) {
        width: 80px;
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
    @media (max-width: 844px) {
        font-size: 11px;
        max-width: auto;
        gap: 0;
        margin: 10px;
    }
`

export default Form