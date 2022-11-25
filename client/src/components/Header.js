import styled from "styled-components";
import { CiUser } from "react-icons/ci";

const Header = () =>{

    return (
        <Wrapper>
            <h2>Globe Trotter</h2>
            <Container>
                <Span>Login</Span>
                <CiUser />
            </Container>
        </Wrapper>
    )
}

const Span = styled.p`
    margin-right: 8px;
`
const Container = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 12px;
    border-radius: 12px;
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