// Fonctionnalité pour connaitre la taille des appareils en Responsive

$([document, window]).on('ready resize', function(e) {
    console.log($(window).width());

    if ($(window).width() <= 390) {
        console.log("Width 390px");
        console.log("Mobile Redmi Androïd Pro screen");
    } else {
        console.log("Desktop screens");
    }
});