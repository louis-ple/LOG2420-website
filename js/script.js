/////////////////////////////////////////////////////// PARSE JSON ////////////////////////////////////////////////////

var data = '{"Elections":[{"name" : "43e élection fédérale", "date" : "21 octobre 2019", "type": "Federal"},{"name" : "Élections générales provinciales", "date" : "1er octobre 2018", "type": "Provincial"},{"name" : "42e élection fédérale", "date" : "19 octobre 2015", "type": "Federal"},{"name" : "Élections générales provinciales", "date" : "7 avril 2014", "type": "Provincial"}],"PartisFederaux":[{"abreviation": "P.L.C.", "fullname": "Parti libéral du Canada"},{"abreviation": "P.C.C.", "fullname": "Parti conservateur du Canada"},{"abreviation": "B.Q.", "fullname": "Bloc Québécois"},{"abreviation": "N.P.D.", "fullname": "Nouveau parti démocratique"},{"abreviation": "P.V.C.", "fullname": "Parti vert du Canada"},{"abreviation": "P.P.C.", "fullname": "Parti populaire du Canada"}         ],"PartisProvinciaux":[{"abreviation": "C.A.Q","fullname": "Coalition avenir Quebec"},{"abreviation": "P.L.Q","fullname": "Parti liberal du Quebec"},{"abreviation": "P.Q","fullname": "Parti quebecois"},{"abreviation": "P.V.Q","fullname": "Parti vert du Quebec"},{"abreviation": "Q.S","fullname": "Quebec solidaire"},{"abreviation": "P.C.Q","fullname": "Parti conservateur du Quebec"},{"abreviation": "P.I.Q","fullname": "Parti pour lindependance du Quebec"}]}';
var myJSONobject = JSON.parse(data);
       
var divPro = document.getElementById("partis-provinciaux");
var divElec = document.getElementById("elections");
var divFed = document.getElementById("partis-federaux");

// Div Elections
var content = '<table style="width:100%">';
var size = myJSONobject.Elections.length;
var value = '';
var item;
var lastElection = "2019Federal";
for (i = 0; i < size; i++)
{
    item = myJSONobject.Elections[i];
    value = item.date.substring(item.date.length - 4, item.date.length) + item.type;
    if (value == lastElection)
        content += '<tr><td rowspan="2"><input type="radio" name="electionChoices" onclick="ShowParties(this);" value="' + value + '" checked></td><td>' + item.name + '</td></tr><tr><td class="detail">' + item.date + '</td></tr><tr><td>&nbsp;</td></tr>';
    else
        content += '<tr><td rowspan="2"><input type="radio" name="electionChoices" onclick="ShowParties(this);" value="' + value + '"></td><td>' + item.name + '</td></tr><tr><td class="detail">' + item.date + '</td></tr><tr><td>&nbsp;</td></tr>';
}
content += "</table>";
divElec.innerHTML += content;

// Div Federal
content = '<table style="width:100%">';
size = myJSONobject.PartisFederaux.length;
for(i = 0; i < size; i++)
{
    item = myJSONobject.PartisFederaux[i];
    content += '<tr><td rowspan="2"><input type="checkbox" class="parti-federal" value="' + item.abreviation + '" onclick="EnableActionsFederal(this);"></td><td>' + item.abreviation + '</td></tr><tr><td class="detail">' + item.fullname + '</td></tr><tr><td>&nbsp;</td></tr>';
}

content += '</table>';
divFed.innerHTML += content;

// Div Provincial
content = '<table style="width:100%">';
size = myJSONobject.PartisProvinciaux.length;
for(i = 0; i < size; i++)
{
    item = myJSONobject.PartisProvinciaux[i];
    content += '<tr><td rowspan="2"><input type="checkbox" class="parti-provincial" value="' + item.abreviation + '" onclick="EnableActionsProvincial(this);"></td><td>' + item.abreviation + '</td></tr><tr><td class="detail">' + item.fullname + '</td></tr><tr><td>&nbsp;</td></tr>';
}

content += '</table>';
divPro.innerHTML += content;



//////////////////////////////////////////////// SCRIPT PAGE D'ACCUEIL ///////////////////////////////////////////////////////

var SelectedElection = "2019Federal";
var FedArray = new Array();       //This array contains only values of checkboxes that are checked.
var ProArray = new Array();

function ShowParties(radio)
{
    SelectedElection = radio.value;

    var divFed = document.getElementById("partis-federaux");
    var divPro = document.getElementById("partis-provinciaux");
    
    switch(radio.value)
    {
        case "2019Federal" :
        case "2015Federal" :
            divFed.style.display = "block";
            divPro.style.display = "none";
            break;
        case "2018Provincial" :
        case "2014Provincial" :
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
        case "2019Federal":
        case "2015Federal":
            party = FedArray[0];
            break;
        case "2018Provincial":
        case "2014Provincial":
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
        case "2019Federal":
        case "2015Federal":
            party1 = FedArray[0];
            party2 = FedArray[1];
            break;
        case "2018Provincial":
        case "2014Provincial":
            party1 = ProArray[0];
            party2 = ProArray[1];
            break;
    }

    var child = window.location.href = "./comparer.html?party1=" + party1 + "&party2=" + party2;
}