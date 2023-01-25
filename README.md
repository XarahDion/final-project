<h1 align="center">🌍 Welcome to Earth Trotter 🌏</h1>

> Full-stack MERN App for logging travels, displayed as markers on a an interactive world map. The travels can also be accessed, deleted and updated in a user profile page. Also, a city page can be displayed for each travel logged. The deployment is a WIP as I've just started learning about CI/CD. Click on the image below to view the live website.
> 
[<img src="https://res.cloudinary.com/dojn5va73/image/upload/v1672246033/screencapture-earth-trotter-xarahdion-2022-12-28-11_47_00_koxcbx.png" >](https://www.earth-trotter.xarahdion.com/)

> Coordinates are generated in the backend with OpenCage API and stored in MongoDB along with the travel date, city, country and an optional field for location and/or details. The travels are displayed conditionally on the world map according to the year selected in the header in a dropdown menu. A city page is accessed by clicking the marker popups, where an image, “known for” tags and coordinates are displayed. These resources are retrieved from RoadGoat API and tested before rendering. For example, if there are no images in the database for the chosen city, the results fall back to the country image. The city page also presents a current weather widget with icon, temperatures and other parameters collected from OpenWeather API.
>
[<img src='https://res.cloudinary.com/dojn5va73/image/upload/v1672245683/screencapture-earth-trotter-xarahdion-cities-Copenhagen-Denmark-2022-12-28-10_39_03_kssvye.png' >](https://www.earth-trotter.xarahdion.com/)

> User travels can be accessed, deleted and updated in a user profile page made possible through Auth0 API. A form ensures the posting and updating of the travels and a travel collection makes deleting and updating possible. Form validation is executed in the backend to ensure the data entered by the user will be compatible with requests sent to both OpenCage and RoadGoat APIs. For example, if the city or country doesn’t exist in OpenCage’s database, an error will be sent to the frontend. 
> 
[<img src='https://res.cloudinary.com/dojn5va73/image/upload/v1672246404/screencapture-earth-trotter-onrender-profile-2022-12-28-11_53_15_oha1db.png' >](https://www.earth-trotter.xarahdion.com/)
>Two more challenging aspects of the project were learning how to use the MapboxGL API, its associated methods and properties, and data access and manipulation in the backend. The functionalities sought for with MapboxGL in the frontend required going beyond the tutorials, digging through the documentation and troubleshooting unwanted behaviors. Finally, building the Node.js server in the backend needed implementing a RESTful API alongside connecting with MongoDB and third-party APIs, each requiring their own handlers for requests and results. 
>

## Install

```sh
yarn install
```

## Author

👤 **Xarah Dion**

* Website: www.earth-trotter.xarahdion.com
* Twitter: [@XarahDion](https://twitter.com/XarahDion)
* Github: [@XarahDion](https://github.com/XarahDion)
* LinkedIn: [@xarahdion](https://linkedin.com/in/xarahdion)

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
