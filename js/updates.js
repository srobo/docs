function handleDownloadClick(event) {
  plausible("Kit download", {props: {version: event.target.dataset.version}});

  // Delay navigation so that Plausible is notified of the click
  setTimeout(function() {
    location.href = event.target.href;
  }, 150);
  event.preventDefault();
}

function addDownloadTracking() {
  document.querySelectorAll(".kit-download-link").forEach(function(link) {
    link.addEventListener("click", handleDownloadClick);
  });
}

window.addEventListener('load', addDownloadTracking);
