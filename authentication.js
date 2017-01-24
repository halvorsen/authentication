var xmlHttp = createXmlHttpRequestObject();


function createXmlHttpRequestObject() {
	var xmlHttp;
	if (window.ActiveXObject){
		try{
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}catch(e){
			xmlHttp = false;
		}
	}else{
		try{
			xmlHttp = new XMLHttpRequest();
		}catch(e){
			xmlHttp = false;
		}
	}
	if(!xmlHttp)
		alert("can't create that object");
	else
		return xmlHttp;

}
function process() {
	createXmlHttpRequestObject();
	if(xmlHttp.readyState==0 || xmlHttp.readyState==4) {
		user = encodeURIComponent(document.getElementById("user").value);
		pass = encodeURIComponent(document.getElementById("pass1").value);
		xmlHttp.open("GET", "generate_login_record.php?user=" + user + "&pass=" + pass, true);
		xmlHttp.onreadystatechange = handleServerResponseToAddingLogin;
		xmlHttp.send(null);
	}else{
		setTimeout('process()',1000);
	}
}

function handleServerResponseToAddingLogin(){
	if(xmlHttp.readyState==4){
		if(xmlHttp.status==200){
			var xmlResponse = xmlHttp.responseXML;
			var textResponse = xmlHttp.responseText;
			console.log("textResponse : "+textResponse);
			//xmlDocumentElement = xmlResponse.documentElement;
			var _message = xmlResponse.getElementsByTagName("message");
			var message = _message[0].childNodes[0].nodeValue
			console.log("message : "+message);
			document.getElementById("login_warning").className = 'alert alert-success';
			document.getElementById("login_warning").innerHTML = message;
			toggle_visibility('login_warning');

		} else {
			alert(xmlHttp.status);
		}
	}
}

function toggle_visibility(id) {
	var e = document.getElementById(id);
	if(e.style.display == "block") 
		e.style.display = "none";
	else 
		e.style.display = "block"; 
}

function password_get() {
	var password = password_generator();
	document.getElementById("randomPassword").innerHTML = password;

}

function password_generator() {
	var characterArray = ["1","2","3","4","5","6","7","8","9","1","2","3","4","5","6","7","8","9","1","2","3","4","5","6","7","8","9","1","2","3","4","5","6","7","8","9","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","U","V","W","X","Y","Z"];
	var pArray = [];
	for (i = 0; i < 7; i++) {
		const randomCharacterIndex = Math.floor(Math.random() * 95);
		pArray.push(characterArray[randomCharacterIndex]);
	}

	const password = pArray[0].concat(pArray[1],pArray[2],pArray[3],pArray[4],pArray[5],pArray[6]);
	return password;
}



function check_valid_login(user, pass1, pass2) {
	var error = 0;
	var characters = ["1","2","3","4","5","6","7","8","9","0","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];


	if (jQuery.inArray("@", user) === -1 || jQuery.inArray(".", user) === -1) {
		error = "Username needs to be a valid email address";
	}

	
	if (!pass2 || 0 === pass2.length) {
		error = "Re-Enter Password";
	}
	if (!pass1 || 0 === pass1.length) {
		error = "Enter Password";
	}
	if (!user || 0 === user.length) {
		error = "Enter Username";
	}
	if (pass1.length < 5 || pass1.length > 15) {
		error = "Password must be 5-15 characters long";
	}


	for (var i = 0; i < pass1.length; i++) {
		var c = pass1.charAt(i);
		if ($.inArray(c, characters) === -1 ) {
			error = "Password cannot contain symbols";
		}	
	}
	for (var n = 0; n < user.length; n++) {
		var c2 = user.charAt(n);
		if (!($.inArray(c2, characters) || c2 == "@" || c2 == ".")) {
			error = "Username needs to be a valid email address";
		}	
	}

	if (pass1 != pass2) {
		error = "Passwords do not match";
	}

	
	if (error === 0) {
		process();
	} 
	if (error != 0) {
		error = "<span class='glyphicon glyphicon-warning-sign'></span>".concat("  ", error)
		document.getElementById("login_warning").innerHTML = error;
		toggle_visibility('login_warning');
	} else if (document.getElementById("login_warning").style.display == "block") {
		toggle_visibility('login_warning');
	}



}