import { network } from "./network.js";

export function randomFailures() {

    network.forEach(router => {

        router.active =
            Math.random() > 0.15;
    });
}