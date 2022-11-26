import styled from "styled-components";
import { CiUser } from "react-icons/ci";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from './UserContext';

const Header = () =>{
    const [years, setYears] = useState([]);
    const { handleChange } = useContext(UserContext)

    useEffect ( () => {
        fetch('/get-years')
        .then(results => results.json())
        .then ( data => {
            if(data.status === 400 || data.status === 500) {
                throw new Error(data.message);
            }
            else {
                setYears(data.data);
            }
        })
        .catch((error) => {
            console.log("error");
        })
    }, [])

    return (
        <Wrapper>
            <Title onClick={() => {window.location.href = '/';}}>Globe Trotter</Title>
            <Container>
                {useLocation().pathname === "/" ?
                <label>
                    Xarah Dion Concerts:
                    <Select onChange={handleChange}>
                    <option value="">Select a year...</option>
                    {
                    !years
                    ? <h1>Loading...</h1>
                    : years.map ((year) => {
                        return  (
                            <>
                            <option value={year}>{year}</option>
                            </>
                        )
                    })
                    }
                    </Select>
                </label>
                :<></>}
            </Container>
            <Login>
                <Span>Login</Span>
                <CiUser />
            </Login>
        </Wrapper>
    )
};

const Select = styled.select`
    padding: 5px;
    margin-left: 5px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 600;
    border: solid 2px var(--border-color);
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const Title = styled.h3`
    &:hover{
        cursor: pointer;
    }
`
const Span = styled.p`
    margin-right: 8px;
`
const Login= styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 12px;
    border-radius: 5px;
    font-size: 14px;
    &:hover{
        cursor: pointer;
    }
`
const Wrapper = styled.div`
    margin: 0px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
`
export default Header;