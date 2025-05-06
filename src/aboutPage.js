const aboutPage = () => {
    const container = document.querySelector('#content');
    const pageTitle = document.createElement('h1');
    container.appendChild(pageTitle);
    pageTitle.textContent = 'About';

    const info = [
        {
            name: 'Person 1',
            position: 'Store Owner',
            phone: '123-456-7890',
        },
        {
            name: 'Person 2',
            position: 'Store Manager',
            phone: '123-666-7777',
        },
        {
            name: 'Person 3',
            position: 'Head Chef',
            phone: '123-420-6969',
        },
    ]

     //menu list container
     const aboutContainer = document.createElement('div');
     aboutContainer.classList.add('aboutContainer')
     container.appendChild(aboutContainer);
 
     info.forEach(item => {
         const itemContainer = document.createElement('div');
         itemContainer.classList.add('item');
 
         //name and price
         
         const itemName = document.createElement('h3');
         itemName.textContent = item.name;
         const itemPosition = document.createElement('h4');
         itemPosition.textContent = `Position: ${item.position}`;
 
         //Desc
     
         const phone = document.createElement('p');
         phone.textContent = `Phone: ${item.phone}`;

 
         itemContainer.appendChild(itemName);
         itemContainer.appendChild(itemPosition);
         itemContainer.appendChild(phone)
         aboutContainer.appendChild(itemContainer);
     });

}


export {aboutPage}