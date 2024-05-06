module.exports = {
    mode: "jit",
    content: [
        "./src/**/*.{ html, js }",
        "./node_modules/tw-elements/dist/js/**/*.js",
        "./public/index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./src/*.{vue,js,ts,jsx,tsx}",
        
    ],
    theme: {
        extend: {},
    },
    plugins: [require('tw-elements/dist/plugin')],
}