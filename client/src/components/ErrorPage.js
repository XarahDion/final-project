import { FiAlertCircle } from "react-icons/fi";
import styled from "styled-components";

const ErrorPage = () => {
    return (
    <Wrapper>
        <FiAlertCircle size={32}/>
        <Span>An unknown error has occurred.</Span>
        <Refresh>Please try refreshing the page, or contact support if the problem persists.</Refresh>
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
export default ErrorPage;