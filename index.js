let search_input = document.getElementById("search-input");
let search_text = "";
let search_result_el = document.getElementById("search-result");
let spinner = document.getElementById("spinner");
function showEachItem(each_item){
    let {
        title,link,description
    } = each_item;

    let each_item_div = document.createElement("div");
    each_item_div.classList.add("each_result_div");
    search_result_el.appendChild(each_item_div);
    
    let each_result_heading = document.createElement("a");
    each_result_heading.textContent = title;
    each_result_heading.href = link;
    each_result_heading.target = "_blank";
    each_result_heading.classList.add("each_result_heading");
    each_item_div.appendChild(each_result_heading);

    let lineBreakEl1 = document.createElement("br");
    each_item_div.appendChild(lineBreakEl1);

    let each_result_link = document.createElement("a");
    each_result_link.textContent = link;
    each_result_link.href = link;
    each_result_link.target = "_blank";
    each_result_link.classList.add("each_result_link");
    each_item_div.appendChild(each_result_link);

    let lineBreakEl2 = document.createElement("br");
    each_item_div.appendChild(lineBreakEl2);

    let each_result_des = document.createElement("p");
    each_result_des.textContent = description;
    // each_result_des.classList.add("each_result_des");
    each_item_div.appendChild(each_result_des);
}
function displayResults(search_results){
    spinner.classList.toggle("d-none");
    
    for(let each_item of search_results){
        showEachItem(each_item);
    }
}
function getResult(){
    search_text = search_input.value;
    console.log(search_text);
    let url = "https://apis.ccbp.in/wiki-search?search="+search_text;
    let options={
        method: "GET"
    }
    fetch(url,options)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){
        let {search_results} = jsonData;
        console.log(jsonData);
        displayResults(search_results);

    })
}
function getKeyEvent(event){
    if(event.key==="Enter"){
        search_result_el.textContent = "";
        spinner.classList.toggle("d-none");
        getResult();
    }
}
search_input.addEventListener("keydown",getKeyEvent);