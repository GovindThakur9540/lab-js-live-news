// adding event listener on country menu item
let $dropdown = document.querySelector(".dropdown")
let $menuCountry = document.querySelector(".menu-country")
let $country = document.querySelector(".country")


const apikey = "961de8b534c542da92c97ddfdfc5eadb";

function news(country) {

    // using axios to fetch data from newsapi.org
    axios
        .get(`http://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apikey}`)
        .then((response) => {

            // getting section element
            let $section = document.querySelector("section")
            $section.style.paddingTop = "50px"
            // removing elements from section element
            $section.innerHTML = ""

            if (response.data.articles.length) {
                // looping over each news adn creating newws card for each news
                response.data.articles.forEach(news => {

                    // will only show news if all the three info are available
                    if (news.urlToImage && news.content && news.title) {
                        // creating div element hich will hold each news seperately
                        let $div = document.createElement("div")
                        // cretaing image element and adding he url returned by api
                        let $image = document.createElement("img")
                        $image.setAttribute("src", news.urlToImage)
                        $image.setAttribute("alt", news.author)
                        $div.appendChild($image)
                        // creating h3 tag and adding text node into it so to add title of news
                        let $title = document.createElement("h3")
                        let $titleText = document.createTextNode(news.title)
                        $title.appendChild($titleText)
                        $div.appendChild($title)
                        // creating p tg for holding short descripion of news
                        let $desc = document.createElement("p")
                        let $descText = document.createTextNode(news.content)
                        $desc.appendChild($descText)
                        $div.appendChild($desc)

                        //creating span
                        // <span class="button">Read More</span>
                        let $span = document.createElement("span")
                        $span.classList = "button"
                        $span.appendChild(document.createTextNode("Read More"))
                        $div.appendChild($span)

                        $section.appendChild($div)
                    }

                });
            } else {
                // if news is not availble the below element will be rendered
                let $div = document.createElement("main")
                $div.style.display = "inline-block"
                $div.style.marginLeft = "auto"
                $div.style.marginRight = "auto"
                $div.style.paddingBottom = "50px"
                let $title = document.createElement("h2")
                let $titleText = document.createTextNode(`Sorry! No news available right now. Please come back later`)
                $title.appendChild($titleText)
                $div.appendChild($title)
                $section.appendChild($div)
            }

        })
        .catch((reject) => console.log(reject));
}
$dropdown.addEventListener("mouseover", () => {
    // if dropdown is selected county options will shown
    $country.style.display = ($dropdown.classList[1] == "fa-caret-down") ? "block" : "none"
    // if doprdown selected then downward will be chnaged to upward viceversa
    $dropdown.classList = ($dropdown.classList[1] == "fa-caret-down") ? "fa fa-caret-up dropdown" : "fa fa-caret-down dropdown"

})

// if anywhere in body is clicked
document.querySelector("body").addEventListener("click", () => {
    // if dropdown is selected county options will shown
    $country.style.display = "none"
    // if doprdown selected then downward will be changed to upward viceversa
    $dropdown.classList = "fa fa-caret-down dropdown"

})

document.querySelector(".india").addEventListener("click", () => news("in"))

document.querySelector(".us").addEventListener("click", () => news("us"))