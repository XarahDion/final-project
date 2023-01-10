import React from 'react'
import styled from 'styled-components';

const Pagination = ({ concertsPerPage, totalConcerts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalConcerts/concertsPerPage); i++) {
        pageNumbers.push(i);
    }
    
    return (
        <nav>
            <Container>
                Pages:
                {pageNumbers.map((number) => {
                    console.log(number)
                    return (
                        <a onClick={() => paginate(number)} >
                        <Item key={number}>
                        {number}
                        </Item>
                        </a>
                    )
                })}
            </Container>
        </nav>
    )
};

const Container = styled.ul`
    display: flex;
    align-items: center;
    font-size: 11px;
    gap: 6px;
    margin-top: 10px;
`
const Item = styled.li`
    padding: 6px;
    color: black;
    font-size: 10px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    border-radius: 5px;
    &:hover {
        cursor: pointer;
        background-color: #F0F0F0;
        transition: 0.5s;
    }
`

export default Pagination;
