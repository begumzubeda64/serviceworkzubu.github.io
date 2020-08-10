
//make sure service workers are supported
if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
        navigator.serviceWorker
        .register('/sw_about_page.js', {
            scope: '/'
          })
        .then(reg => console.log("Service worker registered"))
        .catch(err => console.log(`Service Worker: Error: ${err}`))
    });
    
}

