async ({ login, password }) => {
  const groupid = 1;

  const hash = await metarhia.metautil.hashPassword(password);
  await application.auth.registerUser(login, hash);

  return { status: "success" };
};
