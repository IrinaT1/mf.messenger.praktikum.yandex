export function render(query, block) {
    var root = document.querySelector(query);
    root.appendChild(block.getContent());
    return root;
}
;
//# sourceMappingURL=Render.js.map