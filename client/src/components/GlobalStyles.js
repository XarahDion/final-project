import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    :root {
        --font-body: 'Barlow', sans-serif;
        --border-color: #E8E8E8;
    }

    html, body, div, span, applet, object, iframe,
    blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    * {
    font-family: "Barlow";
    }
    input {
        &:disabled {
            cursor: not-allowed;
        }
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
        height:100%;
        overflow:auto;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    button {
        padding: 0px 4px;
        border: none;
        font-size: 12px;
        align-items: center;
        justify-content: center;
        display: flex;
        color: white;
        font-weight: 600;
        @media (max-width: 844px) {
            font-size: 10px;
            padding: 0px 2px;
    }
    }
    label {
        font-family: var(--font-body);
        color: white;
        font-weight: 600;
        @media (max-width: 844px) {
            display: none;
    }
    }
    option {
        font-size: 12px;
        @media (max-width: 844px) {
            font-size: 11px;
    }
    }
    a {
        text-decoration: none;
        color: white;
    }
`;

export default GlobalStyle;