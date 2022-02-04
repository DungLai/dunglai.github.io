function onOpen() {
  var SS = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('List Files/Folders')
    .addItem('List All Files and Folders', 'listFilesAndFolders')
    .addToUi();
};

function listFilesAndFolders(){
  var folderId = Browser.inputBox('Enter folder ID', Browser.Buttons.OK_CANCEL);
  if (folderId === "") {
    Browser.msgBox('Folder ID is invalid');
    return;
  }
  getFolderTree(folderId, true); 
};

// Get Folder Tree
function getFolderTree(folderId, listAll) {
  try {
    // Get folder by id
    var parentFolder = DriveApp.getFolderById(folderId);
    
    // Initialise the sheet
    var file, data, sheet = SpreadsheetApp.getActiveSheet();
    sheet.clear();
    sheet.appendRow(["Full Path", "Name","Type" ,"Date", "URL", "Last Updated", "Description", "Size","Owner Email"]);
    
    // Get files and folders
    getChildFolders(parentFolder.getName(), parentFolder, data, sheet, listAll);
  } catch (e) {
    Logger.log(e.toString());
  }
};

// Get the list of files and folders and their metadata in recursive mode
function getChildFolders(parentName, parent, data, sheet, listAll) {
  var childFolders = parent.getFolders();
 
  // List folders inside the folder
  while (childFolders.hasNext()) {
    var childFolder = childFolders.next();
    var folderId = childFolder.getId();
    data = [ 
      parentName + "/" + childFolder.getName(),
      childFolder.getName(),
      "Folder",
      childFolder.getDateCreated(),
      childFolder.getUrl(),
      childFolder.getLastUpdated(),
      childFolder.getDescription(),
      childFolder.getSize()/1024,
      childFolder.getOwner().getEmail()
    ];
    // Write
    sheet.appendRow(data);
    
    // List files inside the folder
    var files = childFolder.getFiles();
    while (listAll & files.hasNext()) {
      var childFile = files.next();
      data = [ 
        parentName + "/" + childFolder.getName() + "/" + childFile.getName(),
        childFile.getName(),
        "Files",
        childFile.getDateCreated(),
        childFile.getUrl(),
        childFile.getLastUpdated(),
        childFile.getDescription(),
        childFile.getSize()/1024,
        childFile.getOwner().getEmail(),
      ];
      // Write
      sheet.appendRow(data);
    }
    // Recursive call of the subfolder
    getChildFolders(parentName + "/" + childFolder.getName(), childFolder, data, sheet, listAll);  
  }
};