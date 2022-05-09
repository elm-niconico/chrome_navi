export const eliminateDuplicate
    = <T>(array: T[]) => array.filter((e, index) => array.indexOf(e) == index)
