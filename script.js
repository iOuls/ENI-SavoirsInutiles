//initialisation de la page
initForm();
let tabSavoirsInutiles = [];
let index = 0;

class savoirInutile{

    // constructeur
    constructor(index, savoir, auteur, date){
        this.index = index;
        this.savoir = savoir;
        this.auteur = auteur;
        this.date = date;
        console.log(date);
    }

    // afficher l'objet
    afficher(){
        console.log('${this.index} ${this.savoir} ${this.auteur} ${this.date}')
    }

    // ajouter une <li>
    ajouterLi(){
        document.getElementById("liste").innerHTML += 
            "<li onclick='supprimer(event)' id='"
            +this.index+"'><div class='infos-savoir'>"
            +this.savoir +"</div><div class='infos'>Par : "
            +this.auteur +", le : "
            +this.date.getDate().toString().padStart(2, '0') +"/" 
            +(this.date.getMonth()+1).toString().padStart(2, '0') +"/" 
            +this.date.getFullYear() +"</div></li>";
    }
}

function initForm(){
    // vide le formulaire
    document.getElementById("savoir").value = '';
    document.getElementById("auteur").value = '';

    // mise à la date du jour
    let date2 = new Date();
    document.getElementById("date").setAttribute("value",date2.getFullYear() 
    +"-"+date2.getMonth()+1 +"-"+date2.getDate() )

    // focus sur la textbox savoir
    document.getElementById("savoir").focus();
}

function ajouter(){
    // recup infos
    let savoir = document.getElementById("savoir").value;
    let auteur = document.getElementById("auteur").value;
    let date = document.getElementById("date").valueAsDate;

    // verif champs obligatoires
    if (savoir != "" && auteur != "" && date != ""){     

        // ajout de la <li> si vérif ok
        let my_li = new savoirInutile(index, savoir, auteur, date);
        tabSavoirsInutiles.push(my_li);
        my_li.ajouterLi();
    }else{
        // alerte si champ manquant
        alert("Tous les champs sont obligatoires.");
    }

    index++

    // réinit du formulaire
    initForm();
}

function supprimer(event){
    if (confirm("Voulez-vous supprimer le savoir ?")) {

        // récup id savoir sélectionné
        let idSavoir = event.currentTarget.getAttribute("id")

        // suppression savoir dans le tableau
        tabSavoirsInutiles.splice(idSavoir, 1);

        // retrait du savoir dans le HTML
        event.currentTarget.remove();
    }
}

function trieAlpha(){
    let liS = document.querySelectorAll("ol li");

    liS.forEach(element => {
        element.remove();
    });

    tabSavoirsInutiles.sort((a,b) => (a.auteur > b.auteur ? 1 : -1)).forEach(element => {
        element.ajouterLi();
    })
}

function trieChrono(){
    let liS = document.querySelectorAll("ol li");
    liS.forEach(element => {
        element.remove();
    });

    tabSavoirsInutiles.sort((a,b) => (a.date > b.date ? 1 : -1)).forEach(element => {
        element.ajouterLi();
    })
}