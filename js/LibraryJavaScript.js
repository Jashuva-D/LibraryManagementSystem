            //Function To add the list of books to the table
            function addBooks(books){
                $.each(books,function(index,book){
                    addBookRow(book);
                })
            }
            
            //Function to add the book record to the table
            function addBookRow(book){
               
               var rowspan=book.Repositories.length;
               
               var row="";
                
                    row += "<tr>";
                    row += "<td rowspan='"+rowspan+"'>"+book.ID+"</td>";
                    row += "<td rowspan='"+rowspan+"'>"+book.Title+"</td>";
                    row += "<td rowspan='"+rowspan+"'>"+book.Genre+"</td>";
                    row += "<td rowspan='"+rowspan+"'>"+returnAuthors(book.Authors)+"</td>";
                    row += "<td rowspan='"+rowspan+"'>"+book.Publisher.Name+"</td>";
                    row += returnRecords(book.ID,book.Repositories);
                    row += "</tr>";
                
                
                $('#bookstable tbody#bookbody').append(row);
                
            }
            
            //Function to return the all editions of the book
            function returnRecords(bookID,records){
                    var recordrow="";
                    $.each(records,function(index,record){
                        if(index>0){
                            recordrow += "</tr><tr>";
                        }
                        recordrow += "<td>"+record.Edition+"</td><td>"+record.Price+"</td><td>"+record.NumberOfCopies+"</td>";
                        recordrow +="<td name='update'><a href='Update.html'><button type='button' onclick='Update(this);'value='"+bookID+"' data-id='"+record.Edition+"'><span class='glyphicon glyphicon-edit' /></button></a></td>";
                        
                    });
                     
                    return recordrow;
            }
            
            //Function to return the authors to the table row
            function returnAuthors(authors){
                    var authorsrow="";
                    $.each(authors,function(index,author){
                        authorsrow += (index+1)+". "+author.Name+"<br />";//+"<button type='button' class='btn btn-xs pull-right'>Details</button><br />";
                    })
                    return authorsrow;
            }
            
            //Function for To display No data Found
            function NoDataFound(){
                    alert("No Data Found for the data that you have entered");
                    $("#NoDataFoundDiv").show();
                    $("#BooksTableDiv").hide();
                }
        
            //Adding Authors to the select list
            function addAuthors(authors){
                    $(authors).each(function(index,author){
                        var authorOption="<option value='"+author.Name+"'>"+author.Name+"</option>";
                        $("#selectAuthors").append(authorOption);
                    });
                }
                    
            //Adding Publishers to the select list
            function addPublishers(publishers){
                    $(publishers).each(function(index,publisher){
                         var publisherOption="<option value='"+publisher.Name+"'>"+publisher.Name+"</option>";
                        $("#selectPublisher").append(publisherOption);
                    });
                   
                }

            //Function validating the inputs from the user
            function validatingInputs(){
                    //validating Title
                   var title=$('#inputTitle').val();
                   if(title==""){
                        alert("INVALID TITLE");
                        return false;
                   }
                   
                   //validating Genre
                   var genre=$('#selectGenre').val();
                   if(genre==""){
                       alert("INVALID GENRE");
                       return false;
                   }
                   
                  //validating Authors
                  var authors = $("#inputAuthors").val();                
                  if(authors==""){
                           alert("INVALID AUTHORS")
                           return false;
                   }                           
                   
                   //validating Publishers
                   var publisher=$('#inputPublisher').val();
                   if(publisher==""){
                       alert("INVALID PUBLISHER");
                       return false;
                   }
                   
                   //validating Edition
                   var edition=$("#inputEdition").val();
                   if(edition==""){
                       alert("INVALID EDITION");
                       return false;
                   }
                   
                   //validating Price
                   var price=$("#inputPrice").val();
                   if(!$.isNumeric(price)){
                       alert("INVALID PRICE");
                       return false;
                   }
                    
                   //validating the number of copies
                    var copies=$("#inputCopies").val();
                    if($.isNumeric(copies)&&Math.floor(copies)&&copies<=0){
                        alert("INVALID COPIES");
                        return false;
                    }
                  //return true beacause all are valid inputs
                    return true;
                }
                
            //Function to add the book to the database
            function GetBookJson(){
                    
                    //Creating the Book Object
                       var newBook=new Object();
                       newBook.Authors=[];
                       newBook.Repositories=[] ;
                    
                    //assigning the given values to the NewBook Object
                       newBook.Title=$("#inputTitle").val();
                       newBook.Genre=$("#selectGenre").val();

                    //assigning the authors to the new book object
                        var authorsString=$("#inputAuthors").val();
                        var authors=authorsString.split(",");
                        for(var i in authors){
                             
                             var author=new Object();
                             author.Name=authors[i];
                             newBook.Authors.push(author);
                        }
                    
                    //Assigning the publisher to the new book Object
                        newBook.Publisher=new Object();
                        newBook.Publisher.Name=$("#inputPublisher").val();
                        newBook.Publisher.Contact=34589739875;

                    
                    
                    //Adding editions to the book
                        var bookrepo=new Object();
                        bookrepo.Edition=$("#inputEdition").val();
                        bookrepo.Price=$("#inputPrice").val();
                        bookrepo.NumberOfCopies=$("#inputCopies").val();

                        newBook.Repositories.push(bookrepo);

                   return newBook;
                   
                }   

            //Function to empty the input buttons
            function ClearInputs(){
                    $("#inputTitle").val("");
                    $("#selectGenre").val("");
                    $("#inputAuthors").val("");
                    $("#inputPublisher").val("");
                    $("#inputPrice").val("");
                    $("#inputEdition").val("");
                    $("#inputCopies").val("");
                }
            
            //Function to Load the Books to the table By  using jQuery Datatable
             function LoadBooks(books){
                   
                 return $("#bookstable").DataTable({
                                destroy: true,
                                data: books,
                                fixedColumns: false,
                                columns:[
                                    {"data":"ID"},
                                    {"data":"Title"},
                                    {   
                                        "data":"Genre"
                                    },
                                    {
                                        "data": "Authors",
                                        "render": "[,<br />].Name"
                                    },
                                    {   "name":"second",
                                        "data":"Publisher.Name"
                                    },
                                    {"data":"Edition"},
                                    {"data":"Price"},
                                    {"data":"NumberOfCopies"},
                                    {
                                        mRender:function(data,type,row){
                                            return "<button class='btn-primary' value='update'><span class='glyphicon glyphicon-edit' /></button>";
                                        }
                                    },
                                    {
                                        mRender: function(data,type,row){
                                            return "<button class='btn-danger'value='delete'><span class='glyphicon glyphicon-trash' /></button>";
                                        }
                                    }

                                ],
                                rowsGroup:[
                                    0,
                                    1,
                                    2,
                                    3,
                                    4
                                ]
                            })
                        }

            //Function to Get the Books As Required
            function GetMyBooks(books){
                            var mybooks=[];
                            $.each(books,function(index,book){
                                var booklength=book.Repositories.length;
                                $.each(book.Repositories,function(index,bookedition){
                                    var addbook=new Object();
                                    addbook.ID=book.ID;
                                    addbook.Title=book.Title;
                                    addbook.Genre=book.Genre;
                                    addbook.Authors=book.Authors;
                                    addbook.Publisher=book.Publisher;
                                    addbook.Edition=bookedition.Edition;
                                    addbook.Price=bookedition.Price;
                                    addbook.NumberOfCopies=bookedition.NumberOfCopies;

                                    mybooks.push(addbook);
                                });
                            });
                            return mybooks;
                        }

            