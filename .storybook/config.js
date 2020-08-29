import React, { useState } from "react";
import { configure, load, addDecorator, addParameters } from "@storybook/react";
import { themes, create } from "@storybook/theming";
import { withInfo } from "@storybook/addon-info";
import "@storybook/addon-console";

import 'antd/dist/antd.css';
import '../src/styles/index.scss';
import '../src/styles/antdBL.scss';

import Color from "./color";

addDecorator((storyFn) => (
    <div>{storyFn()}</div>
));

addParameters({
    options: {
        theme: create({
            base: "light",
            brandTitle: "BlackLake Design (formily)",
            colorPrimary: Color.primary,
            colorSecondary: Color.primary,
        }),
    },
});

// automatically import all files ending in *.stories.js
configure(
    [require.context("../src/stories", true, /\.stories\.(js|mdx)$/)],
    module
);
