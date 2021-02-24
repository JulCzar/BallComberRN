export const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms ))


export const doAfter = async (callback: Function, ms:number = 0, ...params: any[]) => {
  await wait(ms)

  callback(...params)
}