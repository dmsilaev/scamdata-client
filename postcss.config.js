module.exports = {
    sourceMap: false,
    plugins: [
        require("postcss-cssnext")(),
        require("css-declaration-sorter")({
            order: "concentric-css"
        }),
        require("css-mqpacker")(),
    ]
};
