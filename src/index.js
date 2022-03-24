// write your code here
window.addEventListener('DOMContentLoaded', e => {
    console.log('DOM fully loaded')

    // GET ramen from server and pass to ramen constucter
    const getRamen = () => {
    fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(ramenData => {
        console.log(ramenData)
        ramenData.forEach(addRamen)
    })
    }
    getRamen()

    const ramenMenu = document.querySelector("div#ramen-menu")
    console.log(ramenMenu)
    const ramenForm = document.querySelector("form#new-ramen")
    console.log(ramenForm)
    const currentRamen = document.querySelector("img.detail-image")
    console.log(currentRamen)
    const insertName = document.querySelector("h2.name")
    console.log(insertName)
    const restaurantName = document.querySelector("h3.restaurant")
    console.log(restaurantName)
    const insertRating = document.querySelector("span#rating-display")
    console.log(insertRating)
    const commentDisplay = document.querySelector("p#comment-display")
    console.log(commentDisplay)

    ramenForm.addEventListener("submit", e => {
        e.preventDefault()
        const nameInput = document.querySelector("input#new-name").value
        console.log(nameInput)
        const restaurantInput = document.querySelector("input#new-restaurant").value
        console.log(restaurantInput)
        const imgInput = document.querySelector("input#new-image").value
        console.log(imgInput)
        const ratingInput = document.querySelector("input#new-rating").value
        console.log(ratingInput)
        const commentInput = document.querySelector("textarea#new-comment").value
        console.log(commentInput)

        const newRamenObj = {
            name: nameInput,
            restaurant: restaurantInput,
            image: imgInput,
            rating: ratingInput,
            comment: commentInput
        }

        fetch("http://localhost:3000/ramens", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRamenObj)
        }).then(response => response.json())
        .then(data => {
            const image = document.createElement("img")
            image.src = imgInput
            console.log(data)
            ramenMenu.append(image)
        })
    })

    // creation of all things
    const addRamen = (ramen) => {
        //create images and give them source from server
        const ramenImg = document.createElement("img")
        ramenImg.src = ramen.image
        //add event listener to images that makes ramen show up in the main image
        ramenImg.addEventListener('click', e => {
            console.log(e.target)
            currentRamen.src = e.target.src
            insertName.textContent = ramen.name
            restaurantName.textContent = ramen.restaurant
            insertRating.textContent = ramen.rating
            commentDisplay.textContent = ramen.comment
        })
        ramenMenu.append(ramenImg)
    }

})