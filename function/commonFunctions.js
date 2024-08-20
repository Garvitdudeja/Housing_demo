import moment from "moment";

const hanldeWholeNumbers = (x) =>{
    return Number(x ?? 0)
}


function capitalizeFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
  }


const nullString = (str)=>{
    return (str ?? " ");
}


const getTime = (seconds) => {
    const duration = moment.duration(seconds, "seconds");
    let time, type;
  
    if (duration.asSeconds() < 60) {
      time = duration.asSeconds();
      type = "secs";
    } else if (duration.asMinutes() < 60) {
      time = duration.asMinutes();
      type = "mins";
    } else {
      time = duration.asHours();
      type = "hrs";
    }
  
    return { type, time: Math.floor(time)
   };
  };


export {hanldeWholeNumbers,capitalizeFirstLetter,nullString, getTime}