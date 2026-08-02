import { ONE, SPECIALONE } from "../const";

export default (money) => money.replace(RegExp(`^${SPECIALONE}`), ONE);
