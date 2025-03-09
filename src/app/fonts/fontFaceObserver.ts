import FontFaceObserver from 'fontfaceobserver';

const html = document.documentElement;

if (sessionStorage.fontsLoaded) {
  html.classList.add('fonts-loaded');
} else {
  const regular = new FontFaceObserver('Inter');
  const bold = new FontFaceObserver('Inter', {
    weight: 'bold',
  });

  Promise.all([regular.load(), bold.load()]).then(function () {
    html.classList.add('fonts-loaded');
    sessionStorage.fontsLoaded = true;
  });
}
