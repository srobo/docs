window.addEventListener('DOMContentLoaded', (event) => {
  if (!window.PagefindUI) {
    console.warn("Unable to initialize search - perhaps we're running locally");
    return;
  }

  new PagefindUI({
    element: "#search",
    resetStyles: false,
    processResult: function (result) {
      // Remove the `.html` suffix
      // `index.html` is already handled for us.
      result.url = result.url.replace(".html", "")
      return result;
    }
  });
});
