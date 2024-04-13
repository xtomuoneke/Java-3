const months = [
    "jenuary",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
    
    
    ];
    const weekdays = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",  
    ];
                                             // selecting the classes
    const giveaway = document.querySelector(".giveaway");
    const deadline = document.querySelector(".deadline");
    const items = document.querySelectorAll(".deadline-format h4");
    
    let futureDate = new Date(2024,10,11,11,50,0); //targetting a specific date
    
    const year = futureDate.getFullYear();
    const hours = futureDate.getHours();
    const minutes = futureDate.getMinutes();
    let month = futureDate.getMonth();
    month = months[month];
    const date = futureDate.getDate();
    const weekday = weekdays [futureDate.getDay()];
    
    giveaway.textContent = `give away ends on ${weekday} ${date} ${month} ${year} ${hours}:
    ${minutes}`; 
    
    //future time in ms
    const futureTime = futureDate.getTime();
    
    
    //run a funtion for remaining time 
    
    function getRemainingTime() {
        const today = new Date() .getTime();
        const t = futureTime - today; //math operation
      
        //1s = 1000ms
        //1m = 60s
        //1hr = 60m
        //1d = 24hr
    
        //values in ms
        const oneDay = 24 * 60 * 60 * 1000;
        const oneHour = 60 * 60 * 1000;
        const oneMinute = 60 * 1000; 
        //calculate all values 
        let days = t / oneDay;
        days = Math.floor(days);  //calculating the values for days hour mims & secs
        let hours =Math.floor((t % oneDay) / oneHour);
        let minutes = Math.floor((t % oneHour) / oneMinute);
        let seconds = Math.floor((t % oneMinute) / 1000);
        
    
        //set value arrays
        const values = [days, hours, minutes, seconds];
       
       function format(item) {
        if (item < 10) {
          return (item = `0${item}`);
        }
         return item
       }
    
        items.forEach(function(item,index ){
            item.innerHTML = format (values[index]);
        });
        if (t < 0){
          clearInterval(countdown);
          deadline.innerHTML = `<h4 class="expired">sorry, this giveaway
           has expired </h4>`;
        }
    }
    //countdown
    let countdown = setInterval(getRemainingTime,1000);//call back the function
    getRemainingTime(); //to invoke the funtion
