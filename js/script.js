var p = document.getElementById("partis-provinciaux");
p.style.display = "none";


var connaitreButton = document.getElementById("connaitre");
var comparerButton = document.getElementById("comparer");

if(0==0)
{
    document.getElementsById("PartyName").innerHTML = "DEF";
}

function updateButton(param)
{
    var i = 0;

    if(param==1) //Parti fédéral
    {
        var fedeCB = document.getElementsByClassName("parti-federal");
        var fedeChecked = 0;
        for (i = 0; i < fedeCB.length; i++) {
            if(fedeCB[i].checked)
            {
                fedeChecked++;
            }
        }

        if(fedeChecked==1)
        {
            connaitreButton.disabled=false;
            comparerButton.disabled=true;
        }
        else if(fedeChecked == 2)
        {
            connaitreButton.disabled=true;
            comparerButton.disabled=false;
        }
        else
        {
            connaitreButton.disabled=true;
            comparerButton.disabled=true;
        }


    }

    if(param==2)    //Parti provincial
    {
        var provCB = document.getElementsByClassName("parti-provincial");
        var provChecked = 0;
        for (i = 0; i < provCB.length; i++) {
            if(provCB[i].checked)
            {
                provChecked++;
            }
        }

        if(provChecked==1)
        {
            connaitreButton.disabled=false;
            comparerButton.disabled=true;
        }
        else if(provChecked == 2)
        {
            connaitreButton.disabled=true;
            comparerButton.disabled=false;
        }
        else
        {
            connaitreButton.disabled=true;
            comparerButton.disabled=true;
        }
    }

    document.getElementById("ax").innerHTML = "Federal Boxes checked = " + fedeChecked;
    document.getElementById("bx").innerHTML = "Provincial Boxes checked = " + provChecked;
}


function updateView(param)
{
    var fed = document.getElementById("partis-federaux");
    var prov = document.getElementById("partis-provinciaux");



    if(param==1)
    {
        document.getElementById("partis").innerHTML = "Partis politiques fédéraux";
        fed.style.display="block";
        prov.style.display = "none";
        view = param;
    }

    if(param==2)
    {
        document.getElementById("partis").innerHTML = "Partis politiques provinciaux";
        prov.style.display="block";
        fed.style.display = "none";
        view = param;
    }
}

function connaitre()
{
    // var fedeCB = document.getElementsByClassName("parti-federal");
    // var provCB = document.getElementsByClassName("parti-provincial");

    window.location.href = 'connaitre.html';

    document.getElementsById("PartyName").innerHTML = "DEF";
}