import styled from "styled-components";
import EmblaCarousel from "./EmblaCarousel";
import { FiFacebook, FiInstagram, FiGithub, FiTwitter, FiMusic, FiHome, FiVideo, FiLinkedin, FiLink } from "react-icons/fi";
import { UserContext } from './hooks/UserContext';
import { useContext } from "react";

const About = () => {
    const { french } = useContext(UserContext); 

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
        <Credit href="http://www.mayamorphosis.com/" target="blank">Photos: Mayamorphosis <FiLink /></Credit>
        {!french ?
        <>
        <Title >About Earth Trotter</Title>
        <BioDiv><p>Earth Trotter is Xarah Dion's final project for the Concordia University Web Development Bootcamp. A full-stack MERN app making use of HTML, CSS, ES6 JavasScript and React on the frontend, NodeJS, ExpressJS and MongoDB on the backend. Its main functionality is to display logged travels as markers on an interactive world map with the help of MapboxGL API. </p>
                <p>Coordinates are generated in the backend with OpenCage API and stored in MongoDB along with the travel date, city, country and an optional field for location and/or details. The travels are displayed conditionally on the world map according to the year selected in the header in a dropdown menu. A city page is accessed by clicking the marker popups, where an image, “known for” tags and coordinates are displayed. These resources are retrieved from RoadGoat API and tested before rendering. For example, if there are no images in the database for the chosen city, the results fall back to the country image.</p>
                <p>Following authentication, user travels can be accessed, deleted and updated in a profile page made possible through Auth0 API. A form ensures the posting and updating of the travels and a travel collection makes deleting and updating possible. Form validation is executed in the backend to ensure the data entered by the user will be compatible with requests sent to both OpenCage and RoadGoat APIs. For example, if the city or country doesn’t exist in OpenCage’s database, an error will be sent to the frontend. </p>
                <p>Two more challenging aspects of the project were learning how to use the MapboxGL API, its associated methods and properties, and data access and manipulation in the backend. The functionalities sought for with MapboxGL in the frontend required going beyond the tutorials, digging through the documentation and troubleshooting unwanted behaviors. Finally, building the Node.js server in the backend needed implementing a RESTful API alongside connecting with MongoDB and third-party APIs, each requiring their own handlers for requests and results. </p>
        </BioDiv>
        </>
        :<>
        <Title >À propos de Earth Trotter</Title>
        <BioDiv><p>Earth Trotter est le projet final de Xarah Dion pour le Bootcamp de développement Web de l'Université Concordia. Une application MERN complète utilisant HTML5, CSS, ES6 JavasScript et React sur le frontend, ainsi que NodeJS, ExpressJS et MongoDB sur le backend. Sa fonctionnalité principale est d'afficher les voyages enregistrés sous forme de marqueurs sur une carte du monde interactive à l'aide de l'API MapboxGL.</p>
                <p>Les coordonnées sont générées dans le backend avec l'API OpenCage et stockées dans la base de données Mongo avec la date de voyage, la ville, le pays et un champ facultatif pour l'emplacement et/ou un commentaire. Les voyages sont affichés conditionnellement sur la carte du monde en fonction de l'année sélectionnée dans l'en-tête dans un menu déroulant. Une page de ville spécifique est accessible en cliquant sur les fenêtres contextuelles des marqueurs, où une image, des étiquettes "known for" et des coordonnées sont affichées. Ces ressources sont extraites de l'API RoadGoat et testées avant le rendu. Par exemple, s'il n'y a pas d'images dans la base de données pour la ville choisie, le résultat retombe sur l'image du pays.</p>
                <p>Suite à une authentification, les voyages utilisateur peuvent être consultés, supprimés et mis à jour dans une page de profil rendue possible grâce à l'API Auth0. Un formulaire assure l'affichage et la mise à jour des voyages et une collection de voyages permet la suppression et la mise à jour. La validation du formulaire est exécutée dans le backend pour garantir que les données saisies par l'utilisateur seront compatibles avec les demandes envoyées aux API OpenCage et RoadGoat. Par exemple, si la ville ou le pays n'existe pas dans la base de données d'OpenCage, une erreur sera envoyée au frontend.</p>
                <p>Deux aspects plus difficiles du projet étaient d'apprendre à utiliser l'API MapboxGL, ses méthodes et propriétés associées, ainsi que l'accès et la manipulation des données dans le backend. Les fonctionnalités recherchées avec MapboxGL dans le frontend nécessitaient d'aller au-delà des tutoriels, de fouiller dans la documentation et de débugger les comportements indésirables. Enfin, la construction du serveur Node.js dans le backend demandait la mise en œuvre d'une API RESTful parallèlement à la connexion avec MongoDB et des API tierces, chacune nécessitant leurs propres gestionnaires pour les demandes et les résultats.</p>

        </BioDiv>
        </>}
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
    left: 24px;
    top: 220px;
    font-style: italic;
`
const SidebarLeft = styled.div`
    color: white;
    position: fixed;
    left: 80px;
    top: 360px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const SidebarRight = styled.div`
    color: white;
    position: fixed;
    right: 80px;
    top: 360px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const BioDiv = styled.div`
    font-family: var(--font-body);
    font-size: 12px;
    color: white;
    width: 900px;
    line-height: 22px;
    text-align: center;
`
const Title = styled.div`
    font-family: var(--font-body);
    font-size: 12px;
    color: white;
    width: 800px;
    line-height: 22px;
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