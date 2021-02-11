let tempDiscription = document.querySelector(".descrip");
let tempDegree = document.querySelector(".degree");
let timeZoneDom = document.querySelector(".locationTimezone");
let imageElement = document.getElementById("image");
let degreeSection = document.querySelector(".degreeSection");
let degreeSpan = document.querySelector(".degreeSection span");
let btn = document.querySelector(".btn");

let long;
let lat;
let tempCelci;
let tempFaren;
let timezone;
let icon;

window.addEventListener("load", () => {
  loadOnLocation();
});

btn.addEventListener("click", () => {
  var x = document.getElementById("myText").value;
  if (x === "") return;

  try {
    const apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${x}&appid=3cfb0550267902d8c9edfe96df6eaa53`;

    fetch(apiCity)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const { temp } = data.main;
        const { weather } = data;
        icon = weather[0].icon;
        const discription = weather[0].description;
        timeZone = data.name;

        tempCelci = temp - 273.15;
        tempFaren = (temp - 273.15) * 1.8 + 32;

        tempDegree.textContent = tempCelci.toFixed(2);
        tempDiscription.textContent = discription;
        timeZoneDom.textContent = timeZone;

        imageElement.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        document.getElementById("myText").value = "";
      });
  } catch (err) {
    loadOnLocation();
  }
});

function loadOnLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,daily&appid=3cfb0550267902d8c9edfe96df6eaa53`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          timeZone = data.timezone;
          const { temp, weather } = data.current;
          const discription = weather[0].description;
          const icon = weather[0].icon;

          tempCelci = temp - 273.15;
          tempFaren = (temp - 273.15) * 1.8 + 32;

          tempDegree.textContent = tempCelci.toFixed(2);
          tempDiscription.textContent = discription;
          timeZoneDom.textContent = timeZone;

          imageElement.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        });
    });
  }
}

degreeSection.addEventListener("click", () => {
  if (degreeSpan.textContent === "C") {
    tempDegree.textContent = tempFaren.toFixed(2);
    degreeSpan.textContent = "F";
  } else {
    tempDegree.textContent = tempCelci.toFixed(2);
    degreeSpan.textContent = "C";
  }
});
