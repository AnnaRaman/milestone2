// EMPTY ARRAY FOR SEARCH FUNCTION

let collection = [];

// FETCH API DATA FUNCTION
callApi();

function callApi() {
  let collectionPortion = []
  for (var i = 1; i < 5; i++) {
    fetch("http://api-cocktails.herokuapp.com/api/v1/cocktails?page=" + i, {
        headers: {
          Authorization: "Token token=f5CQYOiRW4r8pqkVsqAGIgtt"
        }
      })
      .then(response => response.json())
      .then(data => {
        collectionPortion = [...collectionPortion, ...data]
        collection = collectionPortion
      })
      .finally(() => {
        showcaseCocktails(collectionPortion);
      })
  }

}

// BUTTON FOR RANDOM COCKTAIL GENERATOR


document.querySelector('.selectButton').onclick = () => {

  let randomIndex = Math.floor(Math.random() * collection.length)
  let random = collection[randomIndex]
  console.log(random)

  // INSERTING DATA ON TO CARD

  document.querySelector('#gif-drink').src = random.image_thumb_url
  document.querySelector('#card-info').innerText = random.description
  document.querySelector('.card-desc').innerHTML = random.name + "<br>" + "</br>" + "Click to find out more"

}

// FUNCTION TO DISPLAY DESCRIPTION DATA ON CARD (when clicked)

function addClass() {
  var element = document.getElementById("card-info");
  element.classList.add("data-show");
}

function removeClass() {
  var element = document.getElementById("card-info");
  element.classList.remove("data-show");
}

// FUNCTION FOR CREATING DIV WITH CLASS NAMES

function creator(divType, className) {
  let container = document.createElement(divType);
  container.className = className;
  return container
}

// FUNCTION FOR DISPLAYING FLIP CARDS

function showcaseCocktails(coshema, value = null) {
  let container = document.querySelector('.container')
  let count = document.querySelector('#count')
  container.innerHTML = ''
  count.innerHTML = ''
  if (coshema.length) {
    if (value !== null && value !== '') {
      count.innerHTML = `<h1>There's ${coshema.length} coctails with ${value}</h1>`
    }
    for (let i = 0; i < coshema.length; i++) {
      let card = creator('div', 'card');
      let content = creator('div', 'content');
      let front = creator('div', 'front');
      front.innerHTML = "<h4>" + coshema[i].name + "</h4>"
      front.style.backgroundImage = `url(${coshema[i].image_thumb_url})`;

      //BACK OF CARD

      let back = creator('div', 'back');

      back.innerHTML =

        "<br />" + "<strong>" + "Ingredients:" + "</strong>" + " " +
        coshema[i].ingredients + "<br />" + "<br />" + "<strong>" + "Served:" + " " +
        "</strong>" + coshema[i].served + "<strong>" + "<br />" +
        "Rating:" + "</strong>" +
        " " + coshema[i].rating

      content.appendChild(front);
      content.appendChild(back);
      card.appendChild(content);
      container.appendChild(card)
    }
  } else {
    count.innerHTML = `<h1>Sorry, no cocktails with ${value}</h1>`
  }
}


// SEARCH BAR


document.getElementById("search").oninput = function () {

  let filtered = []

  let value = this.value.toUpperCase();
  console.log(value);
  if (value) {
    filtered = collection.filter(coct =>
      coct.name.toUpperCase().includes(value) || coct.ingredients.some(ing => ing.toUpperCase().includes(value))
    )
    console.log(filtered)
  } else {
    filtered = collection;
  }
  showcaseCocktails(filtered, value)
}





//BALL ANIMATION


// Ball colour 
const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];

// Ball number
const numBalls = 250;
const balls = [];

for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];
  ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
  ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
  ball.style.transform = `scale(${Math.random()})`;
  ball.style.width = `${Math.random()}em`;
  ball.style.height = ball.style.width;

  balls.push(ball);
  document.querySelector('.landingPage').append(ball);
}

// Keyframes for balls
balls.forEach((el, i, ra) => {
  let to = {

    x: Math.random() * (i % 2 === 0 ? -11 : 8),

    y: Math.random() * 2500
  };

  let anim = el.animate(
    [{
        transform: "translate(0, 0)"
      },
      {
        transform: `translate(${to.x}px, ${to.y}px)`
      }
    ], {
      //ball size
      duration: (Math.random() + 1) * 12000, // random duration
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "ease-in-out"
    }
  );
});