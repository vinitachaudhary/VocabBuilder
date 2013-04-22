dictionary = new dict(); 

//Called upon when a tab is opened/reopened
chrome.tabs.getSelected(null,function(tab){ 
	if( String(localStorage.getItem('dbSet'))!='set' && String(localStorage.getItem('dbOpen'))==='open'){
		console.log("called1");
		dictionary.createTable(localStorage.getItem('difficulty'));
		fetchData(tab.url,chkData);
	}
	else if( String(localStorage.getItem('dbSet'))==='set' && String(localStorage.getItem('dbOpen'))==='open'){
		console.log("called2");
		fetchData(tab.url,chkData); 
	}
}); 

//Fetches the HTML content from the page and passes it to respective functions for further processing.
function fetchData(url,callback) { 
	var xhr = new XMLHttpRequest(); 
	xhr.open("GET", url, true); 
	xhr.onreadystatechange = function() { 
		if (xhr.readyState == 4) {
			var data = xhr.responseText;		 
			callback(data); 
		} else { 
        callback(null); 
		} 
	} 
	xhr.send(); 
}; 

//Function to check if the word is in the database or not
function chkData(data) {
	var div = document.createElement('div'); 
	div.innerHTML = data;	 
	var elements = div.getElementsByTagName('p'); 
	for (i=0;i<elements.length;i++){ 
		var sanitized = elements[i].textContent ||elements[i].innerText; 
		var words = sanitized.split(' ');  
		for(j=0;j<words.length;j++){		 
			if(dictionary.search(words[j])==0){
				console.log("came here");
				console.log(words[j]);
				var url= "http://www.collinsdictionary.com/dictionary/english/"+words[j]; 
				fetchData(url,getMeaning); 
			} 
		} 
	}	 
} 

//Function to get the meaning of the word when called upon
function getMeaning(data) {
	if(data!=null){
		var div = document.createElement('div');
		div.innerHTML = data;
		var x=div.getElementsByClassName("def");
		for(i=0; i<x.length; i++)
			console.log(x[i].innerHTML);
	}
} 

//Function to initialize dictionary
function setDictionary(data) {
	var div = document.createElement('div'); 
	div.innerHTML = data;	 
	var elements = div.getElementsByTagName('p');	 
	for (i=0;i<elements.length;i++){ 
		var words = elements[i].innerText.split(' ');  
		for(j=0;j<words.length;j++){ 
			dictionary.addword(words[j].trim()); 
		} 
	}	 
} 
 


 
