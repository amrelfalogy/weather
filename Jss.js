var searchInput=document.getElementById("searchInput");
var findButtun=document.getElementById("find");
var alertSearchInput=document.getElementById("alertSearchInput");
/////////////////////////////////////////////////Temprture//////////////////////////////////////////////////////
let cityName=document.getElementById("cityName");
let todayTem=document.getElementById("todayTem");
let todayIcon=document.getElementById("todayIcon");
let todayText=document.getElementById("todayText");
let willRain=document.getElementById("willRain");
let wind=document.getElementById("wind");
let direction=document.getElementById("direction");


//////////////////////////////////////////////////////////

let tomIcon1=document.getElementById("tomIcon");
let tomMaxTem1=document.getElementById("tomMaxTem");
let tomMinTem1=document.getElementById("tomMinTem");
let tomText1=document.getElementById("tomText");

/////////////////////////////////////////////////////////////////

let afTomIcon2=document.getElementById("afTomIcon");
let ftomMax2=document.getElementById("ftomMax");
let ftomMinx2=document.getElementById("ftomMinx");
let ftomText2=document.getElementById("ftomText");


//////////////////////////////////////////////////////////////////////////////////
// Date Var 

var yesName=document.getElementById("yesName");
var yesDate=document.getElementById("yesDate");
var todayName=document.getElementById("todayName");
var tomName=document.getElementById("tomName");

let date=new Date();
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var today = days[date.getDay()];
var day2="";
var day3="";
 if(date.getDay()==6){
  day2=days[0];
  day3=days[1];
}else{
  day2=days[date.getDay()+1];
  day3=days[date.getDay()+2];
}

var monthNum=date.getMonth()+1;
var monthName="";
if(monthNum==1){
  monthName="January";
}else if(monthNum==2){
    monthName="February";
  }else if(monthNum==3){
    monthName="March";
  }else if(monthNum==4){
    monthName="April";
  }else if(monthNum==5){
    monthName="May";
  }else if(monthNum==6){
    monthName="June";
  }else if(monthNum==7){
    monthName="Julay";
  }else if(monthNum==8){
    monthName="August";
  }else if(monthNum==9){
    monthName="September";
  }else if(monthNum==10){
    monthName="Octobar";
  }else if(monthNum==11){
    monthName="Novamber";
  }else if(monthNum==12){
    monthName="December";
  }
  var month=date.getDate()+monthName;
 yesName.innerHTML=today;
 yesDate.innerHTML=month;
 todayName.innerHTML=day2;
 tomName.innerHTML=day3;


 var time = new Date();
 var date1="";
 console.log(time.getHours());
 if((parseInt((time.getMonth()+1)/10))==0){
 if(parseInt(time.getHours()/10)==0){
  date1 = time.getFullYear()+'-'+'0'+(time.getMonth()+1)+'-'+time.getDate()+" "+'0'+time.getHours()+":"+"00";
 }else{
  date1 = time.getFullYear()+'-'+'0'+(time.getMonth()+1)+'-'+time.getDate()+" "+time.getHours()+":"+"00";
 }}else{
  if(parseInt(time.getHours()/10)==0){
    date1 = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+" "+'0'+time.getHours()+":"+"00";
   }else{
    date1 = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+" "+time.getHours()+":"+"00";
   }
 }
 console.log(date1);

async function todayandtomandaftertom(klma){
 
  var  data=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b7a95557a39f495f9da12349212609&q=${klma}&days=3`);
  
  console.log(data);
  if(data.ok==true){
    alertSearchInput.classList.add("d-none");
  data=await data.json();
  //////////////////////start of toDay Data////////////////////////

  let toText=data.current.condition.text;
  let todMaxTem= data.current.temp_c;
  let todMaxWind= data.current.wind_kph;
  let todWillRain=data.forecast.forecastday[0].day.daily_chance_of_rain;
  let todayWindDir=data.current.wind_dir;
  let todIconCode=data.current.condition.code;
  let hager=data.current.condition.icon;
  let todIsDay=data.current.is_day;
  let file="";

  if(todIsDay==0){
    file="day";
  }else{
    file="night";
  }
  let ic=[];
  ic=await fetch(` https://www.weatherapi.com/docs/conditions.json`);
 ic=await ic.json();
 let toiconNum="";
 for(let i=0; i<ic.length; i++){
  if(ic[i].code==todIconCode){
   toiconNum=ic[i].icon;
    console.log(ic[i].icon);
  }
 }

////////////////////End of Today Data////////////////////////////////////////////////


/////////////start of tommorrow Data////////////////////////////////////////////////

  let tomMaxTem=  data.forecast.forecastday[1].day.maxtemp_c;
  let tomMinTem=  data.forecast.forecastday[1].day.mintemp_c;
  let tomText=  data.forecast.forecastday[1].day.condition.text;
  let  tomIconCode=data.forecast.forecastday[1].day.condition.code;
  let toiconNum1="";
  for(let i=0; i<ic.length; i++){
    if(ic[i].code==tomIconCode){
     toiconNum1=ic[i].icon;
    }
   }

  //////////////////////////End Of Tommorrow Data//////////////////////////



  ////////////////////////Start Of After Tommorrow Data//////////////////


  let afTomMaxTem=  data.forecast.forecastday[2].day.maxtemp_c;
  let afTomMinTem=  data.forecast.forecastday[2].day.mintemp_c;
  let afTomText=  data.forecast.forecastday[2].day.condition.text;
  let  afTomIconCode=data.forecast.forecastday[2].day.condition.code;
  var toiconNum2="";
  for(let i=0; i<ic.length; i++){
    if(ic[i].code==afTomIconCode){
     toiconNum2=ic[i].icon;
    }
   }
 
   ///////////////End Of After Tommorrow Data///////////////////


////////////////////today////////////////////////
 cityName.innerHTML=data.location.name ;
 todayTem.innerHTML=todMaxTem;
 
 todayIcon.setAttribute("src",`http:${data.current.condition.icon}`);
 todayText.innerHTML=toText;
 willRain.innerHTML=todWillRain;
 wind.innerHTML=todMaxWind;
 direction.innerHTML=todayWindDir;
//////////////////////////tom//////////////////////////////////

// tomIcon1.setAttribute("src",`weather/64x64/day/${toiconNum1}.png`);
tomIcon1.setAttribute("src",`http:${data.forecast.forecastday[0].day.condition.icon}`);
 tomMaxTem1.innerHTML=tomMaxTem;
 tomMinTem1.innerHTML=tomMinTem;
 tomText1.innerHTML=tomText;
/////////////////////////aftom/////////////////////////////////////////////


 afTomIcon2.setAttribute("src",`http:${data.forecast.forecastday[1].day.condition.icon}`);
 ftomMax2.innerHTML=afTomMaxTem;
 ftomMinx2.innerHTML=afTomMinTem;
 ftomText2.innerHTML=afTomText;
  }
  else if(searchInput.value==""){
    alertSearchInput.classList.add("d-none");
    console.clear();
  }
  else if(data.ok!=true&&searchInput.value!=""){
    alertSearchInput.classList.remove("d-none");
    console.clear();
 
  }
}
  
todayandtomandaftertom("cai");

searchInput.addEventListener("keyup",function(){
  todayandtomandaftertom(searchInput.value);
})