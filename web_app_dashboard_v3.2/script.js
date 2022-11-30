const notify_link = document.getElementById("notification");
const notify_li = document.querySelector(".svg_class")
const btn = document.querySelector("button");
/*****************notification messages *************************************************************************************/
function createEle(ele, class_name, msg, parentElem, id=null) {
    let elem = document.createElement(ele);
    elem.className =class_name;
    id=id;
    elem.textContent=msg;
    parentElem.appendChild(elem);
    return elem;//return created element
}
function notification(ele, class_name, msg, parentElem, ele1, class_name1, msg1, parentElem1){
    let msg_li = createEle(ele, class_name, msg, parentElem);
    let del_btn = createEle(ele1, class_name1, msg1, parentElem1=msg_li)
    del_btn.href="#";
}
window.addEventListener("load", e=>{
    let notify_ul = createEle("ul", "notif_ul", "", notify_li);
    notification("li", "notify_li", "You have 6 unread messages", notify_ul, "button", "x", "X")
    notification("li", "notify_li", "You have 3 new followers", notify_ul, "button", "x", "X")
    notification("li", "notify_li", "You password expires in 7 days", notify_ul,"button", "x", "X")
})
window.addEventListener("click", e=>{
    let elem = e.target;
    if(elem.tagName==="BUTTON" && elem.textContent==="X"){
        elem.parentNode.remove();// remove its parent element
        //next step is to remove the green round circle on top of the notification bell
    }
})
notify_link.addEventListener("click", ()=>{
    let notif_ul = notify_link.nextElementSibling;  //traverse to the ul holding the notification list
    if (notif_ul.style.display!="block"){
        notif_ul.style.display="block"
        notify_link.parentNode.className="svg_class";//remove green round icon from bell
    }else{
        notif_ul.style.display="none";
        notify_link.parentNode.className="svg_class green";//add green round icon from bell
        if(notif_ul.firstElementChild===null){
            notify_link.parentNode.className="svg_class"////remove green round icon if all the notification msg has been removed
        }
    }
})
/************************************end notification codes **************************************************************/
/************************************line chart ****************************************************************/
/* thanks to https://www.youtube.com/watch?v=Ac5pzmHO3_A      */
let chartContainer = document.querySelector("traffic");
const lineDiv = document.querySelector(".line_chart")
const chartBtns = document.querySelector(".chartBtnsDiv");
let ctxx = document.getElementById('myChart');
let ctx = ctxx.getContext("2d");
//create buttons for hours, daily, weekly and monthly
let title = createEle("span", "y", "Traffic", chartBtns);
let hour = createEle("button", "hour_class lineBtn", "Hourly", chartBtns);
let day = createEle("button", "day_class lineBtn", "Daily", chartBtns);
let week = createEle("button", "week_class lineBtn active", "Weekly", chartBtns);//add "active" class to week button as the default 
let month = createEle("button", "monthly_class lineBtn", "Monthly", chartBtns);

// create  data and labels for hour, day, week and month
let hourlyTraffic = [25, 30, 15, 36, 20, 47, 20, 15, 34, 14, 20];
let hourlyLabel=["10am", "11am", "12am", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"]
let dailyTraffic = [220, 470, 300, 150, 250, 445, 300, 350, 400, 370, 200];
let dailyLabel = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
let weeklyTraffic = [700, 1200, 1000, 2000, 1500, 1700, 1300, 1800, 2100, 1500, 2500];
let weeklyLabel = ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"];
let monthlyTraffic = [4900, 6800, 6100];
let monthlyLabel =["January", "February", "March"];
//default data and label
let data = weeklyTraffic;
let labels = weeklyLabel;
let axis =  {
    y: {
      beginAtZero: true
    }
  };
function chartCode(objName, type, data, label, trueorfalse, legendTrueOrFalse, bgColor=null, scaleValue=axis){
    // objName.width = 1;
    // objName.height = 1;
    //Chart.overrides.doughnut.plugins.legend.display = false;
    let chattedd = new Chart(objName, {
        type: type,
        data: {
          labels: label,
          datasets: [{
            data: data,
            fill: true,
            backgroundColor: bgColor,
            borderWidth: 0,//remove border
            tension:0.5
          }]
        },
        options: {
          plugins: {
            legend: {
                display: legendTrueOrFalse,
                position: "right",
                //position: right,
            }
            },
          responsive: true,
          maintainAspectRatio: trueorfalse,
          scales: scaleValue
        }
      });
      return chattedd
}
let chartObj  = chartCode(ctxx, "line", data, labels, true, false);
// add event listener to change data
  window.addEventListener("click", (e)=>{
    const target =e.target;
    updateVariableLabel=(btnText, data_variable, label_variable)=>{
        data=data_variable;     labels=label_variable;
        chartObj.config.data.datasets[0].data=data;
        chartObj.config.data.labels=labels;
        ///loop through the bottons to remove the "active" class from not current currently clicked btn
            //target.className.indexOf("active")==="false"?alert("ppppppppp"):0;
            let parent= target.parentNode;
            let children = parent.children;
            for (let i =0; i<children.length; i++){
               if(btnText===children[i].textContent && !children[i].classList.contains("active")){//if the current button clicked does not have class "active"
                children[i].classList.add("active");
               }else{
                children[i].classList.remove("active")
               }
            }
            chartObj.update();
    }
    targetTextContent = target.textContent;
    targetTextContent==="Hourly"?updateVariableLabel(targetTextContent,hourlyTraffic, hourlyLabel):0;//console.log(labels)
    targetTextContent==="Daily"?updateVariableLabel(targetTextContent, dailyTraffic, dailyLabel):0;
    targetTextContent==="Weekly"?updateVariableLabel(targetTextContent, weeklyTraffic, weeklyLabel):0;
    targetTextContent==="Monthly"?updateVariableLabel(targetTextContent, monthlyTraffic, monthlyLabel):0;
})
/////////////////////bar///////////////////////////
let ctx2= document.getElementById('myBar').getContext("2d");
data = [70, 110, 140, 130, 250, 200, 100];
labels = ["S", "M", "T", "W", "T", "F", "S"];
chartCode(ctx2, "bar", data, labels, false, false,  "#7073B9");
//////////////////////////doughnut//////////////////////
labels= ["Desktop", "Tablet", "Phones"];
data= [70, 25, 27];
bgCol= [
        '#7477BF',
        '#80C78E',
        '#51B6C8',
      ];
let scaleValue=  {
    y: [{
      gridLines: {
        display: false,
      },
    }]
  }
let ctx3= document.getElementById('myPie').getContext("2d");
chartCode(ctx3, "doughnut", data, labels, false, true, bgCol, scaleValue);
let form = document.querySelector("form");
let input = form.querySelector("input[type=text]");
let textarea = form.querySelector("textarea");
let submit = form.querySelector("input[type=submit]");
let names = document.querySelectorAll(".plugins .autoComp .member .desc");
let autocom = document.querySelector(".autocom");
let match = " ";
let matchCount = 0;
let exactMatch = null;
    //validation input and textarea  field on input   functions
function errInput(elem,errSpanEle, msg){
    elem.classList.add("errorBorder");
    errSpanEle.textContent=msg;
}
function errInputRemove(elem, classToRemove, errSpan){
    elem.classList.remove(classToRemove);
   errSpan.textContent="";
}
////////////////////////Auto complete ////////////////////////
function inputCodes(){
    match = null;   ///set match to " " for the first iteration, for current search
    matchCount = 0;   ///set match to zero for the first iteration, for current search
    exactMatch = null;
    autocom.replaceChildren();//remove children from autocomplete ul, reset on first iteration, for current search
    console.log(names[1])
    if(input.value.length > 0){
        for (let i=0; i<names.length; i++){
            let user = names[i].children[0].firstChild.textContent.toLowerCase();
            if(user.indexOf(input.value) !==-1){  //if match
                matchCount++;
                match = user;
                createEle("li", "auto", match, autocom); //this creates auto complete dropdown
                // remove error class if they exist
                errInputRemove(input, "errorBorder", document.querySelector(".errInput"))
                //save variable if the exact match is found. We will use this to verify before final submission
                user===input.value?exactMatch=input.value:0;//
                }
            }
            //if after the entire loop, no match, then add error class to input
            if (match ===null){
               errInput(input, document.querySelector(".errInput"), `This particular does not exist`);
            }
    }
}
input.addEventListener("input", e=>{
    inputCodes();
})
//look for exact match if the input is on focus and there exists data inside the input field
input.addEventListener("focus", e=>{
    exactMatch = null //set exact match to " " for the first iteration, for current search
    for (let i=0; i<names.length; i++){
        let name = names[i].children[0].firstChild.textContent.toLowerCase();
        if (e.target.value===name){
            exactMatch=e.target.value;
        }
    }
})
/////add autocomplete name into input field when clicked
autocom.addEventListener("click", e=>{
    e.target.textContent.length>0?input.value = e.target.textContent:0;
    autocom.replaceChildren();
    input.focus();
})
//remove autocomplete if user is out of the input field
input.addEventListener("blur", e=>{
    window.addEventListener("click", e=>{
        e.target.className !=="auto"?autocom.textContent = "":0;
    })
})
/////////////////// textarea basic validation on input
textarea.addEventListener("input", e=>{
    /^[a-z]/.test(textarea.value)===false?errInput(textarea, document.querySelector(".textarea"), `Must start with a letter`)
                                         :errInputRemove(textarea, "errorBorder", document.querySelector(".textarea"));
})
////////////////////////////////////submit form
let success =   document.querySelector(".success");
submit.addEventListener("click", e=>{
    e.preventDefault();
    //input validation
    //check input value already exist
    if(input.value.length> 0 && /^[a-z]/.test(input.value)===true){
        inputCodes();// input validation is included in this function
    }
    if(exactMatch ===null){
        errInput(input, document.querySelector(".errInput"), `Invalid user`);
    }
    //textarea
    /^[a-z]/.test(textarea.value)===false?errInput(textarea, document.querySelector(".textarea"), `Must start with a letter`):0;
    //send message
    if (exactMatch!==null && /^[a-z]/.test(textarea.value)===true  ){
        errInputRemove(textarea, "errorBorder", document.querySelector(".textarea"));
        //display success msg for 2 seconds
        success.innerHTML=`please wait !!!`;
        success.style.display="block";
        setTimeout(() => {
            success.textContent=`Message successfully sent to ${input.value}`;
            setTimeout(()=>{
                success.style.display="none"
                //clear input field and spans
                input.value="";
                textarea.value="";
                autocom.replaceChildren();
            }, 5000)
        }, 2000);
    }
})


