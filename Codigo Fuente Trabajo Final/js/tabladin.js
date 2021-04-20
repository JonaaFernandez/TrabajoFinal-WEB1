"use strict";

function iniciarPagina() {

    let baseURL = 'https://web-unicen.herokuapp.com/api/groups';
    let groupID = '015FernandezFino';
    let collectionID = 'valores';
    var min = 0;
    var max = 100000;
    var identif = ' ';
    let carga_inicial = [{
            "zona": "Centro",
            "val1": "2400",
            "val2": "2650",
            "val3": "2850"
        },
        {
            "zona": "Av. Brasil",
            "val1": "1165",
            "val2": "1340",
            "val3": "1820"
        },
        {
            "zona": "Av. Bolivar",
            "val1": "1370",
            "val2": "1780",
            "val3": "2150"
        }
    ];
    let arreglo_Inic = [];
    obtenerDatos(min, max);
    /*    var handle = setInterval(() => {
           obtenerDatos(min, max);
       }, 4000); */
    let tbody = document.getElementById("t-body");

    function crearTablas(arr, Min, Max) {
        tbody.innerHTML = "";
        let tBody = document.getElementById("t-body");

        for (let i = 0; i < arr.length; i++) {
            if (((parseInt(arr[i].thing.val1) >= parseInt(Min)) && (parseInt(arr[i].thing.val1) < parseInt(Max))) || ((parseInt(arr[i].thing.val2) >= parseInt(Min)) && (parseInt(arr[i].thing.val2) < parseInt(Max))) || ((parseInt(arr[i].thing.val3) >= parseInt(Min)) && (parseInt(arr[i].thing.val3) < parseInt(Max)))) {
                let tr = document.createElement("tr");
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
                let td4 = document.createElement("td");
                let td5 = document.createElement("td");
                let td6 = document.createElement("td");

                td1.innerText = arr[i].thing.zona;
                td2.innerText = "U$S" + arr[i].thing.val1;
                td3.innerText = "U$S" + arr[i].thing.val2;
                td4.innerText = "U$S" + arr[i].thing.val3;

                let botonEliminar = document.createElement('button');
                botonEliminar.setAttribute('data-ID', i);

                botonEliminar.type = 'button';
                botonEliminar.innerHTML = "Eliminar";
                console.log("botonEliminar", arr[i]._id);
                botonEliminar.addEventListener("click", function() {
                    eliminar(arr[i]._id);
                    obtenerDatos(min, max)
                });

                let botonModif = document.createElement('button');
                botonModif.setAttribute('data-ID', arr[i]._id);
                console.log("botonModif", arr[i]._id);
                botonModif.type = 'button';
                botonModif.innerHTML = "Modificar";
                botonModif.addEventListener("click", function() {
                    obtenerUno(arr[i]._id);
                    obtenerDatos(min, max)
                });

                td5.appendChild(botonModif);
                td6.appendChild(botonEliminar);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);

                tBody.appendChild(tr);
            }
            console.log(tBody);
        }
    }



    let crearTres = document.getElementById("ingresarTres");
    crearTres.addEventListener("click", function() { cargarArreglo(carga_inicial) });

    function cargarArreglo(arr) {
        for (let i = 0; i < 3; i++) {
            let inversiones = {
                "zona": arr[i].zona,
                "val1": arr[i].val1,
                "val2": arr[i].val2,
                "val3": arr[i].val3,
            }
            agregarUnElement(inversiones);
        }
    }


    /*-- ****************************************************************************************/
    let ingresarDatos = document.getElementById("Ingresar");
    ingresarDatos.addEventListener("click", function() {

        let ingZona = document.getElementById("zonaName");
        let ingFidei = document.getElementById("fideicomisoName");
        let ingPozo = document.getElementById("pozoName");
        let ingModulo = document.getElementById("moduloName");
        let inversiones = {
            "zona": ingZona.value,
            "val1": ingFidei.value,
            "val2": ingPozo.value,
            "val3": ingModulo.value,
        };
        document.getElementById("zonaName").focus();
        document.getElementById("zonaName").value = "";
        document.getElementById("fideicomisoName").value = "";
        document.getElementById("pozoName").value = "";
        document.getElementById("moduloName").value = "";

        console.log(inversiones);
        agregarUnElement(inversiones);
    });

    // ******************************************************************************************

    function agregarUnElement(inversiones) {
        let data = {
            "thing": inversiones
        };
        fetch(baseURL + "/" + groupID + "/" + collectionID, {

                "method": "POST",
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify(data)
            }).then(function(r) {
                return r.json()
            })
            .then(function(json) {

                obtenerDatos(min, max);
            })
            .catch(function(e) {
                console.log("ERROR", e);
            })
    }


    let obtDatos = document.getElementById("obtenerDatos");
    obtDatos.addEventListener("click", function() {
        obtenerDatos(min, max);
        handle = setInterval(() => {
            obtenerDatos(min, max);
        }, 4000);
    });

    // ******************************************************************************************
    function obtenerDatos(min, max) {
        fetch(baseURL + "/" + groupID + "/" + collectionID, {

                "method": "GET"
            }).then(function(r) {
                return r.json();
            })
            .then(function(json) {

                tbody.innerHTML = "";
                crearTablas(json.valores, min, max);
            })
            .catch(function(e) {
                console.log(e)
            })
    }

    // ******************************************************************************************
    function eliminar(id) {
        fetch(baseURL + "/" + groupID + "/" + collectionID + "/" + id, {

                "method": "DELETE",

            }).then(function(r) {
                return r.json()
            })
            .then(function(json) {
                obtenerDatos(min, max);
                console.log(json);

            })
            .catch(function(e) {
                console.log(e)
            })
    }

    // ******************************************************************************************

    function obtenerUno(id) {
        identif = id;
        fetch(baseURL + "/" + groupID + "/" + collectionID + "/" + id, {


                "method": "GET",

            }).then(function(r) {
                return r.json()
            })
            .then(function(json) {
                console.log(json);

                let ingZona = document.getElementById("zonaName");
                let ingFidei = document.getElementById("fideicomisoName");
                let ingPozo = document.getElementById("pozoName");
                let ingModulo = document.getElementById("moduloName");

                ingZona.value = (json.information.thing.zona);
                ingFidei.value = (json.information.thing.val1);
                ingPozo.value = (json.information.thing.val2);
                ingModulo.value = (json.information.thing.val3);

            })
            .catch(function(e) {
                console.log(e)
            })
    }

    let modifDatos = document.getElementById("modificarDatos");
    modifDatos.addEventListener("click", function() {

        let ingZona = document.getElementById("zonaName");
        let ingFidei = document.getElementById("fideicomisoName");
        let ingPozo = document.getElementById("pozoName");
        let ingModulo = document.getElementById("moduloName");
        let inversiones = {
            "zona": ingZona.value,
            "val1": ingFidei.value,
            "val2": ingPozo.value,
            "val3": ingModulo.value,
        };
        modificaUno(identif, inversiones);
        obtenerDatos(min, max)
        document.getElementById("zonaName").focus();
        document.getElementById("zonaName").value = "";
        document.getElementById("fideicomisoName").value = "";
        document.getElementById("pozoName").value = "";
        document.getElementById("moduloName").value = ""
    });


    // ******************************************************************************************

    function modificaUno(id, inversiones) {
        let data = {
            "thing": inversiones
        };
        fetch(baseURL + "/" + groupID + "/" + collectionID + "/" + id, {

                "method": "PUT",
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify(data)

            }).then(function(r) {
                return r.json()
            })
            .then(function(json) {

                obtenerDatos(min, max);

            })
            .catch(function(e) {
                console.log(e)
            })
    }

    let busquedaDesde = document.getElementById("busquedadesde");
    let busquedaHasta = document.getElementById("busquedahasta");
    let btnbuscar = document.getElementById("busqueda");
    btnbuscar.addEventListener("click", function() { buscarPorPrecio(busquedaDesde.value, busquedaHasta.value) });

    function buscarPorPrecio(desde, hasta) {
        if ((parseInt(desde)) < (parseInt(hasta))) {

            obtenerDatos(desde, hasta);
            clearInterval(handle);
            document.getElementById("busquedadesde").focus();
            document.getElementById("busquedadesde").value = "";
            document.getElementById("busquedahasta").value = "";

        }
    }

}
document.addEventListener("DOMContentLoaded", iniciarPagina);