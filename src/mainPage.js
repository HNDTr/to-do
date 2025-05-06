import "./style.css";
import sushi1 from "./images/sushi-1.jpg"
import sushi2 from "./images/sushi-2.jpg"
import sushi3 from "./images/sushi-3.jpg"
import sushi4 from "./images/sushi-4.jpg"

const firstPageLoad = () => {
    const container = document.querySelector('#content');
    const titleContainer = document.createElement('div');
    const imageContainer = document.createElement('div');
    titleContainer.classList.add('title');
    imageContainer.classList.add('image-container');
    container.appendChild(titleContainer);
    container.appendChild(imageContainer);

    // Title Container content
    const restaurantName = document.createElement('h1');
    const headline = document.createElement('h2');
    const par = document.createElement('p');
    restaurantName.textContent = 'Raw & Roll';
    headline.innerHTML = 'Raw <span>Flavor</span>. Rolled to <span>Perfection</span>.';
    par.textContent = "Step into Raw & Roll, your new favorite destination for sushi with a twist. We bring the perfect blend of tradition and creativity, serving up the freshest cuts, bold flavors, and expertly crafted rolls that surprise and delight with every bite. Whether you're a lifelong sushi lover or just discovering your taste for it, our menu offers something for every palate—from classic favorites to daring originals."
    titleContainer.appendChild(restaurantName);
    titleContainer.appendChild(headline);
    titleContainer.appendChild(par);

    //Image container
    const container1 = document.createElement('div');
    const container2 = document.createElement('div');
    
    //images
    const image1 = document.createElement('img');
    const image2 = document.createElement('img');
    const image3 = document.createElement('img');
    const image4 = document.createElement('img');

    image1.src = sushi1;
    image2.src = sushi2;
    image3.src = sushi3;
    image4.src = sushi4;

    container1.appendChild(image1);
    container1.appendChild(image2);

    container2.appendChild(image3);
    container2.appendChild(image4);


    imageContainer.appendChild(container1);
    imageContainer.appendChild(container2);

}

export {firstPageLoad}