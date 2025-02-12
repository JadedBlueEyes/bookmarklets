// ==Bookmarklet==
// @name Save recipie to Mealie
// ==/Bookmarklet==

var url = document.URL.endsWith('/') ?
    document.URL.slice(0, -1) :
    document.URL;
var mealie = "http://localhost:8080"; // Change this to your Mealie instance
var group_slug = "home" // Change this to your group slug. You can obtain this from your URL after logging-in to Mealie
var use_keywords= "&use_keywords=1" // Optional - use keywords from recipe - update to "" if you don't want that
var edity = "&edit=1" // Optional - keep in edit mode - update to "" if you don't want that

if (mealie.slice(-1) === "/") {
    mealie = mealie.slice(0, -1)
}
var dest = mealie + "/g/" + group_slug + "/r/create/url?recipe_import_url=" + url + use_keywords + edity;
window.open(dest, "_blank");

