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

    console.log(`#${hiItem.category}`)
    document.querySelector(`#${hiItem.category}`).appendChild(clone);


}
