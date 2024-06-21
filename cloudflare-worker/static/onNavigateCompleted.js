function onNagivateCompleted() {
    dispatchEvent(new Event('onNagivateCompleted'));
    const links = document.querySelectorAll("a.notion-link");
    links.forEach(link => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("/")) {
            window.next.router.prefetch(href);
        }
    });
}

// Hook Navigates
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;
history.pushState = function () {
    const result = originalPushState.apply(history, arguments);
    setTimeout(onNagivateCompleted, 500);
    return result;
};
history.replaceState = function () {
    const result = originalReplaceState.apply(history, arguments);
    setTimeout(onNagivateCompleted, 500);
    return result;
};
document.addEventListener("DOMContentLoaded", () => setTimeout(onNagivateCompleted, 500));