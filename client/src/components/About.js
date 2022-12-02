import styled from "styled-components";

const About = () => {
    return (
    <Wrapper>
        <Span>About page.</Span>
        <Refresh>Information about page.</Refresh>
    </Wrapper>
        )
};

const Refresh = styled.span`

`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    font-family: var(--font-body);
    font-size: 12px;
`
const Span = styled.span`
    font-weight: 900;
    padding: 30px 0px 20px;
`
export default About;