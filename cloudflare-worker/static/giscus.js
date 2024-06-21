// document.addEventListener('onNagivateCompleted', initializeGiscus); // Giscus를 사용하려면 주석을 제거하세요
function initializeGiscus() {
    var giscusDiv = document.createElement("div");
    giscusDiv.className = "giscus";
    if (!document.querySelector(".giscus")) {
        document.querySelector("article").appendChild(giscusDiv);
    }

    var script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", ""); // 여기서부터 Giscus 정보를 입력하세요
    script.setAttribute("data-repo-id", "");
    script.setAttribute("data-category", "");
    script.setAttribute("data-category-id", "");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "ko");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    document.head.appendChild(script);
}