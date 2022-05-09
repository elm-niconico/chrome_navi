const path = require("path");

/** @type import('webpack').Configuration */
const content = {
    mode: "production",
    target: "web",
    entry: path.resolve(__dirname, './src/content/index.ts'),
    //externals: ["rx"],
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "content.js"
    },

    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /.(ts|tsx)$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ]
    }
}
/** @type import('webpack').Configuration */
const action = {
    mode: "production",
    target: "web",
    entry: path.resolve(__dirname, './src/action/index.ts'),

    output: {
        path: path.resolve(__dirname, "build"),
        filename: "action.js"
    },

    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /.(ts|tsx)$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ]
    }
}

/** @type import('webpack').Configuration */
const background = {
    mode: "production",
    target: "web",
    entry: path.resolve(__dirname, './src/background/index.ts'),

    output: {
        path: path.resolve(__dirname, "build"),
        filename: "background.js"
    },

    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /.(ts|tsx)$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ]
    }
}
module.exports = [content, action, background]
