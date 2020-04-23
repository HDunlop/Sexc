var currentTasks = ["Editable Task","Editable Task","Editable Task","Editable Task"];
var TheListName = "Todo List";
console.log(TheListName);
console.log(currentTasks);

if(localStorage.getItem("StoredListName") === null && localStorage.getItem("StoredTasks") === null){
  console.log("Local Storage is empty");
  updateLocalStorage();
  useLocalStorage();
}else if (localStorage.getItem("StoredListName") !== null || localStorage.getItem("StoredTasks") !== null) {
  useLocalStorage();
  console.log("Local Storage is NOT empty");
}




//Adding a Task
$(document.getElementsByName('Add_Task')).keypress(function(event){
  if (event.which === 13) {
    console.log(currentTasks);
    currentTasks.push($(this).val());
    $(this).val("");
    $('ul').append('<li><input class="_Task" name="Task" id="Task4" type="text" placeholder="' + currentTasks[currentTasks.length - 1] + '"><span><i class="fa fa-trash"</i></span>');
    console.log(currentTasks);
    updateLocalStorage();
  }
});

//Delete Task
$('ul').on('click', "span", function(event) {
  var li = event.target.closest('li');
  var nodes = Array.from( li.closest('ul').children );
  var index = nodes.indexOf( li );
  currentTasks.splice(index,1);
  console.log(currentTasks);
  console.log(index);
  updateLocalStorage();

    $(this).parent().fadeOut(500,function(){
      $(this).remove();

    });
    event.stopPropagation();
});

//Edit Task
$("ul").keypress(function(event){
  if (event.which === 13) {
  var li = event.target.closest('li');
  var nodes = Array.from( li.closest('ul').children );
  var index = nodes.indexOf( li );
  console.log(index);
  var nameText = event.target.value;
  event.target.value = "";
  event.target.placeholder=nameText;
  currentTasks[index] = event.target.placeholder;
  console.log(currentTasks);
  updateLocalStorage();
}
});

//Edit List Name
$(document.getElementsByName('List_Name')).keypress(function(event){
  if (event.which === 13) {
    TheListName = $(this).val();
    var nameText = $(this).val();
    $(this).val("");
    document.getElementsByName('List_Name')[0].placeholder=nameText;
    console.log(TheListName);
    updateLocalStorage();
  }
});

//Updates localStorage
function updateLocalStorage(){
  localStorage.setItem("StoredListName",JSON.stringify(TheListName));
  localStorage.setItem("StoredTasks", JSON.stringify(currentTasks));
  console.log("In Local Storage: ")
  console.log(JSON.parse(localStorage.getItem("StoredListName")));
  console.log(JSON.parse(localStorage.getItem("StoredTasks")));
}

//Uses localStorage
function useLocalStorage(){
  console.log("In Local Storage: ")
  console.log(JSON.parse(localStorage.getItem("StoredListName")));
  console.log(JSON.parse(localStorage.getItem("StoredTasks")));
  console.log("Entered Function");
  TheListName = JSON.parse(localStorage.getItem("StoredListName"));
  currentTasks = JSON.parse(localStorage.getItem("StoredTasks"));

  $(document.getElementById("TaskUL")).empty();
  for (var i = 0; i < currentTasks.length; i++) {
    $('ul').append('<li><input class="_Task" name="Task" id="Task4" type="text" placeholder="' + currentTasks[i] + '"><span><i class="fa fa-trash"</i></span>');
  }
  document.getElementsByName('List_Name')[0].placeholder=TheListName;
}

//Timer needs rewriting
var counter = 7;
var counterTop = 7;
var timer = document.getElementById('timer');
var timerPlay = false;
//document.getElementsByName('Timer_Number')[0].placeholder=convertMinutes(counter);

function timeIt(){
  if(timerPlay === true){
    counter--;
    document.getElementsByName('Timer_Number')[0].placeholder=convertMinutes(counter);
    var randomInt = getRndInteger(0,counterTop);
    if (counter === randomInt) {
      Push.create("Final Push!", {
        body: "What will you achieve in the last "+ counter +" minutes?",
        icon: 'images/favicon.png',
        timeout: 4000,
        silent: true,
        onClick: function () {
            window.focus();
            this.close();
        }
    });
    }
    if (counter <= 0) {
      Push.create("Timer Done", {
        body: "Time to move onto your next task. Best to finish now and make a new task if you need more time. Click this to see your todo list.",
        icon: 'images/favicon.png',
        timeout: 4000,
        silent: true,
        onClick: function () {
            window.focus();
            this.close();
        }
      });
      timerPlay = !timerPlay;
      document.getElementById('Play_Button').find("i").toggleClass("fas fa-play");
    }
  }
}

setInterval(timeIt, 60000);

document.getElementById('Play_Button').onclick = function() {
  if (counter > 0) {
    timerPlay = !timerPlay;
    $(this).find('i').toggleClass("fa fa-trash");
    console.log('hh');
    console.log($(this));
  }
};



$(document.getElementsByName('Timer_Number')).keypress(function(event){
  if (event.which === 13) {
    var timerText = $(this).val();
    $(this).val("");
    counter = timerText;
    counterTop = timerText;


    document.getElementsByName('Timer_Number')[0].placeholder=convertMinutes(counter);
  }
});



function convertMinutes(m){
  if(m >= 61){
    var hr = Math.floor(m/60);
    var min = m%60;
    if (hr === 1 && min === 1) {
      return hr + ' hr  ' + min + 'min';
    }else if (hr === 1) {
      return hr + ' hr  ' + min + 'mins';
    }else if (min === 1) {
      return hr + ' hrs  ' + min + 'min';
    }else {
      return hr + ' hrs  ' + min + ' mins';
    }
  }else{
    if (m === 1) {
      return m + ' min';
    }else {
      return m + ' mins';
    }
  }

}

//This Function returns a random number between a min and a max value inclusive
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
