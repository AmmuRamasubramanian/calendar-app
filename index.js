const currentDate=document.querySelector(".currentDate");
const days=document.querySelector(".Days");
const prevNextIcon=document.querySelectorAll(".icons span")

let date=new Date();
let currentMonth=date.getMonth();
let currentYear=date.getFullYear();

monthArray=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const renderCalander=()=>{
    let lastDateOfMonth=new Date(currentYear,currentMonth+1,0).getDate();//get last date of Month

    let firstDayOfMonth=new Date(currentYear,currentMonth,1).getDay();//get first day of month
    let lastDateOfLastMonth=new Date(currentYear,currentMonth,0).getDate();//last date of prev month
    let lastDayOfMonth=new Date(currentYear,currentMonth,lastDateOfMonth).getDay();  //last day of month
    
    //display month and year
    currentDate.innerHTML=`${monthArray[currentMonth]} ${currentYear}`;

    let liTag="";
    for(let i=firstDayOfMonth;i>0;i--){       //creating li for prev month 
        liTag+=`<li class="inactive">${lastDateOfLastMonth+1-i}</li>` 
    }
    
    for(i=1;i<=lastDateOfMonth;i++){ //creating li for current month
        //marking current date
        let isToday=i===date.getDate() && currentMonth===new Date().getMonth()
                    && currentYear===new Date().getFullYear()? "active":"";
        liTag+=`<li class="${isToday}">${i}</li>`;
    }

    for(let i=lastDayOfMonth;i<6;i++){   //creating li for next month
        liTag+=`<li class="inactive">${i-lastDayOfMonth+1}</li>`;
    }

    
    days.innerHTML=liTag;

}

renderCalander();

prevNextIcon.forEach(icon=>{
    icon.addEventListener("click",()=>{
        currentMonth=icon.id==='prevIcon'?currentMonth-1:currentMonth+1;
        
        //prev and next varies with year
        if (currentMonth<0 || currentMonth>11){
            date=new Date(currentYear,currentMonth);
            currentMonth=date.getMonth();
            currentYear=date.getFullYear();
        }else{
            date=new Date();
        }
        renderCalander();
    });
});