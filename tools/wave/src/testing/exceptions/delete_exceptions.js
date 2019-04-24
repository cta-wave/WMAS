
const FileSystem = require("../../utils/file-system");
const exceptions = require("./exceptions.js");


removeTestFiles();


async function removeTestFiles() {
	for (var i = 0; i < exceptions.length; i++){
		var path = exceptions[i];
		await deleteTest(path);
	}
}


async function deleteTest(path) {
	if(path){
		var testPath = "../../../../../" + path;
		if (!(await FileSystem.exists(testPath))) return;
		await FileSystem.removeFile(testPath);
	}
}
