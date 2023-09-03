let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;

$(document).ready(() => {
    sSearchByName2("").then(() => {
        $(".loading-screenies").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})

function oOpenSideNavvve() {
    $(".side-nav-menuxom").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function cCloseSideNavvve() {
    let boxWidth = $(".side-nav-menuxom .nav-tab").outerWidth()
    $(".side-nav-menuxom").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

cCloseSideNavvve()
$(".side-nav-menuxom i.open-close-icon").click(() => {
    if ($(".side-nav-menuxom").css("left") == "0px") {
        cCloseSideNavvve()
    } else {
        oOpenSideNavvve()
    }
})




function dDisplayMealsies(arrmml) {
    let cartoona = "";

    for (let i = 0; i < arrmml.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="gGetMealDetailsies('${arrmml[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arrmml[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arrmml[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}



async function gGetCategoriesies() {
    rowData.innerHTML = ""
    $(".inner-loading-screenies").fadeIn(300)
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    dDisplayCategories(response.categories)
    $(".inner-loading-screenies").fadeOut(300)

}

function dDisplayCategories(arrmml) {
    let cartoona = "";

    for (let i = 0; i < arrmml.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="gGetCategoryMealsies('${arrmml[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arrmml[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arrmml[i].strCategory}</h3>
                        <p>${arrmml[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}


async function gGetAreaies() {
    rowData.innerHTML = ""
    $(".inner-loading-screenies").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    dDisplayAreaies(respone.meals)
    $(".inner-loading-screenies").fadeOut(300)

}


function dDisplayAreaies(arrmml) {
    let cartoona = "";

    for (let i = 0; i < arrmml.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="gGetAreaiesMealsies('${arrmml[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arrmml[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}


async function gGetIngredientsies() {
    rowData.innerHTML = ""
    $(".inner-loading-screenies").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    gGetAreaiesMealsiesies(respone.meals.slice(0, 20))
    $(".inner-loading-screenies").fadeOut(300)

}


function gGetAreaiesMealsiesies(arrmml) {
    let cartoona = "";

    for (let i = 0; i < arrmml.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="gGetIngredientsiesMealsies('${arrmml[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arrmml[i].strIngredient}</h3>
                        <p>${arrmml[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}


async function gGetCategoryMealsies(category) {
    rowData.innerHTML = ""
    $(".inner-loading-screenies").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    dDisplayMealsies(response.meals.slice(0, 20))
    $(".inner-loading-screenies").fadeOut(300)

}



async function gGetAreaiesMealsies(area) {
    rowData.innerHTML = ""
    $(".inner-loading-screenies").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    dDisplayMealsies(response.meals.slice(0, 20))
    $(".inner-loading-screenies").fadeOut(300)

}


async function gGetIngredientsiesMealsies(ingredients) {
    rowData.innerHTML = ""
    $(".inner-loading-screenies").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    dDisplayMealsies(response.meals.slice(0, 20))
    $(".inner-loading-screenies").fadeOut(300)

}

async function gGetMealDetailsies(mealID) {
    cCloseSideNavvve()
    rowData.innerHTML = ""
    $(".inner-loading-screenies").fadeIn(300)

    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    dDisplayMealDetailsies(respone.meals[0])
    $(".inner-loading-screenies").fadeOut(300)

}


function dDisplayMealDetailsies(meal) {
    
    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    // let tags = meal.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2 >Instructions</h2>
                <p class="text-light">${meal.strInstructions}</p>
                <h3 ><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = cartoona
}


function sShowSearchInputsies() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="sSearchByName2(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="sSarchByFLetteries(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = ""
}

async function sSearchByName2(term) {
    cCloseSideNavvve()
    rowData.innerHTML = ""
    $(".inner-loading-screenies").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? dDisplayMealsies(response.meals) : dDisplayMealsies([])
    $(".inner-loading-screenies").fadeOut(300)

}

async function sSarchByFLetteries(term) {
    cCloseSideNavvve()
    rowData.innerHTML = ""
    $(".inner-loading-screenies").fadeIn(300)

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? dDisplayMealsies(response.meals) : dDisplayMealsies([])
    $(".inner-loading-screenies").fadeOut(300)

}


function sShowContactsies() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nNameInputies" onkeyup="iInputsValidationies()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="eEmailInputies" onkeyup="iInputsValidationies()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="pPhoneInputies" onkeyup="iInputsValidationies()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="aAgeInputies" onkeyup="iInputsValidationies()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="pPasswordInputies" onkeyup="iInputsValidationies()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="rRepPasswordInputies" onkeyup="iInputsValidationies()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nNameInputies").addEventListener("focus", () => {
        nNameInputiesTouched = true
    })

    document.getElementById("eEmailInputies").addEventListener("focus", () => {
        eEmailInputiesTouched = true
    })

    document.getElementById("pPhoneInputies").addEventListener("focus", () => {
        pPhoneInputiesTouched = true
    })

    document.getElementById("aAgeInputies").addEventListener("focus", () => {
        aAgeInputiesTouched = true
    })

    document.getElementById("pPasswordInputies").addEventListener("focus", () => {
        pPasswordInputiesTouched = true
    })

    document.getElementById("rRepPasswordInputies").addEventListener("focus", () => {
        rRepPasswordInputiesTouched = true
    })
}

let nNameInputiesTouched = false;
let eEmailInputiesTouched = false;
let pPhoneInputiesTouched = false;
let aAgeInputiesTouched = false;
let pPasswordInputiesTouched = false;
let rRepPasswordInputiesTouched = false;




function iInputsValidationies() {
    if (nNameInputiesTouched) {
        if (nNameValidationies()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (eEmailInputiesTouched) {

        if (eEmailValidationies()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (pPhoneInputiesTouched) {
        if (pPhoneValidationies()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (aAgeInputiesTouched) {
        if (aAgeValidationies()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (pPasswordInputiesTouched) {
        if (pPasswordValidationies()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (rRepPasswordInputiesTouched) {
        if (rRepPasswordValidationies()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nNameValidationies() &&
        eEmailValidationies() &&
        pPhoneValidationies() &&
        aAgeValidationies() &&
        pPasswordValidationies() &&
        rRepPasswordValidationies()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nNameValidationies() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nNameInputies").value))
}

function eEmailValidationies() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("eEmailInputies").value))
}

function pPhoneValidationies() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("pPhoneInputies").value))
}

function aAgeValidationies() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("aAgeInputies").value))
}

function pPasswordValidationies() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("pPasswordInputies").value))
}

function rRepPasswordValidationies() {
    return document.getElementById("rRepPasswordInputies").value == document.getElementById("pPasswordInputies").value
}