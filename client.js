const publicVapidKey = 'BNpHtspplq1APafUU7To6NkGH0E7LqBIuB4dEhtEcgONaRdfX1bSND17KlDm-gc5nYi5PUOe9AaOKntZYXbm7kM';
if('serviceWorker' in navigator){
    send().catch(err => console.error(err));
    
}

//register sw, register push, send push
async function send(){
    console.log('Registering service worker!');
    const register = await navigator.serviceWorker.register('/worker.js',{
        scope: '/'
    });
    console.log("Service worker registered")

    //register push
    console.log('Registering push..');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log("Push registered..");
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('Push sent..');
}

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
