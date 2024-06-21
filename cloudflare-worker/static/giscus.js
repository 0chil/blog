function initilaizeGiscus(giscusOptions) {
    var giscusDiv = document.createElement("div");
    giscusDiv.className = "giscus";
    if (!document.querySelector(".giscus")) {
        document.querySelector("article").appendChild(giscusDiv);
    }

    var script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", giscusOptions.GISCUS_REPO);
    script.setAttribute("data-repo-id", giscusOptions.GISCUS_REPO_ID);
    script.setAttribute("data-category", giscusOptions.GISCUS_CATEGORY);
    script.setAttribute("data-category-id", giscusOptions.GISCUS_CATEGORY_ID);
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