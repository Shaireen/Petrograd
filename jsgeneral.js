fetch("http://kea-alt-del.dk/t5/api/categories")
    .then(res => res.json())
    .then(createCategories)

function createCategories(data) {
    console.log(data)
    data.forEach(function (theCategory) {
        const a = document.createElement("a");
        a.setAttribute("href", `#${theCategory}`);
        a.textContent = theCategory;
        document.querySelector(".topnav").appendChild(a);
        const section = document.createElement("section");
        section.id = theCategory;
        const h1 = document.createElement("h1");
        h1.textContent = theCategory;
        section.appendChild(h1);

        document.querySelector("main").appendChild(section);
    })
    getProducts();
}

function getProducts() {
    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            showData(data)
        })
}

function showData(jsonData) {
    console.log(jsonData)
    jsonData.forEach(showSingleDish)
}

function showSingleDish(hiItem) {
    const template = document.querySelector("template").content;
    const clone = template.cloneNode(true);
    clone.querySelector(".prname").textContent = hiItem.name;
    clone.querySelector(".description p").textContent = hiItem.shortdescription;
    clone.querySelector("p.price span").textContent = hiItem.price;
    clone.querySelector(".img").innerHTML = "<img src=https://kea-alt-del.dk/t5/site/imgs/small/" + hiItem.image + "-sm.jpg>";
    clone.querySelector(".longDescr").classList.add('ld-' + hiItem.id);

    var coll = clone.querySelector(".collapsible");
    coll.addEventListener("click", function () {
        fetchLongDesc(hiItem.id);
        coll.classList.toggle("active");
        var content = coll.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }


    });


    function fetchLongDesc(id) {
        fetch(`https://kea-alt-del.dk/t5/api/product?id=${id}`)
            .then(function (response) {
                return response.json()
            })
            .then(function (data2) {

                console.log(data2);
                document.querySelector(".ld-" + id).textContent = data2.longdescription;
            })
    }
 if (hiItem.vegetarian === true) {
            const vegImg = "imagesw/vicon.png";
            const elemLi = document.createElement("li");
            elemLi.innerHTML = "<img src=" + vegImg + ">";
            clone.querySelector("ul").appendChild(elemLi);


        }

        if (hiItem.alcohol == 0) {
            const aFree = "imagesw/aficon.jpg";
            const elemLi = document.createElement("li");
            elemLi.innerHTML = "<img src=" + aFree + ">";
            clone.querySelector("ul").appendChild(elemLi);
        } else {
            clone.querySelector(".alvol").style.display = "block";
            clone.querySelector(".alvol span").textContent = hiItem.alcohol;
        }

        if (hiItem.discount > 0) {
            const imgDisc = "imagesw/discount.png";
            const elemLi = document.createElement("li");
            elemLi.innerHTML = "<img src=" + imgDisc + ">";
            clone.querySelector(".prname").classList.add("discount");
            clone.querySelector(".dprice").style.display = "block";
            clone.querySelector(".dprice span").textContent = Math.round((hiItem.price * (100 - hiItem.discount)) / 100);
            clone.querySelector("ul").appendChild(elemLi);
        }

        if (hiItem.discount > 0 && hiItem.soldout === true) {
            clone.querySelector(".prname").classList.remove("discount");
        }



        if (hiItem.soldout === true) {
            const soldOut = "imagesw/soldout.png";
            clone.querySelector(".soutimg").innerHTML = "<img src=" + soldOut + ">";
            clone.querySelector(".prname").classList.add("soldOut");
            clone.querySelector(".img img").classList.add("soldOutp");
        }
    console.log(`#${hiItem.category}`)
    document.querySelector(`#${hiItem.category}`).appendChild(clone);


}
