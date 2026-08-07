
let highestPercentage = 0;
let topperName = "";

function addStudent()
{
    let name = document.getElementById("name").value;

    let sub1 = Number(document.getElementById("sub1").value);

    let sub2 = Number(document.getElementById("sub2").value);

    let sub3 = Number(document.getElementById("sub3").value);

    let total = sub1 + sub2 + sub3;

    let percentage = total / 3;

    let table = document.getElementById("studentTable");

    let row = table.insertRow();

    row.insertCell(0).innerHTML = name;
    row.insertCell(1).innerHTML = sub1;
    row.insertCell(2).innerHTML = sub2;
    row.insertCell(3).innerHTML = sub3;
    row.insertCell(4).innerHTML = total;
    row.insertCell(5).innerHTML = percentage.toFixed(2) + "%";

    if(percentage > highestPercentage)
    {
        highestPercentage = percentage;
        topperName = name;
    }

    document.getElementById("topper").innerHTML =
    "Topper : " + topperName + " (" + highestPercentage.toFixed(2) + "%)";

    document.getElementById("name").value = "";
    document.getElementById("sub1").value = "";
    document.getElementById("sub2").value = "";
    document.getElementById("sub3").value = "";
}
