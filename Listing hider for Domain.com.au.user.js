// ==UserScript==
// @name         Listing hider for Domain.com.au
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.domain.com.au/sale/*
// @grant GM_setValue
// @grant GM_getValue

// @require      http://code.jquery.com/jquery-latest.js
// @require http://userscripts-mirror.org/scripts/source/107941.user.js

// ==/UserScript==

(function() {
    'use strict';

    const array_things_to_hide = GM_SuperValue.get('domainhideassets', []);
    console.log(array_things_to_hide);

    array_things_to_hide.forEach(function(item){
        console.log("trying to hide"+item);
        $("li[data-testid^='"+item+"'] div").css('color', '#EEE');
        console.log($("li[data-testid^='"+item+"']").text());
    });

    $("h1[data-testid='summary']").after("<button class='clearbutton'>Reset Hidden</button>");
    console.log("Hi");
    $("li[data-testid^='listing']").each(function(index) {
        //console.log( index + ": " + $( this ).text() );
        var current_text = $(this).find("h2").text();
        var current_listing = $(this).attr('data-testid');
        console.log(current_listing);
        $(this).after("<div><button class='hidebutton' listing='"+current_listing+"'>hide "+current_text+"</button><div>");

    });
    $("button.hidebutton").click(function(event){
        event.preventDefault();
        var current_listing = $(this).attr('listing');
        console.log("click"+current_listing);
        GM_SuperValue.set('domainhideassets',array_things_to_hide.concat([current_listing]));

    });
    $("button.clearbutton").click(function(event){
        event.preventDefault();

        console.log("resetting-hidden");
        GM_SuperValue.set('domainhideassets',[]);

    });

})();

