// You need to create the utils.ts file because cn (classNames) is a utility function that helps combine Tailwind CSS classes conditionally. It's not a separate package you install, but rather a small helper function commonly used in Next.js projects.

/**
 * The cn function combines two popular utilities:
 * clsx: For conditionally joining class names together
 * tailwind-merge: For intelligently merging Tailwind CSS classes without conflicts
 */

import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]){
    return twMerge(clsx(inputs));
}