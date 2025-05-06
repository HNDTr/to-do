const menuPage = () => {
    const container = document.querySelector('#content');
    const pageTitle = document.createElement('h1');
    container.appendChild(pageTitle);
    pageTitle.textContent = 'Menu';

    const menu = [
        {
            name: 'California Roll',
            price: '$15',
            desc: 'A refreshing sushi roll filled with crab, creamy avocado, and crisp cucumber, wrapped in seaweed and rice—perfect for sushi beginners and pros alike.'
        }, 
        {
            name: 'Spicy Tuna Roll',
            price: '$25',
            desc: 'A bold roll packed with fresh tuna mixed in spicy mayo, wrapped in rice and seaweed—fiery, flavorful, and a fan favorite.'
        },
        {
            name: 'Dragon Roll',
            price: '$20',
            desc: 'A show-stopping roll featuring grilled eel and cucumber, topped with creamy avocado and sweet eel sauce—rich, smoky, and irresistibly smooth.'
        },
        {
            name: 'Philadelphia Roll',
            price: '$15',
            desc: 'A creamy and savory blend of smoked salmon, smooth cream cheese, and crisp cucumber—East Coast flair with a sushi twist.'
        },
    ]

    //menu list container
    const menuContainer = document.createElement('div');
    menuContainer.classList.add('menuContainer')
    container.appendChild(menuContainer);

    menu.forEach(item => {
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('item');

        //name and price
        const nameAndPriceDiv = document.createElement('div');
        const itemName = document.createElement('h3');
        itemName.textContent = item.name;
        const itemPrice = document.createElement('h4');
        itemPrice.textContent = item.price;
        nameAndPriceDiv.appendChild(itemName);
        nameAndPriceDiv.appendChild(itemPrice);
        nameAndPriceDiv.classList.add('itemContainer')

        //Desc
        const descDiv = document.createElement('div');
        const desc = document.createElement('p');
        desc.textContent = item.desc;
        descDiv.appendChild(desc);

        itemContainer.appendChild(nameAndPriceDiv);
        itemContainer.appendChild(descDiv);
        menuContainer.appendChild(itemContainer);
    });
    
}


export {menuPage}