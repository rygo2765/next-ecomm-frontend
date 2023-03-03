export const ssr = false;
import { checkLoggedIn } from "../utils/auth";

export async function load(){
  await checkLoggedIn()
}
