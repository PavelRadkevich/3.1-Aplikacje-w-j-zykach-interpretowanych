"use strict"
let todoList = []; //declares a new Array for Your todo list
const BASE_URL = "https://api.jsonbin.io/v3/b/652e995f0574da7622ba151f";
const SECRET_KEY = "$2a$10$wbDrNT7oAp8B3CTsAhzIi.5NNUMA6mrcxs/b.rU5s4q1Vae0cQ59u";

let initList = function () {
   let savedList = window.localStorage.getItem("todos");
    if (savedList != null) {
        todoList = JSON.parse(savedList);
    }
    else {
        todoList.push(
            {
            title: "Learn JS",
            description: "Create a demo application for my TODO's",
            place: "445",
            dueDate: new Date(2019, 10, 16)
            },
            {
                title: "Lecture Test",
                description: "Quick test from first three lectures",
                place: "F6",
                dueDate: new Date(2019, 10, 17)
            }
            // of course the lecture test mentioned above will not take place
        );
    }
}

let readAPI = function() {
    /*let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            todoList = JSON.parse(req.responseText).record;
            updateTodoList();
        }
    };
    req.open("GET", "https://api.jsonbin.io/v3/b/652e995f0574da7622ba151f", true);
    req.setRequestHeader("X-Master-Key", "$2a$10$wbDrNT7oAp8B3CTsAhzIi.5NNUMA6mrcxs/b.rU5s4q1Vae0cQ59u");
    req.setRequestHeader("X-Access-Key", "$2a$10$bfr80LuP/W/mo5x/53QO4O84.NV3lLXQTLJn99xSv1Yn/sBmG5c/S")
    req.send();*/

    $.ajax({
        // copy Your bin identifier here. It can be obtained in the dashboard
        url: BASE_URL,
        type: 'GET',
        headers: { //Required only if you are trying to access a private bin
            'X-Master-Key': SECRET_KEY,

        },
        success: (data) => {
            todoList = data.record;
            updateTodoList();
        },
        error: (err) => {
            console.log(err.responseJSON);
        }
    });
}

let updateJSONBin = function () {
    /*let req = new XMLHttpRequest();
    updateTodoList();

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            //console.log(req.responseText);
        }
    };

    req.open("PUT", "https://api.jsonbin.io/v3/b/652e995f0574da7622ba151f", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", "$2a$10$wbDrNT7oAp8B3CTsAhzIi.5NNUMA6mrcxs/b.rU5s4q1Vae0cQ59u");
    req.send(JSON.stringify(todoList));*/

    updateTodoList();
        $.ajax({
            url: BASE_URL,
            type: 'PUT',
            headers: { //Required only if you are trying to access a private bin
                'X-Master-Key': SECRET_KEY
            },
            contentType: 'application/json',
            data: JSON.stringify(todoList),
            success: (data) => {
                console.log(data);
            },
            error: (err) => {
                console.log(err.responseJSON);
            }
        });
}

let updateTodoList = function () {
    let todoListTable = $("#todoListView");
    

    //Remove all elements
    $("#todoListView tr:not(:first)").remove();

    //Add all elements
    let filterInput = $("#inputSearch").val();
    let dateFrom = Date.parse($("#inputDateFrom").val()); 
    let dateTo = Date.parse($("#inputDateTo").val());
    for (let todo in todoList) {
        let dueDate = Date.parse(todoList[todo].dueDate);
        if (
            (
                (filterInput == "") ||
                (todoList[todo].title.includes(filterInput)) ||
                (todoList[todo].description.includes(filterInput)) ||
                (todoList[todo].place.includes(filterInput))
            )
            &&
            (
                (
                    ($("#inputDateFrom").val() == "") ||
                    (dueDate >= dateFrom)
                )
                &&
                (
                    ($("#inputDateTo").val() == "") ||
                    (dueDate <= dateTo)
                )
            )

        ) {

            let newRow = $("<tr></tr>").addClass("table-dark");

            let newTitleColumn = $("<td></td>").text(todoList[todo].title);
            newRow.append(newTitleColumn);

            let newDescColumn = $("<td></td>").text(todoList[todo].description);
            newRow.append(newDescColumn);

            let newPlaceColumn = $("<td></td>").text(todoList[todo].place);
            newRow.append(newPlaceColumn);

            let newDateColumn = $("<td></td>").text(todoList[todo].dueDate);
            newRow.append(newDateColumn);

            let newDeleteColumn = $("<td></td>");
            let newDeleteButton = $("<input>")
                .attr("type", "button")
                .val("DELETE")
                .on("click", function () {
                    deleteTodo(todo);
                })
                .addClass("btn btn-danger");
            newRow.append(newDeleteColumn);
            newDeleteColumn.append(newDeleteButton);

            todoListTable.append(newRow);
        }
    }
}

let deleteTodo = function (index) {
    todoList.splice(index, 1);
    updateJSONBin();
}

let addTodo = function () {
    //get the elements in the form

    //get the values from the form
    let newTitle = $("#inputTitle").val();
    let newDescription = $("#inputDescription").val();
    let newPlace = $("#inputPlace").val();
    let newDate = $("#inputDate").val();
    //create new item
    let newTodo = {
        title: newTitle,
        description: newDescription,
        place: newPlace,
        dueDate: newDate
    };
    //add item to the list
    todoList.push(newTodo);
    window.localStorage.setItem("todos", JSON.stringify(todoList));
    updateJSONBin();
}

readAPI();