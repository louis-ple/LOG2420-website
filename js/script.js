var SelectedElection = "2019federal";
var FedArray = new Array();       //This array contains only values of checkboxes that are checked.
var ProArray = new Array();

function ShowParties(radio)
{
    SelectedElection = radio.value;
    
    var divFed = document.getElementById("partis-federaux");
    var divPro = document.getElementById("partis-provinciaux");

    switch(radio.value)
    {
        case "2019federal" :
        case "2015federal" :
            divFed.style.display = "block";
            divPro.style.display = "none";
            break;
        case "2018provincial" :
        case "2014provincial" :
            divFed.style.display = "none";
            divPro.style.display = "block";
            break;
    }
}

function EnableActionsFederal(checkbox)
{
    if(checkbox.checked)
    {
        FedArray.push(checkbox.value);
    }
    else
    {
        for(var i = 0; i < FedArray.length; i++)
        {
            if(checkbox.value == FedArray[i])
            {
                FedArray.splice(i, 1);
            }
        }
    }

    if(FedArray.length == 1)
    {
        document.getElementById("actionConnaitre").disabled = false;
        document.getElementById("actionComparer").disabled = true;
    }    
    else if(FedArray.length == 2)
    {
        document.getElementById("actionConnaitre").disabled = true;
        document.getElementById("actionComparer").disabled = false;        
    }
    else
    {
        document.getElementById("actionConnaitre").disabled = true;
        document.getElementById("actionComparer").disabled = true;        
    }
}

function EnableActionsProvincial(checkbox)
{
    if(checkbox.checked)
    {
        ProArray.push(checkbox.value);
    }
    else
    {
        for(var i = 0; i < ProArray.length; i++)
        {
            if(checkbox.value == ProArray[i])
            {
                ProArray.splice(i, 1);          //array.splice(position, quantity) --- at what position do we remove an item, and how many do we remove from that position
            }
        }
    }

    if(ProArray.length == 1)
    {
        document.getElementById("actionConnaitre").disabled = false;
        document.getElementById("actionComparer").disabled = true;
    }
    else if(ProArray.length == 2)
    {
        document.getElementById("actionConnaitre").disabled = true;
        document.getElementById("actionComparer").disabled = false;
    }
    else
    {
        document.getElementById("actionConnaitre").disabled = true;
        document.getElementById("actionComparer").disabled = true;        
    }
}

function ShowPropositions(button)
{
    var party;

    switch (SelectedElection)
    {
        case "2019federal":
        case "2015federal":
            party = FedArray[0];
            break;
        case "2018provincial":
        case "2014provincial":
            party = ProArray[0];
            break;
    }
    
    window.location.href = "./connaitre.html?party=" + party;
}

function ShowComparison(button)
{
    var party1;
    var party2;

    switch (SelectedElection)
    {
        case "2019federal":
        case "2015federal":
            party1 = FedArray[0];
            party2 = FedArray[1];
            break;
        case "2018provincial":
        case "2014provincial":
            party1 = ProArray[0];
            party2 = ProArray[1];
            break;
    }


    var child = window.location.href = "./comparer.html?party1=" + party1 + "&party2=" + party2;
}