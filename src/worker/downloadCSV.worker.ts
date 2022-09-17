const dowloadCSV = async (resourceUri: string) => {
  // const seconds = 10
  // const start = new Date().getTime()
  // const delay = seconds * 1000

  // while (true) {
  //   if (new Date().getTime() - start > delay) {
  //     break
  //   }
  // }
  const data = await fetch(resourceUri)
  return await data.text()
}
export { dowloadCSV }
