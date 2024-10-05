import {UUID_PREFIX} from "../data/common";


export const createUUID = () => {
  return `${UUID_PREFIX}_${crypto.randomUUID()}`;
};
