import styled from "styled-components";
import EmblaCarousel from "./EmblaCarousel";
import { FiFacebook, FiInstagram, FiGithub, FiTwitter, FiMusic, FiHome, FiVideo, FiLinkedin } from "react-icons/fi";

const About = () => {
    return (
    <Wrapper>
        <EmblaCarousel />
        <SidebarLeft>
            <a href="https://www.linkedin.com/in/xarahdion/" target="blank">
                <FiLinkedin size={22} /></a>
            <a href="https://github.com/XarahDion" target="blank">
                <FiGithub size={22}/></a>
            <a href="https://xarahdion.com/" target="blank">
                <FiHome size={22}/></a>
            <a href="https://www.facebook.com/xarahdion/" target="blank">
                <FiFacebook size={22}/></a>
        </SidebarLeft>
        <Credit href="http://www.mayamorphosis.com/" target="blank">Photos by Mayamorphosis</Credit>
        <Title >About Earth Trotter and Xarah Dion</Title>
        <BioDiv>Earth Trotter is Xarah Dion's final project for the Concordia University Full-Stack MERN Web Developement Bootcamp.
            It makes use of HTML, CSS, ES6 JavasScript and React on the front-end, NodeJS, ExpressJS and MongoDB on the back-end, and intergrates the following APIs : OpenCage, MapboxGL, Auth0 and RoadGoat.
            Music producer, touring musician, longtime recording artist, now transitioning into full-stack web development, honing her coding skills with the same passion and attention to detail and method she acquired in her music career.
        </BioDiv>
        <BioDiv>Earth Trotter est le projet final de Xarah Dion pour le bootcamp en développement Web Full-Stack MERN de l'université Concordia.
            Il nécessite la connaissance de HTML, CSS, ES6 JavasScript et React sur le front-end, NodeJS, ExpressJS et MongoDB sur le back-end, et utilise les API suivantes : OpenCage, MapboxGL, Auth0 et RoadGoat.
            Productrice de musique, musicienne de tournée, artiste d'enregistrement de longue date, en transition vers le développement Web, perfectionnant ses compétences en codage avec la même passion et soucis du détail et de la méthode qu'elle a acquis dans sa carrière musicale.
        </BioDiv>
        <SidebarRight>
        <a href="https://soundcloud.com/zodiaquemusique" target="blank">
            <FiMusic size={22}/></a>
        <a href="https://www.youtube.com/channel/UCacNlpgifAmWBMsiBQ0WAEg" target="blank">
            <FiVideo size={22}/></a>
        <a href="https://www.instagram.com/__xarah__/?hl=en" target="blank">
            <FiInstagram size={22}/></a>
        <a href="https://twitter.com/xarahdion?lang=en" target="blank">
            <FiTwitter size={22}/></a>
        </SidebarRight>
    </Wrapper>
        )
};

const Credit= styled.a`
    color: white;
    font-family: var(--font-body);
    font-size: 11px;
    position: fixed;
    right: 34px;
    top: 320px;
    font-style: italic;
`
const SidebarLeft = styled.div`
    color: white;
    position: fixed;
    left: 150px;
    top: 430px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const SidebarRight = styled.div`
    color: white;
    position: fixed;
    right: 150px;
    top: 430px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const BioDiv = styled.div`
    font-family: var(--font-body);
    font-size: 12px;
    color: white;
    width: 800px;
    line-height: 22px;
    margin: 10px;
    text-align: center;
`
const Title = styled.div`
    font-family: var(--font-body);
    font-size: 12px;
    color: white;
    width: 800px;
    line-height: 22px;
    margin: 10px;
    text-align: center;
    font-weight: 600;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    background-color: black;
    height: 100vh;
`
export default About;