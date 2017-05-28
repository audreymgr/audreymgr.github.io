/**
 * Load remote page content
 *
 * @param url
 * @param navigatorContentId
 * @returns {*}
 */
function getPageContent(url, navigatorContentId) {
    return fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (responseText) {
            var proxy = document.createElement('div');
            proxy.innerHTML = responseText;

            var navigatorContent = document.createElement('div');
            navigatorContent.setAttribute('id', navigatorContentId);
            navigatorContent.innerHTML = proxy.querySelector('#' + navigatorContentId).innerHTML;

            return navigatorContent;
        })
        .catch(alert);

}

/**
 * Navigate to the project corresponding to the provided url
 *
 * @param projectUrl
 */
function navigateToProject(projectUrl) {
    getPageContent(projectUrl, 'project').then(function (content) {
        var navigator = document.querySelector('#navigator');
        navigator.appendChild(content);
        navigator.style.marginTop = '-' + content.offsetTop + 'px';
        window.history.pushState('home', '', projectUrl);
    });
}

function navigateToHome() {
    getPageContent('/', 'home').then(function (content) {
        console.log(content);
    });
}

/**
 * Start
 *
 */
document.addEventListener("DOMContentLoaded", function () {
    var body = document.querySelector('body');

    // Observe project links on homepage
    var projectLinks = document.querySelectorAll('#projects-list a');
    projectLinks.forEach(function (projectLink) {
        projectLink.addEventListener('click', function (event) {
            event.preventDefault();
            navigateToProject(event.currentTarget.href);
        });
    });
});