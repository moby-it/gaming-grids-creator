export default defineEventHandler(async (event) => {
  const storage = useStorage("db");
  const { email, password } = await readBody(event);
  console.log(email, password);
  if (await storage.hasItem(email)) {
    console.log("email found", await storage.getItem(email));
  }
  await storage.setItem(email, password);
  return "got creds";
});
