document.getElementById('myForm').addEventListener('submit',book);
function book(e){



    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    var bookmark={
        name: siteName,
        url: siteUrl
    }
    if(!validate(siteName,siteUrl)){
        return false;
    }
    if(localStorage.getItem('bookmarks') === null)
    {
        var bookmarks=[];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));


    }
    else{
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));


    }
    document.getElementById('myForm').reset();
    fetch();
    e.preventDefault();
}


function fetch(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var sites = document.getElementById('sites');
    sites.innerHTML='';
    console.log(bookmarks);

    for(var i=0;i < bookmarks.length;i++)
    {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        sites.innerHTML += '<div class="well">' +
                            '<h3>' +  name +
                            ' <a href ="'+url+'" target="_blank" class="btn btn-primary">Visit</a> ' +
                            ' <a onclick="removebook(\''+url+'\')" class="btn btn-danger">Delete</a> '+ 
                            ' </h3> '+
                            '</div>';

    }

}

function removebook(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i=0;i<bookmarks.length;i++)
    {
        if(url === bookmarks[i].url)
        {
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetch();
}

function validate(siteName, siteUrl){

    if(!siteUrl || !siteName){
        alert("Please enter a name and a URL");
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);


    if(!siteUrl.match(regex)){

        alert("Please enter a valid URl");
        return false;

    }
    return true;
}