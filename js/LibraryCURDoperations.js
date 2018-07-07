//Ajax Call Function to Delete the BOOK
function DeleteBook(ID,Edition){
                    $.ajax({
                                       method: "DELETE",
                                       url: "http://localhost:7070/api/books/"+ID+"/"+Edition,
                                       dataType: "json",
                                       statusCode: {
                                            404: function() {
                                              alert( "Data not found" );
                                                NoDataFound();
                                            }
                                          }
                                      }).done(function(data){
                                            alert("Success : "+data)
                                          })                                       
                                        .fail(function (msg){
                                            alert("Operation Failed");
                                          });              
                }

//Function for ajax call for Get method
function GetData(url){
                                
                      return  $.ajax({
                                       method: "GET",
                                       url: url,
                                       dataType: "json",
                                       statusCode: {
                                            404: function() {
                                              alert( "Data not found" );
                                                NoDataFound();
                                            }
                                          }
                                      }).done(function(data){
                                          })                                       
                                        .fail(function (msg){
                                            alert("Operation Failed");
                                          });              
                   
                }

//Function ajax call to Update the BOOK
function UpdateBook(updateBook){
                    
                    
                    
                    $.ajax({
                        method: "PUT",
                        url: "http://localhost:7070/api/books/"+BookIDForUpdate,                        
                        data: updateBook
                        })
                        .done(function(msg){
                        alert("Success : "+msg);
                        ClearInputs();
                        })
                        .fail(function(msg){
                           alert("Failed"+msg);
                        })
                        .always(function(){
                            alert("Always executed");
                       }); 
                }

//Function ajax call to Post the Book
function PostBook(newBook){
                    
                    $.ajax({
                        method: "POST",
                        url: "http://localhost:7070/api/books",                        
                        data: newBook
                        })
                        .done(function(msg){
                        alert("Saved"+msg);
                        ClearInputs();
                        })
                        .fail(function(msg){
                           alert("Failed"+msg);
                        })
                        .always(function(){
                            alert("Always executed");
                       }); 
                }