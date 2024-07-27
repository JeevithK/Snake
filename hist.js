

let wholehist=document.querySelector(".wholehistory");
let scorehigh=document.querySelector(".scorehigh");
let count=1;
createhistory();
function createhistory()
{
    const hist=JSON.parse(localStorage.getItem("score"))||[];

    const hist2=hist;
    hist2.sort((a, b) => b - a);

    let highest=hist2[0];

    scorehigh.innerHTML=highest;


    hist.forEach(element => {
        let newele=document.createElement("div");
        newele.className="row1";

        newele.innerHTML=`<p class="number">${count}</p>
            <p class="scorep">Number of foods catched  <span class="score">${element}</span></p>`;

        wholehist.append(newele);
        count++;
    });
    
}