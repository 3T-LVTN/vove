import { ScreenSize } from "./screen-size";

export function customSize(size: number) {
  return size / 375 * ScreenSize.width ;
}
