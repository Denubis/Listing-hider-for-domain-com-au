// ==UserScript==
// @name         Listing hider for Domain.com.au
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Toggle listings on domain.com.au
// @author       Brian Ballsun-Stanton
// @match        https://www.domain.com.au/sale/*
// @grant GM_setValue
// @grant GM_getValue

// @require      http://code.jquery.com/jquery-latest.js
// @require http://userscripts-mirror.org/scripts/source/107941.user.js

// ==/UserScript==

(function() {
    'use strict';

    var array_things_to_hide = GM_SuperValue.get('domainhideassets', []);
    console.log(array_things_to_hide);

    array_things_to_hide.forEach(function(item){
        console.log("trying to hide"+item);
        hide_listing(item);
        console.log($("li[data-testid^='"+item+"']").text());
    });

    $("h1[data-testid='summary']").after("<button class='clearbutton'>Reset Hidden</button>");
    console.log("Hi");
    $("li[data-testid^='listing']").each(function(index) {
        //console.log( index + ": " + $( this ).text() );
        var current_text = $(this).find("h2").text();
        var current_listing = $(this).attr('data-testid');
        //console.log(current_listing);
        $(this).after("<div><button class='hidebutton' listing='"+current_listing+"'>hide "+current_text+"</button><div>");

    });
    $("button.hidebutton").click(function(event){
        event.preventDefault();
        var current_listing = $(this).attr('listing');
        console.log("click"+current_listing);
        if (array_things_to_hide.includes(current_listing)){
            console.log("removing");
            array_things_to_hide = array_things_to_hide.filter( function(item) { return item != current_listing; });
            GM_SuperValue.set('domainhideassets',array_things_to_hide);
        }else{
            console.log("adding");
            array_things_to_hide = array_things_to_hide.concat([current_listing]);
            GM_SuperValue.set('domainhideassets',array_things_to_hide);
        }
        hide_listing(current_listing);


    });
    $("button.clearbutton").click(function(event){
        event.preventDefault();

        console.log("resetting-hidden");
        GM_SuperValue.set('domainhideassets',[]);

    });
    $("div[data-testid^='adspot']").hide();

})();

function hide_listing(listingid){
    console.log("hiding "+listingid);
    $("li[data-testid^='"+listingid+"'] div").toggle();
    //update_button(listingid);
}


function update_button(listingid){
    console.log("updating button "+listingid);
    console.log($("button.hidebutton[listing^='"+listingid+"']").html());
}