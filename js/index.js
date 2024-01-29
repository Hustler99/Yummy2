$("#toggleBtn").on("click", function (e) {
  $("#sideBar").css("background-color", "#0D0D0D");
  $("#childBar").slideToggle(500, function () {
    if ($("#childBar").is(":hidden")) {
      $("#sideBar").css("background-color", "transparent");
    }
  });
});


let firstRow = document.getElementById("mealRow");
let mealData = document.getElementById("mealdata");
let dataOpen = document.getElementById("mealopen");
let searchPage = document.getElementById("searchPage");
let searchContainer = document.getElementById("searchContainer");
let byName = document.getElementById("byName");
let nameRow = document.getElementById("wordS");
let firstLetter = document.getElementById("byFL");
let category = document.getElementById("cat");
let categoryPage = document.getElementById("categoryrow");
let categoryDetails = document.getElementById("categoryrowdetails");
let area = document.getElementById("areaCont");
let areaNav = document.getElementById("areanav");
let areaCountry = document.getElementById("areabyC");
let ingrd = document.getElementById("ingr");
let ingrdCont = document.getElementById("ingrd-container");
let ingrdContFood = document.getElementById("ingrd-container2");
let form = document.getElementById("Form");
let formNav = document.getElementById("formNav");

async function openMeals() {
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  let response = await api.json();
  displayOpenMeals(response.meals);
  $("#loading").fadeOut(1200, function () {
    $("body").css("overflow", "auto");
  });



}

function displayOpenMeals(meals) {
  cartona = "";
  for (let i = 0; i < meals.length; i++) {
    cartona += `
        <div class="col-md-3"> 
            <div  onclick="getDetails('${meals[i].idMeal}')" class="imageOverWord">
            <img  src="${meals[i].strMealThumb}" class="w-100 imgFood" alt="">
                <div class="layer">
                    <p class="layer2">${meals[i].strMeal}</p>
                </div>
            </div>
        </div>
    `;
  }
  firstRow.innerHTML = cartona;
  area.classList.add("d-none");
  ingrdCont.classList.add("d-none");
  ingrdCont.classList.add("d-none");
  areaCountry.classList.add("d-none");
  area.classList.add("d-none");
}

openMeals();

async function getDetails(x) {
  $("#loading").fadeIn();
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${x}`
  );
  let response = await api.json();
  mealDetails(response.meals);
  $("#loading").fadeOut(1200, function () {
    $("body").css("overflow", "auto");
  });
}

function mealDetails(mealId) {
  cartona = "";
  for (let i = 0; i < mealId.length; i++) {
    cartona += `<div class="col-md-3">
                        <img src="${
                          mealId[i].strMealThumb
                        }" class="w-100 rounded-1" alt="${mealId[i].strMeal}">
                        <h2 class="mt-1 text-white">${mealId[i].strMeal}</h2>
                    </div>
                    <div class="col-md-9 text-white">
                        <h2>Instructions</h2>
                        <p>${mealId[i].strInstructions}</p>
                        <h4>Area : ${mealId[i].strArea}</h4>
                        <h4>Category : ${mealId[i].strCategory} </h4>
                        <h4>Recipes : </h4>
                        <ul class="list-unstyled d-flex flex-wrap">
                            <li class="alert ms-2 alert-info p-1">${
                              mealId[i].strMeasure1
                            } ${mealId[i].strIngredient1}</li>
                            <li class="alert ms-2 alert-info p-1">${
                              mealId[i].strMeasure2
                            } ${mealId[i].strIngredient2}</li>
                            <li class="alert ms-2 alert-info p-1">${
                              mealId[i].strMeasure3
                            } ${mealId[i].strIngredient3}</li>
                            <li class="alert ms-2 alert-info p-1">${
                              mealId[i].strMeasure4
                            } ${mealId[i].strIngredient4}</li>
                            <li class="alert ms-2 alert-info p-1">${
                              mealId[i].strMeasure5
                            } ${mealId[i].strIngredient5}</li>
                            <li class="alert ms-2 alert-info p-1">${
                              mealId[i].strMeasure6
                            } ${mealId[i].strIngredient6}</li>
                        </ul>
                        <h4>Tags :</h4>
                        <ul class="list-unstyled d-flex">
                            <li   class="alert alert-info mb-0 p-1 ${
                              mealId[i].strTags ? "" : "d-none"
                            } ">${mealId[i].strTags}</li>
                        </ul>
                        <a href="${
                          mealId[i].strSource
                        }" target="_blank"><button class="btn btn-success">Source</button></a>
                        <a href="${
                          mealId[i].strYoutube
                        }" target="_blank" ><button class="btn btn-danger">Youtube</button></a>
                    </div>`;
  }
  dataOpen.innerHTML = cartona;
  mealData.classList.remove("d-none");
  firstRow.classList.add("d-none");
  nameRow.classList.add("d-none");
  searchContainer.classList.add("d-none");
  categoryDetails.classList.add("d-none");
}

searchPage.addEventListener("click", function (e) {
  searchContainer.classList.remove("d-none");
  searchContainer.classList.add("d-flex");
  firstRow.classList.add("d-none");
});

byName.addEventListener("input", function (e) {
  let value = e.target.value;
  searchByName(value);
});

async function searchByName(x) {
  $("#loading").fadeIn();

  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`
  );
  let response = await api.json();
  searchName(response.meals);
  $("#loading").fadeOut(1200, function () {
    $("body").css("overflow", "auto");
  });
}

function searchName(term) {
  let cartonaa = "";
  for (let i = 0; i < term.length; i++) {
    cartonaa += `
      <div class="col-md-3"> 
        <div onclick="getDetails('${term[i].idMeal}')" class="imageOverWord">
          <img src="${term[i].strMealThumb}" class="w-100 imgFood" alt="">
          <div class="layer">
            <p class="layer2">${term[i].strMeal}</p>
          </div>
        </div>
      </div>
    `;
  }
  nameRow.innerHTML = cartonaa;
}

firstLetter.addEventListener("input", function (e) {
  let value = e.target.value;
  searchByLetter(value);
});

async function searchByLetter(x) {
  $("#loading").fadeIn();
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${x}`
  );
  let response = await api.json();
  searchLetter(response.meals);
  $("#loading").fadeOut(1200, function () {
    $("body").css("overflow", "auto");
  });
}

function searchLetter(term) {
  let cartonaa = "";
  for (let i = 0; i < term.length; i++) {
    cartonaa += `
            <div class="col-md-3"> 
                <div onclick="getDetails('${term[i].idMeal}')" class="imageOverWord">
                    <img src="${term[i].strMealThumb}" class="w-100 imgFood" alt="">
                    <div class="layer">
                        <p class="layer2">${term[i].strMeal}</p>
                    </div>
                </div>
            </div>
        `;
  }
  nameRow.innerHTML = cartonaa;
}

category.addEventListener("click", function (e) {
  firstRow.classList.add("d-none");
  categoryPage.classList.remove("d-none");
  searchContainer.classList.add("d-none");
  byName.classList.add("d-none");
  firstLetter.classList.add("d-none");
  nameRow.classList.add("d-none");
  area.classList.add("d-none");
});

async function getCategory() {
  $("#loading").fadeIn();
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let response = await api.json();
  diplayCategory(response.categories);
  $("#loading").fadeOut(1200, function () {
    $("body").css("overflow", "auto");
  });
}

getCategory();

function diplayCategory(term) {
  let cartonaa = "";
  for (let i = 0; i < term.length; i++) {
    cartonaa += `
            <div class="col-md-3"> 
                <div onclick="getCategoryDetails('${term[i].strCategory}')" class="imageOverWord">
                    <img src="${term[i].strCategoryThumb}" class="w-100 imgFood" alt="">
                    <div class="layer">
                        <p class="layer2">${term[i].strCategoryDescription}</p>
                    </div>
                </div>
            </div>
        `;
  }
  categoryPage.innerHTML = cartonaa;
}

async function getCategoryDetails(x) {
  $("#loading").fadeIn();
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${x}`
  );
  let response = await api.json();
  displayCategoryDetails(response.meals);
  $("#loading").fadeOut(1200, function () {
    $("body").css("overflow", "auto");
  });
}

function displayCategoryDetails(x) {
  cartona = "";
  for (let i = 0; i < x.length; i++) {
    cartona += `
        <div class="col-md-3"> 
            <div  onclick="getDetails('${x[i].idMeal}')" class="imageOverWord">
            <img  src="${x[i].strMealThumb}" class="w-100 imgFood" alt="">
                <div class="layer">
                    <p class="layer2">${x[i].strMeal}</p>
                </div>
            </div>
        </div>
    `;
  }
  categoryDetails.innerHTML = cartona;
  categoryPage.classList.add("d-none");
  categoryDetails.classList.remove("d-none");
}

areaNav.addEventListener("click", function (e) {
  firstRow.classList.add("d-none");
  areaNav.classList.remove("d-none");
});

async function getArea() {
  $("#loading").fadeIn();
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let response = await api.json();
  displayArea(response.meals);
  $("#loading").fadeOut(1200, function () {
    $("body").css("overflow", "auto");
  });
}

getArea();

function displayArea(x) {
  cartona = "";
  for (let i = 0; i < x.length; i++) {
    cartona += `
        <div class="col-md-3"> 
            <div  onclick="dFoodArea('${x[i].strArea}')" class="imageOverWord">
                <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
                <h4 class="text-white fs-2">${x[i].strArea}</h4>
            </div>
        </div>
    `;
  }
  area.innerHTML = cartona;
  area.classList.remove("d-none");
}

async function dFoodArea(area) {
  $("#loading").fadeIn();
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let response = await api.json();
  showFoodByCountry(response.meals);
  $("#loading").fadeOut(1200, function () {
    $("body").css("overflow", "auto");
  });
}

function showFoodByCountry(x) {
  cartona = "";
  for (let i = 0; i < x.length; i++) {
    cartona += `
        <div class="col-md-3"> 
            <div  onclick="getDetails('${x[i].idMeal}')" class="imageOverWord">
            <img  src="${x[i].strMealThumb}" class="w-100 imgFood" alt="">
                <div class="layer">
                    <p class="layer2">${x[i].strMeal}</p>
                </div>
            </div>
        </div>
    `;
  }
  areaCountry.innerHTML = cartona;
  areaCountry.classList.remove("d-none");
  area.classList.add("d-none");
}

ingrd.addEventListener("click", function (e) {
  firstRow.classList.add("d-none");
  categoryPage.classList.add("d-none");
});

async function ingredientList() {
  $("#loading").fadeIn();
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let response = await api.json();
  displayIngredient(response.meals.slice(0, 20));
  $("#loading").fadeOut(1200, function () {
    $("body").css("overflow", "auto");
  });
}

ingredientList();

function displayIngredient(x) {
  let cartona = "";
  for (let i = 0; i < x.length; i++) {
    cartona += `
        <div class="col-md-3   text-center"> 
            <div  onclick="foodByIng('${x[i].strIngredient}')" class="imageOverWord">
                <i class=" tex-twhite fa-solid fa-drumstick-bite fa-4x"></i>
                <h3 class="text-white fs-2">${x[i].strIngredient}</h3>
                <p class=" logic text-white">${x[i].strDescription}</p>
            </div>
        </div>
    `;
  }
  ingrdCont.innerHTML = cartona;
  ingrdCont.classList.remove("d-none");
}

async function foodByIng(food) {
  $("#loading").fadeIn();

  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${food}`
  );
  let response = await api.json();
  showIngFood(response.meals);
  $("#loading").fadeOut(1200, function () {
    $("body").css("overflow", "auto");
  });
}

function showIngFood(x) {
  cartona = "";
  for (let i = 0; i < x.length; i++) {
    cartona += `
        <div class="col-md-3"> 
            <div  onclick="getDetails('${x[i].idMeal}')" class="imageOverWord">
            <img  src="${x[i].strMealThumb}" class="w-100 imgFood" alt="">
                <div class="layer">
                    <p class="layer2">${x[i].strMeal}</p>
                </div>
            </div>
        </div>
    `;
  }
  ingrdContFood.innerHTML = cartona;
  ingrdContFood.classList.remove("d-none");
  ingrdCont.classList.add("d-none");
}
formNav.addEventListener("click", function (e) {
  firstRow.classList.add("d-none")
  areaCountry.classList.add("d-none")
  area.classList.add("d-none")
  form.classList.remove("d-none")
  ingrdCont.classList.add("d-none")


})


let nameInput = document.getElementById("nameValid");
let emailInput = document.getElementById("emailValid");
let phoneInput = document.getElementById("phoneValid");
let submitButton = document.getElementById("submitButton");
let ageInput = document.getElementById("ageValid");


nameInput.addEventListener("input", validateForm);
emailInput.addEventListener("input", validateForm);
phoneInput.addEventListener("input", validateForm);
ageInput.addEventListener("input", validateForm);


function validateForm() {
  let isNameValid = /^[A-Za-z]{3,}$/.test(nameInput.value.trim());
  let isEmailValid = /^.+@[\w-]+\.\w{2,}$/.test(emailInput.value.trim());
  let isPhoneNumberValid = /^01[0-9]{9}$/.test(phoneInput.value.trim());
  let isAgeValid = ageInput.value >= 18;


  let isFormValid = isNameValid && isEmailValid && isPhoneNumberValid && isAgeValid;

  submitButton.disabled = !isFormValid;

  submitButton.style.backgroundColor = isFormValid ? "green" : "";
  submitButton.style.color = isFormValid ? "white" : "";
}