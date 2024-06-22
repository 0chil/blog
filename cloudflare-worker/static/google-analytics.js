const GA_TAG = "G-L3F0Y7J3V8"; // GA 태그 삽입

const script = document.createElement("script");
script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TAG}`;
script.async = true;
document.head.appendChild(script);

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', GA_TAG);
