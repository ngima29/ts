export function checkNan(value: string | number){
    return isNaN(Number(value)) ? null : Number(value)
}