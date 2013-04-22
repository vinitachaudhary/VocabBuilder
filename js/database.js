function dict()
{
	var dbSize = 50 * 1024 * 1024; // 50MB
   	var db = openDatabase("Dictionary", "1.0", "Dictionary Manager", this.dbSize);
   	localStorage.setItem('dbOpen','open');

	dict.prototype.createTable = function() { 
		alert("called");
    	db.transaction(function(tx) { 
			tx.executeSql("CREATE TABLE IF NOT EXISTS words(ID INTEGER PRIMARY KEY ASC, word TEXT)", []);
		}); 
		fetchData("../dictionary/easy.html",setDictionary);
		localStorage.setItem('dbSet','set');
	}

	dict.prototype.addword = function(wordText) {		 
    	db.transaction(function(tx){ 
			tx.executeSql("INSERT INTO words(word) VALUES (?)",[wordText]);
    	}); 
	}

	dict.prototype.deleteword = function(wordText) { 
	    db.transaction(function(tx){ 
			tx.executeSql("INSERT INTO words(word) VALUES (?)",[wordText]);
		}); 
	} 
       
	dict.prototype.search = function(wordText) {
		var count=0;
		wordText = wordText.toLowerCase();  
		db.transaction(function(tx){ 
			tx.executeSql("SELECT word FROM words where word=?",[wordText],function(tx,result){
			count=result.rows.length;
			});
		});
		return count;
	}
}


