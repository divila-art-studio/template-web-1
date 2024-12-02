function login() {
  // console.log(n);
  var x = document.getElementById("masuk");
  // var text = "";
  // var i;
  var username = x.elements[0].value;
  var password = x.elements[1].value;

  console.log("Username : "+username+"<br> Password : "+password);

  if (username=="bps1200" && password=="1200bps") {
    sessionStorage.setItem("status", "valid");
    location.replace("index.html");
  } else {
    location.replace("login.html");
  }
}